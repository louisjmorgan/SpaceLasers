/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Billboard } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { forwardRef, useRef } from 'react';
import { earthRadius } from 'satellite.js/lib/constants';

function Sun({ position, frame }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.position.x = position.x[frame];
    ref.current.position.y = position.y[frame];
    ref.current.position.z = position.z[frame];
  });
  return (
    <group ref={ref}>
      <directionalLight
        color={0xffffff}
        intensity={0.7}
        position={[position.x[0], position.y[0], position.z[0]]}
      />
      <mesh>
        <sphereGeometry attach="geometry" args={[109, 64, 64]} />
        <meshBasicMaterial
          attach="material"
          color="yellow"
        />
      </mesh>

    </group>
  );
}

export default Sun;
