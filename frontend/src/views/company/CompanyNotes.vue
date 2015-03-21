<template>
  <Card id="notes">
    <div class="notes">
      <div class="notes-section">
        <Input placeholder="New note" v-model:value="note" />
        <Button>Add new note</Button>
      </div>
      <div class="notes-section">
        <div class="note">
          <div class="note-header">
            <div class="note-timestamp">04.04.2023</div>
            <div class="note-actions">
              <img src="@/assets/icons/edit.svg" alt="Edit">
              <img src="@/assets/icons/remove.svg" alt="Remove">
            </div>
          </div>
          <div class="note-text">
            This is a good sign of the company's financial health and
            ability to invest in future growth opportunities...
          </div>
          <a href="#">Show more</a>
        </div>
      </div>
    </div>
  </Card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Card from '@/components/ui/CardComponent.vue';
import Input from '@/components/ui/InputComponent.vue';
import Button from '@/components/ui/ButtonComponent.vue';

export default defineComponent({
  name: 'CompanyNotes',
  components: {
    Card,
    Input,
    Button,
  },
  setup() {
    const note = ref('');

    return {
      note,
    };
  },
});
</script>

<style scoped>
.notes {
  display: flex;
  gap: 16px;
}

.notes > .notes-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}

.notes > .notes-section > input {
  width: 100%;
}

.notes .note {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 16px;
  background: #F4F6FF;
  border-radius: 8px;
}

.notes .note > .note-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.notes .note > .note-header > .note-timestamp {
  color: #B3B3B3;
  font-size: 14px;
  font-weight: 600;
}

.notes .note > .note-header > .note-actions {
  display: flex;
  gap: 8px;
}

.notes .note > .note-header > .note-actions > * {
  cursor: pointer;
}

.notes .note > .note-text {
  font-size: 16px;
  font-weight: 400;
  color: var(--theme-text-color-2);
}

.notes .note > a {
  font-size: 16px;
  font-weight: 600;
}
</style>
