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
      {/* <Suspense fallback={null}>
        <p>{time.current.toString().slice(0, 21)}</p>
      </Suspense> */}
      <button type="button" className="header" onClick={handleOpen}>
        <h3>
          <div>Controls</div>
          <div className={`${isOpen ? 'open' : ''}`}>▲</div>
        </h3>
      </button>
      <div className={`${isOpen ? 'open' : ''} container`}>
        <h4>Animation</h4>
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
        <h4>Camera</h4>
        <label htmlFor="attach-camera">
          Attach:
          <select onChange={handleAttach} value={cameraTarget.name}>
            <option value="earth">Earth</option>
            {options.current}
          </select>
        </label>

        <div className="lock">
          <label htmlFor="lock">
            Lock:
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
      </div>
    </ControlsWrapper>
  );
};

const ControlsWrapper = styled.div`
  position: fixed;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  width: 20rem;
  padding: 1rem;
  color: white;
  backdrop-filter: blur(2px);
  background-color: rgba(0.1, 0.1, 0.1, 0.25);
  border-radius: 0.5rem;

  .header {
    background: transparent;
    color: white;
    border: none;
    margin: 0 auto;
    text-align: center;
    width: 100%;
    padding: 0;
    cursor: pointer;
    h3 {
      display: flex;
      justify-content: space-around;
      font-size: 1.25rem;
      padding: 0.5rem;
      text-align: center;
      div {
        transition: 0.2s ease-in-out;
      }
      div.open {
        transform: rotate(180deg);
      }
    }
  }

  .container {
    display: none;
    &.open {
      display: block;
    }
  }

  h4 {
    text-align: left;
    padding: 0.5rem;
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
