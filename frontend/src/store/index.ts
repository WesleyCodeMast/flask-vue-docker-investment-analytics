import { createStore } from 'vuex';

import application from './modules/application';
import user from './modules/user';

export default createStore({
  modules: {
    application,
    user,
  },
});
