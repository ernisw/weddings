<template>
  <q-page padding>
    <q-card flat class="bg-secondary">
      <q-card-section>
        Profile WO
      </q-card-section>
    </q-card>
    <q-card class="q-mt-md">
      <q-card-section class="q-pa-md">
        <div class="row justify-center items-center">
          <q-avatar size="100px">
            <img :src="$imgURL  + data.gambar">
          </q-avatar>
        </div>
        <q-card-section>
          <div class="text-bold">{{ data.name }}</div>
          <div class="q-mt-sm"><q-icon name="location_on" /> {{ data.alamat }}</div>
          <div class="q-mt-sm"><q-icon name="phone" /> {{ data.no_telp }}</div>
          <div class="q-mt-sm"><q-icon name="mail" /> {{ data.email }}</div>
          <div class="q-mt-sm">{{ data.deskripsi }}</div>
        </q-card-section>
      </q-card-section>
    </q-card>
    <!-- <q-card class="q-mt-md"> -->
      <q-card class="q-mt-md" flat>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="paket" label="Paket" />
          <q-tab name="layanan" label="Layanan" />
        </q-tabs>
      </q-card>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="paket">
          <q-card class="q-mt-md" v-for="(d, i) in pakets" :key="i">
            <q-card-section horizontal class="q-pa-md">
              <div class="row items-center">
                <q-avatar size="100px">
                  <img :src="$imgURL  + d.gambar_paket">
                </q-avatar>
              </div>
              <q-card-section>
                <div class="text-bold">{{ d.nama_paket }}</div>
                <!-- <div class="q-mt-sm ellipsis-1-lines">{{ d.harga_paket }}</div> -->
                <div class="q-mt-sm ellipsis-2-lines"><q-icon name="fas fa-tags"/> Rp. {{ d.harga_paket }},-</div>
              </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn flat unelevated color="primary" :to="{ name: 'Detail Paket', params: { id: d.id_paket } }">
                Detail Paket
              </q-btn>
              <q-btn flat @click="addToCart(d.id_paket, 'paket')" unelevated color="primary">
                Add To Cart
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="layanan">
          <q-card class="q-mt-md" v-for="(d, i) in layanans" :key="i+32324">
            <q-card-section horizontal class="q-pa-md">
              <div class="row items-center">
                <q-avatar size="100px">
                  <img :src="$imgURL  + d.gambar_layanan">
                </q-avatar>
              </div>
              <q-card-section>
                <div class="text-bold">{{ d.nama_layanan }}</div>
                <!-- <div class="q-mt-sm ellipsis-1-lines">{{ d.harga_paket }}</div> -->
                <div class="q-mt-sm ellipsis-2-lines"><q-icon name="fas fa-tags"/> Rp. {{ d.harga_layanan }},-</div>
              </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn flat  @click="addToCart(d.id_layanan, 'layanan')" unelevated color="primary">
                Add To Cart
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    <!-- </q-card> -->
    <div class="q-mb-xl"></div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      data: {
        alamat: null,
        deskripsi: null,
        email: null,
        foto: null,
        gambar: null,
        name: null,
        no_telp: null
      },
      loaded: false,
      layanans: [],
      tab: 'paket',
      pakets: []
    }
  },
  created () {
    this.getAllWo()
  },
  methods: {
    getAllWo () {
      this.$showLoading()
      this.$axios.get('getdetailwo/' + this.$route.params.id)
        .finally(() => this.$closeLoading())
        .then(res => {
          this.data = res.data.data
          this.layanans = res.data.layanan
          this.pakets = res.data.paket
        })
    },
    addToCart (idItem, jenis) {
      this.$showLoading()
      this.$axios.post('cart/input', {
        id_item: idItem,
        id_user: this.$q.localStorage.getItem('datauser').id,
        jenis: jenis
      })
        .finally(() => this.$closeLoading())
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  }
}
</script>
