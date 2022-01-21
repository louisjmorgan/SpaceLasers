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
        <span title={noradId ? `NORAD ID: ${noradId}` : null}>
          {station.name}
        </span>
        {onRemoveClick && (
          <span
            className="RemoveButton"
            onClick={(e) => onRemoveClick(station)}
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
    <SearchWrapper
      style={{
        position: 'absolute',
        left: isCustomer ? '' : '5%',
        right: isCustomer ? '5%' : '',
      }}
      className="Search"
    >
      <SearchBox
        value={searchText}
        onChange={handleSearchChanged}
        placeholder={isCustomer ? 'Add Customer' : 'Add Power'}
      />
      <SearchResults
        stations={stations}
        searchText={searchText}
        onResultClick={onResultClick}
      />
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  background-color: white;
  max-width: 15rem;
  overflow-x: hidden;
  z-index: 999;
  .SearchBox {
    padding: 1rem;
  }
  .ResultsWrapper {
    max-height: 50rem;
    overflow-y: scroll;
    line-height: 1;
    max-width: 14.5rem;
  }

  .Result {
    border-bottom: 1px solid black;
    padding-bottom: 0.5rem;
    overflow-x: hidden;
    cursor: pointer;
    :hover {
      background-color: yellow;
    }
  }
`;

export { Search, StationCard };
