/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import {
  pi,
  tumin,
  deg2rad,
  earthRadius,
} from 'satellite.js/lib/constants';

import { jday, days2mdhms } from 'satellite.js/lib/ext';

import sgp4init from 'satellite.js/lib/propagation/sgp4init';

import * as satelliteUtils from 'satellite.js';

/**
 * Return a Satellite imported from two lines of TLE data.
 *
 * Provide the two TLE lines as strings `longstr1` and `longstr2`,
 * and select which standard set of gravitational constants you want
 * by providing `gravity_constants`:
 *
 * `sgp4.propagation.wgs72` - Standard WGS 72 model
 * `sgp4.propagation.wgs84` - More recent WGS 84 model
 * `sgp4.propagation.wgs72old` - Legacy support for old SGP4 behavior
 *
 * Normally, computations are made using letious recent improvements
 * to the algorithm.  If you want to turn some of these off and go
 * back into "afspc" mode, then set `afspc_mode` to `True`.
 */

function extractTLE(longstr1, longstr2) {
  const orbitElements = {};

  orbitElements.epochYear = parseInt(longstr1.substring(18, 20), 10);
  orbitElements.epochDays = parseFloat(longstr1.substring(20, 32));
  orbitElements.meanMotionDot = parseFloat(longstr1.substring(33, 43));
  orbitElements.meanMotionDoubleDot = parseFloat(
    `.${parseInt(
      longstr1.substring(44, 50),
      10,
    )}E${longstr1.substring(50, 52)}`,
  );
  orbitElements.bstar = parseFloat(
    `${longstr1.substring(53, 54)}.${parseInt(
      longstr1.substring(54, 59),
      10,
    )}E${longstr1.substring(59, 61)}`,
  );

  // satrec.satnum = longstr2.substring(2, 7);
  orbitElements.inclination = parseFloat(longstr2.substring(8, 16));
  orbitElements.rightAscension = parseFloat(longstr2.substring(17, 25));
  orbitElements.eccentricity = parseFloat(`.${longstr2.substring(26, 33)}`);
  orbitElements.perigee = parseFloat(longstr2.substring(34, 42));
  orbitElements.meanAnomaly = parseFloat(longstr2.substring(43, 51));
  orbitElements.meanMotion = parseFloat(longstr2.substring(52, 63));
  let year;
  if (orbitElements.epochYear < 57) {
    year = orbitElements.epochYear + 2000;
  } else {
    year = orbitElements.epochYear + 1900;
  }

  const mdhmsResult = days2mdhms(year, orbitElements.epochDays);
  const {
    mon, day, hr, minute, sec,
  } = mdhmsResult;
  orbitElements.epoch = new Date(year, mon, day, hr, minute, sec);

  return orbitElements;
}

function daysIntoYear(date) {
  return (
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      - Date.UTC(date.getFullYear(), 0, 0))
    / 24
    / 60
    / 60
    / 1000
  );
}

function generateTLE(orbitElements) {
  const {
    epoch,
    meanMotionDot,
    bstar,
    inclination,
    rightAscension,
    eccentricity,
    perigee,
    meanAnomaly,
    meanMotion,
  } = orbitElements;
  let epochYr = String(epoch.getYear());
  if (epochYr > 100) epochYr = epochYr.substring(1);

  let epochDay = daysIntoYear(epoch);
  if (epochDay < 100) epochDay = `0${epochDay}`;

  const epochFraction = String(
    (
      epoch.getHours() / 24
      + epoch.getMinutes() / (60 * 24)
      + epoch.getSeconds() / (60 * 60 * 24)
    ).toFixed(8),
  ).substring(1);

  let meanMotionDotString = String(
    meanMotionDot.toFixed(8),
  ).substring(1);
  if (meanMotionDot < 0) { meanMotionDotString = `-${meanMotionDotString.substring(1)}`; }
  if (meanMotionDot >= 0) { meanMotionDotString = ` ${meanMotionDotString}`; }

  let bstarMant = String(bstar.toExponential(5))
    .split('.')
    .join('')
    .substring(0, 6);
  if (bstar > 0) bstarMant = ` ${bstarMant.substring(0, 5)}`;
  const bstarExp = Math.ceil(Math.log10(Math.abs(bstar)));

  const tle1 = `1 00000C 00000A   ${epochYr}${epochDay}${epochFraction} ${meanMotionDotString}  00000-0 ${bstarMant}${bstarExp} 0  0000`;

  let inclinationString = String(inclination.toFixed(4));
  if (inclination < 100) inclinationString = ` ${inclinationString}`;

  let rightAscensionString = String(rightAscension.toFixed(4));
  if (rightAscension < 100) { rightAscensionString = ` ${rightAscensionString}`; }

  const eccentricityString = String(
    eccentricity.toFixed(7),
  ).substring(2);

  let perigeeString = String(perigee.toFixed(4));
  if (perigee < 100) perigeeString = ` ${perigeeString}`;

  let meanAnomalyString = String(meanAnomaly.toFixed(4));
  if (meanAnomalyString < 100) { meanAnomalyString = ` ${meanAnomalyString}`; }

  const meanMotionString = String(meanMotion.toPrecision(10));
  const tle2 = `2 00000 ${inclinationString} ${rightAscensionString} ${eccentricityString} ${perigeeString} ${meanAnomalyString} ${meanMotionString}    00`;

  return {
    tle1,
    tle2,
  };
}

