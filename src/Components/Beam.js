/* eslint-disable react/prop-types */
import React, { useRef } from 'react';

const Beam = ({ name, storeRef }) => {
  const ref = useRef();
  storeRef(name, ref);
  return (
    <line ref={ref}>
      <bufferGeometry attach="geometry" />
      <lineBasicMaterial
        attach="material"
        color="yellow"
        linewidth={1}
        linecap="round"
        linejoin="round"
      />
    </line>
  );
};

export default Beam;
