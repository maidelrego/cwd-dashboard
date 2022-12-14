import Vue from 'vue'
import Vuex from 'vuex'
import Quotes from './modules/Quotes'
import ContactUs from './modules/ContactUs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Quotes,
    ContactUs
  }
})
