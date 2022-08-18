/* eslint-disable react/prop-types */
import {
  Button,
  Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { parseTLEs, twoline2satrec } from 'Util/astronomy.js';
import CustomNumberInput from './CustomNumberInput';

const fields = [
  {
    id: 'meanMotionDot',
    step: 0.000001,
    label: '1st Derivative of Mean Motion',
    min: -1,
    max: 1,
    units: (
      <span>
        revs day
        <sup>-2</sup>
      </span>
    ),
  },
  {
    id: 'bstar',
    step: 0.0001,
    label: 'BSTAR',
    min: -2,
    max: 2,
    units: (
      <span>
        m
        <sup>-1</sup>
      </span>
    ),
  },
  {
    id: 'inclination',
    step: 0.01,
    label: 'Inclination',
    min: 0,
    max: 360,
    units: '°',
  },
  {
    id: 'rightAscension',
    step: 0.01,
    label: 'Right Ascension',
    min: 0,
    max: 360,
    units: '°',
  },
  {
    id: 'eccentricity',
    step: 0.001,
    label: 'Eccentricity',
    min: 0,
    max: 1,
    units: '°',
  },
  {
    id: 'perigee',
    step: 0.001,
    label: 'Perigee',
    min: 0,
    max: 360,
    units: '°',
  },
  {
    id: 'meanAnomaly',
    step: 0.01,
    label: 'Mean Anomaly',
    min: 0,
    max: 360,
    units: '°',
  },
  {
    id: 'meanMotion',
    step: 0.01,
    label: 'Mean Motion',
    min: 0,
    max: 16,
    units: (
      <span>
        revs day
        <sup>-1</sup>
      </span>
    ),
  },
];

export default function OrbitTab({ formik, satIndex, constellations }) {
  const handleExtractTle = (e) => {
    e.preventDefault();
    const { tles } = parseTLEs(formik.values.satellites[satIndex].orbit.tle)[0];

    const satRec = twoline2satrec(tles.tle1, tles.tle2);
    const newOrbit = {
      epoch: satRec.epochdatetimelocal,
      meanMotionDot: satRec.ndottle,
      bstar: satRec.bstar,
      inclination: satRec.inclotle,
      rightAscension: satRec.nodeotle,
      eccentricity: satRec.ecco,
      perigee: satRec.argpotle,
      meanAnomaly: satRec.motle,
      meanMotion: satRec.notle,
      tle: '',
    };
    Object.entries(newOrbit).forEach(
      (entry) => {
        formik.setFieldValue(`satellites[${satIndex}].orbit.[${entry[0]}]`, entry[1]);
      },
    );
  };
  return (
    <>
      <Flex justify="space-around" wrap="wrap">
        <FormControl width="65%">
          <FormLabel htmlFor={`satellites[${satIndex}].orbit.epoch`}>Epoch</FormLabel>
          <Input
            id="epoch"
            name={`satellites[${satIndex}].orbit.epoch`}
            type="datetime-local"
            variant="filled"
            onChange={formik.handleChange}
            value={formik.values.satellites[satIndex].orbit.epoch}
          />
          {!formik.errors.epoch ? (
            <FormHelperText />
          ) : (
            <FormErrorMessage>{formik.errors.orbit.epoch}</FormErrorMessage>
          )}

        </FormControl>
        {fields.map((param) => (
          <CustomNumberInput
            value={formik.values.satellites[satIndex].orbit[param.id]}
            key={param.id}
            step={param.step}
            name={`satellites[${satIndex}].orbit[${param.id}]`}
            units={param.units}
            formik={formik}
            label={param.label}
            min={param.min}
            max={param.max}
          />
        ))}
      </Flex>
      <Tabs
        p={10}
        minWidth="50%"
        maxWidth="80%"
        align="center"
      >
        <TabList>
          <Tab>Choose</Tab>
          <Tab>Paste TLE</Tab>
        </TabList>
        <TabPanels>
          <TabPanel pt={10}>
            <Flex wrap="wrap" justify="space-around">
              <FormControl width="40%">
                <FormLabel htmlFor={`satellites[${satIndex}].orbit.constellation`}>Constellation</FormLabel>
                <Select
                  name={`satellites[${satIndex}].orbit.constellation`}
                  value={formik.values.satellites[satIndex].orbit.constellation}
                  onChange={formik.handleChange}
                >
                  {constellations.map((c) => (
                    <option value={c.name} key={c.name}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl width="40%">
                <FormLabel htmlFor={`satellites[${satIndex}].orbit.tle`}>Satellite</FormLabel>
                <Select
                  name={`satellites[${satIndex}].orbit.tle`}
                  value={formik.values.satellites[satIndex].orbit.tle}
                  onChange={formik.handleChange}
                >
                  {constellations.find(
                    (v) => v.name === formik.values.satellites[satIndex].orbit.constellation,
                  ).tles
                    .map((tle) => (<option value={`${tle.name}\n${tle.tles.tle1}\n${tle.tles.tle2}`}>{tle.name}</option>))}
                </Select>
              </FormControl>
              <Button
                onClick={handleExtractTle}
                m={3}
              >
                Extract
              </Button>
            </Flex>
          </TabPanel>

          <TabPanel pt={10}>
            <FormControl width="90%">
              <FormLabel htmlFor={`satellites[${satIndex}].orbit.tle`}>TLE Input</FormLabel>
              <Textarea
                id="tle"
                name={`satellites[${satIndex}].orbit.tle`}
                onChange={formik.handleChange}
                value={formik.values.satellites[satIndex].orbit.tle}
                placeholder="Enter TLE here"
              />
              <FormErrorMessage>{formik.errors.tle}</FormErrorMessage>
            </FormControl>
            <Button
              onClick={handleExtractTle}
              m={3}
            >
              Extract
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
