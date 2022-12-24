const { v4: uuidv4 } = require('uuid');
const {
  twoline2satrec,
  extractTLE,
  generateTLE,
} = require('../util/astronomy');

const { SIM_LENGTH } = require('../util/constants')

const PV_SOURCES = {
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
};

const POWER_SAT_REQUEST = {
  pvVoltage: 4.7,
  currentDensity: 170.5,
  area:  0.0128,
  batteryVoltage: 3.6,
  capacity: 1.125,
  duties: [
    {
      name: 'power storing',
      duration: null,
      cycles: null,
      consumption: 1.2,
      type: 'power storing',
    },
    {
      name: 'beaming',
      duration: null,
      cycles: null,
      consumption: 3.2,
      type: 'space power',
    }
  ]
}

function generatePowerProfiles(pv, duties, battery) {
  const { area, voltage, currentDensity } = pv;
  const newPowerProfiles = [];
  Object.entries(pv.sources).forEach((pvSource) => {
    const current =
      currentDensity * pvSource[1].efficiency * area;
    const pvPower = current * voltage;
    const loadProfiles = [];
    duties.forEach((duty) => {
      const netPower = pvPower - duty.consumption;
      const netCurrent = netPower / battery.voltage;
      loadProfiles.push(netCurrent);
      
    });
    newPowerProfiles[pvSource[1].name] = loadProfiles;
  });
  return newPowerProfiles;
};


function getDutyIntervals(load, period, time) {
  if (load.type === 'cyclical') {
    const cycles = Number(load.cycles);
    const duration = Number(load.duration) * 1000;
    const interval =
      (period  - (duration * cycles)) / cycles;
    const totalCycles = Math.floor((SIM_LENGTH / period) * cycles)
     return Array.from({ length: totalCycles}, (value, index) => {
      const start = time.valueOf()  + (interval * (index + 1)) + (duration * index);
      return {
        start: start,
        end: start + duration,
      }
    })
  }
}

function getPowerTLEs(tles, inclinationOffset) {
  const orbitElements = extractTLE(tles.tle1, tles.tle2)
  orbitElements.inclination += inclinationOffset;
  return generateTLE(orbitElements)
}

function createPowerSatellite(name, tles, inclinationOffset) {
  const newTLEs = getPowerTLEs(tles, inclinationOffset);
  return createSatellite(name, POWER_SAT_REQUEST, newTLEs)
} 

function createSatellite(
  name,
  params,
  tles,
) {

  const orbit = twoline2satrec(tles.tle1, tles.tle2);
  orbit.period = (2 * Math.PI * 60 * 1000) / orbit.no;

  const pv = {
    sources: PV_SOURCES,
    voltage: params.pvVoltage,
    currentDensity: params.currentDensity,
    area: params.area,
  };

  const battery = {
    voltage: params.batteryVoltage,
    capacity: params.capacity,
  };

  const duties = params.duties.map((duty) => {
    return {
      name: duty.name,
      type: duty.type,
      consumption: Number(duty.consumption),
      duration: (Number(duty.duration) * 1000) || null,
      cycles: Number(duty.cycles) || null,
      intervals: duty.type === 'cyclical' ? getDutyIntervals(duty, orbit.period, orbit.epochdate) : null
    }
  });
  const powerProfiles = generatePowerProfiles(pv, duties, battery);
  return {
    name: name,
    id: uuidv4(),
    params: {
      orbit,
      battery,
      pv,
      load: {
        powerProfiles,
        duties,
      },
    }
  };
}

module.exports = {createSatellite, createPowerSatellite};