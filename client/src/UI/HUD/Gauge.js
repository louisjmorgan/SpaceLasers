/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */

import {
  useCallback, useEffect, useRef,
} from 'react';
import { addEffect } from '@react-three/fiber';
import * as d3 from 'd3';
import { useFrameStore } from '../../Model/store';

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
        if (state.frame - 2 > frame.current) { frame.current = state.frame; }
        if (frame.current > state.frame) frame.current = state.frame;
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

  const group = useRef();
  const groupWithData = useRef();
  const groupWithUpdate = useRef();
  const path = useRef();
  const createPie = () => {
    group.current = d3.select(pieRef.current);
    groupWithData.current = group.current.selectAll('g.arc').data(pie(data.current));

    groupWithData.current.exit().remove();

    groupWithUpdate.current = groupWithData.current
      .enter()
      .append('g')
      .attr('class', 'arc');

    path.current = groupWithUpdate.current
      .append('path')
      .merge(groupWithData.current.select('path.arc'));

    path.current
      .attr('class', 'arc')
      .attr('d', arc)
      .attr('fill', (d) => color(d));
  };

  const prevFrame = useRef();
  addEffect(() => {
    if (prevFrame === frame.current) return;
    if (!pieRef.current) return;
    updateData();
    createPie();
    prevFrame.current = frame.current;
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