function twoline2satrec(longstr1, longstr2) {
  const opsmode = 'i';
  const xpdotp = 1440.0 / (2.0 * pi); // 229.1831180523293;
  let year = 0;

  const satrec = {};
  satrec.error = 0;

  satrec.satnum = longstr1.substring(2, 7);

  satrec.epochyr = parseInt(longstr1.substring(18, 20), 10);
  satrec.epochdays = parseFloat(longstr1.substring(20, 32));
  satrec.ndot = parseFloat(longstr1.substring(33, 43));
  satrec.nddot = parseFloat(
    `.${parseInt(
      longstr1.substring(44, 50),
      10,
    )}E${longstr1.substring(50, 52)}`,
  );
  satrec.bstar = parseFloat(
    `${longstr1.substring(53, 54)}.${parseInt(
      longstr1.substring(54, 59),
      10,
    )}E${longstr1.substring(59, 61)}`,
  );

  // satrec.satnum = longstr2.substring(2, 7);
  satrec.inclo = parseFloat(longstr2.substring(8, 16));
  satrec.nodeo = parseFloat(longstr2.substring(17, 25));
  satrec.ecco = parseFloat(`.${longstr2.substring(26, 33)}`);
  satrec.argpo = parseFloat(longstr2.substring(34, 42));
  satrec.mo = parseFloat(longstr2.substring(43, 51));
  satrec.no = parseFloat(longstr2.substring(52, 63));

  // ---- find no, ndot, nddot ----
  satrec.notle = satrec.no;
  satrec.no /= xpdotp; //   rad/min
  // satrec.nddot= satrec.nddot * Math.pow(10.0, nexp);
  // satrec.bstar= satrec.bstar * Math.pow(10.0, ibexp);

  // ---- convert to sgp4 units ----
  satrec.a = (satrec.no * tumin) ** (-2.0 / 3.0);
  satrec.ndottle = satrec.ndot;
  satrec.ndot /= xpdotp * 1440.0; // ? * minperday
  satrec.nddot /= xpdotp * 1440.0 * 1440;

  // ---- find standard orbital elements ----
  satrec.inclotle = satrec.inclo;
  satrec.inclo *= deg2rad;
  satrec.nodeotle = satrec.nodeo;
  satrec.nodeo *= deg2rad;
  satrec.argpotle = satrec.argpo;
  satrec.argpo *= deg2rad;
  satrec.motle = satrec.mo;
  satrec.mo *= deg2rad;

  satrec.alta = satrec.a * (1.0 + satrec.ecco) - 1.0;
  satrec.altp = satrec.a * (1.0 - satrec.ecco) - 1.0;

  // ----------------------------------------------------------------
  // find sgp4epoch time of element set
  // remember that sgp4 uses units of days from 0 jan 1950 (sgp4epoch)
  // and minutes from the epoch (time)
  // ----------------------------------------------------------------

  // ---------------- temp fix for years from 1957-2056 -------------------
  // --------- correct fix will occur when year is 4-digit in tle ---------

  if (satrec.epochyr < 57) {
    year = satrec.epochyr + 2000;
  } else {
    year = satrec.epochyr + 1900;
  }

  const mdhmsResult = days2mdhms(year, satrec.epochdays);

  const {
    mon, day, hr, minute, sec,
  } = mdhmsResult;
  satrec.jdsatepoch = jday(year, mon, day, hr, minute, sec);
  satrec.epochdate = new Date(year, mon, day, hr, minute, sec);
  satrec.epochdatetimelocal = new Date(
    satrec.epochdate.getTime() - satrec.epochdate.getTimezoneOffset() * 60000,
  ).toISOString().substring(0, 19);

  //  ---------------- initialize the orbit at sgp4epoch -------------------
  sgp4init(satrec, {
    opsmode,
    satn: satrec.satnum,
    epoch: satrec.jdsatepoch - 2433281.5,
    xbstar: satrec.bstar,
    xecco: satrec.ecco,
    xargpo: satrec.argpo,
    xinclo: satrec.inclo,
    xmo: satrec.mo,
    xno: satrec.no,
    xnodeo: satrec.nodeo,
  });

  return satrec;
}

