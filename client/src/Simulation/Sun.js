/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Billboard } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { forwardRef, useEffect, useRef } from 'react';
import { earthRadius } from 'satellite.js/lib/constants';
import shallow from 'zustand/shallow';
import { useFrameStore, useSimStore } from '../Model/store';

function Sun() {
  const ref = useRef();

  const frame = useRef(useFrameStore.getState().frame);

  useEffect(() => {
    useFrameStore.subscribe(
      (state) => {
        frame.current = state.frame;
      },
    );
  }, []);

  const position = useSimStore((state) => state.mission.sun, shallow);
  useFrame(({ clock }) => {
    ref.current.position.x = position.x[frame.current];
    ref.current.position.y = position.y[frame.current];
    ref.current.position.z = position.z[frame.current];
  });
  return (
    <group ref={ref}>
      <directionalLight
        color={0xffffff}
        intensity={0.5}
        position={[position.x[0], position.y[0], position.z[0]]}
      />
      {/* <mesh>
        <sphereGeometry attach="geometry" args={[109, 64, 64]} />
        <meshBasicMaterial
          attach="material"
          color="yellow"
        />
      </mesh> */}

    </group>
  );
}

export default Sun;
