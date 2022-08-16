/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Center, Flex, GridItem,
  Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';

import { handleMissionRequest, MissionSchema } from '../../Model/mission';

import SatelliteList from './SatelliteList';

import OrbitTab from './OrbitTab';
import PowerTab from './PowerTab';
import DutyTab from './DutyTab';
import ConfigModal from './ConfigModal';

function MissionPlanner({ updateMission, shouldDisplay }) {
  const [satIndex, setSatIndex] = useState();

  const formik = useFormik({
    initialValues: {
      satellites: [
      ],
    },
    validationSchema: MissionSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log(values);
      updateMission(handleMissionRequest(values));
    },
  });
  return (
    shouldDisplay
      ? (
        <>
          <GridItem area="select">
            <form onSubmit={formik.handleSubmit}>
              <h2 align="center">Satellites</h2>
              <SatelliteList formik={formik} satIndex={satIndex} setSatIndex={setSatIndex} />
              {formik.values.satellites.length > 0
                ? (
                  <Center>
                    <ConfigModal formik={formik} />
                    <Button
                      m={5}
                      type="submit"
                    >
                      Generate Mission
                    </Button>

                  </Center>
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
                        <OrbitTab satIndex={satIndex} formik={formik} />
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
