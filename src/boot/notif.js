import { Notify, Loading, QSpinnerTail } from 'quasar'

const show = (message, jenis) => {
  Notify.create({
    message: message,
    color: jenis,
    timeout: 2000
  })
}

const errNotif = () => {
  Notify.create({
    message: 'Terjadi Kesalahan',
    color: 'negative',
    timeout: 2000
  })
}

export default async ({ Vue }) => {
  Vue.prototype.$showNotif = show
  Vue.prototype.$errorNotif = errNotif
  Vue.prototype.$showLoading = () => {
    Loading.show({
      spinner: QSpinnerTail,
      spinnerSize: 50,
      message: 'Memuat Data...',
      messageColor: 'black'
    })
  }
  Vue.prototype.$closeLoading = () => {
    Loading.hide()
  }
}
