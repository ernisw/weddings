<template>
  <q-page padding class="q-mb-lg">
    <q-select square outlined emit-value v-model="budget" :options="optionsBudget" label="Budget" />
    <q-select square outlined emit-value v-model="pengalaman" :options="optionsPengalaman" class="q-my-sm" label="Pengalaman" />
    <p class="q-ma-sm text-weight-bold">Rating</p>
    <div class="text-center">
        <q-rating
        class="q-px-xl rounded-borders rating-row"
        v-model="rating"
        size="2.5em"
        icon="star"
        color="yellow"
    />
    </div>
    <p class="q-ma-sm text-weight-bold">Kecepatan Pengerjaan</p>
    <div class="text-center">
        <q-rating
        class="q-px-xl rounded-borders rating-row"
        v-model="ratingKecepatan"
        size="2.5em"
        icon="star"
        color="yellow"
    />
    </div><p class="q-ma-sm text-weight-bold">Kerjasama Kru</p>
    <div class="text-center">
        <q-rating
        class="q-px-xl rounded-borders rating-row"
        v-model="ratingKerjasama"
        size="2.5em"
        icon="star"
        color="yellow"
    />
    </div><p class="q-ma-sm text-weight-bold">Kerapihan</p>
    <div class="text-center">
        <q-rating
        class="q-px-xl rounded-borders rating-row"
        v-model="ratingKerapihan"
        size="2.5em"
        icon="star"
        color="yellow"
    />
    </div><p class="q-ma-sm text-weight-bold">Detail</p>
    <div class="text-center">
        <q-rating
        class="q-px-xl rounded-borders rating-row"
        v-model="ratingDetail"
        size="2.5em"
        icon="star"
        color="yellow"
    />
    </div>
    <q-btn
      label="Cari Data"
      unelevated
      @click="search()"
      color="primary"
      class="full-width q-mt-md"
    />
    <div v-if="searched">
      <q-card class="q-mt-md" v-for="(d, i) in results" :key="i">
        <q-card-section horizontal class="q-pa-md">
          <div class="row items-center">
            <q-avatar size="100px">
              <img :src="$imgURL  + (d.jenis === 'paket' ? d.detail.gambar_paket : d.detail.gambar_layanan)">
            </q-avatar>
          </div>
          <q-card-section>
            <q-rating
              class="q-mt-md"
              v-model="d.rating"
              readonly
              size="2.5em"
              icon="star"
              color="yellow"/>
            <div class="text-bold">{{ d.jenis === 'paket' ? d.detail.nama_paket : d.detail.nama_layanan}}</div>
            <div class="q-mt-sm ellipsis-1-lines">{{ d.detail.name }}</div>
            <div class="q-mt-sm ellipsis-1-lines"><q-icon name="fas fa-tags"/> {{ $formatPrice(d.harga) }}</div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      optionsBudget: [
        { label: 'Rp. 0 - Rp. 1.000.000', value: 1000000 },
        { label: 'Rp. 1.000.000 - Rp. 10.000.000', value: 10000000 },
        { label: 'Rp. 10.000.000 - Rp. 50.000.000', value: 50000000 },
        { label: 'Rp. 50.000.000 - Rp. 100.000.000', value: 100000000 }
      ],
      optionsPengalaman: [
        { label: 'Tahun 2000 - 2005', value: '2000-2005' },
        { label: 'Tahun 2005 - 2010', value: '2005-2010' },
        { label: 'Tahun 2010 - 2015', value: '2010-2015' },
        { label: 'Tahun 2015 - Sekarang', value: '2015-Sekarang' }
      ],
      budget: 0,
      pengalaman: '',
      rating: 0,
      ratingKecepatan: 0,
      ratingKerapihan: 0,
      ratingKerjasama: 0,
      ratingDetail: 0,
      results: [],
      searched: false
    }
  },
  methods: {
    search () {
      if (this.cekNull()) {
        this.$showNotif('Mohon Isi Rating/Harga', 'negative')
      } else {
        this.$showLoading()
        this.$axios.post('getknn', {
          budget: this.budget,
          rating: this.rating,
          ratingKecepatan: this.ratingKecepatan,
          ratingKerapihan: this.ratingKerapihan,
          ratingKerjasama: this.ratingKerjasama,
          ratingDetail: this.ratingDetail,
          pengalaman: this.pengalaman
        })
          .finally(() => this.$closeLoading())
          .then(res => {
            this.results = res.data
            this.searched = true
          })
      }
    },
    cekNull () {
      if (this.budget === 0 || this.budget === '') {
        return true
      }
      if (this.rating === 0) {
        return true
      }
      return false
    }
  }
}
</script>
<style scoped>
.rating-row {
  border:1px solid #eadede!important;
}
</style>
