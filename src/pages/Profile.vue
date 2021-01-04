<template>
  <q-page padding>
    <q-card class="q-mt-md">
      <q-card-section class="q-pa-md">
        <div class="row justify-center items-center">
          <q-avatar size="100px">
            <img :src="$imgURL  + data.foto">
          </q-avatar>
        </div>
        <q-card-section>
          <div class="text-bold">{{ data.name }}</div>
          <div class="q-mt-sm"><q-icon name="location_on" /> {{ data.alamat }}</div>
          <div class="q-mt-sm"><q-icon name="phone" /> {{ data.no_telp }}</div>
          <div class="q-mt-sm"><q-icon name="mail" /> {{ data.email }}</div>
          <div class="q-mt-sm">{{ data.deskripsi }}</div>
        </q-card-section>
        <q-card-section>
          <q-btn
            label="Update Profile"
            class="full-width q-mb-md"
            color="primary"
            outline
            @click="medium=true"
          />
          <q-btn
            label="Logout"
            class="full-width"
            color="primary"
            @click="logout()"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-dialog
      v-model="medium"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Update Profile</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            label="Nama"
            v-model="data.name"
          />
          <q-input
            label="Alamat"
            v-model="data.alamat"
          />
          <q-input
            label="No Telp"
            v-model="data.no_telp"
          />
          <q-input
            label="E-Mail"
            v-model="data.email"
          />
           <q-file class="q-mt-md" color="teal" filled v-model="image" label="Gambar Profile">
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" @click="updateProfile()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      data: this.$q.localStorage.getItem('datauser'),
      medium: false,
      image: null
    }
  },
  methods: {
    updateProfile () {
      this.$showLoading()
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify(this.data))
      this.$axios.post('updateprofile/' + this.data.id, formData)
        .finally(() => this.$closeLoading())
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.medium = false
            this.$q.localStorage.set('datauser', res.data.profile)
            this.data = res.data.profile
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    logout () {
      this.$q.localStorage.clear()
      this.$router.push({ name: 'loginPage' })
    }
  }
}
</script>
