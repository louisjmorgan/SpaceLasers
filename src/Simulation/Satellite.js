/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useState,
  useCallback,
  memo,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html, Instance } from '@react-three/drei';

const Satellite = ({
  color,
  station,
  time,
  dispatch,
  getOrbitAtTime,
  storeRef,
  showLabel,
  isEclipsed,
  hasBeam,
  pvArray,
  battery,
  animationSpeed,
}) => {
  const [satRef, setSatRef] = useState();

  // Create ref for satellite and store with parent component
  const ref = useCallback((node) => {
    if (node !== null) {
      storeRef(station.name, node);
      setSatRef(node);
    }
  }, []);

  // Battery simulation functions
  const chargeState = useRef(0.3);
  const currentDuty = useRef('powerStoring');
  const updateDelta = useRef(0);
  const duties = useRef(new Map());

  function generateDuties() {
    Object.entries(station.load).forEach((loadProfile) => {
      if (loadProfile[1].default === false) {
        const { cycles, duration } = loadProfile[1];
        const interval =
          (station.orbit.period - duration * cycles) / cycles;
        const nextStart = time.initial.valueOf() + interval * 1000;
        const newDuty = {
          interval,
          duration,
          nextCompletion: null,
          nextStart,
        };
        duties.current.set(loadProfile[0], newDuty);
      }
    });
  }

  useEffect(() => {
    generateDuties();
  }, []);

  function chargeBattery(delta, profile) {
    const powerProfile = station.profiles.get(profile);
    const netCurrent = powerProfile.get(currentDuty.current);
    const { capacity } = station.battery;
    updateDelta.current += delta;

    if (chargeState.current >= 1.0 && netCurrent >= 0) {
      chargeState.current = 1;
      return;
    }

    if (chargeState.current <= 0 && netCurrent <= 0) {
      chargeState.current = 0;
      return;
    }

    const newChargeState =
      (chargeState.current * capacity +
        delta * animationSpeed * (1 / 3600) * netCurrent) /
      capacity;
    chargeState.current = newChargeState;
  }

  async function asyncDispatch(action) {
    dispatch(action);
  }

  // update UI
  useEffect(() => {
    dispatch({
      type: 'update charge state',
      name: station.name,
      chargeState: (chargeState.current * 100).toFixed(1),
    });
    updateDelta.current = 0;
  }, [chargeState.current]);

  useEffect(() => {
    dispatch({
      type: 'update current duty',
      name: station.name,
      currentDuty: currentDuty.current,
    });
  }, [currentDuty.current]);

  // Animate satellite position

  useFrame(({ clock }, delta) => {
    // update satellite position
    const position = getOrbitAtTime(station, time.current);
    satRef.position.x = position.x;
    satRef.position.y = position.y;
    satRef.position.z = position.z;

    // simulate power system
    duties.current.forEach((duty, name) => {
      let newDuty = {
        ...duty,
      };
      if (currentDuty.current !== name) {
        if (time.current.valueOf() >= duty.nextStart) {
          currentDuty.current = name;

          const nextCompletion =
            time.current.valueOf() + duty.duration * 1000;
          newDuty = {
            ...duty,
            nextCompletion,
          };
        }
      } else if (currentDuty.current === name) {
        if (time.current.valueOf() >= duty.nextCompletion) {
          currentDuty.current = 'powerStoring';
          newDuty = {
            ...duty,
            nextStart: time.current.valueOf() + duty.interval * 1000,
          };
          duties.current.set(name, newDuty);
        }
      }
      duties.current.set(name, newDuty);
    });

    const hasSun = !isEclipsed(satRef);
    if (hasSun && hasBeam) chargeBattery(delta, 'sunAndBeam');
    if (hasSun && !hasBeam) chargeBattery(delta, 'sunOnly');
    if (!hasSun && hasBeam) chargeBattery(delta, 'beamOnly');
    if (!hasSun && !hasBeam) chargeBattery(delta, 'eclipsed');
  });

  return (
    <Instance
      ref={ref}
      onClick={() => {
        dispatch({
          type: 'toggle label',
          name: station.name,
        });
      }}
    >
      {showLabel ? (
        <Html>
          <h1
            style={{
              fontFamily: 'sans-serif',
              color: 'white',
              fontSize: '1rem',
            }}
          >
            {station.name}
            {' Charge: '}
            {`${(chargeState.current * 100).toFixed(1)}%`}
          </h1>
        </Html>
      ) : (
        ' '
      )}
    </Instance>
  );
};

Satellite.propTypes = {
  color: PropTypes.number,
  station: PropTypes.object.isRequired,
  getOrbitAtTime: PropTypes.func.isRequired,
};

Satellite.defaultProps = {
  color: 0xff0000,
};

export default memo(Satellite);
