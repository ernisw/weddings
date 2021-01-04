<template>
  <q-page padding>
    <q-list padding>
      <q-item-label header>Your Cart</q-item-label>

      <q-item>
        <q-item-section>
          <q-checkbox @input="selectAll()" v-if="datas.length > 0" v-model="checkedAll" label="Pilih Semua"/>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-for="(d, i) in datas" :key="i">
        <q-item-section side top>
          <q-checkbox v-model="d.checked" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{ d.jenis === 'paket' ? d.detail.nama_paket : d.detail.nama_layanan }}
          </q-item-label>
          <q-item-label caption>
            {{ d.detail.name }}
          </q-item-label>
        </q-item-section>
        <q-item-section side top>
          Rp. {{ d.jenis === 'paket' ? d.detail.harga_paket : d.detail.harga_layanan }},-
          <q-btn
            dense
            v-if="d.jenis === 'paket'"
            color="primary"
            unelevated
            class="full-width"
            label="Detail Paket"
          />
        </q-item-section>
        <q-item-section side top>
          <q-btn
            dense
            color="negative"
            flat
            round
            @click="deleteCart(d.id_cart)"
            unelevated
            icon="delete"
            class="full-width q-mt-md"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card flat class="fixed-bottom">
      <q-card-section>
        Total Cart
        <div class="text-bold text-h6">
          Rp {{ getTotal }} ,-
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn
          label="Checkout"
          unelevated
          color="primary"
          :disable="datas.length < 1"
          @click="checkout = true"
          class="full-width"
        />
      </q-card-section>
    </q-card>
    <q-dialog v-model="checkout">
      <q-card>
        <q-card-section>
          <div class="text-h6">Konfirmasi Tanggal</div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="min-width: 40vh;">
          <q-input label="Pilih Tanggal" @click="$refs.qDateProxy.show()" filled v-model="date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="date" @input="$refs.qDateProxy.hide()">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="send()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="adaGagal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Item Tidak Tersedia</div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="min-width: 40vh;">
          <q-list bordered separator>
            <q-item v-ripple v-for="(g, i) in gagals" :key="i">
              <q-item-section>
                <q-item-label>{{g.jenis === 'paket' ? datas.filter(r => r.id_item === g.id_item)[0].detail.nama_paket : datas.filter(r => r.id_item === g.id_item)[0].detail.nama_layanan}}</q-item-label>
                <q-item-label caption>{{ datas.filter(r => r.id_item === g.id_item)[0].detail.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      datas: [],
      checkedAll: false,
      checkout: false,
      date: null,
      adaGagal: false,
      gagals: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$showLoading()
      this.$axios.get('cart/get/' + this.$q.localStorage.getItem('datauser').id)
        .then(res => {
          console.log(res)
          this.datas = res.data.data.map(r => {
            return Object.assign(r, {
              checked: false
            })
          })
          this.$closeLoading()
        })
    },
    deleteCart (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are You Sure?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios('cart/delete/' + id)
          .then(res => {
            if (res.data.sukses) {
              this.$showNotif(res.data.msg, 'positive')
            } else {
              this.$showNotif(res.data.msg, 'negative')
            }
            this.getData()
          })
      })
    },
    selectAll () {
      if (this.checkedAll) {
        const newData = []
        for (const i in this.datas) {
          this.datas[i].checked = true
          newData.push(this.datas[i])
        }
        this.datas = newData
      } else {
        const newData = []
        for (const i in this.datas) {
          this.datas[i].checked = false
          newData.push(this.datas[i])
        }
        this.datas = newData
      }
    },
    send () {
      if (this.date) {
        const data = this.datas.filter(r => r.checked).map(r => {
          delete r.detail
          return r
        })
        this.getData()
        this.$axios.post('transaksi', {
          data: data,
          tanggal_nikah: this.date
        })
          .then(res => {
            this.checkout = false
            if (res.data.status) {
              if (res.data.all) {
                this.checkout = false
                this.date = null
                this.$showNotif('Pesan akan diproses, mohon lakukan proses pembayaran', 'positive')
                this.getData()
              } else {
                this.getData()
                this.adaGagal = true
                this.checkout = false
                this.date = null
                this.gagals = res.data.dataGagal
              }
            } else {
              this.checkout = false
              this.date = null
              this.getData()
              this.$showNotif('Terjadi Kesalahan', 'negative')
            }
          })
      } else {
        this.$showNotif('Mohon Pilih Tanggal', 'negative')
      }
    }
  },
  computed: {
    getTotal () {
      let total = 0
      for (const i in this.datas) {
        if (this.datas[i].checked) {
          console.log(this.datas[i])
          if (this.datas[i].jenis === 'paket') {
            total += Number(this.datas[i].detail.harga_paket)
          } else {
            total += Number(this.datas[i].detail.harga_layanan)
          }
        }
      }
      return total
    }
  }
}
</script>
