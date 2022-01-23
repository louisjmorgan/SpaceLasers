/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';

const MaxSearchResults = 50;

const filterResults = (stations, searchText) => {
  if (!stations) return null;
  if (!searchText || searchText === '') return null;

  const regex = new RegExp(searchText, 'i');

  return stations
    .filter((station) => regex.test(station.name))
    .slice(0, MaxSearchResults);
};

const SearchResults = ({ stations, searchText, onResultClick }) => {
  const results = filterResults(stations, searchText);
  if (!results) return null;

  return (
    <div className="ResultsWrapper">
      {results.map((result, i) => (
        <StationCard
          key={result.name + i}
          station={result}
          onClick={onResultClick}
        />
      ))}
    </div>
  );
};

const StationCard = ({
  station,
  onClick,
  onRemoveClick,
  className,
}) => {
  const noradId = station.satrec && station.satrec.satnum;

  return (
    <div
      className={`Result ${className || ''}`}
      onClick={(e) => onClick(station)}
    >
      <p>
        <span
          className="Name"
          title={noradId ? `NORAD ID: ${noradId}` : null}
        >
          {station.name}
        </span>
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
    </div>
  );
};

const SearchBox = ({ value, onChange, placeholder }) => {
  return (
    <input
      className="SearchBox"
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

const Search = ({ stations, onResultClick, isCustomer }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChanged = (val) => {
    setSearchText(val);
  };

  return (
    <SearchWrapper className="Search">
      <div className="SearchBoxContainer">
        <SearchBox
          value={searchText}
          onChange={handleSearchChanged}
          placeholder={isCustomer ? 'Add Customer' : 'Add Power'}
        />
      </div>
      <SearchResults
        stations={stations}
        searchText={searchText}
        onResultClick={onResultClick}
      />
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  max-width: 100%;
  .SearchBoxContainer {
    overflow-x: hidden;
    padding: 1.5rem 1.5rem 1.5rem;
    z-index: 999;
    width: 17rem;
    max-width: 100%;
    background-color: white;
    .SearchBox {
      padding: 1rem;
      width: 15rem;
      max-width: 100%;
    }
  }

  .ResultsWrapper {
    position: relative;
    top: -1.5rem;
    left: 1.5rem;
    z-index: 9999;
    background-color: white;
    border: solid black 2px;
    border-bottom: 1px;
    max-height: 20rem;
    overflow-y: scroll;
    overflow-x: hidden;
    line-height: 1;
    width: 17rem;
    max-width: 100%;
  }

  .Result {
    border-bottom: 1px solid black;
    padding: 0.5rem;
    width: 100%;
    p span {
      overflow-x: hidden;
      width: 100%;
    }
    cursor: pointer;
    :hover {
      background-color: yellow;
    }
  }
`;

export { Search, StationCard };
