import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import earthTexture from '../Assets/earth-texture.jpg';
import earthBump from '../Assets/earth-bump.jpg';
import earthSpecular from '../Assets/earth-specular.png';

export default function Earth() {
  const colorMap = useLoader(TextureLoader, earthTexture);
  const bumpMap = useLoader(TextureLoader, earthBump);
  const specularMap = useLoader(TextureLoader, earthSpecular);
  return (
    <mesh position={[0, 0, 0]}>
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
}
