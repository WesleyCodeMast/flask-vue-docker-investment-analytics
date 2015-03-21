import { createApp } from 'vue';

import {
  Chart as ChartJS,
  registerables,
} from 'chart.js';

import App from './App.vue';
import router from './router';
import store from './store';

ChartJS.register(...registerables);

createApp(App).use(store).use(router).mount('#app');
