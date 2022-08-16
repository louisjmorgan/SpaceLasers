import { v4 as uuidv4 } from 'uuid';
import {
  twoline2satrec,
  extractTLE,
  generateTLE,
} from '../Util/astronomy';
import { SIM_LENGTH } from '../Util/constants';

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
  power: {
    pvVoltage: 4.7,
    currentDensity: 170.5,
    area: 0.0128,
    batteryVoltage: 3.6,
    capacity: 1.125,
    powerStoringConsumption: 1.2,
  },
  duties: [
    {
      name: 'beaming',
      duration: null,
      cycles: null,
      consumption: 3.2,
      type: 'space power',
    },
  ],
};

function generatePowerProfiles(pv, duties, battery) {
  const { area, voltage, currentDensity } = pv;
  const newPowerProfiles = [];
  Object.entries(pv.sources).forEach((pvSource) => {
    const current = currentDensity * pvSource[1].efficiency * area;
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
}

function getDutyIntervals(duty, period, time) {
  const cycles = Number(duty.cycles);
  const duration = Number(duty.duration) * 1000;
  const interval = (period - (duration * cycles)) / cycles;
  const totalCycles = Math.floor((SIM_LENGTH / period) * cycles);
  return Array.from({ length: totalCycles }, (value, index) => {
    const start = time.valueOf() + (interval * (index + 1)) + (duration * index);
    return {
      start,
      end: start + duration,
    };
  });
}

function getPowerTLEs(tles, inclinationOffset) {
  const orbitElements = extractTLE(tles.tle1, tles.tle2);
  orbitElements.inclination += inclinationOffset;
  return generateTLE(orbitElements);
}

function createSatellite(
  customer,
) {
  const tles = generateTLE({
    ...customer.orbit,
    epoch: new Date(customer.orbit.epoch),
  });
  const orbit = twoline2satrec(tles.tle1, tles.tle2);
  orbit.period = (2 * Math.PI * 60 * 1000) / orbit.no;

  const pv = {
    sources: PV_SOURCES,
    voltage: customer.power.pvVoltage,
    currentDensity: customer.power.currentDensity,
    area: customer.power.area,
  };

  const battery = {
    voltage: customer.power.batteryVoltage,
    capacity: customer.power.capacity,
  };

  const duties = customer.duties.map((duty) => ({
    name: duty.name,
    type: duty.type,
    consumption: Number(duty.consumption),
    duration: (Number(duty.duration) * 1000) || null,
    cycles: Number(duty.cycles) || null,
    intervals: duty.type === 'cyclical' ? getDutyIntervals(duty, orbit.period, orbit.epochdate) : null,
  }));

  duties.unshift({
    name: 'Power storing',
    type: 'power storing',
    consumption: customer.power.powerStoringConsumption,
  });
  const powerProfiles = generatePowerProfiles(pv, duties, battery);
  return {
    name: customer.name,
    id: customer.id,
    params: {
      orbit,
      battery,
      pv,
      load: {
        powerProfiles,
        duties,
      },
    },
  };
}

function createPowerSatellite(name, orbit, inclinationOffset) {
  const request = {
    ...POWER_SAT_REQUEST,
    name,
    id: uuidv4(),
    orbit: {
      ...orbit,
      inclination: orbit.inclination + inclinationOffset,
    },
  };
  return createSatellite(request);
}

export { createSatellite, createPowerSatellite };
