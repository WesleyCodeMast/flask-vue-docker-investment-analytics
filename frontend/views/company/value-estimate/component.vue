<template>
  <div class="value-estimate" id="value-estimate">
    <h1>Fair Value Reference Estimate</h1>
    <div class="value-estimate-inner">
      <div class="value-estimate-section">
        <Card>
          <Chart :company="company" :data="estimateTableData" />
          <ul class="value-estimate-legend">
            <li>
              <span style="background: #3348FB"></span>
              <p>Increase</p>
            </li>
            <li>
              <span style="background: #999999"></span>
              <p>Decrease</p>
            </li>
            <li>
              <span style="background: #9AA6FA"></span>
              <p>Total</p>
            </li>
          </ul>
        </Card>
      </div>
      <div class="value-estimate-section">
        <Table :data="estimateTableData" :commentModal="false"></Table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

import Card from '@/components/ui/CardComponent.vue';
import Table from '@/components/ui/table/TableComponent.vue';

import { CompanyController } from '@/controllers/company/types';

import Chart from './chart';
import { estimateTableRows } from './rows';

export default defineComponent({
  name: 'ValueEstimate',
  components: {
    Card,
    Table,
    Chart,
  },
  props: {
    company: {
      type: Object as PropType<CompanyController>,
      required: true,
    },
  },
  setup(props) {
    const estimateTableData = computed(() => ({
      categories: [
        {
          name: 'Actual',
          key: 'actual',
          values: props.company.financials.actual,
          hidden: true,
        },
        {
          name: 'Average',
          key: 'average',
          values: props.company.financials.average,
          hidden: true,
        },
        {
          name: 'Estimated',
          key: 'estimated',
          values: props.company.financials.estimated,
          editable: true,
        },
        {
          name: 'Projected',
          key: 'projected',
          values: props.company.financials.projected,
        },
      ],
      rows: estimateTableRows,
      column: 'year',
      columnName: '',
      comments: props.company.comments,
      hideCategories: true,
    }));
    console.log(' ******************************** this is estimate table data ********************************');
    console.log(estimateTableData.value);
    return {
      estimateTableData,
    };
  },
});
</script>

<style>
.value-estimate {
  margin-bottom: 16px;
}

.value-estimate > h1 {
  margin-bottom: 24px;
}

.value-estimate > .value-estimate-inner {
  display: flex;
  gap: 16px;
}

.value-estimate > .value-estimate-inner > .value-estimate-section {
  flex: 1;
}

.value-estimate > .value-estimate-inner > .value-estimate-section > .card {
  aspect-ratio: 16 / 9;
}

.value-estimate .value-estimate-legend {
  display: flex;
  align-items: center;
  gap: 40px;
  width: 100%;
  list-style-type: none;
  padding: 0 20px;
  height: 16px;
  margin-top: 16px;
}

.value-estimate .value-estimate-legend > li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.value-estimate .value-estimate-legend > li > span {
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.value-estimate .value-estimate-legend > li > p {
  font-size: 12px;
  font-weight: 600;
  color: var(--theme-text-color-2);
}
</style>
