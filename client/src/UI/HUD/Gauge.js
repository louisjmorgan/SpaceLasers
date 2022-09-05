/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */

import {
  useTooltip, Tooltip, defaultStyles,
} from '@visx/tooltip';
import {
  useCallback, useEffect, useLayoutEffect, useRef, useState,
} from 'react';

import {
  Center, Stat, StatHelpText, StatLabel, StatNumber,
} from '@chakra-ui/react';
import { useFrameStore } from 'Model/store';
import { addEffect } from '@react-three/fiber';
import * as d3 from 'd3';

const color = d3.scaleOrdinal(['white', 'grey', 'rgba(255,255,255,0.2)']);

const pie = d3.pie()
  .value((d) => d.value)
  .startAngle(-Math.PI / 2.2).endAngle(Math.PI / 2.2)
  .sort(null);

export default function Gauge({ height, selected }) {
  const frame = useRef(useFrameStore.getState().frame);
  useEffect(() => {
    useFrameStore.subscribe(
      (state) => {
        frame.current = state.frame;
      },
    );
  }, []);

  const data = useRef();

  const updateData = () => {
    data.current = [
      {
        id: 2,
        value: selected.performance.chargeStateNoBeams[frame.current] * 100,
        color: (selected.performance.chargeStateNoBeams[frame.current] > 0.33) ? 'white' : 'red',
      },
      {
        id: 1,
        value: (selected.performance.chargeState[frame.current]
            - selected.performance.chargeStateNoBeams[frame.current]) * 100,
        color: 'grey',
      },
      {
        id: 3,
        value: 100 - (selected.performance.chargeState[frame.current] * 100),
        color: 'lightgrey',
      },
    ];
  };
  const arc = d3.arc().innerRadius(height / 2 - 20)
    .outerRadius(height / 3 - 10);
  const pieRef = useRef();

  const createPie = () => {
    const group = d3.select(pieRef.current);
    const groupWithData = group.selectAll('g.arc').data(pie(data.current));

    groupWithData.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append('g')
      .attr('class', 'arc');

    const path = groupWithUpdate
      .append('path')
      .merge(groupWithData.select('path.arc'));

    path
      .attr('class', 'arc')
      .attr('d', arc)
      .attr('fill', (d, i) => color(d));
  };

  addEffect(() => {
    if (!pieRef.current) return;
    updateData();
    createPie();
  });

  const ref = useCallback((node) => {
    pieRef.current = node;
    updateData();

    createPie(data.current);
  });

  return (

    <svg width={height} height={height / 2}>
      <g
        ref={ref}
        transform={`translate(${height / 2} ${height / 2})`}
      />
    </svg>
  );
}
// function change() {
//   const pie = d3.pie()
//     .value((d) => d.presses)(data);

//   path = d3.select('#pie').selectAll('path').data(pie);
// }
