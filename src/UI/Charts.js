/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import React, {
  useContext,
  useRef,
  useEffect,
  useState,
} from 'react';
import styled, { withTheme } from 'styled-components';
import { Chart as ChartJS, registerables } from 'chart.js';
import { enGB } from 'date-fns/locale';
import { format } from 'date-fns';
import { Chart, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Context } from '../App';
import { SatelliteList } from './Selected';

ChartJS.register(...registerables);
ChartJS.register(ChartDataLabels);
ChartJS.defaults.color = '#fff';
ChartJS.defaults.borderColor = '#fff';

const custom_canvas_background_color = {
  id: 'custom_canvas_background_color',
  beforeDraw: (chart, args, options) => {
    const {
      ctx,
      chartArea: { top, right, bottom, left, width, height },
      scales: { x, y },
    } = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'rgba(0.1, 0.1, 0.1, 0.3)';
    ctx.fillRect(left, top, width, height);
    ctx.restore();
  },
};

const SatChart = ({ rawData, title }) => {
  if (!rawData) return null;

  const chartRef = useRef();

  useEffect(() => {
    if (!rawData) return null;
    rawData.forEach((dataset, index) => {
      if (dataset.length > 200) {
        chartRef.current.data.datasets[index].data = dataset.slice(
          dataset.length - 200,
          dataset.length - 1
        );
      } else {
        chartRef.current.data.datasets[index].data = [...dataset];
      }
    });

    chartRef.current.update();
    return null;
  }, [rawData]);

  const options = useRef({
    animation: { duration: 0 },
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 50,
        right: 50,
        top: 50,
        bottom: 50,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: title,
        },
      },
      x: {
        ticks: {
          // display: false,
          autoSkip: true,
          beginAtZero: false,
          maxTicksLimit: 2,
          stepSize: 1,
          maxRotation: 0,
          minRotation: 0,
          offset: true,
        },
        adapters: {
          date: { locale: enGB },
          type: 'timeseries',
          distribution: 'linear',
          time: {
            parser: 'PPpp',
            unit: 'month',
          },
          title: {
            display: true,
            text: 'Date',
          },
        },
      },
    },
    plugins: {
      datalabels: {
        clip: false,
        display: function (context) {
          const i = context.dataIndex;
          const last = context.dataset.data.length - 1;
          return i === last;
        },
        formatter: function (value, context) {
          return `${value.y.toFixed(1)}%`;
        },
      },
    },
  });

  const data = useRef({
    datasets: [
      {
        backgroundColor: 'yellow',
        borderColor: 'yellow',
        pointRadius: 0.1,
        showLine: true,
        label: 'Beam',
        datalabels: {
          align: 'start',
          anchor: 'start',
        },
      },
      {
        backgroundColor: 'red',
        borderColor: 'red',
        pointRadius: 0.1,
        showLine: true,
        label: 'No Beam',
        datalabels: {
          align: 'start',
          anchor: 'start',
        },
      },
    ],
  });

  return (
    <Line
      ref={chartRef}
      data={data.current}
      options={options.current}
      plugins={[custom_canvas_background_color]}
      className="chart"
    />
  );
};

const Charts = ({
  uiMap,
  time,
  charted,
  isOpen,
  handleOpen,
  sats,
  setCharted,
}) => {
  const options = useRef([]);
  useEffect(() => {
    options.current = [];
    sats.forEach((sat) => {
      options.current.push(
        <option key={sat.name} value={sat.name}>
          {sat.name}
        </option>
      );
    });
    setCharted(sats[sats.length - 1].name);
  }, [sats]);

  const averageData = useRef({
    chargeStateBeam: [],
    chargeStateNoBeam: [],
  });
  useEffect(() => {
    Object.keys(averageData).forEach((param) => {
      let average = 0;
      let total = 1;
      const length = averageData[param].length + 1;
      uiMap.forEach((satellite, name) => {
        if (!satellite.isCustomer) return;
        average += satellite.data[param][length];
        total += 1;
      });
      average /= total;
    });
  }, [time]);

  return (
    <StyledCharts>
      <button
        type="button"
        className="header"
        onClick={() => handleOpen()}
      >
        <h2>
          Charts
          <div className={`${isOpen ? 'open' : ''} arrow`}>▲</div>
        </h2>
      </button>
      {charted && isOpen ? (
        <>
          <select
            value={charted}
            onChange={(e) => setCharted(e.target.value)}
          >
            {options.current}
          </select>
          <SatChart
            rawData={[
              uiMap.get(charted).data.chargeStateBeam,
              uiMap.get(charted).data.chargeStateNoBeam,
            ]}
            title="Charge State (%)"
          />
        </>
      ) : (
        ''
      )}
    </StyledCharts>
  );
};

const StyledCharts = styled.div`
  display: block;
  background-color: transparent;
  width: 80%;
  color: white;

  font-family: 'Barlow';
  .header {
    background: transparent;
    color: white;
    border: none;
    margin: 0 auto;
    text-align: center;
    padding: 0;
    cursor: pointer;
    h2 {
      display: flex;
      justify-content: space-around;
      font-size: 1.25rem;
      padding: 0.5rem;
      text-align: center;

      transition: 0.2s ease-in-out;
      div.open {
        transform: rotate(180deg);
      }
    }
  }
  .chart {
    padding: 1rem;
    overflow: auto;
  }
`;

export default Charts;
