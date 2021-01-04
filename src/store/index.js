import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
Vue.prototype.$formatPrice = (value) => {
  const val = (value / 1).toFixed(0).replace('.', '.')
  return 'Rp. ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',-'
}
Vue.prototype.$parseDate = (date) => {
  let respon
  if (date === '' || date === null) {
    respon = {
      // fullDate: 'Tidak Ada Data',
      date: 'Tidak Ada Data'
    }
  } else {
    const newDate = new Date(date)
    const month = '' + (newDate.getMonth() + 1)
    const listMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'Desember']
    const tgl = '' + (newDate.getDate())
    const year = newDate.getFullYear()
    respon = {
      // 2020/05/28_17:34:13
      date: [year, month < 10 ? 0 + '' + (month) : (month), tgl < 10 ? 0 + '' + tgl : tgl].join('/') + '_' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds(),
      fullDate: tgl + ' ' + listMonth[month - 1] + ' ' + year
    }
  }
  return respon
}
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
