import {
  ref,
  computed,
  watch,
  Ref,
} from 'vue';

import { ChartData as ChartJSData, ChartDataset as ChartJSDataset } from 'chart.js';

import { CompanyController } from '@/controllers/company/types';
import { Chart, ChartData } from '@/rest-api/companies/assets';

export const useChart = (type: Ref<string>, period: Ref<string>, company: CompanyController) => { // eslint-disable-line
  const loading = ref(true);
  const data: ChartJSData<'line'> = {
    labels: [],
    datasets: [],
  };

  const createDataset = (label: string, values: ChartData[], color: string, axis: string) => {
    const dataset: number[] = [];

    for (let i = 0; i < values.length; i += 1) {
      if (!data.labels?.includes(values[i].label)) {
        data.labels?.push(values[i].label);
      }

      if (type.value === 'absolut') {
        if (i === 0) {
          dataset.push(0);
        } else {
          dataset.push(values[i - 1].value / values[i].value);
        }
      } else {
        dataset.push(values[i].value);
      }
    }

    data.datasets?.push({
      label,
      data: dataset,
      yAxisID: axis,
      borderWidth: 3,
      pointRadius: 0,
      borderColor: color,
      fill: true,
      backgroundColor: 'transparent',
    });
  };

  const update = () => {
    loading.value = true;

    data.labels = [];
    data.datasets = [];

    company.getChartData(period.value).then((payload) => {
      Object.keys(payload).forEach((key) => {
        const chartKey = key as keyof Chart;
        let label: string;
        let color: string;
        let axis = 'y-right';

        switch (chartKey) {
          case 'stockPrice':
            label = 'Stock price';
            color = '#9650FB';
            axis = 'y-left';
            break;
          case 'freeCashFlowPerShare':
            label = 'Free cash flow per share';
            color = '#3348FB';
            axis = type.value === 'absolut' ? 'y-left' : 'y-right';
            break;
          case 'earningsPerShare':
            label = 'Earnings per share';
            color = '#37D27F';
            axis = type.value === 'absolut' ? 'y-left' : 'y-right';
            break;
          default:
            return;
        }

        createDataset(label, payload[chartKey], color, axis);
      });
    }).finally(() => {
      loading.value = false;
    });
  };

  const computedData = computed(() => data);

  watch(() => [period.value, type.value], update);

  update();

  return {
    loading,
    data: computedData,
  };
};
