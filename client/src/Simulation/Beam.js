/* eslint-disable react/prop-types */
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, useLayoutEffect } from 'react';
import {
  Vector3, MeshBasicMaterial, AdditiveBlending, DoubleSide, Object3D, Texture,
} from 'three';
import useStore from '../Model/store';
import { generateLaserBodyCanvas, getLaserMeshes } from './Shaders/LaserBeam';

function Beam({
  beam, spacePower, customer,
}) {
  const ref = useRef();
  const laser = useRef(new Object3D());
  const texture = useRef();
  const material = useRef();

  useEffect(() => {
    texture.current = new Texture(generateLaserBodyCanvas());
    texture.current.needsUpdate = true;
    material.current = new MeshBasicMaterial({
      map: texture.current,
      blending: AdditiveBlending,
      color: 0x4444aa,
      side: DoubleSide,
      depthWrite: false,
      transparent: false,
    });
  }, []);

  const frame = useRef(useStore.getState().frame);
  useEffect(() => {
    useStore.subscribe(
      (state) => {
        frame.current = state.frame;
      },
    );
  }, []);

  useFrame(() => {
    if (beam.activated[frame.current]) {
      ref.current.position.x = spacePower.positions.x[frame.current];
      ref.current.position.y = spacePower.positions.y[frame.current];
      ref.current.position.z = spacePower.positions.z[frame.current];
      const customerPosition = new Vector3(
        customer.positions.x[frame.current],
        customer.positions.y[frame.current],
        customer.positions.z[frame.current],
      );
      ref.current.lookAt(customerPosition);
      ref.current.rotateY(-Math.PI / 2);
      const meshes = getLaserMeshes(beam.distances[frame.current], material.current);
      meshes.forEach((mesh) => laser.current.add(mesh));
      ref.current.children = meshes;
    } else if (ref.current.children) {
      laser.current.clear();
      ref.current.children = [];
    }
  });
  return (
    <primitive
      object={laser.current}
      position={[0, 0, 0]}
      ref={ref}
    />
  );
}

export default Beam;
