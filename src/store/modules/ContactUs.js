import { doAPIPut } from '@/services/api'
import moduleFactory from '../modules/moduleFactory'


function defaultState () {
  return {
    name: '',
    email: '',
    message: '',
    isRead: false,
  }
}

function getMeta () {
  return {
    objectName: 'ContactUs',
    apiStub: 'contact-us',
    stateFunction: defaultState
  }
}

const Quotes = moduleFactory(getMeta)

Quotes.actions.updateData = async function ({ commit, dispatch, state }, id) {
  console.log('updateData', state.obj)
  commit('CLEAR_ERROR')
  await doAPIPut('contact-us/' + id, state.obj).then((res) => {
    if (res.status !== 200) {
      console.log(res.response.data)
      commit('SET_ERROR', res.response.data.message)
      throw new Error('There was an error during the API Post operation')
    } else {
      dispatch('setFromObject', res.data).then(() => {
        commit('SET_CHANGED_FLAG', false)
      })
      commit('CLEAR_ERROR')
    }
  })
}

export default Quotes