/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React, { useContext, useEffect, useState, memo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import SatelliteGLB from '../Assets/Mesh/lowpolysat.glb';
import PowerSats from './Powers';
import CustomerSats from './Customers';
import Beam from './Beam';
import { getOrbitAtTime } from '../Model/SatReducer';

const Satellites = ({
  time,
  powerSats,
  customers,
  uiMap,
  refs,
  sunRef,
  dispatch,
  dispatchUI,
  dispatchRef,
  isEclipsed,
  animationSpeed,
}) => {
  const obj = useGLTF(SatelliteGLB);

  useEffect(() => {
    obj.nodes.Satellite.geometry.rotateY((3 * Math.PI) / 2);
    // obj.nodes.Satellite.up.set(0, 0, -1);
    // obj.nodes.Satellite.geometry.rotateX(Math.PI / 2);
  }, [obj]);

  // Callbacks to store refs from child components
  function storeCustomerRef(key, ref) {
    dispatchRef({
      type: 'add customer',
      name: key,
      ref,
    });
  }

  function storePowerRef(key, ref) {
    dispatchRef({
      type: 'add power',
      name: key,
      ref,
    });
  }

  function storeBeamRef(key, ref) {
    dispatchRef({
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
    const newBeams = [...beams];
    const index = beams.findIndex(
      (entry) => entry.customer === beam.customer
    );
    if (index !== -1) {
      newBeams[index].active = true;
      setBeams(() => newBeams);
    }
  }

  function deactivateBeam(beam) {
    const newBeams = [...beams];
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
        time={time}
        storeRef={storeCustomerRef}
        getOrbitAtTime={getOrbitAtTime}
        uiMap={uiMap}
        dispatch={dispatch}
        dispatchUI={dispatchUI}
        isEclipsed={isEclipsed}
        beams={beams}
        animationSpeed={animationSpeed}
        obj={obj}
      />
      <PowerSats
        dispatch={dispatch}
        dispatchUI={dispatchUI}
        powerSats={powerSats}
        time={time}
        uiMap={uiMap}
        customers={customers}
        storeRef={storePowerRef}
        getOrbitAtTime={getOrbitAtTime}
        sunRef={sunRef}
        isEclipsed={isEclipsed}
        obj={obj}
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

export default memo(Satellites);
