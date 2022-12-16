import { doAPIPut } from '@/services/api'
import moduleFactory from '../modules/moduleFactory'


function defaultState () {
  return {
    name: '',
    assetId: '',
    folder: '',
  }
}

function getMeta () {
  return {
    objectName: 'CloudinaryImages',
    apiStub: 'cloudinary-images',
    stateFunction: defaultState
  }
}

const Quotes = moduleFactory(getMeta)

Quotes.actions.updateData = async function ({ commit, dispatch, state }, id) {
  commit('CLEAR_ERROR')
  await doAPIPut('cloudinary-images/' + id, state.obj).then((res) => {
    if (res.status !== 200) {
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
