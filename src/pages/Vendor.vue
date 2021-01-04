<template>
  <q-page padding>
    <q-card flat class="bg-secondary">
      <q-card-section>
        Vendor
      </q-card-section>
    </q-card>
    <q-input
      label="Cari Vendor"
      bordered
      @input="cari()"
      v-model="keyword"
    />
    <q-card class="q-mt-md" v-for="(d, i) in datas" :key="i">
      <q-card-section horizontal class="q-pa-md">
        <div class="row items-center">
          <q-avatar size="100px">
            <img :src="$imgURL  + d.gambar">
          </q-avatar>
        </div>
        <q-card-section>
          <div class="text-bold">{{ d.name }}</div>
          <q-rating
            v-model="d.rating"
            size="1.5em"
            icon="star"
            readonly
          />
          <div class="q-mt-sm ellipsis-2-lines"><q-icon name="location_on" />{{ d.alamat }}</div>
          <div class="q-mt-sm ellipsis-1-lines"><q-icon name="phone" /> {{ d.no_telp }}</div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn :to="{ name: 'detailVendor', params: { id: d.id }}" flat unelevated color="primary">
          Detail Vendor
        </q-btn>
      </q-card-actions>
    </q-card>
    <div class="q-mb-xl"></div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      datas: [],
      original: [],
      keyword: null
    }
  },
  created () {
    this.getAllWo()
  },
  methods: {
    getAllWo () {
      this.$showLoading()
      this.$axios.get('getallvendor')
        .finally(() => this.$closeLoading())
        .then(res => {
          const finalData = res.data.data
          this.datas = finalData.sort(function (a, b) {
            return b.rating - a.rating
          })
          this.original = this.datas
        })
    },
    cari () {
      const dataAsal = this.original
      const newData = dataAsal.filter((item) => {
        return item.name.toLowerCase().indexOf(this.keyword.toLowerCase()) !== -1
      })
      this.datas = newData
    }
  }
}
</script>
