import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from "vuex-persistedstate";

import auth from './modules/auth';
import monitor from './modules/monitor'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    monitor
  },
  plugins: [createPersistedState()]
});
