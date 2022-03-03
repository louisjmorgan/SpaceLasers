/* eslint-disable import/no-cycle */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Suspense, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../App';

const Controls = ({ time }) => {
  const { dispatch } = useContext(Context);

  const handlePause = () => {
    dispatch({
      type: 'pause time',
      paused: !time.paused,
    });
  };

  const handleAnimationSpeed = (e) => {
    dispatch({
      type: 'set speed',
      speed: e.target.value,
    });
  };
  return (
    <ControlsWrapper>
      <Suspense fallback={null}>
        <p>{time.current.toString().slice(0, 21)}</p>
      </Suspense>
      <input
        type="range"
        id="speed"
        name="speed"
        min={600}
        max={6000}
        onInput={handleAnimationSpeed}
      />
      <button type="button" onClick={handlePause}>
        {time.paused ? 'Resume' : 'Pause'}
      </button>
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
    width: 75%;
  }

  @media only screen and (max-width: 1200px) {
    top: 80%;
  }
`;

export default Controls;
