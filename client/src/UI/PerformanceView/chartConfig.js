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
        },
      },
      x: {
        type: 'time',
        time: {
          stepSize: 1,
          unit: 'date',
          displayFormats: {
            date: 'hh:mm MMM yyyy',
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
        samples: 50,
        threshold: 100,
      },
    },
  },
  defaultDataSet:
    {
      backgroundColor: 'yellow',
      borderColor: 'yellow',
      lineTension: 0,
      pointRadius: 0.1,
      showLine: true,
      datalabels: {
        align: 'start',
        anchor: 'start',
      },
    },
};

export default chartConfig;
