/* eslint-disable no-useless-return */
/* eslint-disable default-case */
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
  PerspectiveCamera,
  Stars,
} from '@react-three/drei';
import * as satelliteUtils from 'satellite.js/lib/index';
import { earthRadius } from 'satellite.js/lib/constants';
import * as THREE from 'three';
import { initializeState, satReducer } from './Model/SatReducer';
import GlobalStyles from './GlobalStyles';
import Camera from './Simulation/Camera';
import Earth from './Simulation/Earth';
import Satellites from './Simulation/Satellites';
import UI from './UI/UI';
import Controls from './UI/Controls';
import Time from './Simulation/Time';
import Sun from './Simulation/Sun';
import Skybox from './Simulation/Skybox';

const defaultStationOptions = {
  orbitMinutes: 1200,
  satelliteSize: 6,
  showLabel: false,
};

const defaultUI = {
  showLabel: false,
  chargeState: 0.3,
  currentDuty: 'power storing',
  chargeSources: 'eclipsed',
  attachCamera: false,
};

const Context = createContext(null);

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
  const ContextBridge = useContextBridge(Context);

  // Create references for sun and earth 3d models
  const earthRef = useRef();
  const sunRef = useRef();
  const refs = useRef({
    customerRefs: new Map(),
    powerRefs: new Map(),
    beamRefs: new Map(),
  });
  function dispatchRef(action) {
    switch (action.type) {
      case 'add customer': {
        refs.current.customerRefs.set(action.name, action.ref);
        return;
      }
      case 'add power': {
        refs.current.powerRefs.set(action.name, action.ref);
        return;
      }
      case 'add beam': {
        refs.current.beamRefs.set(action.name, action.ref);
        return;
      }
    }
  }

  const ui = useRef(new Map());
  const cameraTarget = useRef({
    name: 'earth',
    ref: earthRef.current,
    lock: true,
  });
  function dispatchUI(action) {
    switch (action.type) {
      case 'add satellite': {
        ui.current.set(action.name, defaultUI);
        return;
      }

      case 'remove satellite': {
        ui.current.delete(action.name);
        return;
      }

      case 'toggle label': {
        const prev = ui.current.get(action.name);
        ui.current.set(action.name, {
          ...prev,
          showLabel: !prev.showLabel,
        });
        return;
      }

      case 'attach camera': {
        cameraTarget.current = {
          ...cameraTarget.current,
          name: action.name,
          ref: refs.current.customerRefs.get(action.name),
        };
        return;
      }

      case 'detach camera': {
        cameraTarget.current = {
          ...cameraTarget.current,
          name: 'earth',
          ref: earthRef.current,
        };
        return;
      }

      case 'set camera lock': {
        cameraTarget.current = {
          ...cameraTarget.current,
          lock: action.lock,
        };
        return;
      }

      case 'update charge state': {
        const prev = ui.current.get(action.name);
        ui.current.set(action.name, {
          ...prev,
          chargeState: action.chargeState,
        });
        return;
      }

      case 'update current duty': {
        const prev = ui.current.get(action.name);
        ui.current.set(action.name, {
          ...prev,
          currentDuty: action.currentDuty,
        });
        return;
      }

      case 'update charging': {
        const prev = ui.current.get(action.name);
        ui.current.set(action.name, {
          ...prev,
          chargeSources: action.sources,
        });
        return;
      }
    }
  }

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
    const limbAngle = Math.atan2(earthRadius, sunEarthDistance);

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

  useEffect(() => {
    if (isLoaded) {
      let newSat = 'ONEWEB-0012';
      dispatch({
        type: 'add satellite',
        name: state.orbits.get(newSat).name,
        tles: state.orbits.get(newSat).tles,
        size: 1,
        isCustomer: false,
      });
      dispatchUI({
        type: 'add satellite',
        name: newSat,
      });
      newSat = 'ONEWEB-0087';
      dispatch({
        type: 'add satellite',
        name: state.orbits.get(newSat).name,
        tles: state.orbits.get(newSat).tles,
        size: 1,
        isCustomer: false,
      });
      dispatchUI({
        type: 'add satellite',
        name: newSat,
      });
      newSat = 'ONEWEB-0006';
      dispatch({
        type: 'add satellite',
        name: state.orbits.get(newSat).name,
        tles: state.orbits.get(newSat).tles,
        size: 1,
        isCustomer: false,
      });
      dispatchUI({
        type: 'add satellite',
        name: newSat,
      });
    }
  }, [isLoaded]);

  return isLoaded ? (
    <Wrapper className="app">
      <Context.Provider
        value={{ dispatch, dispatchUI, cameraTarget }}
      >
        <GlobalStyles />
        <h1>{title}</h1>

        <Controls
          time={state.simulation.time}
          satellites={state.customers}
          cameraTarget={cameraTarget.current}
        />

        <UI
          allStations={state.orbits}
          powerSats={state.powers}
          customerSats={state.customers}
          uiMap={ui.current}
        />
      </Context.Provider>

      <Canvas className="canvas" mode="concurrent">
        <ContextBridge>
          <Camera target={cameraTarget.current} />
          {/* <ambientLight color="white" intensity={0.3} /> */}

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
            <Stars
              radius={100} // Radius of the inner sphere (default=100)
              depth={50} // Depth of area where stars should fit (default=50)
              count={5000} // Amount of stars (default=5000)
              factor={4} // Size factor (default=4)
              saturation={1} // Saturation 0-1 (default=0)
              fade
            />
            <Sun time={state.simulation.time} ref={sunRef} />
            <Earth ref={earthRef} time={state.simulation.time} />
            <Satellites
              time={state.simulation.time}
              powerSats={state.powers}
              customers={state.customers}
              refs={refs.current}
              dispatch={dispatch}
              dispatchUI={dispatchUI}
              dispatchRef={dispatchRef}
              uiMap={ui.current}
              sunRef={sunRef.current}
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
  width: 100vw;
  height: 120vh;
  font-family: 'Barlow';
  h1 {
    position: absolute;
    color: white;
    text-align: center;
    font-family: serif;
    font-weight: bold;
    font-family: 'Barlow';
    font-size: 2rem;
    margin-top: 2.5rem;
    z-index: 9999;
    left: 40%;
    right: 40%;
  }

  canvas {
    z-index: 0;
  }
`;

App.propTypes = {
  title: PropTypes.string.isRequired,
};

export { App, Context };
