export const drawShape = {
  id: 'sections',
  afterDatasetsDraw: (chart: any, args: any, pluginOptions: any) => {
    const { ctx, data } = chart;
    ctx.save();

    const firstBar = chart.getDatasetMeta(0).data[4];
    const secondBar = chart.getDatasetMeta(0).data[5];

    if (!firstBar || !secondBar) {
      return;
    }

    const enterpriseTextX = (firstBar.x + firstBar.width / 2 + chart.scales.y.width) / 2;

    ctx.beginPath();
    ctx.moveTo(chart.scales.y.width, chart.height - 33);

    ctx.strokeColor = '#B3B3B3';
    ctx.lineWidth = 0.2;

    ctx.lineTo(chart.scales.y.width, chart.height - 25);
    ctx.lineTo(firstBar.x + firstBar.width / 2, chart.height - 25);
    ctx.lineTo(firstBar.x + firstBar.width / 2, chart.height - 33);

    ctx.moveTo(secondBar.x - secondBar.width / 2, chart.height - 32);

    ctx.lineTo(secondBar.x - secondBar.width / 2, chart.height - 25);
    ctx.lineTo(secondBar.x + secondBar.width / 2, chart.height - 25);
    ctx.lineTo(secondBar.x + secondBar.width / 2, chart.height - 33);

    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.font = '10px Gilroy';
    ctx.fillStyle = '#808080';
    ctx.fillText('CURRENT STOCK PRICE: ENTERPRISE VALUE BREAKDOWN', enterpriseTextX, chart.height - 12);
    ctx.fillText('YOUR MODEL', secondBar.x, chart.height - 12);
    ctx.fillText('REFERENCE', secondBar.x, chart.height - 1);
  },
};

export const chartOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    datalabels: {
      font: {
        size: 12,
        family: 'Gilroy',
        weight: '800',
      },
      formatter: (value: number, context: any) => {
        if (typeof value === 'number') {
          const formatted = Math.round(value / 10e5);

          if (formatted < 0) {
            return `(${Math.abs(formatted).toLocaleString()})`;
          }

          if (formatted === 0) {
            return '-';
          }

          return formatted.toLocaleString();
        }

        return value;
      },
      align: (context: any) => {
        const { chart } = context;
        const { config, scales } = chart;
        const { y } = scales;

        const value = config.data.datasets[0].data[context.dataIndex];

        const zero = y.getPixelForValue(0);
        const height = Math.max(Math.abs(Math.round(zero - y.getPixelForValue(value))), 5);

        return height < 16 ? 'top' : 'center';
      },
      color: (context: any) => {
        const { chart } = context;
        const { config, scales } = chart;
        const { y } = scales;

        const value = config.data.datasets[0].data[context.dataIndex];

        const zero = y.getPixelForValue(0);
        const height = Math.max(Math.abs(Math.round(zero - y.getPixelForValue(value))), 5);

        return height < 16 ? '#000000' : '#FFFFFF';
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
  scales: {
    y: {
      type: 'linear',
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
        callback: (tickValue: any, index: any, ticks: any) => {
          if (typeof tickValue === 'number') {
            const value = tickValue / 10e5;

            if (value < 0) {
              return `(${Math.abs(value).toLocaleString()})`;
            }

            return value.toLocaleString();
          }

          return tickValue;
        },
      },
    },
    x: {
      offset: true,
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        display: true,
        color: '#131313',
        padding: 20,
        font: {
          size: 10,
          family: 'Gilroy',
          style: 'normal',
          lineHeight: 1,
        },
      },
    },
  },
  layout: {
    padding: {
      bottom: 14,
    },
  },
};
