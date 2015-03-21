<template>
  <Card>
    <h4>Annual reports, presentations and IR contacts</h4>
    <div class="reports">
      <div class="reports-section">
        <h5>Ir contact</h5>
        <div class="reports-inline reports-inline__ceo">
          <div class="reports-inline-image"></div>
          <p>{{ company.ceo[company.ceo.length - 1]?.fullName }}</p>
        </div>
        <div class="reports-outline"></div>
        <div class="reports-inline">
          <img src="@/assets/icons/phone.svg" alt="Phone">
          <p>+44 113 234 5678</p>
        </div>
        <div class="reports-inline">
          <img src="@/assets/icons/email.svg" alt="Email">
          <p>johnsmith.brk@gmail.com</p>
        </div>
      </div>
      <div class="reports-wrapper">
        <div class="reports-section">
          <h5>Annual report links (10K)</h5>
        </div>
        <div class="reports-section">
          <h5>Investor presentations</h5>
        </div>
      </div>
    </div>
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Card from '@/components/ui/CardComponent.vue';

import { CompanyController } from '@/controllers/company/types';

export default defineComponent({
  name: 'CompanyReports',
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
.reports {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  align-items: stretch;
}

.reports .reports-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid #E6E6E6;
  border-radius: 8px;
  padding: 20px;
}

.reports > .reports-section {
  min-width: 320px;
}

.reports > .reports-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
}

.reports > .reports-wrapper > .reports-section {
  flex: 1;
}

.reports .reports-section > .reports-inline {
  display: flex;
  gap: 8px;
  align-items: center;
}

.reports .reports-section > .reports-outline {
  width: 100%;
  height: 1px;
  background: #E6E6E6;
}

.reports .reports-section > .reports-inline.reports-inline__ceo {
  gap: 16px;
}

.reports .reports-section .reports-inline-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background: #B3B3B3;
}

.reports .reports-section > .reports-inline > p {
  font-size: 14px;
}

.reports .reports-section > .reports-inline.reports-inline__ceo > p {
  font-weight: 600;
}
</style>
