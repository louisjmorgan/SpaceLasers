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
import { getOrbitAtTime } from '../Model/SatReducer';
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

  const { dispatch, dispatchUI } = useContext(Context);

  const handleStationSelect = (e) => {
    const { tles, name } = allStations.get(e.target.value);
    console.log(tles);
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
    };
  };

  const handleAddSatellite = (values) => {
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
    const newTLE = generateTLE(orbitElements);
    const test = { orbit: twoline2satrec(newTLE.tle1, newTLE.tle2) };
    try {
      const pos = getOrbitAtTime(test, new Date());
      dispatchUI({
        type: 'add satellite',
        name: values.name,
      });
      dispatch({
        type: 'add satellite',
        tles: newTLE,
        name: values.name,
        size: values.size,
        isCustomer: true,
      });
      closeModal();
    } catch {
      return new Error(
        'Unable to propagate orbital parameters, please try different values'
      );
    }

    // setOrbitElements(initOrbit);
    // setDetails(initDetails);
  };

  const options = [];
  allStations.forEach((entry, stationName) => {
    options.push(
      <option key={stationName} value={stationName}>
        {stationName}
      </option>
    );
  });

  const SatelliteSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    size: Yup.number()
      .min(1, 'Size must be 1 or more!')
      .max(6, 'Size must be 6 or less!')
      .required('Required'),
    existing: Yup.string().oneOf(options),
    epoch: Yup.date().required('Required'),
    meanMotionDot: Yup.number()
      .min(-1, 'Must be more than -1')
      .max(1, 'Must be less than 1')
      .required('Required'),
    bstar: Yup.number()
      .min(-1, 'Must be between -1 and 1')
      .max(1, 'Must be between -1 and 1')
      .required('Required'),
    inclination: Yup.number()
      .min(0, 'Must be 0-360°')
      .max(360, 'Must be 0-360°')
      .required('Required'),
    rightAscension: Yup.number()
      .min(0, 'Must be 0-360°')
      .max(360, 'Must be 0-360°')
      .required('Required'),
    eccentricity: Yup.number()
      .min(0, 'Must be between 0 and 1')
      .max(1, 'Must be between 0 and 1')
      .required('Required'),
    perigee: Yup.number()
      .min(0, 'Must be 0-360°')
      .max(360, 'Must be 0-360°')
      .required('Required'),
    meanAnomaly: Yup.number()
      .min(0, 'Must be 0-360°')
      .max(360, 'Must be 0-360°')
      .required('Required'),
    meanMotion: Yup.number()
      .min(0, 'Must be greater than 1')
      .max(16, 'Must be less than 16')
      .required('Required'),
  });

  return (
    <div>
      {isModal ? (
        <FormContainer ref={modalRef} onClick={handleClose}>
          <Formik
            initialValues={{
              epoch: new Date().toLocaleDateString('en-ca'),
              meanMotionDot: 0.00001,
              bstar: 0.01,
              inclination: 0,
              rightAscension: 0,
              eccentricity: 0,
              perigee: 0,
              meanAnomaly: 0,
              meanMotion: 13,
              name: '',
              size: 1,
            }}
            validationSchema={SatelliteSchema}
            onSubmit={(values, { setStatus }) => {
              console.log(values);
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
                <fieldset>
                  <legend>Details</legend>
                  <label htmlFor="name">
                    Name:
                    <Field name="name" />
                    <ErrorMessage
                      component="p"
                      className="error"
                      name="name"
                    />
                  </label>
                  <label htmlFor="size">
                    Size:
                    <Field name="size" type="number" />
                    <ErrorMessage
                      component="p"
                      className="error"
                      name="size"
                    />
                  </label>
                </fieldset>
                <fieldset>
                  <legend>Orbit</legend>
                  <label htmlFor="existing">
                    Choose existing:
                    <Field
                      name="existing"
                      as="select"
                      onChange={(e) => {
                        const newValues = handleStationSelect(e);
                        console.log(newValues);
                        Object.entries(newValues).forEach((entry) => {
                          setFieldValue(entry[0], entry[1]);
                        });
                      }}
                    >
                      <option value="">Select orbit</option>
                      {options}
                    </Field>
                  </label>
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
                      <Field name="rightAscension" type="number" />
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
                </fieldset>
                <div className="error">{status}</div>
                <button type="submit">Add</button>
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
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
`;

const StyledForm = styled.form`
  width: 40rem;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  position: relative;
  color: black;
  animation: animate 0.3s;
  fieldset {
    display: block;
    width: 90%;
  }
  label {
    margin: 1rem;
    font-weight: bold;
    line-height: 3;
    white-space: nowrap;
  }
  legend {
    padding: 1.5rem;
    font-size: 1.5rem;
    font-weight: bold;
  }

  input {
    margin-left: 0.25rem;
    padding: 0.25rem;
    width: 15%;
  }
  input[type='date'],
  input[type='text'] {
    width: 30%;
  }
  select {
    margin-left: 0.25rem;
    width: 25%;
  }
  .error {
    font-size: 0.75rem;
    margin-left: 0.25rem;
    color: red;
    font-weight: lighter;
    display: inline-block;
  }
  button {
    width: 20%;
    margin: 1rem;
  }
`;
