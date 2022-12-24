import * as astronomy from '../astronomy';

describe('extractTle', () => {
  test('produces correct result', () => {
    const longstr1 = '';
    const longstr2 = '';
    expect(astronomy.extractTLE(longstr1, longstr2).toBe(''));
  });
});

describe('generateTle', () => {
  test('produces correct result', () => {
    const orbitElements = {};
    expect(astronomy.generateTLE(orbitElements).toBe({
      tle1: '',
      tle2: '',
    }));
  });
});

describe('twoline2satrec', () => {
  test('produces correct result', () => {
    const longstr1 = '';
    const longstr2 = '';
    expect(astronomy.twoline2satrec(longstr1, longstr2)).toBe({});
  });
});

describe('parseTLEs', () => {
  test('produces correct result', () => {
    const fileContent = '';
    expect(astronomy.parseTLEs(fileContent).toBe({
      name: '',
      tles: {
        tle1: '',
        tle2: '',
      },
    }));
  });
});

describe('getSunPosition', () => {
  test('produces correct result', () => {
    const time = 0;
    expect(astronomy.getSunPosition(time).toBe({
      x: 0,
      y: 0,
      z: 0,
    }));
  });
});

describe('getEarthRotationAngle', () => {
  test('produces correct result', () => {
    const date = new Date();
    expect(astronomy.getEarthRotationAngle(date)).toBe(0);
  });
});

describe('getDistance', () => {
  test('produces correct result', () => {
    const position1 = {
      x: 0,
      y: 0,
      z: 0,
    };
    const position2 = {
      x: 0,
      y: 0,
      z: 0,
    };
    expect(astronomy.getDistance(position1, position2).toBe(0));
  });
});
