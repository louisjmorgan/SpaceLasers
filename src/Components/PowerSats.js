/* eslint-disable import/named */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import Satellite from './Satellite';

const PowerSats = ({
  powerSats,
  getOrbitAtTime,
  storeRef,
  toggleLabel,
  isEclipsed,
}) => {
  return (
    <>
      {powerSats.map((sat, index) => {
        return (
          <Satellite
            color="yellow"
            storeRef={storeRef}
            key={sat.name}
            name={sat.name}
            station={sat}
            getOrbitAtTime={getOrbitAtTime}
            toggleLabel={toggleLabel}
            isEclipsed={isEclipsed}
            battery={null}
          />
        );
      })}
    </>
  );
};

export default PowerSats;
