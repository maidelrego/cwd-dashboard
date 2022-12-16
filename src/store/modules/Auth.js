import { doAPIPost } from '@/services/api'
import moduleFactory from '../modules/moduleFactory'
import { saveLocalUserAuthToken, removeLocalUserAuth } from '@/services/auth'
import router from '../../router/index'


function defaultState() {
  return {
    token: null,
    isLoggedIn: false
  }
}

function getMeta() {
  return {
    objectName: 'Auth',
    apiStub: 'auth',
    stateFunction: defaultState
  }
}

const Auth = moduleFactory(getMeta)

Auth.getters.isAuthenticated = function (state) {
  return state.obj.isLoggedIn && state.obj.token !== null
}

Auth.mutations.SET_CREDENTIALS = function (state, data) {
  state.obj.token = data.token
  state.obj.isLoggedIn = data.isLoggedIn
}

Auth.actions.setCredentials = function ({ commit }, data) {
  commit('SET_CREDENTIALS', data)
}

Auth.actions.login = async function ({ dispatch }, userData) {
  doAPIPost('auth/login', userData).then((res) => {
    if (res.status !== 201) {
      console.log(res)
      dispatch('alert', { show: true, color: 'error', msg: res.message, icon: 'mdi-alert-circle' }, { root: true })
      throw new Error('There was an error during the API Post operation')
    } else {
      if (res.data.token === undefined) {
        dispatch('alert', { show: true, color: 'error', msg: 'No token returned', icon: 'mdi-alert-circle' }, { root: true })
        throw new Error('There was an error during the API Post operation')
      } else {
        dispatch('alert', { show: true, color: 'success', msg: 'Welcome', icon: 'mdi-check-circle' }, { root: true })
        dispatch('setCredentials', { token: res.data.token, isLoggedIn: true } )
        saveLocalUserAuthToken(res.data.token)
        router.push({ name: 'dashboard' })
      }
    }
  })
}

Auth.actions.logout = function ({ dispatch }) {
  removeLocalUserAuth()
  dispatch('setCredentials', { token: null, isLoggedIn: false })
}

export default Auth