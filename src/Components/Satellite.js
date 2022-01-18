/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function Satellite({ color, position }) {
  console.log(position);
  return (
    <mesh position={[position.x, position.y, position.z]}>
      <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
      <meshPhongMaterial
        attach="material"
        color={color}
        emissive={0xff4040}
        flatShading={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

Satellite.propTypes = {
  color: PropTypes.number,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number.isRequired,
  }).isRequired,
};

Satellite.defaultProps = {
  color: 0xff0000,
};
