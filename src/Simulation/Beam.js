/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useRef, useCallback, useMemo, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { earthRadius } from 'satellite.js/lib/constants';
import VolumetricSpotLightMaterial from './Shaders/VolumetricSpotLightMaterial';
import {
  LaserBeam,
  generateLaserBodyCanvas,
} from './Shaders/LaserBeam';

const Beam = ({ beam, activateBeam, deactivateBeam, storeRef }) => {
  const beamRef = useRef();
  const ref = useCallback((node) => {
    if (node !== null) {
      storeRef(`${beam.satellite}-${beam.customer}`, node);
      beamRef.current = node;
    }
  }, []);

  function getDistance(sat1, sat2) {
    const sat1pos = sat1.position.clone();
    const sat2pos = sat2.position.clone();
    const a = sat1pos.x - sat2pos.x;
    const b = sat1pos.y - sat2pos.y;
    const c = sat1pos.z - sat2pos.z;

    return Math.sqrt(a * a + b * b + c * c);
  }

  const distance = useRef();
  useFrame(() => {
    const dist = getDistance(beam.powerRef, beam.customerRef);
    if (dist * earthRadius < 5000) {
      distance.current = dist;
      beamRef.current.position.copy(beam.powerRef.position);
      beamRef.current.lookAt(beam.customerRef.position);
      beamRef.current.rotateY(-Math.PI / 2);
    } else distance.current = null;
  });

  // const mat = useMemo(() => {
  //   const material = VolumetricSpotLightMaterial();
  //   material.uniforms.lightColor.value.set('yellow');
  //   material.uniforms.anglePower.value = 5;
  //   material.uniforms.attenuation.value = 3;
  //   return material;
  // }, []);

  // const geom = useMemo(() => {
  //   if (distance.current === null) return false;
  //   const height = distance.current;
  //   const geometry = new THREE.CylinderGeometry(
  //     0.005,
  //     0.01,
  //     height,
  //     64,
  //     20,
  //     true
  //   );
  //   geometry.applyMatrix4(
  //     new THREE.Matrix4().makeTranslation(0, -height / 2, 0)
  //   );
  //   geometry.applyMatrix4(
  //     new THREE.Matrix4().makeRotationX(-Math.PI / 2)
  //   );
  //   return geometry;
  // }, [distance.current]);

  const texture = useMemo(() => {
    return generateLaserBodyCanvas();
  }, []);

  const laser = useMemo(() => {
    if (distance.current === null) return false;
    const object = LaserBeam(distance.current, 0.01, texture);
    return object;
  }, [distance.current, texture]);

  return laser && <primitive object={laser} ref={ref} />;
};

export default Beam;
