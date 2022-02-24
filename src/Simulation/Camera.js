/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function Camera({ target, refs }) {
  const controls = useRef();
  // console.log(currentTarget);
  useFrame(({ camera }, delta) => {
    if (target !== 'earth') {
      controls.current.target = refs.get(target).position;
      controls.current.minDistance = 0.5;
      controls.current.maxDistance = 4;
    } else {
      controls.current.target.fromArray([0, 0, 0]);
      controls.current.maxDistance = 10;
      controls.current.minDistance = 2;
    }
  });
  return (
    <OrbitControls enableZoom enablePan={false} ref={controls} />
  );
}
