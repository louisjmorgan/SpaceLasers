/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { twoline2satrec, generateTLE } from '../Utils/TLE';
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

  const [details, setDetails] = useState(initDetails);

  const handleName = (e) => {
    setDetails((prev) => {
      return {
        ...prev,
        name: e.target.value,
      };
    });
  };

  const handleSize = (e) => {
    setDetails((prev) => {
      return {
        ...prev,
        size: e.target.value,
      };
    });
  };

  const [orbitElements, setOrbitElements] = useState(initOrbit);

  const handleEpoch = (e) => {
    setOrbitElements((prev) => {
      return {
        ...prev,
        epoch: new Date(e.target.value),
      };
    });
  };

  const handleMeanMotionDot = (e) => {
    setOrbitElements((prev) => {
      return {
        ...prev,
        meanMotionDot: parseFloat(e.target.value),
      };
    });
  };

  const handleBstar = (e) => {
    setOrbitElements((prev) => {
      return {
        ...prev,
        bstar: parseFloat(e.target.value),
      };
    });
  };

  const handleInclination = (e) => {
    setOrbitElements((prev) => {
      return {
        ...prev,
        inclination: parseFloat(e.target.value),
      };
    });
  };

  const handleRightAscension = (e) => {
    setOrbitElements((prev) => {
      return {
        ...prev,
        rightAscension: parseFloat(e.target.value),
      };
    });
  };

  const handleEccentricity = (e) => {
    setOrbitElements((prev) => {
      return {
        ...prev,
        eccentricity: parseFloat(e.target.value),
      };
    });
  };

  const handlePerigee = (e) => {
    setOrbitElements((prev) => {
      return {
        ...prev,
        perigee: parseFloat(e.target.value),
      };
    });
  };

  const handleMeanAnomaly = (e) => {
    setOrbitElements((prev) => {
      return {
        ...prev,
        meanAnomaly: parseFloat(e.target.value),
      };
    });
  };

  const handleMeanMotion = (e) => {
    setOrbitElements((prev) => {
      return {
        ...prev,
        meanMotion: parseFloat(e.target.value),
      };
    });
  };

  const handleStationSelect = (e) => {
    const { tles, name } = allStations.get(e.target.value);
    console.log(tles);
    const newOrbit = twoline2satrec(tles.tle1, tles.tle2);
    setOrbitElements((prev) => {
      return {
        ...prev,
        epoch: new Date(
          (newOrbit.jdsatepoch - (2433281.5 + 7306)) * 8.64e7
        ),
        meanMotionDot: newOrbit.ndottle,
        bstar: newOrbit.bstar,
        inclination: newOrbit.inclotle,
        rightAscension: newOrbit.nodeotle,
        eccentricity: newOrbit.ecco,
        perigee: newOrbit.argpotle,
        meanAnomaly: newOrbit.motle,
        meanMotion: newOrbit.notle,
      };
    });
    setDetails((prev) => {
      return {
        ...prev,
        name,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTLE = generateTLE(orbitElements);
    console.log(details);
    dispatch({
      type: 'add satellite',
      tles: newTLE,
      name: details.name,
      size: details.size,
      isCustomer: true,
    });
    dispatchUI({
      type: 'add satellite',
      name: details.name,
    });
    closeModal();
    setOrbitElements(initOrbit);
    setDetails(initDetails);
  };

  const options = [];
  allStations.forEach((entry, stationName) => {
    options.push(
      <option key={stationName} value={stationName}>
        {stationName}
      </option>
    );
  });
  return (
    <div>
      {isModal ? (
        <FormContainer ref={modalRef} onClick={handleClose}>
          <StyledForm>
            <fieldset>
              <legend>Details</legend>
              <label htmlFor="name">
                Name:
                <input
                  name="name"
                  type="text"
                  value={details.name}
                  onChange={(e) => handleName(e)}
                />
              </label>
              <label htmlFor="size">
                Size:
                <input
                  name="size"
                  type="number"
                  value={details.size}
                  onChange={(e) => handleSize(e)}
                />
              </label>
            </fieldset>
            <fieldset>
              <legend>Orbit</legend>
              <label htmlFor="stations">
                Choose existing:
                <select
                  onChange={(e) => handleStationSelect(e)}
                  name="stations"
                >
                  {options}
                </select>
              </label>
              <fieldset>
                <label htmlFor="epoch">
                  Epoch:
                  <input
                    name="epoch"
                    value={orbitElements.epoch.toLocaleDateString(
                      'en-ca'
                    )}
                    onChange={(e) => handleEpoch(e)}
                    type="date"
                  />
                </label>
                <label htmlFor="meanMotionDot">
                  Mean Motion 1st Derivative:
                  <input
                    name="meanmotionDot"
                    value={orbitElements.meanMotionDot.toFixed(8)}
                    onChange={(e) => handleMeanMotionDot(e)}
                    type="number"
                  />
                </label>
                <label htmlFor="bstar">
                  BSTAR (drag):
                  <input
                    name="bstar"
                    value={orbitElements.bstar}
                    onChange={(e) => handleBstar(e)}
                    type="number"
                  />
                </label>
                <label htmlFor="inclination">
                  Inclination (degrees):
                  <input
                    name="inclination"
                    value={orbitElements.inclination}
                    onChange={(e) => handleInclination(e)}
                    type="number"
                  />
                </label>
                <label htmlFor="rightAscension">
                  Right Ascension (degrees):
                  <input
                    name="rightAscension"
                    value={orbitElements.rightAscension}
                    onChange={(e) => handleRightAscension(e)}
                    type="number"
                  />
                </label>
                <label htmlFor="eccentricity">
                  Eccentricity:
                  <input
                    name="eccentricity"
                    value={orbitElements.eccentricity}
                    onChange={(e) => handleEccentricity(e)}
                    type="number"
                  />
                </label>
                <label htmlFor="perigee">
                  Perigee (degrees):
                  <input
                    name="perigee"
                    value={orbitElements.perigee}
                    onChange={(e) => handlePerigee(e)}
                    type="number"
                  />
                </label>
                <label htmlFor="meanAnomaly">
                  Mean Anomaly (degrees):
                  <input
                    name="meanAnomaly"
                    value={orbitElements.meanAnomaly}
                    onChange={(e) => handleMeanAnomaly(e)}
                    type="number"
                  />
                </label>
                <label htmlFor="meanMotion">
                  Mean Motion (revs per day):
                  <input
                    name="meanMotion"
                    value={orbitElements.meanMotion}
                    onChange={(e) => handleMeanMotion(e)}
                    type="number"
                  />
                </label>
              </fieldset>
            </fieldset>
            <button type="button" onClick={(e) => handleSubmit(e)}>
              Add
            </button>
          </StyledForm>
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
  button {
    width: 20%;
    margin: 1rem;
  }
`;
