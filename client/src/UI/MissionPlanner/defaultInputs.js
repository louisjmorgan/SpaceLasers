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
    epoch: '2022-09-15T20:00',
    meanMotionDot: 0.00001,
    bstar: 0.001,
    inclination: 0,
    rightAscension: 0,
    eccentricity: 0,
    perigee: 0,
    meanAnomaly: 0,
    meanMotion: 13,
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
    defaultDuty,
  ],
};

export { defaultSatellite, defaultDuty };
