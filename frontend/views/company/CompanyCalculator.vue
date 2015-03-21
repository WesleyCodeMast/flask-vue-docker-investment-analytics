<template>
  <div class="calculator">
    <div class="calculator-menu">
      <button class="button" @click="showListModal">
        <img src="@/assets/icons/add.svg" alt="Add">
        Add to list
      </button>
      <template
        v-for="(list, index) in lists"
        :key="index"
      >
        ●
        <button
          class="list-button"
          :class="{
            'list-button__active': list.isAdded,
          }"
          @click="toggleList(list)"
        >{{ list.name }}</button>
      </template>
    </div>
    <Card>
      <div class="calculator-range">
        <p>{{ (company.data.week52Low || 0).toLocaleString() }}</p>
        <h4>54-week range</h4>
        <p>{{ (company.data.week52High || 0).toLocaleString() }}</p>
      </div>
      <div class="calculator-bar">
        <div class="calculator-circle" :style="{
          left: `${circlePosition}%`,
        }">
          <p>{{ company.data.stockPrice.toLocaleString() }}</p>
        </div>
      </div>
      <div class="calculator-inputs">
        <div class="calculator-input">
          <h4>Your model inputs</h4>
          <img src="@/assets/icons/edit.svg" alt="Edit">
        </div>
        <Table :data="calculatorTableData" />
      </div>
      <hr>
      <h4>Your fair value & Margin of safety</h4>
      <p class="calculator-help">
        To calculate fair value based on cost of capital and terminal
        growth assumptions above, please select free cash flow forecast.
      </p>
      <div class="calculator-forecast">
        <p>Forecast:</p>
        <Button
          :class="{
            'button__selected': forecastType === 'averages' && company.forecast.value === undefined
          }"
          :type="
            forecastType === 'averages' && company.forecast.value === undefined
              ? 'default' : 'secondary'
          "
          @click="setForecast(undefined)"
        >
          Averages
          <Help>
            Forecast is based on historical margins and
            revenue growth rate
          </Help>
        </Button>
        <Button :type="forecastType === 'analysts' ? 'default' : 'secondary'">
          Analysts
          <Help>Forecast is based on analyst consensus</Help>
        </Button>
        <Button
          :class="{'button__selected': forecastType === 'custom' && company.forecast}"
          :type="forecastType === 'custom' && company.forecast ? 'default' : 'secondary'"
          @click="company.forecasts.length > 0 && setForecast(company.forecasts[0])"
        >
          Custom
          <Help>
            Forecast is based on your assumptions which you can edit
            under Financials below
          </Help>
        </Button>
      </div>
      <div class="calculator-selected" v-if="forecastType === 'custom'">
        <p>Name:</p>
        <Button
          type="transparent"
          size="small"
          style="position: relative;"
          @click="forecastMenu = !forecastMenu"
        >
          {{
            company.forecast.value ?
            `${company.forecast.value.name} - ${
              new Date(company.forecast.value.updatedAt).toLocaleDateString()
            }`
            : 'Forecast name'
          }}
          <img
            src="@/assets/icons/arrow-down.svg"
            alt="Arrow"
            :class="{
              'reversed-arrow': forecastMenu
            }"
          >
          <div class="forecast-menu" v-if="forecastMenu">
            <button
              v-for="(forecast, index) in company.forecasts"
              :key="index"
              class="forecast-button"
              :class="{
                'forecast-button__active': forecast.id == company.forecast.value?.id
              }"
              @click="company.setForecast(forecast)"
            >{{ forecast.name }} - {{ new Date(forecast.updatedAt).toLocaleDateString() }}</button>
          </div>
        </Button>
      </div>
      <div class="calculator-result" v-if="forecastType">
        <div class="calculator-value" style="left: 50%">
          <p :style="{
            marginLeft: (marketPosition >= 50 && marketPosition < 70)
              ? `-${(70 - marketPosition) * 4}px`
              : 'initial',
            marginRight: (marketPosition > 30 && marketPosition < 50)
              ? `${(30 - marketPosition) * 4}px`
              : 'initial',
          }">Your model: {{ Math.round(modelPrice || 0) }}</p>
          <div class="calculator-point"></div>
        </div>
        <div
          class="calculator-value"
          :style="{
            left: `${marketPosition}%`,
          }"
        >
          <p :style="{
            marginRight: (marketPosition >= 50 && marketPosition < 70)
              ? `-${(70 - marketPosition) * 4}px`
              : 'initial',
            marginLeft: (marketPosition > 30 && marketPosition < 50)
              ? `${(30 - marketPosition) * 4}px`
              : 'initial',
          }">Market: {{ Math.round(company.data.stockPrice) }}</p>
          <div class="calculator-point"></div>
        </div>
        <div class="calculator-progress">
          <div class="calculator-fill" style="width: 50%;"></div>
        </div>
        <div
          class="calculator-info"
          :style="{
            left: `${marketPosition > 50 ? 50 : marketPosition}%`,
            width: `calc(${Math.abs(marketPosition - 50)}%)`,
          }"
        >
          {{ marketPosition > 50 ? 'Overvalued' : 'Undervalued' }}: {{ Math.round(marketValue) }}%
        </div>
        <div class="calculator-legend">
          <p>100%</p>
          <p>100%+</p>
        </div>
      </div>
      <Button
        @click="forecastType = 'averages'"
        v-if="!forecastType"
      >Calculate</Button>
    </Card>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  ref,
  reactive,
  onUpdated,
  onMounted,
  watch,
} from 'vue';
import { useStore } from 'vuex';

