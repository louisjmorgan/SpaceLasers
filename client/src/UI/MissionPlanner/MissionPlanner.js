/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Center, Flex, GridItem,
  Spinner,
  Tab, TabList, TabPanel, TabPanels, Tabs, Text,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

import { getCorsFreeUrl, loadTLEs } from 'Util/astronomy';
import { lighten } from '@chakra-ui/theme-tools';
import useStore from 'Model/store';
import { handleMissionRequest, MissionSchema } from '../../Model/mission';

import SatelliteList from './SatelliteList';

import OrbitTab from './OrbitTab';
import PowerTab from './PowerTab';
import DutyTab from './DutyTab';
import ConfigModal from './ConfigModal';
import { defaultValues } from './defaultInputs';

function fetchTLEs(urls) {
  const tles = [];
  Object.entries(urls).forEach(([key, url]) => {
    loadTLEs(getCorsFreeUrl(url)).then((res) => {
      tles.push({
        name: key,
        tles: res,
      });
    });
  });
  return tles;
}

const urls = {
  OneWeb: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=oneweb&FORMAT=tle',
  Starlink: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=starlink&FORMAT=tle',
  Orbcomm: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=orbcomm&FORMAT=tle',
  Galileo: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=galileo&FORMAT=tle',
  Geosynchronous: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=geo&FORMAT=tle',
};

function MissionPlanner({ shouldDisplay }) {
  const [satIndex, setSatIndex] = useState(0);
  const [constellations, setConstellations] = useState();

  const initializeMission = useStore((state) => state.initializeMission);

  useEffect(() => {
    setConstellations((fetchTLEs(urls)));
  }, []);
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: MissionSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            initializeMission(values);
            formik.setStatus('');
          } catch (error) {
            formik.setStatus(error.message);
            reject();
          }
          resolve();
        }, 500);
      });
    },
  });
  return (
    shouldDisplay
      ? (
        <>
          <GridItem area="select">
            <form onSubmit={formik.handleSubmit}>

              <SatelliteList formik={formik} satIndex={satIndex} setSatIndex={setSatIndex} />
              {formik.values.satellites.length > 0
                ? (
                  <>
                    <Center>
                      <ConfigModal formik={formik} />

                      <Button
                        m={5}
                        type="submit"
                        disabled={formik.isSubmitting}
                      >
                        {formik.isSubmitting ? <Spinner /> : 'Generate Mission'}
                      </Button>
                    </Center>
                    <Center>
                      <Text color="red" width="50%" align="center">{formik.status}</Text>
                    </Center>
                  </>
                ) : '' }
            </form>
          </GridItem>
          <GridItem area="parameters">
            {((formik.values.satellites.length > 0) && satIndex >= 0)
              ? (
                <Center>
                  <Tabs
                    p={10}
                    minWidth="50%"
                    maxWidth="80%"
                    align="center"
                  >
                    <TabList>
                      <Tab>Orbit</Tab>
                      <Tab>Power</Tab>
                      <Tab>Duty</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel pt={10}>
                        <OrbitTab
                          satIndex={satIndex}
                          formik={formik}
                          constellations={constellations}
                        />
                      </TabPanel>
                      <TabPanel pt={10}>
                        <PowerTab satIndex={satIndex} formik={formik} />
                      </TabPanel>
                      <TabPanel pt={10}>
                        <DutyTab satIndex={satIndex} formik={formik} />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Center>
              ) : (
                <Flex height="100%" justify="center" align="center">
                  <h2>Add satellite to begin...</h2>
                </Flex>
              )}
          </GridItem>

        </>
      ) : ''
  );
}

export default MissionPlanner;
