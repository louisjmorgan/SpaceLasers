/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
import * as satelliteUtils from 'satellite.js/lib/index';
import * as THREE from 'three';
import { earthRadius } from 'satellite.js/lib/constants';

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

    if (line[0] !== '1' && line[0] !== '2') {
      current = {
        name: line,
        ...stationOptions,
      };
    } else if (line[0] === '1') {
      current = {
        ...current,
        tles: { ...current.tles, tle1: line },
      };
    } else if (line[0] === '2') {
      current = {
        ...current,
        tles: { ...current.tles, tle2: line },
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

  if (!station.orbit) {
    const { tle1, tle2 } = station.orbit;
    if (!tle1 || !tle2) return null;
    station.orbit = satelliteUtils.twoline2satrec(tle1, tle2);
  }

  const positionVelocity = satelliteUtils.propagate(
    station.orbit,
    date
  );

  const positionEci = positionVelocity.position;
  return toThree(positionEci);
}

function getOrbitAtTime(station, time) {
  const date = time;
  if (!station.orbit) {
    const { tle1, tle2 } = station.tles;
    if (!tle1 || !tle2) return null;
    station.orbit = satelliteUtils.twoline2satrec(tle1, tle2);
  }

  const pos = getPositionFromTLE(station, date);
  return new THREE.Vector3(pos.x, pos.y, pos.z);
}

const defaultBattery = {
  capacity: 1.125, // Ah
  voltage: 3.6, // V
};

const defaultPV = {
  profiles: {
    // current density multipliers
    sunOnly: 1,
    beamOnly: 1,
    sunAndBeam: 1.5,
    eclipsed: 0,
  },
  voltage: 4.7, // V at mpp
  currentDensity: 170.5, // A/m^2
  area: 0.0064, // m^2
};

const defaultLoad = {
  powerStoring: {
    default: true,
    duration: null,
    consumption: 1.2, // W
    cycles: null,
  },

  overPower: {
    default: false,
    duration: 600, // s
    consumption: 3.2, // W
    cycles: 6, // per orbit
  },
};

const defaultPerformance = {
  chargeState: 0.3, // %
  currentDuty: 'powerStoring',
};

const defaultUI = {
  showLabel: false,
  chargeState: 0.3,
  currentDuty: 'powerStoring',
};

function generateProfiles(pv, load, battery) {
  const { area, voltage, currentDensity } = pv;
  const newPowerProfiles = new Map();
  Object.entries(pv.profiles).forEach((powerProfile) => {
    const current = currentDensity * powerProfile[1] * area;
    const pvPower = current * voltage;
    const loadProfiles = new Map();
    Object.entries(load).forEach((loadProfile) => {
      const netPower = pvPower - loadProfile[1].consumption;
      const netCurrent = netPower / battery.voltage;
      loadProfiles.set(loadProfile[0], netCurrent);
    });
    newPowerProfiles.set(powerProfile[0], loadProfiles);
  });
  return newPowerProfiles;
}

function createSatellite(
  name,
  tles,
  dimensions = 1,
  battery,
  pv,
  load
) {
  if (!battery) {
    battery = {
      ...defaultBattery,
      capacity: defaultBattery.capacity * dimensions,
      dischargeCurrent: defaultBattery.dischargeCurrent * dimensions,
    };
  }
  if (!pv) {
    pv = {
      ...defaultPV,
      voltage: defaultPV.voltage * dimensions,
      area: defaultPV.area * dimensions,
    };
  }
  if (!load) {
    load = {
      ...defaultLoad,
      powerStoring: {
        ...defaultLoad.powerStoring,
        consumption:
          defaultLoad.powerStoring.consumption * dimensions,
      },
      overPower: {
        ...defaultLoad.overPower,
        consumption: defaultLoad.overPower.consumption * dimensions,
      },
    };
  }

  // const performance = defaultPerformance;
  const profiles = generateProfiles(pv, load, battery);
  const orbit = satelliteUtils.twoline2satrec(tles.tle1, tles.tle2);
  orbit.period = (2 * Math.PI * 60) / orbit.no;
  console.log(orbit.period);
  return {
    name,
    orbit,
    profiles,
    battery,
    pv,
    load,
  };
}

async function initializeState() {
  const initialDate = new Date();
  const animationSpeed = 600;
  const orbits = await loadTLEs(
    getCorsFreeUrl(
      'http://www.celestrak.com/NORAD/elements/active.txt'
    )
  );
  console.log(orbits);
  return {
    orbits,
    simulation: {
      time: {
        initial: initialDate,
        current: initialDate,
      },
      speed: animationSpeed,
    },
    customers: [],
    powers: [],
    ui: new Map(),
  };
}

function satReducer(state, action) {
  switch (action.type) {
    case 'initialize': {
      return action.initialState;
    }

    case 'add satellite': {
      const cIndex = state.customers.findIndex(
        (entry) => entry.name === action.sat.name
      );
      const pIndex = state.powers.findIndex(
        (entry) => entry.name === action.sat.name
      );

      const newCustomers = [...state.customers];
      const newPowers = [...state.powers];
      if (cIndex === -1 && pIndex === -1) {
        const newSatellite = createSatellite(
          action.sat.name,
          action.sat.tles
        );
        if (action.isCustomer === true) {
          newCustomers.push(newSatellite);
        } else {
          newPowers.push(newSatellite);
        }
      }

      const newUI = new Map(state.ui);
      newUI.set(action.sat.name, defaultUI);

      return {
        ...state,
        customers: newCustomers,
        powers: newPowers,
        ui: newUI,
      };
    }

    case 'remove satellite': {
      let newCustomers = [...state.customers];
      let newPowers = [...state.powers];
      if (action.isCustomer === true) {
        newCustomers = state.customers.filter(
          (s) => s !== action.sat
        );
      } else if (action.isCustomer === false) {
        newPowers = state.powers.filter((s) => s !== action.sat);
      }

      const newUI = new Map(state.ui);
      newUI.delete(action.sat.name);

      return {
        ...state,
        customers: newCustomers,
        powers: newPowers,
        ui: newUI,
      };
    }

    case 'remove all': {
      let newCustomers = [...state.customers];
      let newPowers = [...state.powers];
      if (action.isCustomer === true) {
        newCustomers = [];
      } else {
        newPowers = [];
      }
      return {
        ...state,
        customers: newCustomers,
        powers: newPowers,
      };
    }

    case 'toggle label': {
      const prev = state.ui.get(action.name);
      const newUI = new Map(state.ui);
      newUI.set(action.name, {
        ...prev,
        showLabel: !prev.showLabel,
      });
      return {
        ...state,
        ui: newUI,
      };
    }

    case 'set time': {
      return {
        ...state,
        simulation: {
          ...state.simulation,
          time: {
            ...state.simulation.time,
            current: action.time,
          },
        },
      };
    }

    case 'set speed': {
      return {
        ...state,
        simulation: {
          ...state.simulation,
          speed: action.speed,
        },
      };
    }

    case 'update charge state': {
      const prev = state.ui.get(action.name);
      const newUI = new Map(state.ui);
      newUI.set(action.name, {
        ...prev,
        chargeState: action.chargeState,
      });
      return {
        ...state,
        ui: newUI,
      };
    }

    case 'update current duty': {
      const prev = state.ui.get(action.name);
      const newUI = new Map(state.ui);
      newUI.set(action.name, {
        ...prev,
        currentDuty: action.currentDuty,
      });
      return {
        ...state,
        ui: newUI,
      };
    }
  }
}

export { initializeState, satReducer, getOrbitAtTime };