import Card from '@/components/ui/CardComponent.vue';
import Help from '@/components/ui/HelpComponent.vue';
import Button from '@/components/ui/ButtonComponent.vue';

import Table from '@/components/ui/table/TableComponent.vue';

import { CompanyController } from '@/controllers/company/types';
import { useCompiler } from '@/controllers/compiler';

import { percentage } from '@/services/renderers';

import { Forecast } from '@/rest-api/companies/assets';
import { LightList } from '@/rest-api/lists/assets';

import * as api from '@/rest-api/lists';

import { SHOW_MODAL } from '@/store/actions/application';

export default defineComponent({
  name: 'CompanyCalculator',
  components: {
    Card,
    Help,
    Button,
    Table,
  },
  props: {
    company: {
      type: Object as PropType<CompanyController>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const forecastType = ref<string>();
    const modelPrice = ref<number>();
    const forecastMenu = ref(false);

    const lists: LightList[] = reactive([]);

    const circlePosition = computed(() => {
      const value = props.company.data.stockPrice;
      const low = props.company.data.week52Low;
      const high = props.company.data.week52High;

      if (!value && !low && !high) {
        return 50;
      }

      const relativeValue = (value - low) / (high - low);
      const resultValue = 100 * relativeValue;

      if (resultValue < 0) {
        return 0;
      }

      if (resultValue > 100) {
        return 100;
      }

      return resultValue;
    });

    watch(() => props.company.financials.estimated, () => {
      const company = props.company as any;

      localStorage.setItem(`${company.data.symbol}:requiredReturn`, company.financials.estimated[0].requiredReturn);
      localStorage.setItem(`${company.data.symbol}:freeCashFlowGrowthRate`, company.financials.estimated[0].freeCashFlowGrowthRate);
    }, { deep: true });

    const calculatorTableData = computed(() => ({
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
          hidden: true,
        },
      ],
      rows: [
        {
          name: 'Required return / cost of capital',
          key: 'requiredReturn',
          showCounter: false,
          separate: false,
          editable: true,
          handler: percentage,
        },
        {
          name: 'FCFF terminal growth rate',
          key: 'freeCashFlowGrowthRate',
          showCounter: false,
          separate: false,
          editable: true,
          handler: percentage,
        },
      ],
      column: 'year',
      columnName: '',
      hideCategories: true,
    }));

    const { compile, clearCache } = useCompiler(calculatorTableData);

    watch(() => props.company.financials.estimated[0], () => {
      clearCache();

      const value = calculatorTableData.value.categories[2].values[0];
      const result = compile(value.averageStockPrice, value);

      if (typeof result === 'number') {
        modelPrice.value = result;
      } else {
        modelPrice.value = undefined;
      }
    }, { deep: true });

    const marketValue = computed(() => {
      if (modelPrice.value === undefined) {
        return 0;
      }

      return (props.company.data.stockPrice / modelPrice.value - 1) * 100;
    });

    const marketPosition = computed(() => {
      const relativeValue = (marketValue.value + 100) / (200);
      const scaledValue = 100 * relativeValue;

      if (scaledValue > 100) {
        return 100;
      }

      if (scaledValue < 0) {
        return 0;
      }

      return scaledValue;
    });

    const setForecast = (forecast?: Forecast) => {
      if (forecast === undefined) {
        forecastType.value = 'averages';
        props.company.setForecast(undefined);
      } else {
        forecastType.value = 'custom';
        props.company.setForecast(forecast);
      }
    };

    const showListModal = () => {
      store.commit(SHOW_MODAL, 'new-list');
    };

    const toggleList = (list: LightList) => {
      list.isAdded = !list.isAdded; // eslint-disable-line

      const method = list.isAdded ? api.add : api.remove;

      method(list.id, props.company.data.symbol);
    };

    onUpdated(() => {
      clearCache();
    });

    watch(props.company.data, () => {
      if (!props.company.data.symbol) {
        return;
      }

      api.lists(props.company.data.symbol).then((payload) => {
        lists.splice(0, lists.length);
        Object.assign(lists, payload);
      });
    });

    return {
      lists,
      forecastType,
      circlePosition,
      calculatorTableData,
      modelPrice,
      marketValue,
      marketPosition,
      forecastMenu,
      setForecast,
      showListModal,
      toggleList,
    };
  },
});
</script>

<style>
.calculator {
  max-width: 467px;
}

.calculator > .calculator-menu {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 12px;
  margin-top: 8px;
  margin-bottom: 20px;
}

