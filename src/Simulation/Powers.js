/* eslint-disable import/named */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import * as THREE from 'three';
import { Instances } from '@react-three/drei';
import Power from './Power';

const PowerSats = ({
  powerSats,
  time,
  getOrbitAtTime,
  storeRef,
  uiMap,
  dispatchUI,
}) => {
  const satellites = powerSats.map((sat, index) => {
    return (
      <Power
        color="red"
        id={sat.name}
        storeRef={storeRef}
        time={time}
        dispatchUI={dispatchUI}
        key={sat.name}
        station={sat}
        getOrbitAtTime={getOrbitAtTime}
        showLabel={uiMap.get(sat.name).showLabel}
      />
    );
  });
  return (
    <Instances>
      <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
      <meshPhongMaterial
        attach="material"
        color="yellow"
        flatShading={false}
        side={THREE.DoubleSide}
      />
      {satellites}
    </Instances>
  );
};

export default PowerSats;
