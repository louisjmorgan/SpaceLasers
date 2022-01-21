/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { useContext, useRef, forwardRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import earthTexture from '../Assets/earth-texture.jpg';
import earthBump from '../Assets/earth-bump.jpg';
import earthSpecular from '../Assets/earth-specular.png';
import { Context } from '../App';

const Earth = forwardRef((props, ref) => {
  const colorMap = useLoader(TextureLoader, earthTexture);
  const bumpMap = useLoader(TextureLoader, earthBump);
  const specularMap = useLoader(TextureLoader, earthSpecular);
  const context = useContext(Context);

  useFrame(({ clock }) => {
    ref.current.rotation.y =
      clock.getElapsedTime() * 7.2921159e-5 * context.animationSpeed;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 32, 32]} />
      <meshPhongMaterial
        attach="material"
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={0.005}
        specularMap={specularMap}
        specular="grey"
      />
    </mesh>
  );
});

export default Earth;
