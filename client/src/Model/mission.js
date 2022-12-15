/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import * as Yup from 'yup';
import { generateTLE, twoline2satrec } from '../Util/astronomy';
import { FRAMES, SIM_LENGTH } from '../Util/constants';
import { createSatellite, createPowerSatellite, getOffsets } from './satellite';
import {
  getTimeArray,
  getSatellitePositions,
  getSunPositions,
  getEclipsedArray,
  getCurrentDuties,
  getBeams,
  getBeamDuties,
  getChargeStates,
  getDischargeSaved,
  getEarthRotationAngles,
  getSources,
  getLowestChargeState,
} from './simulation';

const SatelliteSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .trim(),
  color: Yup.string()
    .trim()
    .matches(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i),
  orbit: Yup.object().shape({
    tle: Yup.string(),
    list: Yup.string(),
    meanMotionDot: Yup.number()
      .min(-1, 'Must be more than -1')
      .max(1, 'Must be less than 1')
      .required('meanMotionDot is required'),
    bstar: Yup.number()
      .min(-2, 'Must be between -2 and 2')
      .max(2, 'Must be between -2 and 2')
      .required('bstar is required'),
    inclination: Yup.number()
      .min(0, 'Must be 0-360°')
      .max(360, 'Must be 0-360°')
      .required('inclination is required'),
    rightAscension: Yup.number()
      .min(0, 'Must be 0-360°')
      .max(360, 'Must be 0-360°')
      .required('right ascension is required'),
    eccentricity: Yup.number()
      .min(0, 'Must be between 0 and 1')
      .max(1, 'Must be between 0 and 1')
      .required('eccentricity is required'),
    perigee: Yup.number()
      .min(0, 'Must be 0-360°')
      .max(360, 'Must be 0-360°')
      .required('perigee is required'),
    meanAnomaly: Yup.number()
      .min(0, 'Must be 0-360°')
      .max(360, 'Must be 0-360°')
      .required('mean anomaly is required'),
    meanMotion: Yup.number()
      .min(0, 'Must be greater than 0')
      .max(16, 'Must be less than 16')
      .required('mean motion is required'),
  }),
  power: Yup.object().shape({
    pv: Yup.object().shape({
      voltage: Yup.number()
        .min(0, 'Must be positive')
        .required('pv voltage is required'),
      currentDensity: Yup.number()
        .min(0, 'Must be positive')
        .required('pv current density is required'),
      area: Yup.number()
        .min(0, 'Must be greater than 0')
        .required('pv area is required'),
      powerStoringConsumption: Yup.number()
        .min(0, 'Must be greater than 0')
        .required('Power storing consumption is required'),
      preset: Yup.string()
        .oneOf(['small', 'medium', 'large', 'custom']),
    }),
    battery: Yup.object().shape({
      voltage: Yup.number()
        .min(0, 'Must be positive')
        .required('battery voltage is required'),
      capacity: Yup.number()
        .min(0, 'Must be greater than 0')
        .required('battery capacity is required'),
      preset: Yup.string()
        .oneOf(['small', 'medium', 'large', 'custom']),
    }),
  }),
  duties: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string()
          .oneOf(['cyclical'])
          .required('Type is required'),
        name: Yup.string()
          .min(2, 'Too Short!')
          .max(30, 'Too Long!')
          .required('required!'),
        priority: Yup.number()
          .integer()
          .min(1)
          .required('Priority is required'),
        consumption: Yup.number()
          .min(0, 'Must be positive')
          .required('Consumption is required'),
        duration: Yup.number()
          .min(0, 'Must be positive')
          .when(
            'type',
            {
              is: 'cyclical',
              then: Yup.number().required('Duration is required'),
            },
          ),
        cycles: Yup.number()
          .min(0, 'Must be positive')
          .when(
            'type',
            {
              is: 'cyclical',
              then: Yup.number().required('Cycles is required'),
            },
          ),
      }),
    ),
});

const MissionSchema = Yup.object().shape({
  constellations: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .trim(),
      list: Yup.string(),
      payload: SatelliteSchema,
      satelliteCount: Yup.number().min(1).required('Satellite count is required'),
      satellites: Yup.array().of(SatelliteSchema),
    }),
  ),
  powerSats: Yup.number()
    .integer()
    .min(0, 'Must be an integer greater than or equal to 0'),
  offsets: Yup.object().shape({
    inclination: Yup.number()
      .min(0, 'Must be 0-36°')
      .max(36, 'Must be 0-36°')
      .required('inclination is required'),
    rightAscension: Yup.number()
      .min(0, 'Must be 0-36°')
      .max(36, 'Must be 0-36°')
      .required('right ascension is required'),
    eccentricity: Yup.number()
      .min(0, 'Must be between 0 and 1')
      .max(1, 'Must be between 0 and 1')
      .required('eccentricity is required'),
    perigee: Yup.number()
      .min(0, 'Must be 0-36°')
      .max(36, 'Must be 0-36°')
      .required('perigee is required'),
    meanAnomaly: Yup.number()
      .min(0, 'Must be 0-360°')
      .max(360, 'Must be 0-360°')
      .required('mean anomaly is required'),
    meanMotion: Yup.number()
      .min(0, 'Must be greater than 0')
      .max(16, 'Must be less than 16')
      .required('mean motion is required'),
  }),
});

