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
import { Html, Instance } from '@react-three/drei';

const Power = ({
  station,
  time,
  dispatchUI,
  getOrbitAtTime,
  storeRef,
  showLabel,
}) => {
  const [satRef, setSatRef] = useState();

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
    satRef.position.x = position.x;
    satRef.position.y = position.y;
    satRef.position.z = position.z;
  });

  return (
    <Instance
      ref={ref}
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
