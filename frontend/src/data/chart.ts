import { ChartOptions } from 'chart.js';

export const availableRanges = ['10Y', '5Y', '1Y', '6M', '1M', '5D', '1D'];

export const availableTypes = ['rebased', 'absolut'];

export const companyChartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      titleFont: {
        size: 12,
        family: 'Gilroy',
      },
      bodyFont: {
        size: 12,
        family: 'Gilroy',
        style: 'normal',
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
  scales: {
    'y-right': {
      type: 'linear',
      position: 'right',
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        display: true,
        padding: 10,
        color: '#808080',
        font: {
          size: 10,
          family: 'Gilroy',
          style: 'normal',
          lineHeight: 2,
        },
      },
    },
    'y-left': {
      type: 'linear',
      position: 'left',
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: false,
      },
      border: {
        display: false,
      },
      ticks: {
        display: true,
        padding: 10,
        color: '#808080',
        font: {
          size: 10,
          family: 'Gilroy',
          style: 'normal',
          lineHeight: 2,
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        display: true,
        color: '#808080',
        padding: 20,
        font: {
          size: 10,
          family: 'Gilroy',
          style: 'normal',
          lineHeight: 2,
        },
      },
    },
  },
};
