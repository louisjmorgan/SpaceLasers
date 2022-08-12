/* eslint-disable react/prop-types */
import { Instances, useGLTF } from '@react-three/drei';
import { useLayoutEffect } from 'react';
import SatelliteGLB from '../Assets/Mesh/lowpolysat.glb';
import Beam from './Beam';
import Satellite from './Satellite';

function Satellites({
  customers, spacePowers, beams, frame, viewRef,
}) {
  const satellites = [];
  const obj = useGLTF(SatelliteGLB);

  useLayoutEffect(() => {
    obj.nodes.Satellite.geometry.rotateY((3 * Math.PI) / 2);
  }, [obj]);

  satellites.push(customers.map((satellite) => (
    <Satellite
      satellite={satellite}
      color="red"
      frame={frame}
      handleClick={() => null}
      key={satellite.id}
      showLabel={false}
    />
  )));

  satellites.push(spacePowers.map((satellite) => (
    <Satellite
      satellite={satellite}
      color="yellow"
      frame={frame}
      handleClick={() => null}
      key={satellite.id}
      showLabel={false}
      viewRef={viewRef}
    />
  )));

  return (
    <>
      <Instances
        geometry={obj.nodes.Satellite.geometry}
      >
        <meshToonMaterial />
        {satellites}
      </Instances>
      {beams.map((beam) => (
        <Beam
          beam={beam}
          key={beam.name}
          customer={customers.find((customer) => customer.id === beam.customerId)}
          spacePower={spacePowers.find((spacePower) => spacePower.id === beam.spacePowerId)}
          frame={frame}
        />
      ))}
    </>
  );
}

export default Satellites;
