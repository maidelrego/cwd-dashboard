
const storedTokenName = 'CWD_TOKEN'

function removeLocalUserAuth () {
  localStorage.removeItem(storedTokenName)
}

function loadLocalUserAuthToken () {
  return localStorage.getItem(storedTokenName)
}


function saveLocalUserAuthToken (token) {
  return localStorage.setItem(storedTokenName, token)
}


export {
  removeLocalUserAuth,
  loadLocalUserAuthToken,
  saveLocalUserAuthToken
}