const simulateBaseData = (baseSatellite, length, frames) => {
  const tles = generateTLE({
    ...baseSatellite.orbit,
    epoch: new Date(baseSatellite.orbit.epoch),
  });
  const orbit = twoline2satrec(tles.tle1, tles.tle2);
  const time = getTimeArray(orbit.epochdate, length, frames);
  const sun = getSunPositions(time);
  const earth = getEarthRotationAngles(time);
  return [time, sun, earth];
};

const initializeConstellations = (constellations) => constellations.map((constellation) => ({
  name: constellation.name,
  id: constellation.id,
  color: constellation.color,
  satellites: constellation.satellites.map((satellite) => satellite.id),
}));

const initializeCustomers = (constellations, time, sun) => {
  const customers = [];
  constellations.forEach((constellation) => {
    constellation.satellites.forEach((satellite) => {
      customers.push(createSatellite(satellite, constellation));
    });
  });
  customers.forEach((customer) => {
    customer.positions = getSatellitePositions(customer.params, time);
    customer.performance = {
      currentDuties: getCurrentDuties(customer.params.load.duties, time),
      isEclipsed: getEclipsedArray(customer, sun, time),
    };
  });
  return customers;
};

const initializeSpacePowers = (offsetObj, constellations, customersCount, spacePowersCount) => {
  const offsets = getOffsets(Number(spacePowersCount), customersCount, offsetObj);
  const spacePowers = [];
  constellations.forEach((constellation) => {
    constellation.satellites.forEach((satellite, index) => {
      if (!offsets[index]) return;
      return offsets[index].forEach((offset) => {
        spacePowers.push(createPowerSatellite(
          `Space Power ${index + 1}`,
          satellite.orbit,
          offset,
        ));
      });
    });
  });

  return spacePowers;
};

const simulateSpacePowers = (time, sun, constellations, customers, offsetObj, spacePowersCount) => {
  const spacePowers = initializeSpacePowers(offsetObj, constellations, customers.length, spacePowersCount);
  const beams = [];
  spacePowers.forEach((spacePower) => {
    spacePower.positions = getSatellitePositions(spacePower.params, time);
    const satBeams = getBeams(spacePower, customers, time);
    spacePower.performance = {
      currentDuties: getBeamDuties(satBeams, time),
      isEclipsed: getEclipsedArray(spacePower, sun, time),
    };
    spacePower.performance.sources = getSources(spacePower, satBeams, time);
    spacePower.performance.chargeState = getChargeStates(spacePower, time);
    beams.push(...satBeams);
  });
  return [spacePowers, beams];
};

const simulateBatteries = (customers, time, beams) => {
  customers.forEach((customer) => {
    customer.performance.sources = getSources(customer, beams, time);

    customer.performance = {
      ...customer.performance,
      chargeState: getChargeStates(customer, time),
      chargeStateNoBeams: getChargeStates(customer, time, false),
    };
    const [totalDischarge, dischargeSaved, timeCharged] = getDischargeSaved(customer);
    const [lowestChargeStateBeams, lowestChargeStateNoBeams] = getLowestChargeState(customer);
    customer.summary = {
      totalDischarge,
      dischargeSaved,
      timeCharged,
      lowestChargeStateBeams,
      lowestChargeStateNoBeams,
    };
  });
};

const simulateFleet = (time, customers) => ({
  name: 'fleet',
  isCustomer: 'true',
  performance: {
    chargeState: time.map((t, index) => customers.reduce((prev, current) => prev + current.performance.chargeState[index], 0) / customers.length),
    chargeStateNoBeams: time.map((t, index) => customers.reduce((prev, current) => prev + current.performance.chargeStateNoBeams[index], 0) / customers.length),
  },
  summary: {
    totalDischarge: customers.reduce((prev, current) => prev + current.summary.totalDischarge, 0),
    dischargeSaved: customers.reduce((prev, current) => prev + current.summary.dischargeSaved, 0),
    timeCharged: customers.reduce((prev, current) => prev + current.summary.timeCharged, 0),
    lowestChargeStateBeams: customers.reduce((prev, current) => {
      const c = current.summary.lowestChargeStateBeams;
      return prev < c ? prev : c;
    }, customers[0].summary.lowestChargeStateBeams),
    lowestChargeStateNoBeams: customers.reduce((prev, current) => {
      const c = current.summary.lowestChargeStateNoBeams;
      return prev < c ? prev : c;
    }, customers[0].summary.lowestChargeStateNoBeams),
  },
});

const handleMissionRequest = (req, length = SIM_LENGTH, frames = FRAMES) => {
  const [time, sun, earth] = simulateBaseData(req.constellations[0].satellites[0], length, frames);
  const constellations = initializeConstellations(req.constellations);
  const customers = initializeCustomers(req.constellations, time, sun);
  const [spacePowers, beams] = simulateSpacePowers(time, sun, req.constellations, customers, req.offsets, req.spacePowers);
  simulateBatteries(customers, time, beams);
  const fleet = simulateFleet(time, customers);
  // console.log(fleet);
  return {
    success: true,
    time,
    satellites: {
      customers,
      spacePowers,
      fleet,
    },
    constellations,
    beams,
    sun,
    earth,
  };
};

export { handleMissionRequest, MissionSchema };
