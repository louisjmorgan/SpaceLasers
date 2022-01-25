/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const Satellite = ({
  color,
  station,
  getOrbitAtTime,
  storeRef,
  toggleLabel,
  isEclipsed,
  hasBeam,
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
  const [chargeState, setChargeState] = useState(0.8);
  function chargeBattery(delta) {
    if (chargeState >= 1) return;
    const { capacity, chargeCurrent } = battery;
    const newChargeState =
      (chargeState * capacity +
        delta * animationSpeed * (1 / 3600) * chargeCurrent) /
      capacity;
    setChargeState(() => newChargeState);
  }

  function dischargeBattery(delta) {
    if (chargeState <= 0) return;
    const { capacity, chargeCurrent } = battery;
    const newChargeState =
      (chargeState * capacity -
        delta * animationSpeed * (1 / 3600) * chargeCurrent) /
      capacity;
    setChargeState(() => newChargeState);
  }

  // Animate satellite position

  useFrame(({ clock }, delta) => {
    const position = getOrbitAtTime(station);

    satRef.position.x = position.x;
    satRef.position.y = position.y;
    satRef.position.z = position.z;
    if (battery) {
      const hasSun = !isEclipsed(satRef);
      if (hasSun || hasBeam) chargeBattery(delta);
      if (!hasSun && !hasBeam) dischargeBattery(delta);
    }
  });

  return (
    <>
      <mesh
        ref={ref}
        onClick={() => {
          toggleLabel(station);
        }}
      >
        <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
        <meshPhongMaterial
          attach="material"
          color={color}
          flatShading={false}
          side={THREE.DoubleSide}
        />
        {station.showLabel ? (
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
              {`${(chargeState * 100).toFixed(1)}%`}
            </h1>
          </Html>
        ) : (
          ' '
        )}
      </mesh>
      {/* <Line ref={orbitRef} /> */}
    </>
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

export default Satellite;
