/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {
  useRef,
  useState,
  useContext,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import styled from 'styled-components';
import { Context } from '../App';

const Satellite = ({
  color,
  station,
  getOrbitAtTime,
  storeRef,
  name,
  toggleLabel,
  isEclipsed,
  battery,
  animationSpeed,
}) => {
  // Create ref for satellite and store with parent component
  const satRef = useRef();
  storeRef(name, satRef);

  // Battery simulation functions
  const [chargeState, setChargeState] = useState(0.8);
  function chargeBattery(delta) {
    const { capacity, chargeCurrent } = battery;
    const newChargeState =
      (chargeState * capacity +
        delta * animationSpeed * (1 / 3600) * chargeCurrent) /
      capacity;
    setChargeState(() => newChargeState);
  }

  function dischargeBattery(delta) {
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

    satRef.current.position.x = position.x;
    satRef.current.position.y = position.y;
    satRef.current.position.z = position.z;
    // orbitRef.current.points = points;
    if (battery) {
      const charge = !isEclipsed(satRef);
      if (charge) chargeBattery(delta);
      if (!charge) dischargeBattery(delta);
    }
  });

  return (
    <>
      <mesh
        ref={satRef}
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
              {`${chargeState.toFixed(3) * 100}%`}
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
