import * as simulation from '../simulation';

const timeArray = simulation.getTimeArray(new Date('2022-10-17T03:24:00'));
const satellite = {};
const beams = [];

describe('getTimeArray', () => {
  test('produces correct result', () => {
    const initial = '2022-10-17T03:24:00';
    expect(simulation.getTimeArray(initial).toBe([]));
  });
});

describe('getSatellitePositions', () => {
  test('produces correct result', () => {
    expect(simulation.getSatellitePositions(satellite, timeArray).toBe([]));
  });
});

describe('getSunPositions', () => {
  test('produces correct result', () => {
    expect(simulation.getSunPositions(timeArray).toBe([]));
  });
});

describe('getEarthRotationAngles', () => {
  test('produces correct result', () => {
    expect(simulation.getEarthRotationAngles(timeArray).toBe([]));
  });
});

describe('getCurrentDuties', () => {
  test('produces correct result', () => {
    const duties = [];
    expect(simulation.getCurrentDuties(duties, timeArray).toBe([]));
  });
});

describe('getBeams', () => {
  test('produces correct result', () => {
    const spacePower = [];
    const customers = [];
    expect(simulation.getBeams(spacePower, customers, timeArray).toBe([]));
  });
});

describe('getBeamDuties', () => {
  test('produces correct result', () => {
    expect(simulation.getBeamDuties(beams, timeArray).toBe([]));
  });
});

describe('getBeamDuties', () => {
  test('produces correct result', () => {
    expect(simulation.getBeamDuties(beams, timeArray).toBe([]));
  });
});

describe('getSources', () => {
  test('produces correct result', () => {
    expect(simulation.getSources(satellite, beams, timeArray).toBe([]));
  });
});

describe('getChargeStates', () => {
  test('produces correct result with beams', () => {
    expect(simulation.getChargeStates(satellite, timeArray, true).toBe([]));
  });
  test('produces correct result without beams', () => {
    expect(simulation.getChargeStates(satellite, timeArray, false).toBe([]));
  });
});

describe('getDischargeSaved', () => {
  test('produces correct result', () => {
    expect(simulation.getDischargeSaved(satellite).toBe([0, 0]));
  });
});

describe('getLowestChargeState', () => {
  test('produces correct result', () => {
    expect(simulation.getLowestChargeState(satellite).toBe([0, 0]));
  });
});
