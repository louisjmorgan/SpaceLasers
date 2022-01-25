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
import { useFrame } from '@react-three/fiber';
import { Select } from '@react-three/drei';
import Satellite from './Satellite';
import Beam from './Beam';
import { Context } from '../App';

const CustomerSats = ({
  customers,
  getOrbitAtTime,
  storeRef,
  toggleLabel,
  isEclipsed,
  beams,
  animationSpeed,
}) => {
  const battery = {
    chargeCurrent: 4.5,
    dischargeCurrent: 6,
    capacity: 14,
  };

  function hasBeam(name) {
    return beams.reduce((total, beam) => {
      const isActive = beam.active && beam.customer === name;
      return total || isActive;
    }, false);
  }

  return (
    <>
      {customers.map((customer, index) => {
        return (
          <Satellite
            storeRef={storeRef}
            key={customer.name}
            station={customer}
            getOrbitAtTime={getOrbitAtTime}
            toggleLabel={toggleLabel}
            isEclipsed={isEclipsed}
            battery={battery}
            hasBeam={hasBeam(customer.name)}
            animationSpeed={animationSpeed}
          />
        );
      })}
    </>
  );
};

export default CustomerSats;
