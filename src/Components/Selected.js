/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { StationCard } from './Search';

export default function Selected({
  selected,
  isCustomer,
  onRemoveStation,
  onRemoveAll,
  onStationClick,
}) {
  if (!selected || selected.length === 0) return null;

  return (
    <Wrapper
      style={{
        position: 'absolute',
        left: isCustomer ? '' : '15%',
        right: isCustomer ? '15%' : '',
      }}
    >
      <div className="Selected">
        <h2>{isCustomer ? 'Customer' : 'Power'}</h2>
        <p className="SmallButton" onClick={onRemoveAll}>
          Clear all
        </p>
        {selected.map((station) => {
          return (
            <StationCard
              station={station}
              key={station.name}
              onRemoveClick={onRemoveStation}
              onClick={onStationClick}
              className={station.showLabel ? 'active' : ''}
            />
          );
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: white;
  padding: 1.5rem;
  width: 15rem;
  z-index: 999;

  .Result {
    :hover {
      background-color: yellow;
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
    transform: scale(1.4);
    :hover {
      cursor: pointer;
    }
  }

  .SmallButton {
    color: red;
    font-weight: bold;
    :hover {
      cursor: pointer;
    }
  }
`;
