import Vue from 'vue'
import Vuex from 'vuex'
import Quotes from './modules/Quotes'
import ContactUs from './modules/ContactUs'
import CloudinaryImages from './modules/CloudinaryImages'
import Auth from './modules/Auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alert: {
      show: false,
      color: '',
      msg: '',
      icon: ''
    },
  },
  getters: {
  },
  mutations: {
    SHOW_ALERT (state, alert) {
      state.alert = alert
    }

  },
  actions: {
    alert ({ commit }, alert) {
      commit('SHOW_ALERT', { ...alert, show: true })
    },
  },
  modules: {
    Quotes,
    ContactUs,
    CloudinaryImages,
    Auth
  }
})
