/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3, Spherical } from 'three';
import useStore from '../Model/store';

export default function Camera() {
  const controls = useRef();
  const { camera } = useThree();
  useLayoutEffect(() => {
    camera.position.z = 4;
  }, [camera]);
  const target = useStore((state) => state.cameraTarget);
  useEffect(() => {
    controls.current.maxDistance = 10;
    controls.current.minDistance = 2;
  }, [controls]);

  const earth = useRef(new Vector3(0, 0, 0));
  const spherical = useRef(new Spherical());

  useEffect(() => {
    if (target.lock || target.name === 'earth') controls.current.target = earth.current;
    else controls.current.target = target.ref.position;
  }, [target]);
  useFrame(({ clock }, delta) => {
    if (!target.ref) return;
    if (target.lock) {
      // controls.current.target = earth.current;
      spherical.current.setFromVector3(
        target.ref.position,

      );
      controls.current.setAzimuthalAngle(spherical.current.theta);
      controls.current.setPolarAngle(spherical.current.phi);
    } else {
      // controls.current.target = target.ref.position;
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
