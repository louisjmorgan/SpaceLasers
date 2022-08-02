/* eslint-disable array-callback-return */
/* eslint-disable import/named */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import * as THREE from 'three';
import { Instances, useGLTF } from '@react-three/drei';
import Power from './Power';

const PowerSats = ({
  powerSats,
  time,
  getOrbitAtTime,
  storeRef,
  data,
  dispatch,
  obj,
}) => {
  const satellites = [];
  powerSats.map((sat, index) => {
    satellites.push(
      <Power
        color="red"
        obj={obj}
        id={sat.name}
        storeRef={storeRef}
        time={time}
        dispatch={dispatch}
        key={sat.name}
        station={sat}
        getOrbitAtTime={getOrbitAtTime}
        showLabel={data.get(sat.name).showLabel}
      />
    );
  });
  return (
    <>
      <Instances
        geometry={obj.nodes.Satellite.geometry}

        // material={obj.materials.Texture}
      >
        <meshToonMaterial color="yellow" />
        {satellites}
      </Instances>
    </>
  );
};

export default PowerSats;
