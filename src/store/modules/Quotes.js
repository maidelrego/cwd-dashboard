import { doAPIPut } from '../../services/api'
import moduleFactory from '../modules/moduleFactory'

function defaultState () {
  return {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: 0,
    finishColor: '',
    doorDesign: '',
    doorKit: '',
    doorHandle: '',
    installOrDelivery: '',
    dimensionsH: 0,
    dimensionsW: 0,
    isRead: false,
  }
}

function getMeta () {
  return {
    objectName: 'Quotes',
    apiStub: 'quotes',
    stateFunction: defaultState
  }
}

const Quotes = moduleFactory(getMeta)

Quotes.actions.updateData = async function ({ commit, dispatch, state }, id) {
  commit('CLEAR_ERROR')
  await doAPIPut('quotes/' + id, { isRead: state.obj.isRead }).then((res) => {
    if (res.status !== 200) {
      commit('SET_ERROR', res.response.data.message)
      dispatch('alert', { show: true, color: 'error', msg: res.response.data.message, icon: 'mdi-alert-circle' }, { root: true })
      throw new Error('There was an error during the API Post operation')
    } else {
      dispatch('alert', { show: true, color: 'success', msg: 'Data Updated', icon: 'mdi-check-circle' }, { root: true })
      dispatch('setFromObject', res.data).then(() => {
        commit('SET_CHANGED_FLAG', false)
      })
      commit('CLEAR_ERROR')
    }
  })
}

export default Quotes
