import { doAPIGet } from '../../services/api'
import _ from 'lodash'

function moduleFactory (getMeta) {
  const template = _.cloneDeep(objectTemplate)
  template.state = getDefaultState(getMeta)
  return template
}

/**
 * Returns the default state
 *
 * @returns {Object} Default state
 */
function getDefaultState (metaFunc) {
  // add logic for initializing a default state

  return {
    error: null, // basic state for all should be null error
    obj: {
      ...metaFunc().stateFunction()
    },
    changed: false,
    metaFunc: metaFunc,
  }
}

const objectTemplate = {
  state: {
  },
  namespaced: true,
  mutations: {
    INIT_OBJECT (state, obj) {
      Object.keys(state.obj).forEach((key) => {
        if (obj === null || obj[key] === undefined) {
          return
        }
        if (state.obj[key] !== obj[key]) {
          if (Number(obj[key]) === Number(state.obj[key]) && Number(obj[key]) !== 0) return 
          else {
            state.changed = true
          }
          state.obj[key] = obj[key]
        }
      })
    },
    SET_CHANGED_FLAG (state, flag) {
      state.changed = flag
    },
    CLEAR_OBJECT (state) {
      Object.assign(state, getDefaultState(state.metaFunc))
    },
    SET_ERROR (state, msg) {
      state.error = msg
    },
    CLEAR_ERROR (state) {
      state.error = ''
    }
  },
  actions: {
    clear ({ commit }) {
      commit('CLEAR_OBJECT')
    },
    clearError({ commit }) {
      commit('CLEAR_ERROR')
    },
    setChangedFlag ({ commit }, val) {
      commit('SET_CHANGED_FLAG', val)
    },
    setFromObject ({ commit }, obj) {
      commit('INIT_OBJECT', obj)
    },
    initById ({ dispatch, commit, state }, id) {
      const meta = state.metaFunc()
      return doAPIGet(`${meta.apiStub}/${id}`).then((res) => {
        if (res.status !== 200) {
          commit('SET_ERROR', res.data)
          throw new Error('There was an error during the API Get operation')
        } else {
          commit('CLEAR_ERROR')
          dispatch('setFromObject', res.data)
          console.debug(meta.objectName + ' initialzed from object')
        }
      })
    },
    pullData: ({ commit, state }) => {
      const meta = state.metaFunc()
      return doAPIGet(`${meta.apiStub}`).then((res) => {
        if (res.status !== 200) {
          commit('SET_ERROR', res.data)
          throw new Error('There was an error during the API Get operation')
        } else {
          return res.data
        }
      })
    },
  }
}

export default moduleFactory
