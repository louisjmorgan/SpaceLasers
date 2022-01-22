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

const Satellites = ({
  sats,
  customers,
  getOrbitAtTime,
  toggleLabel,
  setTime,
}) => {
  // const [satRefs, setSatRefs] = useState([]);
  // const [customerRefs, setCustomerRefs] = useState([]);
  const satRefs = new Map();
  const customerRefs = new Map();
  const beamRefs = new Map();
  // const beamRefs = new Array(sats.length * customers.length)
  //   .fill()
  //   .map(() => useRef());
  const context = useContext(Context);

  function initiateBeams() {
    const beams = [];
    sats.forEach((sat, satIndex) => {
      customers.forEach((customer, customerIndex) => {
        beams.push({
          satellite: sat.name,
          customer: customer.name,
        });
      });
    });
    return beams;
  }

  const beams = initiateBeams();

  function getDistance(sat1, sat2) {
    const a =
      (sat1.position.x - sat2.position.x) * context.earthRadius;
    const b =
      (sat1.position.y - sat2.position.y) * context.earthRadius;
    const c =
      (sat1.position.z - sat2.position.z) * context.earthRadius;

    return Math.sqrt(a * a + b * b + c * c);
  }

  function storeSatRef(key, ref) {
    // setSatRefs((refs) => [...refs, ref]);
    satRefs.set(key, ref);
  }

  function storeCustomerRef(key, ref) {
    // setCustomerRefs((refs) => [...refs, ref]);
    customerRefs.set(key, ref);
  }

  function storeBeamRef(key, ref) {
    beamRefs.set(key, ref);
  }

  useFrame(({ clock }) => {
    satRefs.forEach((satRef, satName) => {
      customerRefs.forEach((customerRef, customerName) => {
        const distance = getDistance(
          satRef.current,
          customerRef.current
        );
        const beam = `${satName}-${customerName}`;
        if (distance < 5000) {
          beamRefs
            .get(beam)
            .current.geometry.setFromPoints([
              satRef.current.position,
              customerRef.current.position,
            ]);
        } else {
          beamRefs.get(beam).current.geometry.setFromPoints([
            [0, 0, 0],
            [0, 0, 0],
          ]);
        }
      });
    });
  });
  return (
    <>
      {sats.map((sat, index) => {
        return (
          <Satellite
            color="yellow"
            storeRef={storeSatRef}
            key={sat.name}
            name={sat.name}
            station={sat}
            getOrbitAtTime={getOrbitAtTime}
            toggleLabel={toggleLabel}
          />
        );
      })}
      {customers.map((sat, index) => {
        return (
          <Satellite
            storeRef={storeCustomerRef}
            key={sat.name}
            name={sat.name}
            station={sat}
            getOrbitAtTime={getOrbitAtTime}
            toggleLabel={toggleLabel}
          />
        );
      })}
      {beams.map((beam, index) => {
        return (
          <Beam
            key={`${beam.satellite}-${beam.customer}`}
            name={`${beam.satellite}-${beam.customer}`}
            storeRef={storeBeamRef}
          />
        );
      })}
    </>
  );
};

export default Satellites;
