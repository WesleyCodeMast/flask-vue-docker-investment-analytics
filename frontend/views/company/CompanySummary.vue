<template>
  <Card class="summary">
    <div class="summary-logo">
      <img
        src="https://papik.pro/grafic/uploads/posts/2023-04/thumbs/1681551617_papik-pro-p-logotip-naik-na-belom-fone-vektor-44.png"
        alt="Logo"
      >
    </div>
    <div class="summary-stats">
      <p>Founded: <span>{{ company.data.founded.toLocaleString() }}</span></p>
      <p>Employees: <span>{{ company.data.employees.toLocaleString() }}</span></p>
    </div>
    <div class="summary-text">
      <p>
        Business Summary:
        <span>{{ company.data.summary }}</span>
      </p>
    </div>
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Card from '@/components/ui/CardComponent.vue';

import { CompanyController } from '@/controllers/company/types';

export default defineComponent({
  name: 'CompanySummary',
  components: {
    Card,
  },
  props: {
    company: {
      type: Object as PropType<CompanyController>,
      required: true,
    },
  },
});
</script>

<style>
.summary {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
}

.summary > * {
  border: 1px solid var(--theme-text-gray-2);
  border-radius: 8px;
  padding: 24px;
  border-radius: 8px;
}

.summary p {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.summary p > span {
  font-weight: 400;
}

.summary > .summary-logo > img {
  max-height: 60px;
}

.summary > .summary-stats {
  flex: .15;
}

.summary > .summary-text {
  flex: 1;
}
</style>
