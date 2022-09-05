/* eslint-disable react/prop-types */
import { Instances, useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { useStore } from 'Model/store';
import { useLayoutEffect } from 'react';
import { TextureLoader } from 'three';
import shallow from 'zustand/shallow';
import SatelliteGLB from '../Assets/Mesh/lowpolysat.glb';
import Beam from './Beam';
import Satellite from './Satellite';
import gradientTexture from '../Assets/Textures/twoTone.jpg';

function Satellites() {
  const obj = useGLTF(SatelliteGLB);
  useLayoutEffect(() => {
    obj.nodes.Satellite.geometry.rotateY((3 * Math.PI) / 2);
  }, [obj]);

  const {
    customers, spacePowers, beams,
  } = useStore(
    (state) => ({
      customers: state.mission.satellites.customers,
      spacePowers: state.mission.satellites.spacePowers,
      beams: state.mission.beams,
    }),
    shallow,
  );
  const gradientMap = useLoader(TextureLoader, gradientTexture);

  return (
    <>
      <Instances
        geometry={obj.nodes.Satellite.geometry}
      >
        <meshToonMaterial
          gradientMap={gradientMap}
        />
        {spacePowers.map((satellite) => (
          <Satellite
            satellite={satellite}
            key={satellite.id}
          />
        ))}
        {customers.map((satellite) => (
          <Satellite
            satellite={satellite}
            key={satellite.id}
          />
        ))}
      </Instances>
      {beams.map((beam) => (
        <Beam
          beam={beam}
          key={beam.id}
          customer={customers.find((customer) => customer.id === beam.customerId)}
          spacePower={spacePowers.find((spacePower) => spacePower.id === beam.spacePowerId)}
        />
      ))}
    </>
  );
}

export default Satellites;
