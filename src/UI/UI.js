/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Form } from 'formik';
import Selected from './Selected';
import AddSatForm from './AddSatForm';
import { Context } from '../App';

const UI = ({ allStations, customerSats, uiMap }) => {
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
    dispatch({
      type: 'remove all',
      isCustomer: true,
    });
  };

  return (
    <>
      <UIWrapper>
        <PanelWrapper>
          <h2>Satellites</h2>
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
            />
          ) : (
            ''
          )}
        </PanelWrapper>

        <FormWrapper />
      </UIWrapper>
      <AddSatForm
        isModal={isModal}
        closeModal={closeModal}
        allStations={allStations}
      />
    </>
  );
};

const UIWrapper = styled.div`
  position: absolute;
  display: flex;
  z-index: 999;
  justify-content: space-between;
  font-family: 'Barlow';
  background-color: rgba(0.1, 0.1, 0.1, 0.05);
  width: 100%;
  backdrop-filter: blur(2px);
  padding-top: 5rem;
`;

const FormWrapper = styled.div`
  position: absolute;
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

// const PowerWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-left: 5%;
//   max-width: 50%;
// `;
// const CustomerWrapper = styled(PowerWrapper)`
//   position: absolute;
//   margin-left: 0;
//   margin-right: 20%;
// `;

export default UI;
