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
import {
  isEclipsed,
  generateDuties,
  chargeBattery,
  updateDuty,
} from '../Utils/Power';

const Customer = ({
  station,
  time,
  sim,
  getOrbitAtTime,
  storeRef,
  showLabel,
  dispatch,
  hasBeam,
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
  const chargeStateBeam = useRef(0.3);
  const chargeStateNoBeam = useRef(0.3);
  const currentDuty = useRef('power storing');

  const duties = useRef(new Map());

  useEffect(() => {
    generateDuties(station, duties, time);
  }, []);

  // update UI
  useEffect(() => {
    dispatch({
      target: 'data',
      type: 'update charge state',
      name: station.name,
      chargeStateBeam: (chargeStateBeam.current * 100).toFixed(1),
      chargeStateNoBeam: (chargeStateNoBeam.current * 100).toFixed(1),
      time: time.current,
    });
    dispatch({
      target: 'data',
      type: 'update current duty',
      name: station.name,
      currentDuty: currentDuty.current,
      time: time.current,
    });
  }, [time.current]);

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

    // simulate power system

    updateDuty(duties, currentDuty, time);

    const hasSun = !isEclipsed(
      satRef.current,
      sim.sunRef,
      sim.earthRef
    );

    let sources = [];
    if (hasSun && hasBeam) sources = ['sun and beam', 'sun only'];
    if (hasSun && !hasBeam) sources = ['sun only', 'sun only'];
    if (!hasSun && hasBeam) sources = ['beam only', 'eclipsed'];
    if (!hasSun && !hasBeam) sources = ['eclipsed', 'eclipsed'];
    chargeBattery(
      station,
      currentDuty,
      time,
      delta,
      sources[0],
      chargeStateBeam
    );
    chargeBattery(
      station,
      currentDuty,
      time,
      delta,
      sources[1],
      chargeStateNoBeam
    );

    dispatch({
      target: 'data',
      type: 'update charging',
      name: station.name,
      time: time.current,
      sources: sources[0],
    });
  });

  return (
    <Instance
      ref={ref}
      key={station.name}
      scale={0.01}
      onClick={() => {
        dispatch({
          target: 'data',
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