.calculator > .calculator-menu > .button {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  color: var(--theme-link-color);
  text-transform: uppercase;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

.calculator .calculator-range {
  display: flex;
  justify-content: space-between;
  color: var(--theme-text-color-2);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
}

.calculator .calculator-bar {
  position: relative;
  width: 100%;
  height: 4px;
  background: var(--theme-text-gray-2);
  border-radius: 16px;
  margin-bottom: 14px;
}

.calculator .calculator-bar > .calculator-circle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #21B232;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.calculator .calculator-bar > .calculator-circle > p {
  display: none;
  position: absolute;
  background: var(--theme-text-color-contrast);
  box-shadow: 0px 8px 18px 0px rgba(0, 0, 0, .2);
  padding: 5px;
  border-radius: 12px;
  color: var(--theme-text-color-2);
  font-size: 16px;
  font-weight: 600;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.calculator .calculator-bar > .calculator-circle:hover > p {
  display: block;
}

.calculator .calculator-inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.calculator .calculator-inputs > .calculator-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calculator .calculator-inputs > .calculator-input > p:first-child {
  font-weight: 500;
  font-size: 12px;
}

.calculator .calculator-inputs > .calculator-input > p:last-child {
  color: var(--theme-link-color);
  font-size: 16px;
  font-weight: 600;
}

.calculator .calculator-inputs > .calculator-input > img {
  cursor: pointer;
}

.calculator hr {
  margin: 16px 0;
  border-top: 1px solid var(--theme-text-gray-2);
}

.calculator .calculator-help {
  color: var(--theme-text-gray-3);
  font-size: 12px;
  font-weight: 500;
  margin: 8px 0 16px 0;
}

.calculator .calculator-forecast {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 20px;
}

.calculator .calculator-forecast > p {
  margin-right: 5px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
}

.calculator .calculator-forecast > button {
  display: flex !important;
  align-items: center;
  gap: 2px;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--theme-link-color);
}

.calculator .calculator-forecast > button.button__selected {
  color: var(--theme-text-color-contrast);
}

.calculator .calculator-forecast > button.button__selected img {
  filter: brightness(0) invert(100);
}

.calculator .table thead {
  display: none;
}

.calculator .table tr {
  height: 24px;
}

.calculator .table tbody > tr > td {
  border-top: none;
  padding: 0 !important;
}

.calculator .table tbody > tr > td.table-row {
  color: var(--theme-text-color-2);
  font-weight: 500 !important;
}

.calculator .table tbody > tr > td.table-value {
  color: var(--theme-link-color);
  font-weight: 600 !important;
  font-size: 16px !important;
}

.calculator .table tbody > tr > td:last-child {
  text-align: end;
}

.calculator .calculator-result {
  position: relative;
  padding: 21px 0 28px 0;
}

.calculator .calculator-result > .calculator-value {
  top: 0;
  transform: translateX(-50%);
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  z-index: 2;
}

.calculator .calculator-result > .calculator-value > p {
  position: relative;
  font-size: 12px;
  font-weight: 500;
  color: var(--theme-text-color-2);
  white-space: nowrap;
}

.calculator .calculator-result > .calculator-value > .calculator-point {
  background: var(--theme-text-color-2);
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.calculator .calculator-result > .calculator-progress {
  position: relative;
  width: 100%;
  height: 4px;
  border-radius: 16px;
  overflow: hidden;
  background: #FC382C;
  z-index: 1;
}

.calculator .calculator-result > .calculator-info {
  text-align: center;
  position: absolute;
  top: 34px;
  color: var(--theme-text-gray-3);
  font-size: 12px;
  font-weight: 500;
  z-index: 0;
  white-space: nowrap;
}

.calculator .calculator-result > .calculator-info::after {
  content: '';
  position: absolute;
  height: 6px;
  top: -10px;
  left: 0;
  width: 100%;
  border: 1px solid var(--theme-text-gray-3);
}

.calculator .calculator-result > .calculator-progress > .calculator-fill {
  width: 0;
  height: 100%;
  background: #21B232;
}

.calculator .calculator-result > .calculator-legend {
  display: flex;
  justify-content: space-between;
  color: #999999;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  margin-top: 4px;
}

.calculator .calculator-selected {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  margin-bottom: 20px;
  z-index: 3;
}

.calculator .calculator-selected > p {
  flex: 0 0 70px;
  margin-right: 5px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
}

.calculator .calculator-selected > button {
  position: relative;
  flex: 1;
  display: flex !important;
  justify-content: space-between;
}

.calculator .calculator-selected .forecast-menu {
  position: absolute;
  top: calc(100% + 15px);
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  background: var(--theme-text-color-contrast);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0px 8px 18px 0px rgba(0, 0, 0, 0.06);
  z-index: 2;
}

.calculator .calculator-selected .forecast-menu > .forecast-button {
  width: 100%;
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 8px;
  font-size: 12px;
  font-weight: 500;
  background: none;
  text-align: left;
  cursor: pointer;
}

.calculator .calculator-selected .forecast-menu > .forecast-button__active {
  background: #F4F6FF;
}

.list-button {
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: transparent;
  transition: .15s ease-in-out;
}

.list-button.list-button__active {
  color: var(--theme-link-color);
}
</style>
