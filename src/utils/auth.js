const getToken = () => {
  return sessionStorage.getItem('JWT_TOKEN')
}

const setToken = (token) => {
  return sessionStorage.setItem('JWT_TOKEN', token)
}

const clearToken = () => {
  sessionStorage.removeItem('JWT_TOKEN')
}

export { getToken, setToken, clearToken }