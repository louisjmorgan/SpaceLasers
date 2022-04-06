/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function toPolar(position) {
  const { x } = position;
  const { y } = position;
  const { z } = position;
  const sqrd = x * x + y * y + z * z;
  const radius = sqrd ** 0.5;
  const theta = Math.acos(z / radius);
  const phi = Math.atan2(y, x);
  const polar = {
    r: radius,
    t: theta,
    p: phi,
  };
  return polar;
}

export default function Camera({ target }) {
  const controls = useRef();
  const { camera } = useThree();
  useEffect(() => {
    camera.position.z = 3;
  }, [camera]);

  // console.log(currentTarget);
  useFrame(({ clock }, delta) => {
    if (!target.ref) {
      controls.current.target.fromArray([0, 0, 0]);
      return;
    }

    if (target.name === 'earth') {
      controls.current.target = target.ref.position;
      return;
    }

    if (target.lock) {
      const spherical = new THREE.Spherical().setFromVector3(
        target.ref.position
      );
      controls.current.setAzimuthalAngle(spherical.theta);
      controls.current.setPolarAngle(spherical.phi);
    } else {
      controls.current.target = target.ref.position;
    }
  });
  return (
    <OrbitControls
      enableZoom
      enableRotate={target.name === 'earth' || !target.lock}
      enablePan={false}
      ref={controls}
    />
  );
}
