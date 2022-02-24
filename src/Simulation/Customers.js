/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  useContext,
  forwardRef,
} from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Instances } from '@react-three/drei';
import Customer from './Customer';
import Beam from './Beam';

const CustomerSats = ({
  customers,
  getOrbitAtTime,
  time,
  storeRef,
  uiMap,
  dispatch,
  dispatchUI,
  isEclipsed,
  beams,
  animationSpeed,
}) => {
  function hasBeam(name) {
    return beams.reduce((total, beam) => {
      const isActive = beam.active && beam.customer === name;
      return total || isActive;
    }, false);
  }
  const satellites = customers.map((customer, index) => {
    return (
      <Customer
        id={customer.name}
        storeRef={storeRef}
        time={time}
        dispatch={dispatch}
        dispatchUI={dispatchUI}
        key={customer.name}
        station={customer}
        getOrbitAtTime={getOrbitAtTime}
        showLabel={uiMap.get(customer.name).showLabel}
        attachCamera={uiMap.get(customer.name).attachCamera}
        isEclipsed={isEclipsed}
        hasBeam={hasBeam(customer.name)}
        animationSpeed={animationSpeed}
      />
    );
  });
  return (
    <>
      <Instances>
        <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
        <meshPhongMaterial
          attach="material"
          color="red"
          flatShading={false}
          side={THREE.DoubleSide}
        />
        {satellites}
      </Instances>
    </>
  );
};

export default CustomerSats;
