/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';

const Satellite = forwardRef(
  ({ color, station, initialDate, getOrbitAtTime }, ref) => {
    const satRef = ref;

    useFrame(({ clock }) => {
      const position = getOrbitAtTime(
        station,
        initialDate,
        clock.getElapsedTime()
      );
      satRef.current.position.x = position.x;
      satRef.current.position.y = position.y;
      satRef.current.position.z = position.z;
      // orbitRef.current.points = points;
    });
    return (
      <>
        <mesh ref={satRef}>
          <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
          <meshPhongMaterial
            attach="material"
            color={color}
            flatShading={false}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* <Line ref={orbitRef} /> */}
      </>
    );
  }
);

Satellite.propTypes = {
  color: PropTypes.number,
  station: PropTypes.object.isRequired,
  getOrbitAtTime: PropTypes.func.isRequired,
};

Satellite.defaultProps = {
  color: 0xff0000,
};

export default Satellite;
