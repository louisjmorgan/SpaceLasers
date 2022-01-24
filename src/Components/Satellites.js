/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import PowerSats from './PowerSats';
import CustomerSats from './CustomerSats';
import Beam from './Beam';
import { Context } from '../App';

const Satellites = ({
  powerSats,
  customers,
  getOrbitAtTime,
  toggleLabel,
  isEclipsed,
  animationSpeed,
}) => {
  const context = useContext(Context);

  // Callbacks to store refs from child components
  const customerRefs = new Map();
  function storeCustomerRef(key, ref) {
    customerRefs.set(key, ref);
  }

  const powerRefs = new Map();
  function storePowerRef(key, ref) {
    powerRefs.set(key, ref);
  }

  const beamRefs = new Map();
  function storeBeamRef(key, ref) {
    beamRefs.set(key, ref);
  }

  // Initialize beams for each power-customer pair

  function initializeBeams() {
    const beams = [];
    powerSats.forEach((sat) => {
      customers.forEach((customer) => {
        beams.push({
          satellite: sat.name,
          customer: customer.name,
        });
      });
    });
    return beams;
  }

  const beams = initializeBeams();

  // Check distance to determine if beam should be rendered

  function getDistance(sat1, sat2) {
    const a =
      (sat1.position.x - sat2.position.x) * context.earthRadius;
    const b =
      (sat1.position.y - sat2.position.y) * context.earthRadius;
    const c =
      (sat1.position.z - sat2.position.z) * context.earthRadius;

    return Math.sqrt(a * a + b * b + c * c);
  }

  // Animate beams

  useFrame(() => {
    powerRefs.forEach((satRef, satName) => {
      customerRefs.forEach((customerRef, customerName) => {
        const distance = getDistance(
          satRef.current,
          customerRef.current
        );
        const beam = `${satName}-${customerName}`;
        if (distance < 5000) {
          beamRefs
            .get(beam)
            .current.geometry.setFromPoints([
              satRef.current.position,
              customerRef.current.position,
            ]);
        } else {
          beamRefs.get(beam).current.geometry.setFromPoints([
            [0, 0, 0],
            [0, 0, 0],
          ]);
        }
      });
    });
  });

  return (
    <>
      <CustomerSats
        customers={customers}
        storeRef={storeCustomerRef}
        getOrbitAtTime={getOrbitAtTime}
        toggleLabel={toggleLabel}
        isEclipsed={isEclipsed}
        animationSpeed={animationSpeed}
      />
      <PowerSats
        powerSats={powerSats}
        customers={customers}
        storePowerRef={storePowerRef}
        powerRefs={powerRefs}
        customerRefs={customerRefs}
        getOrbitAtTime={getOrbitAtTime}
        toggleLabel={toggleLabel}
        isEclipsed={isEclipsed}
      />
      {beams.map((beam) => {
        return (
          <Beam
            key={`${beam.satellite}-${beam.customer}`}
            name={`${beam.satellite}-${beam.customer}`}
            storeRef={storeBeamRef}
          />
        );
      })}
    </>
  );
};

export default Satellites;
