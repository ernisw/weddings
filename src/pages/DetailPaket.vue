<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        {{ dataPaket.nama_paket }}
      </q-card-section>
      <q-card-section>
        {{ $formatPrice(dataPaket.harga_paket) }}
      </q-card-section>
    </q-card>
    <q-card class="q-mt-md" v-for="(d, i) in layanans" :key="i">
      <q-card-section horizontal class="q-pa-md">
        <div class="row items-center">
          <q-avatar size="100px">
            <img :src="$imgURL  + d.gambar_layanan">
          </q-avatar>
        </div>
        <q-card-section>
          <div class="text-bold">{{ d.nama_layanan }}</div>
          <div class="q-mt-sm ellipsis-1-lines">{{ d.detail_layanan }}</div>
          <div class="q-mt-sm ellipsis-2-lines"><q-icon name="fas fa-tags"/> Rp. {{ d.harga_layanan }},-</div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      layanans: [],
      dataPaket: {
        nama_paket: null,
        harga_paket: null
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$showLoading()
      this.$axios.get('getdetailpaket/' + this.$route.params.id)
        .finally(() => this.$closeLoading())
        .then(res => {
          this.dataPaket = res.data.paket
          this.layanans = res.data.detail
        })
    }
  }
}
</script>
