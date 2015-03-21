<template>
  <Card :loading="loading">
    <h4>Valuation</h4>
    <div class="valuation">
      <div class="valuation-item">
        <div>
          <p>
            Free Cash Flow Yield
            <Help>
              FCF Yield = Last FY free cash flow per share / current market value per share
            </Help>
          </p>
          <p>{{ render(company.valuation.freeCashFlowYield, renderers.percentage) }}</p>
        </div>
        <div>
          <p>Dividend Yield</p>
          <p>{{ render(company.valuation.dividendYield, renderers.ratio) }}</p>
        </div>
        <div>
          <p>Market cap $</p>
          <p>{{ render(company.valuation.marketCap, renderers.usd) }}</p>
        </div>
      </div>
      <div class="valuation-item">
        <div>
          <p>
            Price / Earnings LTM:
          </p>
          <p>{{ render(company.valuation.priceEarningsRatioLtm, renderers.ratio) }}</p>
        </div>
        <div>
          <p>Price / Book:</p>
          <p>{{ render(company.valuation.priceBookRatio, renderers.ratio) }}</p>
        </div>
        <div>
          <p>PEG</p>
          <p>{{ render(company.valuation.peg, renderers.ratio) }}</p>
        </div>
      </div>
    </div>
    <div class="earnings">
      <div class="earnings-item">
        <h4>Earnings growth and return</h4>
        <h4>LTM</h4>
        <h4>5YR</h4>
        <h4>10YR</h4>
      </div>
      <div class="earnings-item">
        <p>Total return (price & dividends)</p>
        <p>{{ render(company.valuation.totalReturnLtm, renderers.percentage) }}</p>
        <p>{{ render(company.valuation.totalReturn5y, renderers.percentage) }}</p>
        <p>{{ render(company.valuation.totalReturn10y, renderers.percentage) }}</p>
      </div>
      <div class="earnings-item">
        <p>Free cash flow per share growth</p>
        <p>{{ render(company.valuation.freeCashFlowPerShareLtm, renderers.percentage) }}</p>
        <p>{{ render(company.valuation.freeCashFlowPerShare5y, renderers.percentage) }}</p>
        <p>{{ render(company.valuation.freeCashFlowPerShare10y, renderers.percentage) }}</p>
      </div>
      <div class="earnings-item">
        <p>Earnings per share growth</p>
        <p>{{ render(company.valuation.earningsPerShareLtm, renderers.percentage) }}</p>
        <p>{{ render(company.valuation.earningsPerShare5y, renderers.percentage) }}</p>
        <p>{{ render(company.valuation.earningsPerShare10y, renderers.percentage) }}</p>
      </div>
    </div>
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

import Help from '@/components/ui/HelpComponent.vue';
import Card from '@/components/ui/CardComponent.vue';

import { CompanyController } from '@/controllers/company/types';
import { ValuationAndEarnings } from '@/rest-api/companies/assets';

import {
  usd,
  ratio,
  percentage,
} from '@/components/ui/table/types/renderers';

export default defineComponent({
  name: 'CompanyValuation',
  components: {
    Card,
    Help,
  },
  props: {
    company: {
      type: Object as PropType<CompanyController>,
      required: true,
    },
  },
  setup(props) {
    const loading = computed(() => Object.keys(props.company.valuation).every((key) => {
      const currentKey = key as keyof ValuationAndEarnings;
      return props.company.valuation[currentKey] === 0;
    }));

    const render = (value: any, renderer: any) => {
      if (!value || typeof value !== 'number') {
        return '-';
      }

      return renderer(value);
    };

    console.log(props.company);

    const renderers = {
      percentage,
      ratio,
      usd,
    };

    return {
      loading,
      render,
      renderers,
    };
  },
});
</script>

<style>
.valuation {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin: 16px 0;
}

.valuation > .valuation-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  border: 1px solid var(--theme-text-gray-2);
  border-radius: 8px;
  padding: 12px;
}

.valuation > .valuation-item > div {
  display: flex;
  justify-content: space-between;
}

.valuation > .valuation-item > div > p {
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
}

.earnings {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.earnings > .earnings-item {
  display: flex;
  justify-content: space-between;
}

.earnings > .earnings-item {
  text-align: right;
}

.earnings > .earnings-item:nth-child(1) {
  display: flex;
  align-items: flex-end;
}

.earnings > .earnings-item > *:nth-child(1) {
  text-align: left;
  flex: .42;
}

.earnings > .earnings-item > *:nth-child(2),
.earnings > .earnings-item > *:nth-child(3),
.earnings > .earnings-item > *:nth-child(4) {
  flex: .12;
}

.earnings > .earnings-item > p {
  font-size: 12px;
  font-weight: 500;
}
</style>
