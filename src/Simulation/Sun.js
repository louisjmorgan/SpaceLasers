/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useFrame } from '@react-three/fiber';
import React, { useContext, forwardRef } from 'react';
import { Context } from '../App';

const Sun = forwardRef(({ time, initialDate }, ref) => {
  const context = useContext(Context);

  function getSunPosition(date) {
    const N = date.getTime() / 86400000 + 2440587 - 2451545;
    let L = 4.89495042 + 0.0172027923937 * N;
    if (L > 2 * Math.PI) L -= 2 * Math.PI;
    let g = 6.240040768 + 0.0172019703436 * N;
    if (g > 2 * Math.PI) g -= 2 * Math.PI;
    const longitude =
      L + 0.033423055 * Math.sin(g) + 0.0003490659 * Math.sin(g);
    const distance =
      1.00014 - 0.01671 * Math.cos(g) - 0.00014 * Math.cos(2 * g);
    const obliquity = 0.40907027 - 6.981317008e-9 * N;
    const y =
      (distance * Math.sin(obliquity) * Math.sin(longitude)) /
      context.earthRadius;
    const x = (distance * Math.cos(longitude)) / context.earthRadius;
    const z =
      -(distance * Math.cos(obliquity) * Math.sin(longitude)) /
      context.earthRadius;
    return { x, y, z };
  }

  useFrame(({ clock }) => {
    const date = time;
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
});

export default Sun;
