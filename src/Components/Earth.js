/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useContext, useRef, forwardRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';
import earthTexture from '../Assets/earth-texture.jpg';
import earthBump from '../Assets/earth-bump.jpg';
import earthSpecular from '../Assets/earth-specular.png';
import { Context } from '../App';

const Earth = forwardRef(({ initialDate, simTime }, ref) => {
  const colorMap = useLoader(TextureLoader, earthTexture);
  const bumpMap = useLoader(TextureLoader, earthBump);
  const specularMap = useLoader(TextureLoader, earthSpecular);
  const context = useContext(Context);
  const texture = [colorMap, bumpMap, specularMap];
  texture.forEach((map) => {
    map.wrapS = THREE.RepeatWrapping;
    map.offset.x = 0.7;
  });
  function getEarthRotationAngle(date) {
    const JD = date.getTime() / 86400000 + 2440587.5 - 2451545;
    return 2 * Math.PI * (0.779057273264 + 1.00273781191135448 * JD);
  }

  useFrame(({ clock }) => {
    const date = simTime;
    ref.current.rotation.y = getEarthRotationAngle(date);
  });
  return (
    <mesh
      ref={ref}
      position={[0, 0, 0]}
      rotation={[0, getEarthRotationAngle(new Date(initialDate)), 0]}
    >
      <sphereGeometry attach="geometry" args={[1, 32, 32]} />
      <meshPhongMaterial
        attach="material"
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={0.005}
        specularMap={specularMap}
        specular="grey"
        offset={[]}
      />
    </mesh>
  );
});

export default Earth;
