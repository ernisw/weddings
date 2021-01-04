import Vue from 'vue'
import axios from 'axios'
const ip = '192.168.43.73:8000'
const axiosInstance = axios.create({
  baseURL: 'http://' + ip + '/api'
})

Vue.prototype.$axios = axiosInstance
Vue.prototype.$imgURL = 'http://' + ip + '/img/fotoUser/'
