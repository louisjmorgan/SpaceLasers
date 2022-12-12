/* eslint-disable import/no-extraneous-dependencies */
import { List } from '@chakra-ui/layout';
import shallow from 'zustand/shallow';
import { useSimStore } from '../../Model/store';
import SatelliteListItem from './SatelliteListItem';

function SpacePowerList() {
  const { spacePowers } = useSimStore((state) => ({
    spacePowers: state.mission.satellites.spacePowers,
  }), shallow);
  return (
    <List width="80%" maxHeight="60vh" overflowY="auto" margin="auto">
      {spacePowers.map((spacePower, index) => (
        <SatelliteListItem
          satellite={spacePower}
          index={index}
          isPayload={false}
          key={spacePower.id}
        />
      ))}
    </List>
  );
}

export default SpacePowerList;
