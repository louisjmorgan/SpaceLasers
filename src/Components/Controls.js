/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import styled from 'styled-components';

const Controls = ({ simTime, handleAnimationSpeed }) => {
  return (
    <ControlsWrapper>
      <Suspense fallback={null}>
        <p>{simTime.toString()}</p>
      </Suspense>
      <input
        type="range"
        id="speed"
        name="speed"
        min="600"
        max="21110"
        onInput={handleAnimationSpeed}
      />
    </ControlsWrapper>
  );
};

const ControlsWrapper = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  top: 20%;
  z-index: 99999;
  width: 20rem;
  p {
    font-family: 'sans-serif';
    color: white;
    font-size: 1rem;
    margin: 0 auto;
  }
  input {
    width: 80%;
  }

  @media only screen and (max-width: 1200px) {
    top: 80%;
  }
`;

export default Controls;
