/* eslint-disable no-unused-vars */

const chartConfig = {
  custom_canvas_background_color: {
    id: 'custom_canvas_background_color',
    beforeDraw: (chart, args, options) => {
      const {
        ctx,
        chartArea: {
          top, right, bottom, left, width, height,
        },
        scales: { x, y },
      } = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = 'rgba(0.1, 0.1, 0.1, 0.3)';
      ctx.fillRect(left, top, width, height);
      ctx.restore();
    },
  },
  options: {
    animation: false,
    parsing: false,
    layout: {
      padding: {
      //   left: 50,
      //   right: 50,
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
        },
      },
      x: {
        type: 'time',
        time: {
          stepSize: 1,
          unit: 'date',
          displayFormats: {
            date: 'HH:mm a dd MMM yyyy',
          },
        },
        ticks: {
          // display: false,
          source: 'labels',
          beginAtZero: true,
          maxRotation: 0,
          minRotation: 0,
          offset: false,
        },
      },
    },
    plugins: {
      datalabels: {
        clip: false,
        display(context) {
          const i = context.dataIndex;
          const last = context.dataset.data.length - 1;
          return i === last;
        },
        formatter(value, context) {
          return `${value.y.toFixed(1)}%`;
        },
      },
      decimation: {
        enabled: true,
        algorithm: 'lttb',
        samples: 100,
        threshold: 50,
      },
    },
  },
  defaultDataSet:
    {
      lineTension: 0,
      pointRadius: 0.1,
      showLine: true,
      datalabels: {
        align: 'start',
        anchor: 'start',
      },
    },
  colors: [
    ['#1a53ff', '#0d88e6'],
    ['#bdcf32', '#87bc45'],
    ['#b33dc6', '#f46a9b'],
    ['#5ad45a', '#8be04e'],

  ],
};

export default chartConfig;
