/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as satellite from 'satellite.js/lib/index';
import { Context } from '../App';

const Time = ({ initialDate }) => {
  const [time, setTime] = useState({
    current: new Date(initialDate),
  });
  const context = useContext(Context);
  useFrame(({ clock }) => {
    const temp = new Date(initialDate);
    temp.setSeconds(
      temp.getSeconds() +
        clock.getElapsedTime() * context.animationSpeed
    );
    const date = temp;
    setTime(date);
  });

  return (
    <Html position={[0, 3, 0]}>
      <p
        style={{
          fontFamily: 'sans-serif',
          color: 'white',
          fontSize: '1rem',
          width: '20rem',
        }}
      >
        {`${time}`}
      </p>
    </Html>
  );
};

export default Time;
