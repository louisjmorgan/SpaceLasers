/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import styled from 'styled-components';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  setNestedObjectValues,
} from 'formik';
import * as Yup from 'yup';
import { twoline2satrec, generateTLE } from '../Utils/TLE';
import { getOrbitAtTime, parseTLEs } from '../Model/SatReducer';
import { Context } from '../App';

const xpdotp = 1440.0 / (2.0 * Math.PI);
const deg2rad = Math.PI / 180.0;

const initOrbit = {
  epoch: new Date(),
  meanMotionDot: 0,
  bstar: 0,
  inclination: 0,
  rightAscension: 0,
  eccentricity: 0,
  perigee: 0,
  meanAnomaly: 0,
  meanMotion: 0,
};

const initDetails = {
  name: '',
  size: 1,
};

export default function AddSatForm({
  closeModal,
  isModal,
  allStations,
}) {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const handleClose = (e) => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };

  const tabs = ['orbit', 'power', 'duty'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabs = (tab) => {
    setActiveTab(() => tab);
  };

  const orbitInputs = ['manual', 'tle'];
  const [activeOrbitInput, setActiveOrbitInput] = useState(
    orbitInputs[0]
  );

  const handleOrbitInput = (input) => {
    setActiveOrbitInput(() => input);
  };

  const { dispatch, dispatchUI } = useContext(Context);

  const handleStationSelect = (e) => {
    const { tles, name } = allStations.get(e.target.value);
    const newOrbit = twoline2satrec(tles.tle1, tles.tle2);
    return {
      name,
      meanMotionDot: newOrbit.ndottle,
      bstar: newOrbit.bstar,
      inclination: newOrbit.inclotle,
      rightAscension: newOrbit.nodeotle,
      eccentricity: newOrbit.ecco,
      perigee: newOrbit.argpotle,
      meanAnomaly: newOrbit.motle,
      meanMotion: newOrbit.notle,
      tle: `${name}\n${tles.tle1}\n${tles.tle2}`,
    };
  };

  const handleAddSatellite = (values) => {
    let newSats = [];
    if (values.orbitInput === 'manual') {
      const orbitElements = {
        epoch: new Date(values.epoch),
        meanMotionDot: values.meanMotionDot,
        bstar: values.bstar,
        inclination: values.inclination,
        rightAscension: values.rightAscension,
        eccentricity: values.eccentricity,
        perigee: values.perigee,
        meanAnomaly: values.meanAnomaly,
        meanMotion: values.meanMotion,
      };
      newSats.push({
        name: values.name,
        tles: generateTLE(orbitElements),
      });
    }
    if (values.orbitInput === 'tle') {
      newSats = [...parseTLEs(values.tle)];
    }

    const pv = {
      voltage: values.pvVoltage,
      currentDensity: values.currentDensity,
      area: values.area,
    };

    const battery = {
      voltage: values.batteryVoltage,
      capacity: values.capacity,
    };

    const load = {
      powerStoring: {
        name: 'power storing',
        default: true,
        duration: null,
        consumption: values.powerStoringConsumption, // W
        cycles: null,
      },
      overPower: {
        name: 'overpower',
        default: false,
        duration: values.overPowerDuration, // s
        consumption: values.overPowerConsumption, // W
        cycles: values.overPowerCycles, // per orbit
      },
    };

    newSats.forEach((sat) => {
      try {
        const test = {
          orbit: twoline2satrec(sat.tles.tle1, sat.tles.tle2),
        };
        const pos = getOrbitAtTime(test, new Date());
      } catch {
        return new Error(
          'Unable to propagate orbital parameters. Please try different values or select from the dropdown menu.'
        );
      }

      dispatchUI({
        type: 'add satellite',
        name: sat.name,
      });
      dispatch({
        type: 'add satellite',
        tles: sat.tles,
        name: sat.name,
        pv,
        battery,
        load,
        size: values.size,
        isCustomer: true,
      });
    });
    setActiveOrbitInput(() => 'manual');
    closeModal();
  };

  const options = useRef([]);
  useEffect(() => {
    allStations.forEach((entry, stationName) => {
      options.current.push(
        <option key={stationName} value={stationName}>
          {stationName}
        </option>
      );
    });
  }, []);

  const SatelliteSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .when('orbitInput', {
        is: 'manual',
        then: Yup.string().required('Required'),
      }),
    size: Yup.number()
      .integer()
      .min(1, 'Size must be 1 or more!')
      .max(6, 'Size must be 6 or less!')
      .required('Required'),
    orbitInput: Yup.string().oneOf(orbitInputs).required('Required'),
    existing: Yup.string().oneOf(options.current),
    epoch: Yup.date().when('orbitInput', {
      is: 'manual',
      then: Yup.date().required('Required'),
    }),
    meanMotionDot: Yup.number()
      .min(-1, 'Must be more than -1')
      .max(1, 'Must be less than 1')
      .when('orbitInput', {
        is: 'manual',
        then: Yup.number().required('Required'),
      }),
    bstar: Yup.number()
      .min(-2, 'Must be between -2 and 2')
      .max(2, 'Must be between -2 and 2')
      .when('orbitInput', {
        is: 'manual',
        then: Yup.number().required('Required'),
      }),
    inclination: Yup.number()
      .min(0, 'Must be 0-360°')
      .max(360, 'Must be 0-360°')
      .when('orbitInput', {
        is: 'manual',
        then: Yup.number().required('Required'),
      }),
    rightAscension: Yup.number()
      .min(0, 'Must be 0-360°')
      .max(360, 'Must be 0-360°')
      .when('orbitInput', {
        is: 'manual',
        then: Yup.number().required('Required'),
      }),
    eccentricity: Yup.number()
      .min(0, 'Must be between 0 and 1')
      .max(1, 'Must be between 0 and 1')
      .when('orbitInput', {
        is: 'manual',
        then: Yup.number().required('Required'),
      }),
    perigee: Yup.number()
      .min(0, 'Must be 0-360°')
      .max(360, 'Must be 0-360°')
      .when('orbitInput', {
        is: 'manual',
        then: Yup.number().required('Required'),
      }),
    meanAnomaly: Yup.number()
      .min(0, 'Must be 0-360°')
      .max(360, 'Must be 0-360°')
      .when('orbitInput', {
        is: 'manual',
        then: Yup.number().required('Required'),
      }),
    meanMotion: Yup.number()
      .min(0, 'Must be greater than 0')
      .max(16, 'Must be less than 16')
      .when('orbitInput', {
        is: 'manual',
        then: Yup.number().required('Required'),
      }),
    pvVoltage: Yup.number()
      .min(0, 'Must be positive')
      .required('Required'),
    currentDensity: Yup.number()
      .min(0, 'Must be positive')
      .required('Required'),
    area: Yup.number()
      .min(0, 'Must be greater than 0')
      .required('Required'),
    batteryVoltage: Yup.number()
      .min(0, 'Must be positive')
      .required('Required'),
    capacity: Yup.number()
      .min(0, 'Must be greater than 0')
      .required('Required'),
    powerStoringConsumption: Yup.number()
      .min(0, 'Must be positive')
      .required('Required'),
    overPowerConsumption: Yup.number()
      .min(0, 'Must be positive')
      .required('Required'),
    overPowerDuration: Yup.number()
      .min(0, 'Must be greater than 0')
      .required('Required'),
    overPowerCycles: Yup.number()
      .integer()
      .min(1, 'Must be an integer greater than 0')
      .required('Required'),
  });

  return (
    <div>
      {isModal ? (
        <FormContainer ref={modalRef} onClick={handleClose}>
          <Formik
            initialValues={{
              name: '',
              size: 1,
              orbitInput: 'manual',
              epoch: new Date().toLocaleDateString('en-ca'),
              meanMotionDot: 0.00001,
              bstar: 0.01,
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
              overPowerConsumption: 3.2,
              overPowerDuration: 600,
              overPowerCycles: 6,
            }}
            validationSchema={SatelliteSchema}
            onSubmit={(values, { setStatus }) => {
              const error = handleAddSatellite(values);
              if (error) setStatus(error.message);
            }}
          >
            {({
              values,
              errors,
              touched,
              status,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
              /* and other goodies */
            }) => (
              <StyledForm
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                {' '}
                <div className="page">
                  <fieldset>
                    <legend>
                      <h3>Details</h3>
                    </legend>
                    <label htmlFor="name">
                      Name:
                      <Field
                        name="name"
                        type="text"
                        disabled={activeOrbitInput === 'tle'}
                      />
                      <ErrorMessage
                        component="p"
                        className="error"
                        name="name"
                      />
                    </label>
                    <label htmlFor="size">
                      Size:
                      <Field name="size" type="number" />
                      U
                      <ErrorMessage
                        component="p"
                        className="error"
                        name="size"
                      />
                    </label>
                  </fieldset>
                </div>
                <div className="tabs">
                  {tabs.map((tab) => {
                    return (
                      <button
                        type="button"
                        onClick={(e) => handleTabs(tab)}
                        className={activeTab === tab ? 'active' : ''}
                      >
                        <h3>{tab}</h3>
                      </button>
                    );
                  })}
                </div>
                {activeTab === 'orbit' ? (
                  <div className="page">
                    <fieldset>
                      <label htmlFor="manual">
                        Manual
                        <Field
                          type="radio"
                          name="orbitInput"
                          value="manual"
                          onChange={(e) => {
                            handleOrbitInput(e.target.value);
                            setFieldValue(
                              'orbitInput',
                              e.target.value
                            );
                          }}
                        />
                      </label>
                      <label htmlFor="tle">
                        TLE
                        <Field
                          type="radio"
                          name="orbitInput"
                          value="tle"
                          onChange={(e) => {
                            handleOrbitInput(e.target.value);
                            setFieldValue(
                              'orbitInput',
                              e.target.value
                            );
                          }}
                        />
                      </label>
                    </fieldset>
                    <label htmlFor="existing">
                      Choose existing:
                      <Field
                        name="existing"
                        as="select"
                        onChange={(e) => {
                          const newValues = handleStationSelect(e);
                          Object.entries(newValues).forEach(
                            (entry) => {
                              setFieldValue(entry[0], entry[1]);
                            }
                          );
                        }}
                      >
                        <option value="">Select orbit</option>
                        {options.current}
                      </Field>
                    </label>
                    {activeOrbitInput === 'manual' ? (
                      <fieldset>
                        <label htmlFor="epoch">
                          Epoch:
                          <Field name="epoch" type="date" />
                          <ErrorMessage
                            component="p"
                            className="error"
                            name="date"
                          />
                        </label>
                        <label htmlFor="meanMotionDot">
                          Mean Motion 1st Derivative:
                          <Field name="meanMotionDot" type="number" />
                          <ErrorMessage
                            component="p"
                            className="error"
                            name="meanMotionDot"
                          />
                        </label>

                        <label htmlFor="bstar">
                          BSTAR (drag):
                          <Field name="bstar" type="number" />
                          <ErrorMessage
                            component="p"
                            className="error"
                            name="bstar"
                          />
                        </label>

                        <label htmlFor="inclination">
                          Inclination (°):
                          <Field name="inclination" type="number" />
                          <ErrorMessage
                            component="p"
                            className="error"
                            name="inclination"
                          />
                        </label>
                        <label htmlFor="rightAscension">
                          Right Ascension (°):
                          <Field
                            name="rightAscension"
                            type="number"
                          />
                          <ErrorMessage
                            component="p"
                            className="error"
                            name="rightAscension"
                          />
                        </label>

                        <label htmlFor="eccentricity">
                          Eccentricity:
                          <Field name="eccentricity" type="number" />
                          <ErrorMessage
                            component="p"
                            className="error"
                            name="eccentricity"
                          />
                        </label>
                        <label htmlFor="perigee">
                          Perigee (°):
                          <Field name="perigee" type="number" />
                          <ErrorMessage
                            component="p"
                            className="error"
                            name="perigee"
                          />
                        </label>
                        <label htmlFor="meanAnomaly">
                          Mean Anomaly (°):
                          <Field name="meanAnomaly" type="number" />
                          <ErrorMessage
                            component="p"
                            className="error"
                            name="meanAnomaly"
                          />
                        </label>
                        <label htmlFor="meanMotion">
                          Mean Motion (revs per day):
                          <Field name="meanMotion" type="number" />
                          <ErrorMessage
                            component="p"
                            className="error"
                            name="meanMotion"
                          />
                        </label>
                      </fieldset>
                    ) : (
                      ''
                    )}
                    {activeOrbitInput === 'tle' ? (
                      <fieldset>
                        <label htmlFor="tle">
                          TLE (enter multiple for a constellation of
                          identical satellites):
                          <Field name="tle" as="textarea" />
                        </label>
                      </fieldset>
                    ) : (
                      ''
                    )}
                  </div>
                ) : (
                  ''
                )}
                {activeTab === 'power' ? (
                  <div className="page">
                    <fieldset>
                      <legend>
                        <h4>Photovoltaic</h4>
                      </legend>
                      <label htmlFor="pvVoltage">
                        Voltage:
                        <Field name="pvVoltage" type="number" />
                        V
                        <ErrorMessage
                          component="p"
                          className="error"
                          name="pvVoltage"
                        />
                      </label>
                      <label htmlFor="currentDensity">
                        Current Density:
                        <Field name="currentDensity" type="number" />
                        A/m²
                        <ErrorMessage
                          component="p"
                          className="error"
                          name="currentDensity"
                        />
                      </label>
                      <label htmlFor="area">
                        Area
                        <Field name="area" type="number" />
                        m²
                        <ErrorMessage
                          component="p"
                          className="error"
                          name="area"
                        />
                      </label>
                    </fieldset>
                    <fieldset>
                      <legend>
                        <h4>Battery</h4>
                      </legend>
                      <label htmlFor="batteryVoltage">
                        Voltage:
                        <Field name="batteryVoltage" type="number" />
                        V
                        <ErrorMessage
                          component="p"
                          className="error"
                          name="batteryVoltage"
                        />
                      </label>
                      <label htmlFor="capacity">
                        Capacity:
                        <Field name="capacity" type="number" />
                        Ah
                        <ErrorMessage
                          component="p"
                          className="error"
                          name="capacity"
                        />
                      </label>
                    </fieldset>
                  </div>
                ) : (
                  ''
                )}
                {activeTab === 'duty' ? (
                  <div className="page">
                    <fieldset>
                      <legend>
                        <h4>Power Storing</h4>
                      </legend>
                      <label htmlFor="powerStoringConsumption">
                        Consumption:
                        <Field
                          name="powerStoringConsumption"
                          type="number"
                        />
                        W
                        <ErrorMessage
                          component="p"
                          className="error"
                          name="powerStoringConsumption"
                        />
                      </label>
                    </fieldset>
                    <fieldset>
                      <legend>
                        <h4>Overpower</h4>
                      </legend>
                      <label htmlFor="overPowerConsumption">
                        Consumption:
                        <Field
                          name="overPowerConsumption"
                          type="number"
                        />
                        W
                        <ErrorMessage
                          component="p"
                          className="error"
                          name="overPowerConsumption"
                        />
                      </label>
                      <label>
                        Duration:
                        <Field
                          name="overPowerDuration"
                          type="number"
                        />
                        s
                        <ErrorMessage
                          component="p"
                          className="error"
                          name="overPowerDuration"
                        />
                      </label>
                      <label>
                        Cycles:
                        <Field name="overPowerCycles" type="number" />
                        per orbit
                        <ErrorMessage
                          component="p"
                          className="error"
                          name="overPowerCycles"
                        />
                      </label>
                    </fieldset>
                  </div>
                ) : (
                  ''
                )}
                <div className="error">{status}</div>
                <button className="submitButton" type="submit">
                  Add
                </button>
              </StyledForm>
            )}
          </Formik>
        </FormContainer>
      ) : (
        ''
      )}
    </div>
  );
}

const FormContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
`;

const StyledForm = styled.form`
  position: absolute;
  width: 40rem;
  padding: 2rem;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  position: relative;
  color: black;
  animation: animate 0.3s;

  h3 {
    padding: 1rem 0rem;
    font-size: 1.25rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  h4 {
    padding: 1rem 0rem;
    font-size: 1.25rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  .tabs {
    display: flex;
    flex-direction: row;
    width: 75%;
    justify-content: space-between;
    border-bottom: 2px solid black;
    margin: 1rem 0;
    button {
      border-radius: 0.25rem 0.25rem 0 0;
      border: 1px solid grey;
      border-bottom: 0px;
      width: 33%;
      color: grey;
      cursor: pointer;
      h3 {
        font-size: 1.25rem;
        font-family: 'Barlow';
        padding: 0.5rem 1rem;
        color: inherit;
      }
    }
    .active {
      color: black;
      border-color: black;
      border-width: 2px;
    }
  }

  .page {
    width: 80%;
  }

  fieldset {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  label {
    font-weight: bold;
    line-height: 3;
    white-space: nowrap;
    margin: 0.5rem 0;
    margin-right: 1rem;
  }

  input {
    width: 3rem;
    margin: 0 0.125rem;
  }
  input[type='date'] {
    width: 5rem;
  }

  input[type='text'],
  select {
    width: 7rem;
  }

  textarea {
    display: block;
    width: 100%;
    height: 5rem;
  }
  .error {
    font-size: 0.75rem;
    color: red;
    font-weight: lighter;
    display: inline-block;
  }
  .submitButton {
    width: 20%;
    margin: 1rem;
  }
`;
