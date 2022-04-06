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
import React, {
  useContext,
  useRef,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { Context } from '../App';

const StationCard = ({ station, onClick, active }) => {
  return (
    <li
      className={`${active ? 'active' : ''} satellite`}
      onClick={(e) => onClick(station)}
    >
      <p>{station.name}</p>

      {/* {onRemoveClick && (
          <span
            className="remove"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveClick(station);
            }}
          >
            x
          </span>
        )} */}
      {/* <div>
        <button type="button" onClick={(e) => toggleLabel(station)}>
          {active ? 'Hide Label' : 'Show Label'}
        </button>
        <button type="button" onClick={(e) => attachCamera(station)}>
          Attach Camera
        </button>
      </div> */}
    </li>
  );
};

const DetailsPanel = ({ station, ui }) => {
  const { dispatch, dispatchUI, cameraTarget } = useContext(Context);

  function toggleLabel(sat) {
    dispatchUI({
      type: 'toggle label',
      name: sat.name,
    });
  }

  function detachCamera() {}

  function attachCamera(sat) {
    if (cameraTarget.current.name !== sat.name) {
      dispatchUI({
        type: 'attach camera',
        name: sat.name,
      });
    } else {
      dispatchUI({
        type: 'detach camera',
      });
    }
  }

  const removeStation = () => {
    dispatchUI({
      type: 'detach camera',
    });
    dispatch({
      type: 'remove satellite',
      isCustomer: true,
      sat: station,
    });
    dispatchUI({
      type: 'remove satellite',
      isCustomer: true,
      sat: station,
    });
  };

  const netCurrent = useRef(0);

  useEffect(() => {
    const profiles = station.profiles.get(ui.chargeSources);
    netCurrent.current = profiles.get(ui.currentDuty).toFixed(3);
  }, [ui.currentDuty, ui.currentSources]);

  const tabs = ['performance', 'parameters', 'actions'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <StyledDetailsPanel>
      <div className="tabs">
        {tabs.map((tab) => {
          return (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tabbutton ${
                activeTab === tab ? 'active' : ''
              }`}
            >
              <h3>{tab}</h3>
            </button>
          );
        })}
      </div>
      {activeTab === 'performance' ? (
        <div className="tab performance">
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
      ) : (
        ''
      )}
      {activeTab === 'parameters' ? (
        <div className="tab parameters">
          <div>
            <h4>Photovoltaic</h4>
            <p>
              Voltage:
              {` ${station.pv.voltage}V`}
            </p>
            <p>
              Current Density:
              {` ${station.pv.currentDensity}A/m²`}
            </p>
            <p>
              Area:
              {` ${station.pv.area}m²`}
            </p>
          </div>
          <div>
            <h4>Battery</h4>
            <p>
              Voltage:
              {` ${station.battery.voltage}V`}
            </p>
            <p>
              Capacity:
              {` ${station.battery.capacity}Ah`}
            </p>
          </div>
          <div>
            <h4>Duty</h4>
            <div>
              <h5>Power Storing</h5>
              <p>
                Consumption:
                {` ${station.load.powerStoring.consumption}W`}
              </p>
            </div>
            <div>
              <h5>Overpower</h5>
              <p>
                Consumption:
                {` ${station.load.overPower.consumption}W`}
              </p>
              <p>
                Duration:
                {` ${station.load.overPower.duration}s`}
              </p>
              <p>
                Cycles:
                {` ${station.load.overPower.cycles} per orbit`}
              </p>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {activeTab === 'actions' ? (
        <div className="tab actions">
          <button type="button" onClick={() => toggleLabel(station)}>
            Toggle Label
          </button>
          <button type="button" onClick={() => removeStation()}>
            Remove Satellite
          </button>
          <button type="button" onClick={() => attachCamera(station)}>
            {cameraTarget.current.name === station.name
              ? 'Detach Camera'
              : 'Attach Camera'}
          </button>
        </div>
      ) : (
        ''
      )}
    </StyledDetailsPanel>
  );
};

export default function Selected({ selected, uiMap }) {
  if (!selected || selected.length === 0) return null;

  const [activeStation, setActiveStation] = useState(selected[0]);

  return (
    <Wrapper>
      <StyledSatelliteList>
        {selected.map((station) => {
          return (
            <StationCard
              station={station}
              key={station.name}
              onClick={() => setActiveStation(station)}
              active={station.name === activeStation.name}
            />
          );
        })}
      </StyledSatelliteList>
      <DetailsPanel
        station={activeStation}
        ui={uiMap.get(activeStation.name)}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: white;
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem;
  padding-left: 0;
  z-index: 999;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid white;

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

  h5 {
    font-weight: 400;
    font-style: italic;
  }
`;

const StyledSatelliteList = styled.ul`
  width: 10rem;
  max-width: 20%;
  overflow-y: auto;
  .satellite {
    z-index: 999;
    cursor: pointer;
    padding: 0.25rem;
    text-align: center;
    &.active {
      background-color: white;
      color: rgba(27, 24, 31, 1);
    }
  }
`;

const StyledDetailsPanel = styled.div`
  width: 80%;

  border-left: 1px solid white;
  padding-left: 1.5rem;

  .tabs {
    display: flex;
    align-items: center;
    border-bottom: 1px solid white;
    .tabbutton {
      border-radius: 0.25rem 0.25rem 0 0;
      padding: 0.25rem;
      border: 1px solid rgba(256, 256, 256, 0.4);
      border-bottom: 0px;
      background: transparent;
      color: rgba(256, 256, 256, 0.4);
      font-weight: 400;
      cursor: pointer;
      h3 {
        font-size: 0.75rem;
        font-family: 'Barlow';
        padding: 0.25rem 0.5rem;
        color: inherit;
        font-weight: inherit;
        text-transform: capitalize;
      }
    }
    .active {
      border: 1px solid white;
      border-bottom: 0px;
      color: white;
      font-weight: bold;
    }
  }

  .tab {
    padding: 1.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    p,
    button {
      background: transparent;
      padding: 1rem;
      min-width: 30ch;
      text-transform: capitalize;
    }

    button {
      border: 1px solid white;
      border-radius: 5px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      :hover {
        background-color: white;
        color: rgba(27, 24, 31, 1);
        mix-blend-mode: lighten;
      }
    }
    .div {
      display: flex;
      flex-direction: column;
    }
  }
`;
