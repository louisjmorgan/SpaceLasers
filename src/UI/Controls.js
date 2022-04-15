/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, {
  Suspense,
  useContext,
  useRef,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { Context } from '../App';

const Controls = ({ time, satellites, cameraTarget }) => {
  const { dispatch, dispatchUI } = useContext(Context);

  const options = useRef([]);
  useEffect(() => {
    options.current = [];
    satellites.forEach((sat) => {
      options.current.push(
        <option key={sat.name} value={sat.name}>
          {sat.name}
        </option>
      );
    });
  }, [satellites]);

  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(() => !isOpen);
  };

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

  const handleAttach = (e) => {
    const target = e.target.value;
    if (target === 'earth') {
      dispatchUI({
        type: 'detach camera',
      });
    } else {
      dispatchUI({
        type: 'attach camera',
        name: target,
      });
    }
  };

  const handleCameraDistance = (e) => {
    dispatchUI({
      type: 'set camera distance',
      distance: e.target.value,
    });
  };

  const handleLock = (e) => {
    let lock;
    if (e.target.value === 'lock') {
      lock = true;
    } else {
      lock = false;
    }
    dispatchUI({
      type: 'set camera lock',
      lock,
    });
  };

  return (
    <ControlsWrapper>
      <button type="button" className="header" onClick={handleOpen}>
        <h3>
          <div>Controls</div>
          <div className={`${isOpen ? 'open' : ''} arrow`}>▲</div>
        </h3>
      </button>
      <div className={`${isOpen ? 'open' : ''} container`}>
        <h4>Animation</h4>
        <fieldset>
          <button type="button" onClick={handlePause}>
            {time.paused ? 'Resume' : 'Pause'}
          </button>
          <label htmlFor="speed">
            Speed:
            <input
              type="range"
              id="speed"
              name="speed"
              min={120}
              max={6000}
              defaultValue={600}
              onInput={handleAnimationSpeed}
            />
          </label>
        </fieldset>
        <h4>Camera</h4>
        <fieldset>
          <label htmlFor="attach-camera">
            Attach:
            <select onChange={handleAttach} value={cameraTarget.name}>
              <option value="earth">Earth</option>
              {options.current}
            </select>
          </label>

          <div className="lock">
            <label htmlFor="lock">
              Follow:
              <input
                type="radio"
                name="lock"
                checked={cameraTarget.lock}
                onChange={handleLock}
                value="lock"
                disabled={cameraTarget.name === 'earth'}
              />
            </label>
            <label htmlFor="watch">
              Watch:
              <input
                type="radio"
                name="lock"
                checked={!cameraTarget.lock}
                onChange={handleLock}
                value="watch"
                disabled={cameraTarget.name === 'earth'}
              />
            </label>
          </div>
        </fieldset>
      </div>
    </ControlsWrapper>
  );
};

const ControlsWrapper = styled.div`
  position: fixed;
  margin-top: auto;
  margin-bottom: auto;
  right: 0;
  top: 40%;
  /* transform: translate(-50%, -50%); */
  z-index: 9999;
  padding: 1rem;
  color: white;
  backdrop-filter: blur(2px);
  background-color: rgba(0.1, 0.1, 0.1, 0.25);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: start;

  .header {
    background: transparent;
    color: white;
    border: none;
    margin: 0 auto;
    text-align: center;
    padding: 0;
    cursor: pointer;
    h3 {
      display: flex;
      justify-content: space-around;
      font-size: 1.25rem;
      padding: 0.5rem;
      text-align: center;
      writing-mode: vertical-lr;
      transform: rotate(180deg);
      transition: 0.2s ease-in-out;
      div.arrow {
        transform: rotate(90deg);
      }
      div.open {
        transform: rotate(270deg);
      }
    }
  }

  .container {
    position: relative;
    padding: 1rem;
    display: none;
    max-width: 20rem;
    &.open {
      display: flex;
      flex-direction: column;
    }
  }

  fieldset {
    display: flex;
    flex-wrap: wrap;
  }

  h4 {
    text-align: left;
    padding: 0.5rem;
    display: block;
    width: 100%;
  }
  p {
    font-family: 'Barlow';
    color: white;
    font-size: 1rem;
    margin: 0 auto;
    width: 100%;
  }
  input[type='range'],
  select {
    width: 50%;
    margin-left: 0.25rem;
  }

  select {
    overflow-x: visible;
    width: 4.5rem;
  }

  label {
    white-space: nowrap;
    display: flex;
    justify-content: start;
    padding: 0.5rem;
  }

  button {
    margin: 0.5rem;
    padding: 0.5rem;
  }

  .lock {
    display: flex;
  }
`;

export default Controls;
