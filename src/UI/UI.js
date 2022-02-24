/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import Selected from './Selected';
import AddSatForm from './AddSatForm';

const UI = ({ allStations, customerSats, uiMap }) => {
  const [isModal, setModal] = useState(false);
  const closeModal = (e) => {
    setModal(false);
  };
  return (
    <UIWrapper>
      {/* <PowerWrapper>
        <Selected
          selected={powerSats}
          isCustomer={false}
          uiMap={uiMap}
          key="power-selection"
        />
        {/* <Search
          stations={allStations}
          isCustomer={false}
          key="power-search"
        /> 
      </PowerWrapper> */}
      <CustomerWrapper>
        <button onClick={() => setModal(true)} type="button">
          Add Satellite
        </button>
        <AddSatForm
          isModal={isModal}
          closeModal={closeModal}
          allStations={allStations}
        />
        <Selected
          selected={customerSats}
          isCustomer
          uiMap={uiMap}
          key="customer-selection"
        />
        {/* <Search
          stations={allStations}
          isCustomer
          key="customer-search"
        /> */}
      </CustomerWrapper>
    </UIWrapper>
  );
};

const UIWrapper = styled.div`
  position: absolute;
  display: flex;
  z-index: 999;
  justify-content: space-between;
  width: 100%;
`;

const PowerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 5%;
  max-width: 50%;
`;
const CustomerWrapper = styled(PowerWrapper)`
  position: absolute;
  margin-left: 0;
  margin-right: 20%;
`;

export default UI;
