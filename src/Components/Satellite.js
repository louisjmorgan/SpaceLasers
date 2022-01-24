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
  initialDate,
  getOrbitAtTime,
  storeRef,
  name,
  toggleLabel,
  isEclipsed,
  chargeBattery,
  dischargeBattery,
}) => {
  const satRef = useRef();
  const textRef = useRef();
  const context = useContext(Context);
  storeRef(name, satRef);
  useFrame(({ clock }, delta) => {
    const position = getOrbitAtTime(station);

    satRef.current.position.x = position.x;
    satRef.current.position.y = position.y;
    satRef.current.position.z = position.z;
    // orbitRef.current.points = points;
    const charge = !isEclipsed(satRef);
    if (charge) chargeBattery(station, delta);
    if (!charge) dischargeBattery(station, delta);
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
              {`${station.battery.chargeState * 100}%`}
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
