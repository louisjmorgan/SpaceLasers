/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useContext, useRef, forwardRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';
import earthTexture from '../Assets/Textures/earth-texture-1k.jpg';
import earthBump from '../Assets/Textures/earth-bump.jpg';
import earthSpecular from '../Assets/Textures/earth-specular.png';
import cloudsTexture from '../Assets/Textures/fair_clouds_4k.png';

const Earth = forwardRef(({ initialDate, time }, ref) => {
  const colorMap = useLoader(TextureLoader, earthTexture);
  const bumpMap = useLoader(TextureLoader, earthBump);
  const specularMap = useLoader(TextureLoader, earthSpecular);
  const texture = [colorMap, bumpMap, specularMap];
  const clouds = useLoader(TextureLoader, cloudsTexture);
  const cloudsRef = useRef();
  texture.forEach((map) => {
    map.wrapS = THREE.RepeatWrapping;
    map.offset.x = 0.5;
  });

  function getEarthRotationAngle(date) {
    const JD = date.getTime() / 86400000 + 2440587 - 2451545;
    return 2 * Math.PI * (0.779057273264 + 1.00273781191135448 * JD);
  }

  useFrame(({ clock }) => {
    const date = time;
    const angle = getEarthRotationAngle(date);
    ref.current.rotation.y = angle;
    // cloudsRef.current.rotation.y = angle;
  });
  return (
    <>
      <mesh
        ref={ref}
        position={[0, 0, 0]}
        rotation={[
          0,
          getEarthRotationAngle(new Date(initialDate)),
          0,
        ]}
      >
        <sphereGeometry attach="geometry" args={[1, 64, 64]} />
        <meshPhongMaterial
          attach="material"
          map={colorMap}
          // bumpMap={bumpMap}
          // bumpScale={0.005}
          // specularMap={specularMap}
          // specular={0x111111}
          // offset={[]}
        />
      </mesh>
      {/* <mesh
        position={[0, 0, 0]}
        ref={cloudsRef}
        rotation={[
          0,
          getEarthRotationAngle(new Date(initialDate)),
          0,
        ]}
      >
        <sphereGeometry attach="geometry" args={[1.01, 32, 32]} />
        <meshPhongMaterial
          attach="material"
          map={clouds}
          transparent
        />
      </mesh> */}
    </>
  );
});

export default Earth;
