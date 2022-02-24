/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Context } from '../App';

const StationCard = ({
  station,
  onClick,
  onRemoveClick,
  active,
  toggleLabel,
  attachCamera,
  ui,
}) => {
  const netCurrent = useRef(0);
  useEffect(() => {
    const profiles = station.profiles.get(ui.chargeSources);
    netCurrent.current = profiles.get(ui.currentDuty).toFixed(3);
  }, [ui.currentDuty, ui.currentSources]);

  return (
    <div className="satellite" onClick={(e) => onClick(station)}>
      <div className="header">
        <h3 onClick={(e) => toggleLabel(station)}>{station.name}</h3>

        {onRemoveClick && (
          <span
            className="remove"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveClick(station);
            }}
          >
            x
          </span>
        )}
      </div>
      <div>
        <button type="button" onClick={(e) => toggleLabel(station)}>
          {active ? 'Hide Label' : 'Show Label'}
        </button>
        <button type="button" onClick={(e) => attachCamera(station)}>
          Attach Camera
        </button>
      </div>
      <div className="performance">
        <h4>Performance</h4>
        <p>
          Charge:
          {` ${ui.chargeState}%`}
        </p>
        <p>
          Current Duty:
          {` ${ui.currentDuty}`}
        </p>
        <p>
          Charge Source:
          {` ${ui.chargeSources}`}
        </p>
        <p>
          Net Current:
          {` ${netCurrent.current}A`}
        </p>
      </div>
    </div>
  );
};

export default function Selected({ selected, isCustomer, uiMap }) {
  if (!selected || selected.length === 0) return null;

  const { dispatch, dispatchUI } = useContext(Context);

  function toggleLabel(sat) {
    dispatchUI({
      type: 'toggle label',
      name: sat.name,
    });
  }

  function attachCamera(sat) {
    dispatchUI({
      type: 'attach camera',
      name: sat.name,
    });
  }

  const onRemoveAll = () => {
    dispatch({
      type: 'remove all',
      isCustomer,
    });
  };

  const onRemoveStation = (station) => {
    dispatch({
      type: 'remove satellite',
      isCustomer,
      sat: station,
    });
    dispatchUI({
      type: 'remove satellite',
      isCustomer,
      sat: station,
    });
  };
  return (
    <Wrapper>
      <h2>{isCustomer ? 'Satellites' : 'Power'}</h2>
      <p className="clear-all" onClick={onRemoveAll}>
        Clear all
      </p>
      <StyledSatelliteList>
        {selected.map((station) => {
          return (
            <StationCard
              station={station}
              key={station.name}
              onRemoveClick={onRemoveStation}
              toggleLabel={toggleLabel}
              attachCamera={attachCamera}
              active={
                uiMap.get(station.name).showLabel ? 'active' : ''
              }
              ui={uiMap.get(station.name)}
              isCustomer={isCustomer}
            />
          );
        })}
      </StyledSatelliteList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: white;
  background-color: rgba(0.1, 0.1, 0.1, 0.1);
  padding: 1.5rem 1.5rem 0;
  z-index: 999;

  h2 {
    font-weight: bold;
    font-size: 1.75rem;
    padding: 1rem 0;
  }
  h3 {
    font-weight: bold;
    font-size: 1rem;
    padding: 1.5rem 0;
  }
  h4 {
    font-weight: bold;
    font-size: 1rem;
    padding: 1.25rem 0;
  }
  .clear-all {
    color: red;
    font-weight: bold;
    padding-bottom: 1rem;
    :hover {
      cursor: pointer;
    }
  }
`;
const StyledSatelliteList = styled.div`
  .satellite {
    z-index: 999;
    overflow-x: hidden;
    padding: 1rem 1rem 1rem 0;
    &.active {
      background-color: yellow;
    }
    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      h3 {
        cursor: pointer;
        margin-right: 2rem;
      }
      button {
        margin-right: 2rem;
        width: 12ch;
      }
    }
  }

  .remove {
    color: red;
    z-index: 9999;
    transform: scale(1.4);
    :hover {
      cursor: pointer;
    }
  }
`;
