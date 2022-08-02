import {
  twoline2satrec,
  loadTLEs,
  getCorsFreeUrl,
} from '../Utils/TLE';

const defaultBattery = {
  capacity: 1.125, // Ah
  voltage: 3.6, // V
};

const defaultPV = {
  profiles: {
    // current density multipliers
    sunOnly: {
      name: 'sun only',
      efficiency: 1,
    },
    beamOnly: {
      name: 'beam only',
      efficiency: 1,
    },
    sunAndBeam: {
      name: 'sun and beam',
      efficiency: 1.5,
    },
    eclipsed: {
      name: 'eclipsed',
      efficiency: 0,
    },
  },
  voltage: 4.7, // V at mpp
  currentDensity: 170.5, // A/m^2
  area: 0.0064, // m^2
};

const defaultLoad = {
  powerStoring: {
    name: 'power storing',
    default: true,
    duration: null,
    consumption: 1.2, // W
    cycles: null,
  },

  overPower: {
    name: 'overpower',
    default: false,
    duration: 600, // s
    consumption: 3.2, // W
    cycles: 6, // per orbit
  },
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
    const current =
      currentDensity * powerProfile[1].efficiency * area;
    const pvPower = current * voltage;
    const loadProfiles = new Map();
    Object.entries(load).forEach((loadProfile) => {
      const netPower = pvPower - loadProfile[1].consumption;
      const netCurrent = netPower / battery.voltage;
      loadProfiles.set(loadProfile[1].name, netCurrent);
    });
    newPowerProfiles.set(powerProfile[1].name, loadProfiles);
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
  } else pv.profiles = defaultPV.profiles;

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
  const orbit = twoline2satrec(tles.tle1, tles.tle2);
  orbit.period = (2 * Math.PI * 60) / orbit.no;
  return {
    name,
    orbit,
    profiles,
    battery,
    pv,
    load,
  };
}

export default createSatellite;