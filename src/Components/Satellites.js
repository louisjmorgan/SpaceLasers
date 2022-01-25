/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
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
  // Callbacks to store refs from child components
  const [refs, setRefs] = useState({
    customerRefs: new Map(),
    powerRefs: new Map(),
    beamRefs: new Map(),
  });

  function storeCustomerRef(key, ref) {
    const newRefs = refs;
    newRefs.customerRefs.set(key, ref);
    setRefs(() => newRefs);
  }

  function storePowerRef(key, ref) {
    const newRefs = refs;
    newRefs.powerRefs.set(key, ref);
    setRefs(() => newRefs);
  }

  function storeBeamRef(key, ref) {
    const newRefs = refs;
    newRefs.beamRefs.set(key, ref);
    setRefs(() => newRefs);
    console.log(newRefs);
  }

  // Initialize beams for each power-customer pair

  function initializeBeams() {
    const beams = [];
    powerSats.forEach((sat) => {
      customers.forEach((customer) => {
        beams.push({
          satellite: sat.name,
          powerRef: refs.powerRefs.get(sat.name),
          customer: customer.name,
          customerRef: refs.customerRefs.get(customer.name),
          active: false,
        });
      });
    });

    return beams;
  }
  const [beams, setBeams] = useState([]);

  useEffect(() => {
    let initBeams = [];
    if (powerSats.length > 0 && customers.length > 0) {
      initBeams = initializeBeams();
    }
    setBeams(() => initBeams);
  }, [powerSats, customers]);

  function activateBeam(beam) {
    const newBeams = beams;
    const index = beams.findIndex(
      (entry) => entry.customer === beam.customer
    );
    if (index !== -1) {
      newBeams[index].active = true;
      setBeams(() => newBeams);
    }
  }

  function deactivateBeam(beam) {
    const newBeams = beams;
    const index = beams.findIndex(
      (entry) => entry.customer === beam.customer
    );
    if (index !== -1) {
      newBeams[index].active = false;
      setBeams(() => newBeams);
    }
  }

  return (
    <>
      <CustomerSats
        customers={customers}
        storeRef={storeCustomerRef}
        getOrbitAtTime={getOrbitAtTime}
        toggleLabel={toggleLabel}
        isEclipsed={isEclipsed}
        beams={beams}
        animationSpeed={animationSpeed}
      />
      <PowerSats
        powerSats={powerSats}
        customers={customers}
        storeRef={storePowerRef}
        getOrbitAtTime={getOrbitAtTime}
        toggleLabel={toggleLabel}
        isEclipsed={isEclipsed}
      />
      {beams.map((beam) => {
        return (
          <Beam
            key={`${beam.satellite}-${beam.customer}`}
            beam={beam}
            activateBeam={activateBeam}
            deactivateBeam={deactivateBeam}
            storeRef={storeBeamRef}
          />
        );
      })}
    </>
  );
};

export default Satellites;
