/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, {
  useRef,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useFrame } from '@react-three/fiber';
import { earthRadius } from 'satellite.js/lib/constants';

const Beam = ({ beam, activateBeam, deactivateBeam, storeRef }) => {
  const [beamRef, setBeamRef] = useState();
  const ref = useCallback((node) => {
    if (node !== null) {
      storeRef(`${beam.satellite}-${beam.customer}`, node);
      setBeamRef(node);
    }
  }, []);

  function getDistance(sat1, sat2) {
    const a = (sat1.position.x - sat2.position.x) * earthRadius;
    const b = (sat1.position.y - sat2.position.y) * earthRadius;
    const c = (sat1.position.z - sat2.position.z) * earthRadius;

    return Math.sqrt(a * a + b * b + c * c);
  }

  useFrame(() => {
    if (beamRef.geometry) {
      const distance = getDistance(beam.powerRef, beam.customerRef);
      if (distance < 5000) {
        beamRef.geometry.setFromPoints([
          beam.powerRef.position,
          beam.customerRef.position,
        ]);
        if (beam.active !== true) activateBeam(beam);
      } else {
        beamRef.geometry.setFromPoints([
          [0, 0, 0],
          [0, 0, 0],
        ]);
        if (beam.active === true) deactivateBeam(beam);
      }
    }
  });

  return (
    <line ref={ref}>
      <bufferGeometry attach="geometry" />
      <lineBasicMaterial
        attach="material"
        color="yellow"
        linewidth={1}
        linecap="round"
        linejoin="round"
      />
    </line>
  );
};

export default Beam;
