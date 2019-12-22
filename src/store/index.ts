import Vue from "vue";
import Vuex from "vuex";
import Auth from "./auth";
import Tasks from "./tasks";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    Tasks
  }
});
