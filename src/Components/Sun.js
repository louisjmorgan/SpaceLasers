/* eslint-disable import/no-cycle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useFrame } from '@react-three/fiber';
import React, { useContext, useRef } from 'react';
import { Context } from '../App';

const Sun = ({ initialDate }) => {
  const context = useContext(Context);
  const ref = useRef();
  function getJD(date) {
    return date.getTime() / 86400000 + 2440587 - 2451545;
  }
  function getNumberOfDays(date) {
    const dayCount = [
      0,
      31,
      59,
      90,
      120,
      151,
      181,
      212,
      243,
      273,
      304,
      334,
    ];
    const mn = date.getMonth();
    const dn = date.getDate();
    const dayOfYear = dayCount[mn] + dn;
    let sinceSolstice = dayOfYear - 9;
    if (dayOfYear > 354) sinceSolstice = dayOfYear - 354;
    // if (mn > 1 && this.isLeapYear()) dayOfYear++;
    return sinceSolstice;
  }
  function getSunAngle(date) {
    const maxTilt = -0.40910518;
    const days = getNumberOfDays(date);
    console.log(date);
    const angle = maxTilt * Math.cos((6.28319 / 365) * (days + 10));
    return angle;
  }

  function getSunPosition(date) {
    const angle = getSunAngle(date);
    console.log(angle);
    const y = Math.sin(angle) * (149597870.7 / context.earthRadius);
    const x = Math.cos(angle) * (149597870.7 / context.earthRadius);
    const z = 0;
    return { x, y, z };
  }

  useFrame(({ clock }) => {
    const temp = new Date(initialDate);
    temp.setSeconds(
      temp.getSeconds() +
        clock.getElapsedTime() * context.animationSpeed
    );
    const date = temp;
    const position = getSunPosition(date);
    ref.current.position.x = position.x;
    ref.current.position.y = position.y;
    ref.current.position.z = position.z;
  });
  return (
    <directionalLight
      ref={ref}
      color={0xffffff}
      intensity={1}
      position={[getSunPosition(new Date(initialDate)), 0, 0]}
    />
  );
};

export default Sun;
