<template>
  <div class="performance">
    <div class="performance-menu">
      <a class="active" href="#summary">Summary</a>
      <a href="#notes">Notes</a>
      <a href="#question-answers">Q&A</a>
      <a href="#financials">Financials</a>
      <a href="#financials">Forecast</a>
      <a href="#value-estimate">Other</a>
    </div>
    <Card class="performance-chart" :loading="company.financials.actual.length === 0">
      <div class="performance-header">
        <h4>Financial Performance</h4>
        <div class="performance-params">
          <div>Compare</div>
          <div>Add Parameter</div>
          <div>Expand</div>
          <div>Share <img src="@/assets/icons/share.svg" alt="Share"></div>
        </div>
      </div>
      <div class="performance-control performance-control-top">
        <div class="performance-control-stats">
          <p>
            5Y price score: 110
            <Help />
          </p>
          <p>10Y return: 267.5%</p>
        </div>
      </div>
      <div class="performance-control">
        <div class="performance-control-buttons">
          <Button
            v-for="(type, index) in availableTypes"
            :key="index"
            :type="currentType === type ? 'secondary' : 'transparent'"
            size="small"
            @click="selectType(type)"
          >{{ type }}</Button>
          <Button type="transparent" size="small">Log</Button>
        </div>
        <div class="performance-control-stats">
          <p>
            5Y price score: 110
            <Help />
          </p>
          <p>10Y return: 267.5%</p>
        </div>
        <div class="performance-control-range">
          DATE RANGE:
          <Button
            v-for="(range, index) in availableRanges"
            :key="index"
            type="transparent"
            size="small"
            :visually-disabled="currentRange !== range"
            @click="selectRange(range)"
          >{{ range }}</Button>
        </div>
      </div>
      <Chart :company="company" :period="currentRange" :type="currentType" />
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

import Button from '@/components/ui/ButtonComponent.vue';
import Card from '@/components/ui/CardComponent.vue';
import Help from '@/components/ui/HelpComponent.vue';

import { CompanyController } from '@/controllers/company/types';

import { availableRanges, availableTypes } from '@/data/chart';

import Chart from './chart';

export default defineComponent({
  name: 'CompanyFinancialPerformance',
  components: {
    Button,
    Card,
    Help,
    Chart,
  },
  props: {
    company: {
      type: Object as PropType<CompanyController>,
      required: true,
    },
  },
  setup() {
    const storedRange = localStorage.getItem('chart-range');
    const currentRange = ref<string>(storedRange || availableRanges[0]);

    const storedType = localStorage.getItem('chart-type');
    const currentType = ref<string>(storedType || availableTypes[0]);

    const selectRange = (range: string): void => {
      localStorage.setItem('chart-range', range);
      currentRange.value = range;
    };

    const selectType = (type: string): void => {
      localStorage.setItem('chart-type', type);
      currentType.value = type;
    };

    return {
      availableRanges,
      availableTypes,
      currentRange,
      storedType,
      currentType,
      selectRange,
      selectType,
    };
  },
});
</script>

<style>
.performance {
  margin-bottom: 16px;
}

.performance > .performance-menu {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.performance  > .performance-menu > a {
  border-radius: 100px;
  padding: 5px 12px;
  color: var(--theme-link-color);
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
}

.performance > .performance-menu > .active {
  background: var(--theme-link-color);
  color: var(--theme-text-color-contrast);
}

.performance > .performance-chart > .performance-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.performance > .performance-chart > .performance-header > .performance-params {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--theme-link-color);
}

.performance > .performance-chart > .performance-header > .performance-params > div {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.performance > .performance-chart > .performance-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.performance > .performance-chart > .performance-control > .performance-control-buttons {
  display: flex;
  gap: 18px;
}

.performance > .performance-chart > .performance-control > .performance-control-stats {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--theme-text-gray-2);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 8px;
}

.performance > .performance-chart > .performance-control > .performance-control-stats > p {
  display: flex;
  align-items: center;
  gap: 5px;
}

.performance > .performance-chart > .performance-control > .performance-control-range {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  gap: 16px;
}

.performance > .performance-chart > .performance-control.performance-control-top {
  display: none;
  justify-content: center;
}

@media screen and (max-width: 1370px) {
  .performance > .performance-chart > .performance-control.performance-control-top {
    display: flex;
  }

  .performance > .performance-chart > .performance-control:not(.performance-control-top)
  > .performance-control-stats {
    display: none;
  }
}
</style>
