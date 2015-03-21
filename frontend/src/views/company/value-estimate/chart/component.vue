<template>
  <Bar :data="chartData" :options="options" :plugins="[ChartDataLabels, drawShape]" />
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  onUpdated,
} from 'vue';

import { Bar } from 'vue-chartjs';
import { ChartData } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { TableData } from '@/components/ui/table/types';

import { CompanyController } from '@/controllers/company/types';
import { useCompiler } from '@/controllers/compiler';

import { chartOptions, drawShape } from './options';

export default defineComponent({
  name: 'CompanyChart',
  components: {
    Bar,
  },
  props: {
    company: {
      type: Object as PropType<CompanyController>,
      required: true,
    },
    data: {
      type: Object as PropType<TableData>,
      required: true,
    },
  },
  setup(props) {
    const computedData = computed(() => props.data);
    const { compile, clearCache } = useCompiler(computedData);

    const chartData = computed(() => {
      const data: ChartData<'bar'> = {
        labels: [],
        datasets: [],
      };

      if (!props.company.financials.actual || !props.company.valuation) {
        return data;
      }

      let context: any = props.company.financials.projected[
        props.company.financials.projected.length - 2
      ];

      if (!context) {
        return data;
      }

      const index = props.company.financials.actual.length - 1;
      const netDebt = props.company.financials.actual[index].netDebt || 0;
      const enterpriseValue = netDebt + props.company.valuation.marketCap;

      context = props.company.financials.estimated[0];  // eslint-disable-line

      let marketCap = Number(compile(context.averageMarketCap, context));

      if (!marketCap) {
        marketCap = 0;
      }

      data.labels?.push('NET DEBT', 'PREDF. STOCK', ['MINORITY', 'INTEREST'], ['MARKET CAP', 'CURRENT'], ['ENTERPRISE', 'VALUE'], ['MARKET CAP', 'YOUR MODEL']);
      data.datasets.push({
        data: [
          netDebt,
          0,
          0,
          props.company.valuation.marketCap,
          enterpriseValue,
          marketCap,
        ],
        minBarLength: 5,
        borderRadius: 4,
        backgroundColor: (context) => {
          if (context.dataIndex === 5) {
            return '#37D27F';
          }

          if (context.dataIndex === 4) {
            return '#9AA6FA';
          }

          return (context.raw as number) >= 0 ? '#3348FB' : '#999999';
        },
      });

      return data;
    });

    onUpdated(() => {
      clearCache();
    });

    return {
      options: chartOptions,
      chartData,
      ChartDataLabels,
      drawShape,
    };
  },
});
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
