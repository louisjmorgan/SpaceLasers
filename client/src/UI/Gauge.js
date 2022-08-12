/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import Pie from '@visx/shape/lib/shapes/Pie';
import { Group } from '@visx/group';
import {
  useTooltip, Tooltip, defaultStyles,
} from '@visx/tooltip';
import { useCallback } from 'react';

import {
  Center, Stat, StatHelpText, StatLabel, StatNumber,
} from '@chakra-ui/react';

export default function Gauge({ height, beams, noBeams }) {
  const width = height;
  const halfWidth = width / 2;
  const angle = Math.PI / 2;

  const beamsData = {
    id: 1,
    value: beams - noBeams,
    color: 'grey',
  };

  const noBeamsData = {
    id: 2,
    value: noBeams,
    color: (noBeams > 33) ? 'white' : 'red',
  };

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();
  const handleMouseOver = useCallback(
    (coords, datum) => {
      let text;
      if (datum === '2') text = 'Without Space Power';
      if (datum === '1') text = 'With Space Power';
      if (datum === '3') return;
      showTooltip({
        tooltipLeft: coords.x,
        tooltipTop: coords.y,
        tooltipData: text,
      });
    },
    [showTooltip],
  );

  const tooltipStyles = {
    ...defaultStyles,
    backgroundColor: 'rgba(53,71,125,1)',
    color: 'white',
    padding: 12,
  };

  return (
    <Center height={height}>
      <Stat align="center">
        <StatLabel>Charge</StatLabel>

        <svg width={width} height={height / 2} margin>
          <Group top={halfWidth} left={halfWidth}>
            <Pie
              data={[
                noBeamsData,
                beamsData,
                { id: 3, value: 100 - beams, color: 'rgba(255,255,255,0.2)' },
              ]}
              pieValue={(data) => data.value}
              pieSortValues={null}
              innerRadius={halfWidth - 30}
              outerRadius={halfWidth - 15}
              startAngle={-angle}
              endAngle={angle}
              cornerRadius={0}
            >
              {(pie) => pie.arcs.map((arc) => (
                <g
                  key={arc.data.id}
                  onMouseOver={(e) => {
                    handleMouseOver({ x: e.clientX, y: e.clientY }, `${arc.data.id}`);
                  }}
                  onMouseOut={hideTooltip}
                >
                  <path d={pie.path(arc)} fill={arc.data.color} />
                </g>
              ))}
            </Pie>
          </Group>
        </svg>
        <StatNumber>
          {`${beams.toPrecision(3)}%`}
        </StatNumber>
        <StatHelpText width="100%">{`${noBeams.toPrecision(3)}% without Space Power`}</StatHelpText>

      </Stat>
      {tooltipOpen && (
        <Tooltip
          key={Math.random()}
          top={tooltipTop - height / 3}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <strong>{tooltipData}</strong>
        </Tooltip>
      )}

    </Center>
  );
}
