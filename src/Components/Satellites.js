/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Suspense, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import Satellite from './Satellite';

const Satellites = ({
  sats,
  customers,
  initialDate,
  getOrbitAtTime,
}) => {
  const satRefs = sats.map(() => useRef());
  const customerRefs = customers.map(() => useRef());

  function initiateBeams() {
    const beams = [];
    sats.forEach((sat, index) => {
      customers.forEach((customer) => {
        beams.push({
          satellite: sat.name,
          customer: customer.name,
          ref: useRef(),
        });
      });
    });
    return beams;
  }

  const beams = initiateBeams();
  const beamRefs = beams.map(() => useRef());

  function getDistance(sat1, sat2) {
    const a = (sat1.position.x - sat2.position.x) * 6371;
    const b = (sat1.position.y - sat2.position.y) * 6371;
    const c = (sat1.position.z - sat2.position.z) * 6371;

    return Math.sqrt(a * a + b * b + c * c);
  }

  useFrame(({ clock }) => {
    satRefs.forEach((satRef, satIndex) => {
      customerRefs.forEach((customerRef, customerIndex) => {
        const distance = getDistance(
          satRef.current,
          customerRef.current
        );
        if (distance < 3000) {
          const beamIndex = (satIndex + 1) * (customerIndex + 1) - 1;
          beams[beamIndex].ref.current.geometry.setFromPoints([
            satRef.current.position,
            customerRef.current.position,
          ]);
        } else {
          const beamIndex = (satIndex + 1) * (customerIndex + 1) - 1;
          beams[beamIndex].ref.current.geometry.setFromPoints([
            [0, 0, 0],
            [0, 0, 0],
          ]);
        }
      });
    });
  });
  return (
    <>
      <Suspense fallback={null}>
        {sats.map((sat, index) => {
          return (
            <Satellite
              color="yellow"
              ref={satRefs[index]}
              key={sat.name}
              station={sat}
              initialDate={initialDate}
              getOrbitAtTime={getOrbitAtTime}
            />
          );
        })}
        {customers.map((sat, index) => {
          return (
            <Satellite
              ref={customerRefs[index]}
              key={sat.name}
              station={sat}
              initialDate={initialDate}
              getOrbitAtTime={getOrbitAtTime}
            />
          );
        })}
        {beams.map((beam, index) => {
          return (
            <line
              key={`${beam.satellite}-${beam.customer}`}
              ref={beam.ref}
            >
              <bufferGeometry attach="geometry" />
              <lineBasicMaterial
                attach="material"
                color="yellow"
                linewidth={100}
                linecap="round"
                linejoin="round"
              />
            </line>
          );
        })}
      </Suspense>
    </>
  );
};

export default Satellites;
