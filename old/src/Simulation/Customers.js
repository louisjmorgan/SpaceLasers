/* eslint-disable react/no-children-prop */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { Instances, useGLTF } from '@react-three/drei';
import Customer from './Customer';

const CustomerSats = ({
  customers,
  getOrbitAtTime,
  time,
  sim,
  storeRef,
  data,
  dispatch,
  beams,
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
        storeRef={storeRef}
        time={time}
        sim={sim}
        dispatch={dispatch}
        key={customer.name}
        station={customer}
        getOrbitAtTime={getOrbitAtTime}
        showLabel={data.get(customer.name).showLabel}
        attachCamera={data.get(customer.name).attachCamera}
        hasBeam={hasBeam(customer.name)}
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
