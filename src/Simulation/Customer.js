/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useCallback, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html, Instance } from '@react-three/drei';

const Customer = ({
  station,
  time,
  dispatchUI,
  getOrbitAtTime,
  storeRef,
  showLabel,
  attachCamera,
  isEclipsed,
  hasBeam,
  animationSpeed,
  obj,
}) => {
  const satRef = useRef();

  // Create ref for satellite and store with parent component
  const ref = useCallback((node) => {
    if (node !== null) {
      storeRef(station.name, node);
      satRef.current = node;
    }
  }, []);

  // Battery simulation functions
  const chargeState = useRef(0.3);
  const currentDuty = useRef('power storing');
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
        duties.current.set(loadProfile[1].name, newDuty);
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

  // update UI
  useEffect(() => {
    dispatchUI({
      type: 'update charge state',
      name: station.name,
      chargeState: (chargeState.current * 100).toFixed(1),
    });
    updateDelta.current = 0;
  }, [chargeState.current]);

  useEffect(() => {
    dispatchUI({
      type: 'update current duty',
      name: station.name,
      currentDuty: currentDuty.current,
    });
  }, [currentDuty.current]);

  // Animate satellite position

  useFrame(({ clock, camera, controls }, delta) => {
    // update satellite position
    if (clock.running === true) {
      const position = getOrbitAtTime(station, time.current);
      satRef.current.position.copy(position);
      const earth = new THREE.Vector3(0, 0, 0);

      const lookAt = earth.clone().sub(satRef.current.position);
      const up = new THREE.Vector3(0, 0, 1);
      // up.applyQuaternion(satRef.current.quaternion);
      satRef.current.up.set(up.x, up.y, up.z);
      satRef.current.lookAt(earth);
    }
    if (attachCamera) {
      camera.position
        .fromArray([
          satRef.current.position.x,
          satRef.current.position.y,
          satRef.current.position.z,
        ])
        .multiplyScalar(1.3);
    }

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
          currentDuty.current = 'power storing';
          newDuty = {
            ...duty,
            nextStart: time.current.valueOf() + duty.interval * 1000,
          };
          duties.current.set(name, newDuty);
        }
      }
      duties.current.set(name, newDuty);
    });

    const hasSun = !isEclipsed(satRef.current);

    let sources;
    if (hasSun && hasBeam) sources = 'sun and beam';
    if (hasSun && !hasBeam) sources = 'sun only';
    if (!hasSun && hasBeam) sources = 'beam only';
    if (!hasSun && !hasBeam) sources = 'eclipsed';
    chargeBattery(delta, sources);
    dispatchUI({
      type: 'update charging',
      name: station.name,
      sources,
    });
  });

  return (
    <Instance
      ref={ref}
      key={station.name}
      scale={0.01}
      onClick={() => {
        dispatchUI({
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
            {/* {' Charge: '}
            {`${(chargeState.current * 100).toFixed(1)}%`} */}
          </h1>
        </Html>
      ) : (
        ' '
      )}
    </Instance>
  );
};

Customer.propTypes = {
  station: PropTypes.object.isRequired,
  getOrbitAtTime: PropTypes.func.isRequired,
};

Customer.defaultProps = {};

export default memo(Customer);
