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
  animationSpeed,
}) => {
  const battery = {
    chargeCurrent: 6,
    dischargeCurrent: 4.5,
    capacity: 14,
  };
  return (
    <>
      {customers.map((sat, index) => {
        return (
          <Satellite
            storeRef={storeRef}
            key={sat.name}
            name={sat.name}
            station={sat}
            getOrbitAtTime={getOrbitAtTime}
            toggleLabel={toggleLabel}
            isEclipsed={isEclipsed}
            battery={battery}
            animationSpeed={animationSpeed}
          />
        );
      })}
    </>
  );
};

export default CustomerSats;
