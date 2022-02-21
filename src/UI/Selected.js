/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const StationCard = ({
  station,
  onClick,
  onRemoveClick,
  className,
  isCustomer,
  ui,
}) => {
  return (
    <div
      className={`Result ${className || ''}`}
      onClick={(e) => onClick(station)}
    >
      <p>
        <span className="Name">{station.name}</span>

        {onRemoveClick && (
          <span
            className="RemoveButton"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveClick(station);
            }}
          >
            x
          </span>
        )}
      </p>
      {isCustomer ? (
        <div className="performance">
          <p>{`${ui.chargeState}%`}</p>
          <p>{`${ui.currentDuty}`}</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default function Selected({
  selected,
  isCustomer,
  dispatch,
  dispatchUI,
  uiMap,
}) {
  if (!selected || selected.length === 0) return null;

  function toggleLabel(sat) {
    dispatchUI({
      type: 'toggle label',
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
      <div className="Selected">
        <h2>{isCustomer ? 'Customer' : 'Power'}</h2>
        <p className="SmallButton" onClick={onRemoveAll}>
          Clear all
        </p>
        <div className="Stations">
          {selected.map((station) => {
            return (
              <StationCard
                station={station}
                key={station.name}
                onRemoveClick={onRemoveStation}
                onClick={toggleLabel}
                className={
                  uiMap.get(station.name).showLabel ? 'active' : ''
                }
                ui={uiMap.get(station.name)}
                isCustomer={isCustomer}
              />
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 100%;
  .Selected {
    background-color: white;
    padding: 1.5rem 1.5rem 0;
    z-index: 999;
    width: 17rem;
    max-width: 100%;
    height: 15rem;
  }
  h2 {
    font-weight: bold;
    font-size: 1.25rem;
    padding: 1rem 0;
  }
  .SmallButton {
    color: red;
    font-weight: bold;
    padding-bottom: 1rem;
    :hover {
      cursor: pointer;
    }
  }
  .Stations {
    max-height: 10rem;
    overflow-y: scroll;

    .Result {
      z-index: 999;
      max-width: 100%;
      overflow-x: hidden;
      padding: 1rem 1rem 1rem 0;
      :hover {
        background-color: grey;
        cursor: pointer;
      }
      &.active {
        background-color: yellow;
      }
      p {
        display: flex;
        justify-content: space-between;
      }
    }

    .RemoveButton {
      color: red;
      z-index: 9999;
      transform: scale(1.4);
      :hover {
        cursor: pointer;
      }
    }
  }
`;
