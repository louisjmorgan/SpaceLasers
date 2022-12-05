import * as power from '../power';

describe('isEclipsed', () => {
  test('produces correct result when eclipsed', () => {
    const satellite = {
      x: 0,
      y: 0,
      z: 0,
    };
    const sun = {
      x: 0,
      y: 0,
      z: 0,
    };
    expect(power.isEcplised(satellite, sun).toBe(true));
  });

  test('produces correct result when not eclipsed', () => {
    const satellite = {
      x: 0,
      y: 0,
      z: 0,
    };
    const sun = {
      x: 0,
      y: 0,
      z: 0,
    };
    expect(power.isEclipsed(satellite, sun).toBe(true));
  });
});

describe('getChargeState', () => {
  const params = {};
  const currentDuty = 'powerStoring';
  const source = 'beamsOnly';
  const chargeState = 0.8;
  const delta = 1;

  expect(power.getChargeState(params, currentDuty, source, chargeState, delta).toBe(0.7));
});
