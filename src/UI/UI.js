/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Search } from './Search';
import Selected from './Selected';

const UI = ({
  allStations,
  powerSats,
  dispatch,
  customerSats,
  uiMap,
}) => {
  return (
    <UIWrapper>
      <PowerWrapper>
        <Selected
          selected={powerSats}
          dispatch={dispatch}
          isCustomer={false}
          uiMap={uiMap}
          key="power-selection"
        />
        <Search
          stations={allStations}
          dispatch={dispatch}
          isCustomer={false}
          key="power-search"
        />
      </PowerWrapper>
      <CustomerWrapper>
        <Selected
          selected={customerSats}
          dispatch={dispatch}
          isCustomer
          uiMap={uiMap}
          key="customer-selection"
        />
        <Search
          stations={allStations}
          dispatch={dispatch}
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
