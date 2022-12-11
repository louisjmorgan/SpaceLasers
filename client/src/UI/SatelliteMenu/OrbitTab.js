/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel,
  Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import shallow from 'zustand/shallow';
import { parseTLEs, twoline2satrec } from '../../Util/astronomy';
import { useUIStore } from '../../Model/store';
import CustomNumberInput from '../Elements/CustomNumberInput';

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

export default function OrbitTab({ formik }) {
  const [error, setError] = useState();

  const { satIndex, constellations, isAdvanced } = useUIStore((state) => ({
    satIndex: state.satIndex,
    constellations: state.constellations,
    isAdvanced: state.isAdvanced,
  }), shallow);

  const extractTle = (tleString) => {
    let satRec;
    try {
      const { tles } = parseTLEs(tleString)[0];
      satRec = twoline2satrec(tles.tle1, tles.tle2);
    } catch {
      setError('Error extracting TLE.  Please enter a valid TLE.');
      return;
    }
    const newOrbit = {
      epoch: satRec.epochdatetimelocal,
      meanMotionDot: satRec.ndottle,
      bstar: satRec.bstar || satRec.bstar.toFixed(5),
      inclination: satRec.inclotle,
      rightAscension: satRec.nodeotle,
      eccentricity: satRec.ecco,
      perigee: satRec.argpotle,
      meanAnomaly: satRec.motle,
      meanMotion: satRec.notle,
    };
    Object.entries(newOrbit).forEach(
      (entry) => {
        if (!entry[1]) {
          setError(`Error setting ${entry[0]}. Please enter a valid TLE and try again`);
          return;
        }
        formik.setFieldValue(`satellites[${satIndex}].orbit.[${entry[0]}]`, entry[1]);
      },
    );
    setError('');
  };

  const handleChooseTle = (e) => {
    formik.setFieldValue(`satellites[${satIndex}].orbit.tle`, e.target.value).then(() => extractTle(e.target.value));
  };

  const handleChooseConstellation = (e) => {
    formik.setFieldValue(`satellites[${satIndex}].orbit.constellation`, e.target.value)
      .then(() => {
        const { name, tles } = constellations.find(
          (v) => v.name === e.target.value,
        ).tles[0];
        console.log(name, tles);
        handleChooseTle({ target: { value: `${name}\n${tles.tle1}\n${tles.tle2}` } });
      });
  };

  return (

    isAdvanced ? (
      <Tabs align="center">
        <TabList width="50%">
          <Tab>Manual Entry</Tab>
          <Tab>Paste TLE</Tab>
        </TabList>
        <TabPanels>
          <TabPanel pt={5}>
            <Flex justify="space-around" wrap="wrap">
              <Box width="100%">
                <FormControl display="block" width="50%">
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
              </Box>
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
              onClick={() => extractTle(formik.values.satellites[satIndex].orbit.tle)}
              m={3}
            >
              Extract
            </Button>
            <Text color="red">{error}</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    ) : (
      <VStack gap={10} p={5}>
        <FormControl width="60%">
          <FormLabel htmlFor={`satellites[${satIndex}].orbit.constellation`}>Constellation</FormLabel>
          <Select
            name={`satellites[${satIndex}].orbit.constellation`}
            value={formik.values.satellites[satIndex].orbit.constellation}
            onChange={handleChooseConstellation}
          >
            {constellations.map((c) => (
              <option value={c.name} key={c.name}>
                {c.name}
              </option>
            ))}
          </Select>
        </FormControl>
        {constellations && (
        <FormControl width="60%">
          <FormLabel htmlFor={`satellites[${satIndex}].orbit.tle`}>Satellite</FormLabel>
          <Select
            name={`satellites[${satIndex}].orbit.tle`}
            value={formik.values.satellites[satIndex].orbit.tle}
            onChange={handleChooseTle}
          >
            {constellations.find(
              (v) => v.name === formik.values.satellites[satIndex].orbit.constellation,
            ).tles
              .map((tle, i) => (
                <option
                  key={`${i}${tle.name}`}
                  value={`${tle.name}\n${tle.tles.tle1}\n${tle.tles.tle2}`}
                >
                  {tle.name}
                </option>
              ))}
          </Select>
        </FormControl>
        )}
      </VStack>
    )
  );
}
