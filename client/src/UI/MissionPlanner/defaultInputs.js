import { v4 as uuidv4 } from 'uuid';

const defaultDuty = {
  name: 'Cyclical',
  consumption: 3.2,
  type: 'cyclical',
  duration: 600,
  cycles: 6,
  priority: 1,
};

const defaultSatellite = {
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
    tle: '',
    constellation: 'OneWeb',
  },
  power: {
    pvVoltage: 4.7,
    currentDensity: 170.5,
    area: 0.0064,
    batteryVoltage: 3.6,
    capacity: 1.125,
    powerStoringConsumption: 1.2,
  },
  duties: [
    {
      name: 'Cyclical',
      consumption: 3.2,
      type: 'cyclical',
      duration: 600,
      cycles: 6,
      priority: 1,
    },
  ],
};

const defaultValues = {

  satellites: [
    {
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
        tle: '',
        constellation: 'OneWeb',
      },
      power: {
        pvVoltage: 4.7,
        currentDensity: 170.5,
        area: 0.0064,
        batteryVoltage: 3.6,
        capacity: 1.125,
        powerStoringConsumption: 1.2,
      },
      duties: [
        {
          name: 'Cyclical',
          consumption: 3.2,
          type: 'cyclical',
          duration: 600,
          cycles: 6,
          priority: 1,
        },
      ],
      name: 'Satellite 1',
      id: uuidv4(),
    },
    {
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
        tle: '',
        constellation: 'OneWeb',
      },
      power: {
        pvVoltage: 4.7,
        currentDensity: 170.5,
        area: 0.0064,
        batteryVoltage: 3.6,
        capacity: 1.125,
        powerStoringConsumption: 1.2,
      },
      duties: [
        {
          name: 'Cyclical',
          consumption: 3.2,
          type: 'cyclical',
          duration: 600,
          cycles: 6,
          priority: 1,
        },
      ],
      name: 'Satellite 2',
      id: uuidv4(),
    },
    {
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
        tle: '',
        constellation: 'OneWeb',
      },
      power: {
        pvVoltage: 4.7,
        currentDensity: 170.5,
        area: 0.0064,
        batteryVoltage: 3.6,
        capacity: 1.125,
        powerStoringConsumption: 1.2,
      },
      duties: [
        {
          name: 'Cyclical',
          consumption: 3.2,
          type: 'cyclical',
          duration: 600,
          cycles: 6,
          priority: 1,
        },
      ],
      name: 'Satellite 3',
      id: uuidv4(),
    },
  ],
  spacePowers: 3,
  offsets: {
    inclination: 6,
    rightAscension: 0,
    eccentricity: 0,
    perigee: 0,
    meanAnomaly: 0,
    meanMotion: 0,
  },
};

export { defaultSatellite, defaultDuty, defaultValues };
