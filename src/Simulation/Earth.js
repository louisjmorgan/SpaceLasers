/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useRef, forwardRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';
import earthTexture from '../Assets/Textures/earth-texture.jpg';
import earthBump from '../Assets/Textures/earth-bump.jpg';
import earthSpecular from '../Assets/Textures/earth-specular.png';
import cloudsTexture from '../Assets/Textures/fair_clouds_4k.png';

const Earth = forwardRef(({ time }, ref) => {
  const colorMap = useLoader(TextureLoader, earthTexture);
  const bumpMap = useLoader(TextureLoader, earthBump);
  const specularMap = useLoader(TextureLoader, earthSpecular);
  const texture = [colorMap, bumpMap, specularMap];
  const clouds = useLoader(TextureLoader, cloudsTexture);
  const cloudsRef = useRef();
  useEffect(() => {
    texture.forEach((map) => {
      map.wrapS = THREE.RepeatWrapping;
      map.offset.x = 0.5;
    });
  }, [texture]);

  function getEarthRotationAngle(date) {
    const JD = date.getTime() / 86400000 + 2440587 - 2451545;
    return 2 * Math.PI * (0.779057273264 + 1.00273781191135448 * JD);
  }

  useFrame(({ clock }) => {
    const date = time.current;
    const angle = getEarthRotationAngle(date);
    ref.current.rotation.y = angle;
    cloudsRef.current.rotation.y = angle;
  });
  return (
    <>
      <mesh
        ref={ref}
        rotation={[0, getEarthRotationAngle(time.initial), 0]}
      >
        <sphereGeometry attach="geometry" args={[1, 32, 32]} />
        {/* <meshToonMaterial
          attach="material"
          wireframe
          color="purple"
        /> */}
        <meshToonMaterial
          attach="material"
          map={colorMap}
          // setHSL={[1, 10, 1]}
          // bumpMap={bumpMap}
          // bumpScale={0.5}
          // specularMap={specularMap}
          // specular={0x00000
        />
      </mesh>
      <mesh
        ref={cloudsRef}
        rotation={[0, getEarthRotationAngle(time.initial), 0]}
      >
        <sphereGeometry attach="geometry" args={[1.01, 36, 36]} />
        <meshBasicMaterial
          attach="material"
          // map={clouds}
          wireframe
          color="#fff266"
          transparent
          wireframeLinewidth="0.1"
        />
      </mesh>
    </>
  );
});

export default Earth;
