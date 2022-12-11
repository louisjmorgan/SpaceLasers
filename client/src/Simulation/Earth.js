/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, {
  useRef, useEffect, useLayoutEffect,
} from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';
import shallow from 'zustand/shallow';
import { useFrameStore, useSimStore } from '../Model/store';
import earthTexture from '../Assets/Textures/earth-texture.jpg';
import gradientTexture from '../Assets/Textures/twoTone.jpg';

function Earth() {
  const ref = useRef();
  const colorMap = useLoader(TextureLoader, earthTexture);
  const gradientMap = useLoader(TextureLoader, gradientTexture);

  useLayoutEffect(() => {
    gradientMap.minFilter = THREE.NearestFilter;
    gradientMap.magFilter = THREE.NearestFilter;
  }, [gradientMap]);

  useLayoutEffect(() => {
    colorMap.wrapS = THREE.RepeatWrapping;
    colorMap.offset.x = 0.5;
  }, [colorMap]);

  const frame = useRef(useFrameStore.getState().frame);
  useEffect(() => {
    useFrameStore.subscribe(
      (state) => {
        frame.current = state.frame;
      },
    );
  }, []);

  const angles = useSimStore((state) => state.mission.earth, shallow);
  useFrame(() => {
    ref.current.rotation.y = angles[frame.current];
  });
  return (
    <mesh
      ref={ref}
      rotation={[0, angles[0], 0]}
      position={[0, 0, 0]}
    >
      <sphereGeometry attach="geometry" args={[1, 64, 64]} />
      <meshToonMaterial
        attach="material"
        map={colorMap}
        gradientMap={gradientMap}
      />
    </mesh>
  );
}

export default Earth;
