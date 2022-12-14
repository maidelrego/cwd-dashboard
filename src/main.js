import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import moment from 'moment'

Vue.config.productionTip = false

Vue.filter('prettyPhoneNumber', function (phone) {
  if (phone !== null) {
    return phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
  } else {
    return 'Not Registered'
  }
})

Vue.filter('prettyDateTime', function (date, utc = false) {
  if (utc) {
    return moment(date).utc().format('MM-DD-YYYY h:mm a')
  } else if (date === null || date === undefined || date === 'TBD' || date === '') {
    return 'TBD'
  } else {
    return moment(date).format('MM-DD-YYYY h:mm a')
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
