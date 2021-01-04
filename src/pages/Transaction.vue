<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        :data="data"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="namaItem" :props="props">
              {{ cekPaket(props.row.jenis) ? props.row.detail.nama_paket : props.row.detail.nama_layanan }}
            </q-td>
            <q-td key="vendor" :props="props">
              {{ props.row.detail.name }}
            </q-td>
            <q-td key="harga" :props="props">
              {{ $formatPrice(cekPaket(props.row.jenis) ? props.row.detail.harga_paket : props.row.detail.harga_layanan) }}
            </q-td>
            <q-td key="tanggal" :props="props">
              {{ $parseDate(props.row.tanggal_nikah).fullDate }}
            </q-td>
            <q-td key="status" :props="props">
              {{ getStatus(props.row.status) }}
            </q-td>
            <q-td key="aksi" :props="props">
              <q-btn
                label="Upload Bukti Bayar"
                unelevated
                color="primary"
                @click="openBukti(props.row)"
                :disabled="props.row.status !== 1"
              />
              <q-btn
                class="q-ml-sm"
                label="Selesai"
                unelevated
                @click="update(props.row.id_bayar, props.row.detail.id)"
                :disabled="props.row.status !== 3"
                color="accent"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="buktiBayar" v-if="buktiBayar">
      <q-card>
        <q-card-section>
          <div class="text-h6">Upload Bukti Pembayaran</div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="min-width: 40vh;">
          <q-file color="teal" filled v-model="gambarBukti" label="Bukti Pembayaran">
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="uploadBuktiBayar()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="giveRating">
      <q-card>
        <q-card-section>
          <div class="text-h6">Beri Rating</div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="min-width: 40vh;">
          Rating
          <q-rating
            v-model="ratingModel"
            size="2.5em"
            icon="star"
          />
          <br>
          Ketepatan Waktu
          <q-rating
            v-model="Kecepatan_waktu"
            size="2.5em"
            icon="star"
          />
          <br>
          Kerjasama antar Kru
          <q-rating
            v-model="Kerjasama_kru"
            size="2.5em"
            icon="star"
          />
          <br>
          Kerapihan Kerja
          <q-rating
            v-model="Kerapihan"
            size="2.5em"
            icon="star"
          />
          <br>
          Detail Pengerjaan
          <q-rating
            v-model="Detail"
            size="2.5em"
            icon="star"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="proses()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>

export default {
  data () {
    return {
      columns: [
        { name: 'namaItem', align: 'center', label: 'Nama Item', field: 'namaItem' },
        { name: 'vendor', label: 'Vendor', field: 'vendor' },
        { name: 'harga', label: 'Harga', field: 'harga' },
        { name: 'tanggal', label: 'Tanggal', field: 'tanggal' },
        { name: 'status', label: 'Status', field: 'status' },
        { name: 'aksi', label: 'Aksi', field: 'aksi' }
      ],
      data: [],
      activeData: null,
      buktiBayar: false,
      gambarBukti: null,
      activeId: null,
      c: null,
      giveRating: false,
      ratingModel: 0,
      Kecepatan_waktu: 0,
      Kerjasama_kru: 0,
      Kerapihan: 0,
      Detail: 0
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$showLoading()
      this.$axios.get('transaksi/get/' + this.$q.localStorage.getItem('datauser').id)
        .finally(() => this.$closeLoading())
        .then(res => {
          this.data = res.data.data
        })
    },
    cekPaket (jenis) {
      if (jenis === 'paket') {
        return true
      } else {
        return false
      }
    },
    getStatus (status) {
      let msg
      if (status === 0) {
        msg = 'Belum Dikonfirmasi'
      } else if (status === 1) {
        msg = 'Sudah Dikonfirmasi'
      } else if (status === 2) {
        msg = 'Sudah Upload Bukti Bayar'
      } else if (status === 3) {
        msg = 'Sudah Dikonfirmasi Bukti Bayar'
      } else {
        msg = 'Sudah Selesai'
      }
      return msg
    },
    openBukti (data) {
      this.activeData = data
      this.buktiBayar = true
    },
    uploadBuktiBayar () {
      const formData = new FormData()
      formData.append('gambar', this.gambarBukti)
      this.$axios.post('transaksi/upload/' + this.activeData.id_bayar, formData)
        .then((res) => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
          this.buktiBayar = false
          this.activeData = null
          this.getData()
        })
    },
    update (id, idUser) {
      this.activeId = id
      this.activeIdUser = idUser
      this.giveRating = true
      // this.$q.dialog({
      //   title: 'Confirm',
      //   message: 'Apakah Anda Akan Menyelsaikan Transaksi Ini?',
      //   cancel: true,
      //   persistent: true
      // }).onOk(() => {
      //   this.$axios.post('transaksi/update/' + id)
      //     .then(res => {
      //       if (res.data.sukses) {
      //         this.$showNotif(res.data.pesan, 'positive')
      //       } else {
      //         this.$showNotif(res.data.pesan, 'negative')
      //       }
      //       this.getData()
      //     })
      // })
    },
    proses () {
      // console.log({
      //   rating: this.ratingModel,
      //   id_user: this.$q.localStorage.getItem('datauser').id,
      //   id_vendor_wo: this.activeIdUser
      // })
      this.$axios.post('transaksi/update/' + this.activeId, {
        rating: this.ratingModel,
        Kecepatan_waktu: this.Kecepatan_waktu,
        Kerjasama_kru: this.Kerjasama_kru,
        Kerapihan: this.Kerapihan,
        Detail: this.Detail,
        id_user: this.$q.localStorage.getItem('datauser').id,
        id_vendor_wo: this.activeIdUser
      })
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
          this.giveRating = false
          this.ratingModel = 0
          this.activeIdUser = null
          this.activeId = null
          this.getData()
        })
    }
  }
}
</script>
