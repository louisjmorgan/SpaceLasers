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
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as satellite from 'satellite.js/lib/index';
import * as THREE from 'three';

import Earth from './Components/Earth';
import Satellites from './Components/Satellites';

const defaultStationOptions = {
  orbitMinutes: 1200,
  satelliteSize: 50,
};

const App = ({ title }) => {
  // const [satellites, setSatellites] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [satellites, setSatellites] = useState([]);
  const [customers, setCustomers] = useState([]);
  const newDate = new Date();
  const currentDate = newDate.valueOf();
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
    return { x: v.x / 6371, y: v.z / 6371, z: -v.y / 6371 };
  };

  function getPositionFromTLE(station, date, type = 1) {
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

  function getOrbitAtTime(station, initialDate, elapsedTime) {
    const temp = new Date(initialDate);
    temp.setSeconds(temp.getSeconds() + elapsedTime * 600);
    const date = temp;
    if (!station.satrec) {
      const { tle1, tle2 } = station;
      if (!tle1 || !tle2) return null;
      station.satrec = satellite.twoline2satrec(tle1, tle2);
    }

    const pos = getPositionFromTLE(station, date);
    return new THREE.Vector3(pos.x, pos.y, pos.z);
  }

  function addSatellites(sats) {
    setSatellites((data) => [...data, ...sats]);
  }

  function addCustomers(sats) {
    setCustomers((data) => [...data, sats]);
  }

  useEffect(() => {
    loadTLEs(
      getCorsFreeUrl(
        'http://www.celestrak.com/NORAD/elements/active.txt'
      ),
      defaultStationOptions
    )
      .then((results) => {
        addSatellites([results[69], results[1]]);
        addCustomers(results[1330]);
      })
      .then(setLoaded(() => true));
  }, []);

  return (
    <Wrapper className="app">
      <h1>{title}</h1>
      <Canvas className="canvas">
        <OrbitControls enableZoom={false} />
        <ambientLight color={0x333333} />
        <directionalLight
          color={0xffffff}
          intensity={1}
          position={[5, 3, 5]}
        />
        <Suspense fallback={null}>
          <Earth />
          <Satellites
            sats={satellites}
            customers={customers}
            initialDate={currentDate}
            getOrbitAtTime={getOrbitAtTime}
          />
        </Suspense>
      </Canvas>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background: #070b34;
  h1 {
    color: white;
    text-align: center;
  }

  canvas {
    height: 1200px;
  }
`;

App.propTypes = {
  title: PropTypes.string.isRequired,
};

export default App;
