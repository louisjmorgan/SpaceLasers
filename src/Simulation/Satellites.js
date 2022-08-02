/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import SatelliteGLB from '../Assets/Mesh/lowpolysat.glb';
import PowerSats from './Powers';
import CustomerSats from './Customers';
import Beam from './Beam';
import { getOrbitAtTime } from '../Utils/TLE';

const Satellites = ({
  time,
  powerSats,
  customers,
  data,
  sim,
  dispatch,
}) => {
  const obj = useGLTF(SatelliteGLB);

  useEffect(() => {
    obj.nodes.Satellite.geometry.rotateY((3 * Math.PI) / 2);
  }, [obj]);

  // Callbacks to store refs from child components
  function storeCustomerRef(key, ref) {
    dispatch({
      target: 'sim',
      type: 'add customer',
      name: key,
      ref,
    });
  }

  function storePowerRef(key, ref) {
    dispatch({
      target: 'sim',
      type: 'add power',
      name: key,
      ref,
    });
  }

  function storeBeamRef(key, ref) {
    dispatch({
      target: 'sim',
      type: 'add beam',
      name: key,
      ref,
    });
  }

  // Initialize beams for each power-customer pair

  function initializeBeams() {
    const beams = [];
    powerSats.forEach((sat) => {
      customers.forEach((customer) => {
        beams.push({
          satellite: sat.name,
          powerRef: sim.powerRefs.get(sat.name),
          customer: customer.name,
          customerRef: sim.customerRefs.get(customer.name),
          // active: false,
        });
      });
    });
    return beams;
  }

  const beams = useRef([]);

  useEffect(() => {
    let initBeams = [];
    if (powerSats.length > 0 && customers.length > 0) {
      initBeams = initializeBeams();
    }
    beams.current = initBeams;
  }, [powerSats, customers]);

  function activateBeam(beam) {
    const index = beams.current.findIndex(
      (entry) => entry.customer === beam.customer
    );
    if (index !== -1) {
      beams.current[index].active = true;
    }
  }

  function deactivateBeam(beam) {
    const index = beams.current.findIndex(
      (entry) => entry.customer === beam.customer
    );
    if (index !== -1) {
      beams.current[index].active = false;
    }
  }

  return (
    <>
      <CustomerSats
        customers={customers}
        time={time}
        dispatch={dispatch}
        sim={sim}
        data={data}
        storeRef={storeCustomerRef}
        getOrbitAtTime={getOrbitAtTime}
        beams={beams.current}
        obj={obj}
      />
      <PowerSats
        powerSats={powerSats}
        customers={customers}
        time={time}
        dispatch={dispatch}
        data={data}
        storeRef={storePowerRef}
        getOrbitAtTime={getOrbitAtTime}
        obj={obj}
      />
      {beams.current.map((beam) => {
        return (
          <Beam
            key={`${beam.satellite}-${beam.customer}`}
            beam={beam}
            storeRef={storeBeamRef}
            activateBeam={activateBeam}
            deactivateBeam={deactivateBeam}
          />
        );
      })}
    </>
  );
};

export default Satellites;
