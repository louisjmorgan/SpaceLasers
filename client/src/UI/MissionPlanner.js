/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-expressions */
import {
  Button,
  ButtonGroup,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  IconButton,
  Input, List, ListItem, Select, Tab, TabList, TabPanel, TabPanels, Tabs, useEditableControls, VStack,
} from '@chakra-ui/react';
import {
  AddIcon,
  CheckIcon, ChevronRightIcon, CloseIcon, EditIcon, SmallCloseIcon,
} from '@chakra-ui/icons';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import CustomNumberInput from './CustomNumberInput';

const defaultValues = {
  size: 1,
  orbitInput: 'manual',
  isCustomer: true,
  epoch: new Date().toLocaleString('en-ca'),
  meanMotionDot: 0.00001,
  bstar: 0.001,
  inclination: 0,
  rightAscension: 0,
  eccentricity: 0,
  perigee: 0,
  meanAnomaly: 0,
  meanMotion: 13,
  pvVoltage: 4.7,
  currentDensity: 170.5,
  area: 0.0064,
  batteryVoltage: 3.6,
  capacity: 1.125,
  powerStoringConsumption: 1.2,
  duties: [
    {
      name: 'cyclical',
      consumption: 3.2,
      type: 'cyclical',
      duration: 600,
      cycles: 6,
      priority: 1,

    },
  ],
};

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    ''
  );
}

