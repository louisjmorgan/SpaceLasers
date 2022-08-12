/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, {
  forwardRef, useRef, useEffect, useLayoutEffect,
} from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';
import earthTexture from '../Assets/Textures/earth-texture.jpg';

const Earth = forwardRef(({ angles, frame }, ref) => {
  const colorMap = useLoader(TextureLoader, earthTexture);

  useLayoutEffect(() => {
    colorMap.wrapS = THREE.RepeatWrapping;
    colorMap.offset.x = 0.5;
  }, [colorMap]);

  useFrame(({ clock }) => {
    ref.current.rotation.y = angles[frame];
  });

  return (
    <mesh
      ref={ref}
      rotation={[0, angles[0], 0]}
    >
      <sphereGeometry attach="geometry" args={[1, 64, 64]} />
      <meshToonMaterial
        attach="material"
        map={colorMap}
      />
    </mesh>
  );
});

export default Earth;
