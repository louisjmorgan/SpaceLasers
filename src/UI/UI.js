/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useContext, Suspense } from 'react';
import styled from 'styled-components';
import { Form } from 'formik';
import { Selected } from './Selected';
import AddSatForm from './AddSatForm';
import Charts from './Charts';
import { Context } from '../App';

const UI = ({ allStations, customerSats, uiMap, time }) => {
  const [isModal, setModal] = useState(false);
  const closeModal = (e) => {
    setModal(false);
  };

  const [isDetails, setDetails] = useState(true);

  const onShowHide = () => {
    setDetails(() => !isDetails);
  };

  const { dispatch, dispatchUI } = useContext(Context);

  const onRemoveAll = () => {
    dispatchUI({
      type: 'detach camera',
    });
    dispatch({
      type: 'remove all',
      isCustomer: true,
    });
  };

  const [charted, setCharted] = useState(null);
  const [isChartOpen, setChartOpen] = useState(false);

  const handleChart = (station) => {
    setCharted(station);
  };

  const handleChartOpen = (open) => {
    if (open) {
      setChartOpen(() => true);
    } else {
      setChartOpen(() => !isChartOpen);
    }
  };

  return (
    <>
      <TopWrapper>
        <PanelWrapper>
          <header>
            {/* eslint-disable-next-line prettier/prettier */}
            <h2>
              Satellites - (
              {`${customerSats.length}`}
              )
            </h2>
            <Suspense fallback={null}>
              <p>{time.current.toString().slice(0, 21)}</p>
            </Suspense>
          </header>
          <button onClick={() => setModal(true)} type="button">
            Add
          </button>
          {customerSats.length > 0 ? (
            <>
              <button type="button" onClick={onRemoveAll}>
                Clear all
              </button>
              <button type="button" onClick={() => onShowHide()}>
                {isDetails ? 'Collapse' : 'Expand'}
              </button>
            </>
          ) : (
            ''
          )}
          {isDetails ? (
            <Selected
              selected={customerSats}
              isCustomer
              uiMap={uiMap}
              key="customer-selection"
              chartStation={handleChart}
              openCharts={handleChartOpen}
            />
          ) : (
            ''
          )}
        </PanelWrapper>
      </TopWrapper>
      {customerSats.length > 0 ? (
        <BottomWrapper>
          <Charts
            sats={customerSats}
            uiMap={uiMap}
            charted={charted}
            time={time.current}
            isOpen={isChartOpen}
            handleOpen={handleChartOpen}
            setCharted={handleChart}
          />
        </BottomWrapper>
      ) : (
        ''
      )}
      <AddSatForm
        isModal={isModal}
        closeModal={closeModal}
        allStations={allStations}
      />
    </>
  );
};

const TopWrapper = styled.div`
  position: absolute;
  display: flex;
  z-index: 999;
  justify-content: space-between;
  font-family: 'Barlow';
  background-color: rgba(0.1, 0.1, 0.1, 0.05);
  width: 100%;
  backdrop-filter: blur(2px);
  padding-top: 2.5rem;
  max-height: 40vh;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: white;
    p {
      width: 18ch;
    }
  }
`;

const BottomWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  z-index: 999;
  justify-content: center;
  font-family: 'Barlow';
  background-color: rgba(0.1, 0.1, 0.1, 0.05);
  width: 100%;
  backdrop-filter: blur(2px);
  padding: 1.5rem;
  max-height: 40vh;
`;

const PanelWrapper = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
  padding-bottom: 0;
  margin-bottom: 0.5rem;
  button {
    margin-top: 1rem;
    margin-right: 0.5rem;
    background-color: transparent;
    color: white;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    font-weight: 400;
    border: 1px solid rgba(256, 256, 256, 1);
    cursor: pointer;
    :hover {
      background-color: white;
      color: rgba(27, 24, 31, 1);
      mix-blend-mode: lighten;
    }
  }

  h2 {
    color: white;
    font-size: 1.5rem;
  }
`;

export default UI;
