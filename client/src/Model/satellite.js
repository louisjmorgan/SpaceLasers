/* eslint-disable consistent-return */
import { v4 as uuidv4 } from 'uuid';
import {
  twoline2satrec,
  generateTLE,
  getOrbitAtTime,
} from '../Util/astronomy';
import { SIM_LENGTH } from '../Util/constants';

const PV_SOURCES = {
  sunOnly: {
    name: 'sun',
    efficiency: 1,
  },
  beamOnly: {
    name: 'beam',
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

function createSatellite(satellite, isCustomer = true) {
  const tles = generateTLE({
    ...satellite.orbit,
    epoch: new Date(satellite.orbit.epoch),
  });
  const orbit = twoline2satrec(tles.tle1, tles.tle2);
  try {
    getOrbitAtTime({ orbit }, new Date());
  } catch (err) {
    const error = `Unable to propagate orbital parameters for ${satellite.name}. ${
      isCustomer ? '\nPlease try different values or choose a TLE.' : '\nPlease try different offsets in the power configuration menu.'}`;
    throw new Error(error);
  }

  orbit.period = (2 * Math.PI * 60 * 1000) / orbit.no;

  const pv = {
    sources: PV_SOURCES,
    voltage: satellite.power.pvVoltage,
    currentDensity: satellite.power.currentDensity,
    area: satellite.power.area,
  };

  const battery = {
    voltage: satellite.power.batteryVoltage,
    capacity: satellite.power.capacity,
  };

  const duties = satellite.duties.map((duty) => ({
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
    consumption: satellite.power.powerStoringConsumption,
  });
  const powerProfiles = generatePowerProfiles(pv, duties, battery);
  return {
    name: satellite.name,
    id: satellite.id,
    params: {
      orbit,
      battery,
      pv,
      load: {
        powerProfiles,
        duties,
      },
    },
    isCustomer,
  };
}

function createPowerSatellite(name, orbit, offsets) {
  const newOrbit = { ...orbit };
  Object.entries(offsets).forEach((offset) => {
    newOrbit[offset[0]] = orbit[offset[0]] + Number(offset[1]);
  });

  const request = {
    ...POWER_SAT_REQUEST,
    name,
    id: uuidv4(),
    orbit: newOrbit,
  };
  return createSatellite(request, false);
}

function getOffsets(spacePowers, customers, offsets) {
  if (spacePowers === 0) return [];
  if (spacePowers === customers) return Array.from({ length: customers }, () => [offsets]);
  if (spacePowers < customers) {
    const spacing = Math.floor(customers / spacePowers);
    let total = 0;
    return Array.from({ length: customers }, (value, index) => {
      if (index % spacing) return null;
      total += 1;
      if (total > spacePowers) return null;
      return [offsets];
    });
  }
  if (spacePowers > customers) {
    let ratio = Math.ceil(spacePowers / customers);
    let total = 0;
    return Array.from(
      { length: customers },
      () => {
        let multiplier = 0;
        if ((total + ratio) > spacePowers) ratio = spacePowers - total;
        return Array.from({ length: ratio }, (value, index) => {
          if (index % 2 === 0) multiplier += 1;
          const newOffsets = {};
          Object.entries(offsets).forEach((offset) => {
            newOffsets[offset[0]] = offset[1] * multiplier * ((0 - 1) ** index);
          });
          total += 1;

          return newOffsets;
        });
      },
    );
  }
}

export { createSatellite, createPowerSatellite, getOffsets };
