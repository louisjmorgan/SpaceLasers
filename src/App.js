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
/* eslint-disable react/jsx-no-bind */
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  Suspense,
  createContext,
  useContext,
  useReducer,
} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Html,
  useContextBridge,
} from '@react-three/drei';
import * as satelliteUtils from 'satellite.js/lib/index';
import * as THREE from 'three';
import { earthRadius } from 'satellite.js/lib/constants';
import { initializeState, satReducer } from './Model/SatReducer';
import GlobalStyles from './GlobalStyles';
import Earth from './Simulation/Earth';
import Satellites from './Simulation/Satellites';
import UI from './UI/UI';
import Controls from './UI/Controls';
import Time from './Simulation/Time';
import Sun from './Simulation/Sun';

const defaultStationOptions = {
  orbitMinutes: 1200,
  satelliteSize: 6,
  showLabel: false,
};

const Context = createContext({
  earthRadius,
});

const App = ({ title }) => {
  const [state, dispatch] = useReducer(satReducer, {
    orbits: null,
    simulation: {
      time: null,
      speed: null,
    },
    customers: null,
    powers: null,
    ui: null,
  });

  // Initialize context (global constants)
  const context = useContext(Context);
  const ContextBridge = useContextBridge(Context);

  // Create references for sun and earth 3d models
  const earthRef = useRef();
  const sunRef = useRef();

  // Battery simulation functions

  function isEclipsed(satRef) {
    const sunPosition = sunRef.current.position;
    const earthPosition = earthRef.current.position;
    const satPosition = satRef.position;

    const sunEarth = new THREE.Vector3();
    sunEarth.subVectors(earthPosition, sunPosition);

    const sunSat = new THREE.Vector3();
    sunSat.subVectors(satPosition, earthPosition);

    const angle = sunEarth.angleTo(sunSat);

    const sunEarthDistance = sunPosition.distanceTo(earthPosition);
    const sunSatDistance = sunPosition.distanceTo(satPosition);

    const limbAngle = Math.atan2(
      context.earthRadius,
      sunEarthDistance
    );

    if (angle > limbAngle || sunSatDistance < sunEarthDistance) {
      return false;
    }

    return true;
  }

  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    initializeState().then((initialState) => {
      console.log(initialState);
      dispatch({
        type: 'initialize',
        initialState,
      });
      setLoaded(() => true);
    });
  }, []);

  // Load TLEs into memory and initialize default sats

  // useEffect(() => {
  //   loadTLEs(
  //     getCorsFreeUrl(
  //       'http://www.celestrak.com/NORAD/elements/active.txt'
  //     ),
  //     defaultStationOptions
  //   ).then((results) => {
  //     setAllStations(() => [...results]);
  //     addCustomerSat(results[65]);
  //     addCustomerSat(results[58]);
  //     addCustomerSat(results[71]);
  //     addPowerSat(results[69]);
  //     addPowerSat(results[70]);
  //     addPowerSat(results[61]);
  //     console.log('loaded TLEs');
  //   });
  // }, []);

  return isLoaded ? (
    <Wrapper className="app">
      <GlobalStyles />
      <h1>{title}</h1>

      <Controls
        time={state.simulation.time.current}
        dispatch={dispatch}
      />

      <UI
        dispatch={dispatch}
        allStations={state.orbits}
        powerSats={state.powers}
        customerSats={state.customers}
        uiMap={state.ui}
      />
      <Canvas className="canvas" mode="concurrent">
        <ContextBridge>
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
              dispatch={dispatch}
              time={state.simulation.time}
              speed={state.simulation.speed}
            />
            <Sun time={state.simulation.time.current} ref={sunRef} />
            <Earth
              ref={earthRef}
              time={state.simulation.time.current}
            />
            <Satellites
              time={state.simulation.time}
              powerSats={state.powers}
              customers={state.customers}
              dispatch={dispatch}
              uiMap={state.ui}
              isEclipsed={isEclipsed}
              animationSpeed={state.simulation.speed}
            />
          </Suspense>
        </ContextBridge>
      </Canvas>
    </Wrapper>
  ) : (
    ''
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
