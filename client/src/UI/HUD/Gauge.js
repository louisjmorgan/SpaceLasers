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

const color = d3.scaleOrdinal(['white', '#28D759', 'rgba(255,255,255,0.2)']);

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
    data.current = [];
    if (selected.isCustomer) {
      data.current.push(
        {
          id: 1,
          value: selected.performance.chargeStateNoBeams[frame.current] * 100,
        },
        {
          id: 2,
          value: (selected.performance.chargeState[frame.current]
              - selected.performance.chargeStateNoBeams[frame.current]) * 100,
        },
        {
          id: 3,
          value: 100 - (selected.performance.chargeState[frame.current] * 100),
        },
      );
    } else {
      data.current.push(
        {
          id: 1,
          value: 0,
        },
        {
          id: 2,
          value: (selected.performance.chargeState[frame.current] * 100),
        },
        {
          id: 3,
          value: 100 - (selected.performance.chargeState[frame.current] * 100),
        },
      );
    }
    data.current.push();
  };
  const arc = useRef(d3.arc().innerRadius(height / 2 - 20)
    .outerRadius(height / 3 - 10));
  const pieRef = useRef();

  const group = useRef();
  // const groupWithData = useRef();
  // const groupWithUpdate = useRef();
  const path = useRef();

  const createPie = () => {
    d3.select(pieRef.current).selectAll('g').remove();
    group.current = d3.select(pieRef.current).append('g');
    path.current = group.current.selectAll('path')
      .data(pie(data.current))
      .enter()
      .append('path');

    path.current.transition()
      .duration(0)
      .attr('fill', (d) => color(d))
      .attr('d', arc.current);
  };

  // useEffect(() => () => d3.select(pieRef.current).selectAll('g').remove(), []);
  // const createPie = () => {
  //   group.current = d3.select(pieRef.current);
  //   groupWithData.current = group.current.selectAll('g.arc').data(pie(data.current));

  //   groupWithData.current.exit().remove();

  //   groupWithUpdate.current = groupWithData.current
  //     .enter()
  //     .append('g')
  //     .attr('class', 'arc');

  //   path.current = groupWithUpdate.current
  //     .append('path')
  //     .merge(groupWithData.current.select('path.arc'));

  //   path.current
  //     .attr('class', 'arc')
  //     .attr('d', arc.current)
  //     .attr('fill', (d) => color(d));
  // };

  const updatePie = () => {
    path.current.data(pie(data.current));
    path.current.transition().duration(0).attr('d', arc.current); // redraw the arcs
    // timerFlush();
  };

  const prevFrame = useRef();
  addEffect(() => {
    if (prevFrame === frame.current) return;
    if (!pieRef.current) return;
    updateData();
    updatePie();
    // createPie();
    prevFrame.current = frame.current;
  });

  const ref = useCallback((node) => {
    pieRef.current = node;
    updateData();
    createPie();
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
