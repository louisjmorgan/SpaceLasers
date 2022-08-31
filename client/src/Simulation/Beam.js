/* eslint-disable react/prop-types */
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, useLayoutEffect } from 'react';
import {
  Vector3, MeshBasicMaterial, AdditiveBlending, DoubleSide, Object3D, Texture, PlaneGeometry,
} from 'three';
import { useFrameStore, useStore } from '../Model/store';
import { generateLaserBodyCanvas, getLaserMeshes } from './Shaders/LaserBeam';

function Beam({
  beam, spacePower, customer,
}) {
  const ref = useRef();
  const laser = useRef(new Object3D());
  const texture = useRef();
  const material = useRef();
  const meshes = useRef();

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
    meshes.current = getLaserMeshes(1, material.current);
    meshes.current.forEach((mesh) => laser.current.add(mesh));
  }, []);

  const frame = useRef(useFrameStore.getState().frame);
  useEffect(() => {
    useFrameStore.subscribe(
      (state) => {
        frame.current = state.frame;
      },
    );
  }, []);

  useFrame(() => {
    if (beam.activated[frame.current]) {
      // if (laser.current.children.length === 0) {
      // }
      if (ref.current.children.length === 0) {
        ref.current.children = meshes.current;
      }
      ref.current.position.x = spacePower.positions.x[frame.current];
      ref.current.position.y = spacePower.positions.y[frame.current];
      ref.current.position.z = spacePower.positions.z[frame.current];

      ref.current.lookAt(
        customer.positions.x[frame.current],
        customer.positions.y[frame.current],
        customer.positions.z[frame.current],
      );
      ref.current.rotateY(-Math.PI / 2);
      ref.current.scale.set(beam.distances[frame.current], 1, 1);
    } else if (ref.current.children) {
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