function MissionPlanner() {
  const [satIndex, setSatIndex] = useState();

  const formik = useFormik({
    initialValues: {
      satellites: [
      ],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <GridItem area="select">
        <form onSubmit={formik.handleSubmit}>
          <h2 align="center">Satellites</h2>
          <VStack>
            <FormikProvider value={formik}>
              <FieldArray name="satellites">
                {(fieldArrayProps) => {
                  const {
                    push, remove, form,
                  } = fieldArrayProps;
                  const { values } = form;
                  return (
                    <>

                      <List width="80%" maxHeight="20rem" overflowY="auto">
                        {values.satellites.length > 0
                        && values.satellites.map((satellite, index) => (
                          <ListItem
                            as={Flex}
                            p={1}
                            justify="space-around"
                            align="center"
                            borderRadius={5}
                            layerStyle={(index === satIndex) ? 'selected' : ''}
                          >
                            <Button
                              type="button"
                              className="secondary"
                              onClick={() => {
                                remove(index);
                                if (index === satIndex) {
                                  setSatIndex(
                                    (prev) => (prev > 0 ? prev - 1 : null),
                                  );
                                }
                              }}
                            >
                              <SmallCloseIcon />
                            </Button>
                            <FormControl>
                              <Editable
                                startWithEditView
                                onChange={(v) => {
                                  form.setFieldValue(
                                    `satellites[${index}].name`,
                                    v,
                                  );
                                }}
                                value={values.satellites[index].name}
                                align="center"
                                width="auto"
                                cursor="pointer"
                                onSubmit={() => setSatIndex(index)}
                                onClick={() => setSatIndex(index)}
                              >
                                <EditablePreview />
                                <Input
                                  as={EditableInput}
                                  id="name"
                                  name={`satellites[${index}].name`}
                                  type="text"
                                  variant="filled"

                                />
                                <EditableControls />
                              </Editable>
                            </FormControl>

                            <Button onClick={(e) => {
                              e.preventDefault();
                              setSatIndex(index);
                            }}
                            >
                              <ChevronRightIcon />
                            </Button>

                          </ListItem>
                        ))}
                      </List>
                      <Button
                        m={5}
                        onClick={() => {
                          push({
                            ...defaultValues,
                            name: `Satellite ${values.satellites.length + 1}`,
                          });
                        }}
                      >
                        <AddIcon />
                      </Button>

                    </>
                  );
                }}
              </FieldArray>
            </FormikProvider>
          </VStack>
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
                    <Flex justify="space-around" wrap="wrap">
                      <FormControl width="65%">
                        <FormLabel htmlFor={`satellites[${satIndex}].epoch`}>Epoch</FormLabel>
                        <Input
                          id="epoch"
                          name={`satellites[${satIndex}].epoch`}
                          type="datetime-local"
                          variant="filled"
                          onChange={formik.handleChange}
                          value={formik.values.satellites[satIndex].epoch}
                        />
                      </FormControl>
                      {[
                        {
                          id: 'meanMotionDot',
                          step: 0.000001,
                          label: '1st Derivative of Mean Motion',
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
                          units: '°',
                        },
                        {
                          id: 'rightAscension',
                          step: 0.01,
                          label: 'Right Ascension',
                          units: '°',
                        },
                        {
                          id: 'eccentricity',
                          step: 0.001,
                          label: 'Eccentricity',
                          units: '°',
                        },
                        {
                          id: 'perigee',
                          step: 0.001,
                          label: 'Perigee',
                          units: '°',
                        },
                        {
                          id: 'meanAnomaly',
                          step: 0.01,
                          label: 'Mean Anomaly',
                          units: '°',
                        },
                        {
                          id: 'meanMotion',
                          step: 0.01,
                          label: 'Mean Motion',
                          units: (
                            <span>
                              revs day
                              <sup>-1</sup>
                            </span>
                          ),
                        },
                      ].map((param) => (
                        <CustomNumberInput
                          value={formik.values.satellites[satIndex][param.id]}
                          step={param.step}
                          name={`satellites[${satIndex}][${param.id}]`}
                          units={param.units}
                          setFieldValue={formik.setFieldValue}
                          label={param.label}
                          id={param.id}
                        />
                      ))}
                    </Flex>
                  </TabPanel>
                  <TabPanel pt={10}>

                    <h3>Photovoltaic</h3>
                    <Flex wrap="wrap" justify="space-around" mb={10}>
                      {[
                        {
                          id: 'pvVoltage',
                          step: 0.1,
                          label: 'Voltage',
                          units: 'V',
                        },
                        {
                          id: 'currentDensity',
                          step: 0.1,
                          label: 'Current Density',
                          units: (
                            <span>
                              Am
                              <sup>-2</sup>
                            </span>
                          ),
                        },
                        {
                          id: 'area',
                          step: 0.001,
                          label: 'Area',
                          units: (
                            <span>
                              m
                              <sup>2</sup>
                            </span>
                          ),
                        },
                      ].map((param) => (
                        <CustomNumberInput
                          value={formik.values.satellites[satIndex][param.id]}
                          step={param.step}
                          name={`satellites[${satIndex}][${param.id}]`}
                          units={param.units}
                          setFieldValue={formik.setFieldValue}
                          label={param.label}
                          id={param.id}
                        />
                      ))}
                    </Flex>

                    <h3>Battery</h3>
                    <Flex wrap="wrap" justify="space-around">
                      {[
                        {
                          id: 'batteryVoltage',
                          step: 0.1,
                          label: 'Voltage',
                          units: 'V',
                        },
                        {
                          id: 'capacity',
                          step: 0.01,
                          label: 'Capacity',
                          units: 'Ah',
                        },
                      ].map((param) => (
                        <CustomNumberInput
                          value={formik.values.satellites[satIndex][param.id]}
                          step={param.step}
                          name={`satellites[${satIndex}][${param.id}]`}
                          units={param.units}
                          setFieldValue={formik.setFieldValue}
                          label={param.label}
                          id={param.id}
                        />
                      ))}
                    </Flex>
                  </TabPanel>
                  <TabPanel pt={10}>
                    <Flex wrap="wrap" justify="space-around">
                      {
                        [
                          {
                            id: 'powerStoringConsumption',
                            step: 0.1,
                            label: 'Power storing consumption',
                            units: 'W',
                          },
                        ].map((param) => (
                          <CustomNumberInput
                            value={formik.values.satellites[satIndex][param.id]}
                            step={param.step}
                            name={`satellites[${satIndex}][${param.id}]`}
                            units={param.units}
                            setFieldValue={formik.setFieldValue}
                            label={param.label}
                            id={param.id}
                          />
                        ))
                      }

                      <FormikProvider value={formik}>
                        <FieldArray name={`satellites[${satIndex}].duties`}>
                          {(fieldArrayProps) => {
                            const {
                              push, remove, form,
                            } = fieldArrayProps;

                            const satellite = form.values.satellites[satIndex];
                            const allFields = satellite.duties.map((duty, index) => {
                              const numberFields = [{
                                id: 'consumption',
                                step: 0.1,
                                label: 'Consumption',
                                units: 'W',
                              },
                              {
                                id: 'priority',
                                step: 1,
                                label: 'Priority',
                              }];

                              if (satellite.duties[index].type === 'cyclical') {
                                const cyclicalFields = [
                                  {
                                    id: 'cycles',
                                    steps: 0.1,
                                    label: 'Cycles per orbit',
                                    units: 'cycles',
                                  },
                                  {
                                    id: 'duration',
                                    steps: 1,
                                    label: 'Cycle duration',

                                  },
                                ];
                                numberFields.push(...cyclicalFields);
                              }

                              return (
                                <FormControl>
                                  <Select 
                                    name={`satellites[${satIndex}].duties[${index}].type`}
                                    onChange={formik.handleChange}
                                    value={satellite.duties[index].type}
                                  >
                                    <option value="cyclical"></option>
                                  </Select>
                                </FormControl>
                                {numberFields.map((param) => (
                                <CustomNumberInput
                                  value={formik.values.satellites[satIndex][param.id]}
                                  step={param.step}
                                  name={`satellites[${satIndex}].duties[${index}][${param.id}]`}
                                  units={param.units}
                                  setFieldValue={formik.setFieldValue}
                                  label={param.label}
                                  id={param.id}
                                />
                              ))});
                            });
                            return (
                              <>
                                {allFields}
                                <Button
                                  m={5}
                                  onClick={() => {
                                    push({
                                      ...defaultValues,
                                      name: `Duty ${satellite.duties.length}`,
                                    });
                                  }}
                                >
                                  <AddIcon />
                                </Button>
                              </>
                            );
                          }}
                        </FieldArray>

                      </FormikProvider>
                    </Flex>
                  </TabPanel>
                </TabPanels>

              </Tabs>
            </Center>
          ) : 'Add satellite to begin'}
      </GridItem>

    </>
  );
}

export default MissionPlanner;
