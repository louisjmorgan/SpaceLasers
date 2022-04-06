/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function Camera({ target, refs }) {
  const controls = useRef();
  const { camera } = useThree();
  useEffect(() => {
    camera.position.z = 3;
  }, [camera]);

  // console.log(currentTarget);
  useFrame(({ clock }, delta) => {
    if (!target.ref) {
      controls.current.target.fromArray([0, 0, 0]);
    } else {
      controls.current.target = target.ref.position;
      controls.current.minDistance = 2.25;
      controls.current.maxDistance = 10;
    }
    // controls.current.target.fromArray([0, 0, 0]);
    // controls.current.maxDistance = 10;
    // controls.current.minDistance = 2.25;
  });
  return (
    <OrbitControls enableZoom enablePan={false} ref={controls} />
  );
}
