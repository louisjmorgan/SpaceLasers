import React from 'react';
import PropTypes from 'prop-types';

import { Line } from '@react-three/drei';

export default function Orbit({ points }) {
  console.log(points);

  return (
    <Line points={points} />
    //   <bufferGeometry attach="geometry" ref={ref} />
    //   <lineBasicMaterial
    //     attach="material"
    //     color={0x0000ff}
    //     opacity={1.0}
    //   />
    // </line>
  );
}

Orbit.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      z: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};
