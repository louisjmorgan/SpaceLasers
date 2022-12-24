import { v4 as uuidv4 } from 'uuid';

const defaultDuty = {
  name: 'Cyclical',
  consumption: 3.2,
  type: 'cyclical',
  duration: 600,
  cycles: 6,
  priority: 1,
};

const defaultOrbit = {
  epoch: '2022-09-16T04:30:45',
  meanMotionDot: 0.00003242,
  bstar: 0.0084918,
  inclination: 87.9147,
  rightAscension: 147.6632,
  eccentricity: 0.0002947,
  perigee: 88.9181,
  meanAnomaly: 343.2887,
  meanMotion: 13.16587847,
  tle: 'ONEWEB-0012\n1 44057U 19010A   22250.74391874  .00000001  00000+0 -32174-4 0  9997\n2 44057  87.9135 143.1939 0002746  66.1420 293.9999 13.16594134170187',
  list: 'OneWeb',
};

const defaultPower = {
  pv: {
    voltage: 4.7,
    currentDensity: 170.5,
    area: 0.0064,
    powerStoringConsumption: 1.2,
    preset: 'small',
  },
  battery: {
    voltage: 3.6,
    capacity: 1.125,
    preset: 'small',
  },
};

const defaultSatellite = {
  orbit: defaultOrbit,
  color: '#CD5C5C',
  power: defaultPower,
  satelliteCount: 0,
  duties: [
    defaultDuty,
  ],
};

const defaultConstellation = {
  list: 'OneWeb',
  color: '#CD5C5C',
  payload: defaultSatellite,
  spacePowerColor: '#28D759',
  satellites: [],
  satelliteCount: 3,
  spacePowersCount: 3,
  spacePowerIndices: ['0', 1, 2],
  offsets: {
    inclination: 6,
    rightAscension: 0,
    eccentricity: 0,
    perigee: 0,
    meanAnomaly: 0,
    meanMotion: 0,
  },
  optimization: {
    population: 1000,
    generations: 10,
    threads: 4,
  },
};

const defaultValues = {
  constellations: [{
    ...defaultConstellation,
    name: 'Constellation 1',
    id: uuidv4(),
    satellites: [
      {
        ...defaultSatellite,
        orbit: {
          epoch: '2022-09-16T04:30:45',
          meanMotionDot: 0.00003242,
          bstar: 0.0084918,
          inclination: 87.9147,
          rightAscension: 147.6632,
          eccentricity: 0.0002947,
          perigee: 88.9181,
          meanAnomaly: 343.2887,
          meanMotion: 13.16587847,
          tle: 'ONEWEB-0012\n1 44057U 19010A   22250.74391874  .00000001  00000+0 -32174-4 0  9997\n2 44057  87.9135 143.1939 0002746  66.1420 293.9999 13.16594134170187',
          list: 'OneWeb',
        },
        name: 'Satellite 1',
        id: uuidv4(),
      },
      {
        ...defaultSatellite,
        orbit: {
          epoch: '2022-09-16T05:06:16',
          meanMotionDot: 0.00001674,
          bstar: 0.004385,
          inclination: 87.9151,
          rightAscension: 147.6525,
          eccentricity: 0.0002601,
          perigee: 76.2503,
          meanAnomaly: 352.9196,
          meanMotion: 13.16593118,
          tle: 'ONEWEB-0012\n1 44057U 19010A   22250.74391874  .00000001  00000+0 -32174-4 0  9997\n2 44057  87.9135 143.1939 0002746  66.1420 293.9999 13.16594134170187',
          list: 'OneWeb',
        },
        name: 'Satellite 2',
        id: uuidv4(),
      },
      {
        ...defaultSatellite,
        orbit: {
          epoch: '2022-09-16T07:37:44',
          meanMotionDot: 2e-7,
          bstar: 0.000052609,
          inclination: 87.9156,
          rightAscension: 147.6698,
          eccentricity: 0.0001678,
          perigee: 89.1265,
          meanAnomaly: 358.4823,
          meanMotion: 13.16600059,
          tle: 'ONEWEB-0012\n1 44057U 19010A   22250.74391874  .00000001  00000+0 -32174-4 0  9997\n2 44057  87.9135 143.1939 0002746  66.1420 293.9999 13.16594134170187',
          list: 'OneWeb',
        },
        name: 'Satellite 3',
        id: uuidv4(),
      },
    ],
  }],
};

export {
  defaultSatellite, defaultDuty, defaultConstellation, defaultValues,
};
