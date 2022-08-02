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
  Suspense,
  createContext,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, useContextBridge, Stars } from '@react-three/drei';
import { earthRadius } from 'satellite.js/lib/constants';
import * as THREE from 'three';
import { initializeState, satReducer } from './Model/satellites';
import dispatchSim from './Model/simulation';
import dispatchData from './Model/data';
import GlobalStyles from './GlobalStyles';
import Camera from './Simulation/Camera';
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

const Context = createContext(null);

const App = ({ title }) => {
  /* INITIALIZE STATE 

    For performance reasons, only the key parameters governing the simulation are stored in state. Chiefly, the user selection and the
    simulation time/speed. These are changed by dispatching commands to a stateful react reducer.
    
    Other parameters that are updated every frame are stored in refs, as making this quantity of setState calls is 
    prohibitive to performance. Two different dispatch functions are used to update these values, both of which simply
    edit the current property of refs:
    
      dispatchData - stores performance data from satellites on every frame in the data variable. This primarily relates to the 
      simulated satellite power systems
      
      dispatchSim - stores references to the THREE.js objects in the sim variable. This holds their position as well as 
      methods associated with their 3d representation
    
    The global dispatch function sends commands to the relevant dispatch function via the target attribute.
  
  */

  const [state, dispatchState] = useReducer(satReducer, {
    orbits: null,
    time: null,
    customers: null,
    powers: null,
  });

  const sim = useRef({
    customerRefs: new Map(),
    powerRefs: new Map(),
    beamRefs: new Map(),
    earthRef: useRef(),
    sunRef: useRef(),
    cameraTarget: {
      name: null,
      ref: null,
      lock: true,
    },
  });

  const data = useRef(
    new Map().set('averages', {
      chargeStateBeam: [],
      chargeStateNoBeam: [],
    })
  );

  function dispatch(action) {
    // perform actions prior to next tick
    // if (action.type === 'set time') {
    //   if (state.customers.length > 0) {
    //     // dispatchData(
    //     //   {
    //     //     type: 'calculate averages',
    //     //     time: state.time.current,
    //     //   },
    //     //   data
    //     // );
    //   }
    // }

    // route commands to relevant dispatch function
    switch (action.target) {
      case 'state': {
        dispatchState(action);
        return;
      }
      case 'data': {
        dispatchData(action, data);
        return;
      }
      case 'sim': {
        dispatchSim(action, sim);
        return;
      }
      case 'global': {
        dispatchData(action, data);
        dispatchState(action);
        return;
      }
    }
  }

  // Initialize context (global constants)
  const ContextBridge = useContextBridge(Context);

  // Battery simulation functions

  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    initializeState().then((initialState) => {
      console.log(initialState);
      dispatch({
        target: 'state',
        type: 'initialize',
        initialState,
      });
      dispatch({
        target: 'sim',
        type: 'detach camera',
      });
      setLoaded(() => true);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      let newSat = 'ONEWEB-0012';
      dispatch({
        target: 'global',
        type: 'add satellite',
        name: state.orbits.get(newSat).name,
        tles: state.orbits.get(newSat).tles,
        size: 1,
        isCustomer: false,
      });

      newSat = 'ONEWEB-0087';
      dispatch({
        target: 'global',
        type: 'add satellite',
        name: state.orbits.get(newSat).name,
        tles: state.orbits.get(newSat).tles,
        size: 1,
        isCustomer: false,
      });

      newSat = 'ONEWEB-0006';
      dispatch({
        target: 'global',
        type: 'add satellite',
        name: state.orbits.get(newSat).name,
        tles: state.orbits.get(newSat).tles,
        size: 1,
        isCustomer: false,
      });
    }
  }, [isLoaded]);

  return isLoaded ? (
    <Wrapper className="app">
      <Context.Provider value={{ dispatch, state, sim, data }}>
        <GlobalStyles />
        <h1>{title}</h1>

        <Controls />

        <UI />
      </Context.Provider>

      <Canvas className="canvas" mode="concurrent">
        <ContextBridge>
          <Camera target={sim.current.cameraTarget} />
          {/* <ambientLight color="white" intensity={0.3} /> */}

          <Suspense
            fallback={
              <Html>
                <p style={{ color: 'white' }}>Loading...</p>
              </Html>
            }
          >
            <Time dispatch={dispatch} time={state.time} />
            <Stars
              radius={100} // Radius of the inner sphere (default=100)
              depth={50} // Depth of area where stars should fit (default=50)
              count={5000} // Amount of stars (default=5000)
              factor={4} // Size factor (default=4)
              saturation={1} // Saturation 0-1 (default=0)
              fade
            />
            <Sun time={state.time} ref={sim.current.sunRef} />
            <Earth ref={sim.current.earthRef} time={state.time} />
            <Satellites
              time={state.time}
              powerSats={state.powers}
              customers={state.customers}
              sim={sim.current}
              dispatch={dispatch}
              data={data.current}
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
