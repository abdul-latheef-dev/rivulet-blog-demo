import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  key: "SOCIAL_NETWORKING_VUEX",
  storage: window.localStorage,
});

export default createStore({
  state: {
    user: {},
  },
  mutations: {
    user(state, value) {
      state.user = value;
    },
  },
  actions: {
    user({ commit }, value) {
      commit("user", value);
    },
  },
  plugins: [vuexLocal.plugin],
});
