/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useRef, useMemo } from 'react';
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
  // const beamComponents = useMemo(() => {
  //   return beams.current.map((beam) => {
  //     return (
  //       <Beam
  //         key={`${beam.satellite}-${beam.customer}`}
  //         beam={beam}
  //         activateBeam={activateBeam}
  //         deactivateBeam={deactivateBeam}
  //         storeRef={storeBeamRef}
  //       />
  //     );
  //   });
  // }, [beams]);

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
        beams={beams.current}
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
