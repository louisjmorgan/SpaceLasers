/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  Suspense,
  createContext,
  useContext,
} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as satellite from 'satellite.js/lib/index';
import * as THREE from 'three';

import { earthRadius, tumin } from 'satellite.js/lib/constants';
import GlobalStyles from './GlobalStyles';
import Earth from './Components/Earth';
import Satellites from './Components/Satellites';
import UI from './Components/UI';
import Controls from './Components/Controls';
import Time from './Components/Time';
import Sun from './Components/Sun';

const defaultStationOptions = {
  orbitMinutes: 1200,
  satelliteSize: 50,
  showLabel: false,
};

const Context = createContext({
  earthRadius,
  animationSpeed: 86400,
});

const App = ({ title }) => {
  const [allStations, setAllStations] = useState([]);
  const [powerSats, setPowerSats] = useState([]);
  const [customers, setCustomers] = useState([]);
  const newDate = new Date();
  const currentDate = newDate.valueOf();
  const [simTime, setSimTime] = useState({ current: currentDate });
  const [time, setTime] = useState({
    current: new Date(currentDate),
  });
  const [animationSpeed, setSpeed] = useState(600);
  const earthRef = useRef();
  const context = useContext(Context);
  function getCorsFreeUrl(url) {
    return `https://api.allorigins.win/raw?url=${url}`;
  }
  function parseTLEs(fileContent, stationOptions) {
    const result = [];
    const lines = fileContent.split('\n');
    let current = null;
    for (let i = 0; i < lines.length; ++i) {
      const line = lines[i].trim();

      if (line.length === 0) continue;

      if (line[0] === '1') {
        current.tle1 = line;
      } else if (line[0] === '2') {
        current.tle2 = line;
      } else {
        current = {
          name: line,
          ...stationOptions,
        };
        result.push(current);
      }
    }

    return result;
  }

  function loadTLEs(url, stationOptions) {
    return fetch(url).then((res) => {
      if (res.ok) {
        return res.text().then((text) => {
          const stations = parseTLEs(text, stationOptions);
          console.log(stations);
          return stations;
        });
      }
    });
  }

  const toThree = (v) => {
    return {
      x: v.x / earthRadius,
      y: v.z / earthRadius,
      z: -v.y / earthRadius,
    };
  };

  function getPositionFromTLE(station, date, type = 2) {
    if (!station || !date) return null;

    if (!station.satrec) {
      const { tle1, tle2 } = station;
      if (!tle1 || !tle2) return null;
      station.satrec = satellite.twoline2satrec(tle1, tle2);
    }

    const positionVelocity = satellite.propagate(
      station.satrec,
      date
    );

    const positionEci = positionVelocity.position;
    if (type === 2) return toThree(positionEci);

    const gmst = satellite.gstime(date);

    if (!positionEci) return null; // Ignore

    const positionEcf = satellite.eciToEcf(positionEci, gmst);
    return toThree(positionEcf);
  }

  function getOrbitAtTime(station) {
    const date = simTime;
    if (!station.satrec) {
      const { tle1, tle2 } = station;
      if (!tle1 || !tle2) return null;
      station.satrec = satellite.twoline2satrec(tle1, tle2);
    }

    const pos = getPositionFromTLE(station, date);
    return new THREE.Vector3(pos.x, pos.y, pos.z);
  }

  function isSelectedCustomer(sat) {
    const index = customers.findIndex(
      (entry) => entry.name === sat.name
    );
    return index;
  }

  function isSelectedPower(sat) {
    const index = powerSats.findIndex(
      (entry) => entry.name === sat.name
    );
    return index;
  }

  function addPowerSat(sat) {
    if (isSelectedPower(sat) === -1 && isSelectedCustomer(sat) === -1)
      setPowerSats((sats) => [...sats, sat]);
  }

  function removePowerSat(sat) {
    const newPowerSats = powerSats.filter((s) => s !== sat);
    setPowerSats(() => [...newPowerSats]);
  }

  function removeAllPowerSats() {
    setPowerSats(() => []);
  }

  function addCustomerSat(sat) {
    if (isSelectedCustomer(sat) === -1 && isSelectedPower(sat) === -1)
      setCustomers((sats) => [...sats, sat]);
  }

  function removeCustomerSat(sat) {
    console.log('remove');
    const newCustomers = customers.filter((s) => s !== sat);
    setCustomers(() => [...newCustomers]);
  }

  function removeAllCustomerSats() {
    setCustomers(() => []);
  }

  function toggleLabel(sat) {
    const index = isSelectedPower(sat);
    if (index !== -1) {
      const newPowerSats = powerSats;
      newPowerSats[index].showLabel = !newPowerSats[index].showLabel;
      setPowerSats(() => [...newPowerSats]);
    } else {
      const index2 = isSelectedCustomer(sat);
      if (index2 !== -1) {
        const newCustomerSats = customers;
        newCustomerSats[index2].showLabel = !newCustomerSats[index2]
          .showLabel;
        setCustomers(() => [...newCustomerSats]);
      }
    }
  }

  function updateTime(date) {
    setSimTime(() => date);
  }

  function handleAnimationSpeed(e) {
    setSpeed(e.target.value);
  }
  useEffect(() => {
    loadTLEs(
      getCorsFreeUrl(
        'http://www.celestrak.com/NORAD/elements/active.txt'
      ),
      defaultStationOptions
    ).then((results) => {
      setAllStations(() => [...results]);
      addCustomerSat(results[56]);
      addCustomerSat(results[57]);
      addCustomerSat(results[58]);
      addCustomerSat(results[59]);
      addPowerSat(results[70]);
      addPowerSat(results[71]);
      addPowerSat(results[72]);
    });
  }, []);

  return (
    <Wrapper className="app">
      <GlobalStyles />
      <h1>{title}</h1>
      <Controls
        simTime={simTime}
        handleAnimationSpeed={handleAnimationSpeed}
      />
      <UI
        allStations={allStations}
        powerSats={powerSats}
        addPowerSat={addPowerSat}
        removePowerSat={removePowerSat}
        removeAllPowerSats={removeAllPowerSats}
        customerSats={customers}
        addCustomerSat={addCustomerSat}
        removeCustomerSat={removeCustomerSat}
        removeAllCustomerSats={removeAllCustomerSats}
        toggleLabel={toggleLabel}
        handleAnimationSpeed={handleAnimationSpeed}
      />
      <Context.Provider value={Context}>
        <Canvas className="canvas">
          <OrbitControls enableZoom={false} enablePan={false} />
          <ambientLight color={0x333333} />
          <Suspense
            fallback={
              <Html>
                <p style={{ color: 'white' }}>Loading...</p>
              </Html>
            }
          >
            <Time
              initialDate={currentDate}
              updateTime={updateTime}
              speed={animationSpeed}
            />
            <Sun simTime={simTime} initialDate={currentDate} />
            <Earth
              ref={earthRef}
              simTime={simTime}
              initialDate={currentDate}
            />

            <Satellites
              sats={powerSats}
              customers={customers}
              getOrbitAtTime={getOrbitAtTime}
              toggleLabel={toggleLabel}
            />
          </Suspense>
        </Canvas>
      </Context.Provider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background: #070b34;
  height: 1200px;
  width: 100vw;
  font-family: sans-serif;
  padding-top: 2.5rem;
  h1 {
    color: white;
    text-align: center;
    font-family: serif;
    font-weight: bold;
    font-size: 2rem;
  }

  canvas {
    height: 60rem;
  }
`;

App.propTypes = {
  title: PropTypes.string.isRequired,
};

export { App, Context };
