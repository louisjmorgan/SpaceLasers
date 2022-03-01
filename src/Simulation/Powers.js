/* eslint-disable array-callback-return */
/* eslint-disable import/named */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import * as THREE from 'three';
import { Instances, useGLTF } from '@react-three/drei';
import SatelliteGLB from '../Assets/Mesh/satellite.glb';
import Power from './Power';

const PowerSats = ({
  powerSats,
  time,
  getOrbitAtTime,
  storeRef,
  uiMap,
  dispatchUI,
  sunRef,
}) => {
  const obj = useGLTF(SatelliteGLB);
  const satellites = [];
  powerSats.map((sat, index) => {
    satellites.push(
      <Power
        color="red"
        obj={obj}
        id={sat.name}
        storeRef={storeRef}
        time={time}
        dispatchUI={dispatchUI}
        key={sat.name}
        station={sat}
        sunRef={sunRef}
        getOrbitAtTime={getOrbitAtTime}
        showLabel={uiMap.get(sat.name).showLabel}
      />
    );
  });
  return (
    <>
      <Instances
        geometry={obj.nodes.Cubesat.geometry}
        material={obj.materials.Texture}
      >
        {satellites}
      </Instances>
    </>
  );
};

export default PowerSats;
