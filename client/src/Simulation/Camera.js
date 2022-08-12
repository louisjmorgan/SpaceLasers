/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export default function Camera({ target }) {
  const controls = useRef();
  const { camera } = useThree();
  useLayoutEffect(() => {
    camera.position.z = 4;
  }, [camera]);

  useEffect(() => {
    controls.current.maxDistance = 10;
    controls.current.minDistance = 2;
  }, [controls]);
  // console.log(currentTarget);
  useFrame(({ clock }, delta) => {
    if (!target.ref) {
      controls.current.target.fromArray([0, 0, 0]);
      return;
    }

    if (target.lock && target.name !== 'earth') {
      const spherical = new THREE.Spherical().setFromVector3(
        target.ref.position,
      );
      controls.current.setAzimuthalAngle(spherical.theta);
      controls.current.setPolarAngle(spherical.phi);
    } else {
      controls.current.target = target.ref.position;
    }
  });
  return (
    <OrbitControls
      makeDefault
      enableZoom
      enableRotate={target.name === 'earth' || !target.lock}
      enablePan={false}
      ref={controls}
    />
  );
}
