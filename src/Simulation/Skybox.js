import React from 'react';
import { useThree } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';
import Back from '../Assets/Textures/back.png';
import Front from '../Assets/Textures/front.png';
import Left from '../Assets/Textures/left.png';
import Right from '../Assets/Textures/right.png';
import Top from '../Assets/Textures/top.png';
import Bottom from '../Assets/Textures/bottom.png';

export default function Skybox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    Left,
    Right,
    Front,
    Back,
    Top,
    Bottom,
  ]);
  // Set the scene background property to the resulting texture.
  scene.background = texture;

  return <></>;
}
