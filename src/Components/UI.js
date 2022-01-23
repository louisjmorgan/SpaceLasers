/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Search } from './Search';
import Selected from './Selected';

const UI = ({
  allStations,
  powerSats,
  addPowerSat,
  removePowerSat,
  removeAllPowerSats,
  customerSats,
  addCustomerSat,
  removeCustomerSat,
  removeAllCustomerSats,
  toggleLabel,
}) => {
  return (
    <UIWrapper>
      <PowerWrapper>
        <Selected
          selected={powerSats}
          onRemoveStation={removePowerSat}
          onRemoveAll={removeAllPowerSats}
          onStationClick={toggleLabel}
          isCustomer={false}
          key="power-selection"
        />
        <Search
          stations={allStations}
          onResultClick={addPowerSat}
          isCustomer={false}
          key="power-search"
        />
      </PowerWrapper>
      <CustomerWrapper>
        <Selected
          selected={customerSats}
          onRemoveStation={removeCustomerSat}
          onRemoveAll={removeAllCustomerSats}
          onStationClick={toggleLabel}
          isCustomer
          key="customer-selection"
        />
        <Search
          stations={allStations}
          onResultClick={addCustomerSat}
          isCustomer
          key="customer-search"
        />
      </CustomerWrapper>
    </UIWrapper>
  );
};

const UIWrapper = styled.div`
  position: absolute;
  z-index: 999;
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const PowerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  margin-left: 5%;
  max-width: 50%;
`;
const CustomerWrapper = styled(PowerWrapper)`
  margin-left: 0;
  margin-right: 5%;
`;

export default UI;
