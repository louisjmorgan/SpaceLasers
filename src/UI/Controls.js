/* eslint-disable import/no-cycle */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Suspense, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../App';

const Controls = ({ time }) => {
  const { dispatch } = useContext(Context);
  const handleAnimationSpeed = (e) => {
    dispatch({
      type: 'set speed',
      speed: e.target.value,
    });
  };
  return (
    <ControlsWrapper>
      <Suspense fallback={null}>
        <p>{time.toString().slice(0, 24)}</p>
      </Suspense>
      <input
        type="range"
        id="speed"
        name="speed"
        min="1"
        max="60000"
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
  z-index: 999;
  width: 20rem;
  p {
    font-family: 'Barlow';
    color: white;
    font-size: 1rem;
    margin: 0 auto;
    width: 100%;
  }
  input {
    width: 80%;
  }

  @media only screen and (max-width: 1200px) {
    top: 80%;
  }
`;

export default Controls;
