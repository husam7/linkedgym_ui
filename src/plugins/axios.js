import axios from 'axios'
import store from '@/store'

const axiosIns = axios.create({
  //baseURL: window.location.protocol + '//' + window.location.host + ':8090/',
  baseURL: 'http://localhost:11224',
  timeout: 90000, // request timeout
  withCredentials: true,
})
axiosIns.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (store.getters.token) {
    //
    }
    return config
  },
  error => {
    console.error('do something with request error', 'Error')
    return Promise.reject(error)
  },
)
axiosIns.interceptors.response.use(
  response => {
    const res = response
    console.log('response', res)
    if (res.status !== 200) {
      console.error('! == 200', res.message || 'Error')
      if (res.status === 508 || res.status === 512 || res.status === 514) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userData')
        localStorage.removeItem('userAbility')
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res.data
  },
  error => {
    console.error('server is not Runing', 'Error')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userData')
    localStorage.removeItem('userAbility')
    return Promise.reject(error)
  },
)

export default axiosIns
