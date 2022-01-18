/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
import React, { useEffect, useState, useRef, Suspense } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as satellite from 'satellite.js/lib/index';
import * as THREE from 'three';

import Earth from './Components/Earth';
import Satellite from './Components/Satellite';
import Orbit from './Components/Orbit';

const defaultStationOptions = {
  orbitMinutes: 1200,
  satelliteSize: 50,
};

const TargetDate = new Date();

const App = ({ title }) => {
  const [satellites, setSatellites] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

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

  function loadTLEs(url, color, stationOptions) {
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
    date = date || TargetDate;
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

  function getOrbitPoints(station) {
    if (!station.satrec) {
      const { tle1, tle2 } = station;
      if (!tle1 || !tle2) return null;
      station.satrec = satellite.twoline2satrec(tle1, tle2);
    }

    const ixpdotp = 1440 / (2.0 * 3.141592654);
    const revsPerDay = station.satrec.no * ixpdotp;
    const intervalMinutes = 1;
    const minutes = station.orbitMinutes || 1440 / revsPerDay;
    const initialDate = new Date();

    const points = [];

    for (let i = 0; i <= minutes; i += intervalMinutes) {
      const date = new Date(initialDate.getTime() + i * 60000);

      const pos = getPositionFromTLE(station, date);
      if (!pos) continue;

      points.push(new THREE.Vector3(pos.x, pos.y, pos.z));
    }
    return points;
  }

  useEffect(() => {
    loadTLEs(
      getCorsFreeUrl(
        'http://www.celestrak.com/NORAD/elements/active.txt'
      ),
      0xffffff,
      defaultStationOptions
    ).then((results) => {
      setSatellites((data) => [...data, results[0]]);
      console.log(getOrbitPoints(results[0]));
      setLoaded(() => true);
    });
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
          {isLoaded ? (
            <Suspense fallback={null}>
              <Satellite
                position={getPositionFromTLE(satellites[0])}
              />
              <Orbit points={getOrbitPoints(satellites[0])} />
            </Suspense>
          ) : (
            ''
          )}
        </Suspense>
      </Canvas>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background: #070b34;
  color: white;

  canvas {
    height: 1200px;
  }
`;

App.propTypes = {
  title: PropTypes.string.isRequired,
};

export default App;
