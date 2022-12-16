import moduleFactory from '../modules/moduleFactory'

function defaultState () {
  return {
    username: '',
    passoword: '',
  }
}

function getMeta () {
  return {
    objectName: 'Auth',
    apiStub: 'auth',
    stateFunction: defaultState
  }
}

const Auth = moduleFactory(getMeta)

export default Auth