function getCorsFreeUrl(url) {
  return `https://api.allorigins.win/raw?url=${url}`;
}

function parseTLEs(fileContent) {
  const result = [];
  const lines = fileContent.split('\n');

  let current = null;
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i].trim();
    if (line.length === 0) continue;

    if (line[0] !== '1' && line[0] !== '2') {
      current = {
        name: line,
      };
    } else if (line[0] === '1') {
      current = {
        ...current,
        tles: { ...current.tles, tle1: line },
      };
    } else if (line[0] === '2') {
      current = {
        ...current,
        tles: { ...current.tles, tle2: line },
      };
      result.push(current);
    }
  }

  return result;
}

function loadTLEsJSON(url) {
  return fetch(url).then((res) => {
    if (res.ok) {
      return res.text().then((text) => JSON.parse(text));
    }
  });
}

function loadTLEs(url) {
  return fetch(url).then((res) => {
    if (res.ok) {
      return res.text().then((text) => {
        const satellites = parseTLEs(text);
        return satellites;
      });
    }
  });
}

const toThree = (v) => ({
  x: v.x / earthRadius,
  y: v.z / earthRadius,
  z: -v.y / earthRadius,
});

function getPositionFromTLE(satellite, date) {
  const positionVelocity = satelliteUtils.propagate(
    satellite.orbit,
    date,
  );

  const positionEci = positionVelocity.position;
  return toThree(positionEci);
}

function getOrbitAtTime(satellite, time) {
  const pos = getPositionFromTLE(satellite, time);
  // return new THREE.Vector3(pos.x, pos.y, pos.z);
  return { x: pos.x, y: pos.y, z: pos.z };
}

function getSunPosition(time) {
  const N = time.getTime() / 86400000 + 2440587 - 2451545;
  let L = 4.89495042 + 0.0172027923937 * N;
  if (L > 2 * Math.PI) L -= 2 * Math.PI;
  let g = 6.240040768 + 0.0172019703436 * N;
  if (g > 2 * Math.PI) g -= 2 * Math.PI;
  const longitude = L + 0.033423055 * Math.sin(g) + 0.0003490659 * Math.sin(g);
  const distance = 1.00014 - 0.01671 * Math.cos(g) - 0.00014 * Math.cos(2 * g)
  * (149597870.7 / earthRadius);
  const obliquity = 0.40907027 - 6.981317008e-9 * N;
  const y = (distance * Math.sin(obliquity) * Math.sin(longitude));

  const x = (distance * Math.cos(longitude));
  const z = -(distance * Math.cos(obliquity) * Math.sin(longitude));

  return { x, y, z };
}

function getEarthRotationAngle(date) {
  const JD = date / 86400000 + 2440587 - 2451545;
  return 2 * Math.PI * (0.779057273264 + 1.002737811911355 * JD);
}

function getDistance(position1, position2) {
  const a = position1.x - position2.x;
  const b = position1.y - position2.y;
  const c = position1.z - position2.z;

  return Math.sqrt(a * a + b * b + c * c);
}

export {
  twoline2satrec,
  generateTLE,
  extractTLE,
  getOrbitAtTime,
  getSunPosition,
  getEarthRotationAngle,
  getDistance,
  parseTLEs,
  getCorsFreeUrl,
  loadTLEs,
  loadTLEsJSON,
};
