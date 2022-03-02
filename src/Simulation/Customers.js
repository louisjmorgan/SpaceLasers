/* eslint-disable react/no-children-prop */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
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
  useMemo,
} from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { Instances, useGLTF } from '@react-three/drei';
import Beam from './Beam';
import Customer from './Customer';

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
  obj,
}) => {
  function hasBeam(name) {
    return beams.reduce((total, beam) => {
      const isActive = beam.active && beam.customer === name;
      return total || isActive;
    }, false);
  }
  const satellites = [];
  customers.map((customer, index) => {
    return satellites.push(
      <Customer
        id={customer.name}
        obj={obj}
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
  const ref = useRef();
  return (
    <>
      <Instances geometry={obj.nodes.Satellite.geometry}>
        <meshToonMaterial color="red" />
        {satellites}
      </Instances>
    </>
  );
};

export default CustomerSats;
