/* eslint-disable react/prop-types */
import { Instances, useGLTF } from '@react-three/drei';
import { useLayoutEffect } from 'react';
import SatelliteGLB from '../Assets/Mesh/lowpolysat.glb';
import Beam from './Beam';
import Satellite from './Satellite';

function Satellites({
  customers, spacePowers, beams, frame, viewRef, ui, handleLabel,
}) {
  const obj = useGLTF(SatelliteGLB);

  useLayoutEffect(() => {
    obj.nodes.Satellite.geometry.rotateY((3 * Math.PI) / 2);
  }, [obj]);
  return (
    <>
      <Instances
        geometry={obj.nodes.Satellite.geometry}
      >
        <meshToonMaterial />
        {spacePowers.map((satellite) => (
          <Satellite
            satellite={satellite}
            color={ui.get(satellite.id).color}
            frame={frame}
            key={satellite.id}
            viewRef={viewRef}
            showLabel={ui.get(satellite.id).showLabel}
            handleLabel={handleLabel}
          />
        ))}
        {customers.map((satellite) => (
          <Satellite
            satellite={satellite}
            color={ui.get(satellite.id).color}
            frame={frame}
            key={satellite.id}
            showLabel={ui.get(satellite.id).showLabel}
            handleLabel={handleLabel}
          />
        ))}
      </Instances>
      {beams.map((beam) => (
        <Beam
          beam={beam}
          key={`${beam.customerId}-${beam.spacePowerId}`}
          customer={customers.find((customer) => customer.id === beam.customerId)}
          spacePower={spacePowers.find((spacePower) => spacePower.id === beam.spacePowerId)}
          frame={frame}
        />
      ))}
    </>
  );
}

export default Satellites;
