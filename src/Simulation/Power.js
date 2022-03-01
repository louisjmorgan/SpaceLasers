/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html, Instance, useFBX } from '@react-three/drei';

const Power = ({
  station,
  time,
  dispatchUI,
  getOrbitAtTime,
  storeRef,
  showLabel,
  sunRef,
  obj,
}) => {
  const [satRef, setSatRef] = useState();
  console.log(obj);
  // Create ref for satellite and store with parent component
  const ref = useCallback((node) => {
    if (node !== null) {
      storeRef(station.name, node);
      setSatRef(node);
    }
  }, []);

  // Animate satellite position

  useFrame(({ clock }, delta) => {
    // update satellite position
    const position = getOrbitAtTime(station, time.current);
    const lookAt = sunRef.getWorldPosition(new THREE.Vector3());
    // const lookAt = new THREE.Vector3().fromArray([0, 0, 0]);
    satRef.lookAt(lookAt);
    satRef.position.x = position.x;
    satRef.position.y = position.y;
    satRef.position.z = position.z;
  });
  return (
    <Instance
      ref={ref}
      scale={0.0005}
      up={[0, 0, 0]}
      onClick={() => {
        dispatchUI({
          type: 'toggle label',
          name: station.name,
        });
      }}
    >
      {showLabel ? (
        <Html>
          <h1
            style={{
              fontFamily: 'sans-serif',
              color: 'white',
              fontSize: '1rem',
            }}
          >
            {station.name}
            {/* {' Charge: '}
            {`${(chargeState.current * 100).toFixed(1)}%`} */}
          </h1>
        </Html>
      ) : (
        ' '
      )}
    </Instance>
  );
};

export default Power;
