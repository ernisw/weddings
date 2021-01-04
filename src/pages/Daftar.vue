<template>
  <q-layout class="bg-white" view="lHh Lpr lFf">
    <q-page-container>
      <q-page padding class="row justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pl-md q-pr-md q-pt-sm">
            <q-card flat class="bg-white text-black">
              <div class="row">
                <div class="col-xs-12 q-pt-md">
                  <q-card-section>
                    <div class="text-h5 text-secondary text-center">Create Your Account</div>
                  </q-card-section>
                  <q-card-section>
                    <q-input v-model="form.username" label="Username"/>
                    <q-input v-model="form.name" class="q-pt-lg" label="Full Name"/>
                    <q-input type="password" class="q-pt-lg" v-model="form.password" label="Password"/>
                    <q-input v-model="form.email" class="q-pt-lg" label="E-Mail"/>
                    <q-input v-model="form.no_telp" class="q-pt-lg" label="No Telp"/>
                    <q-input v-model="form.alamat" class="q-pt-lg" label="Alamat"/>
                    <q-file color="teal" filled class="q-pt-lg" v-model="gambar" label="Profile Picture">
                      <template v-slot:prepend>
                        <q-icon name="cloud_upload" />
                      </template>
                    </q-file>
                    <q-file color="teal" filled class="q-pt-lg" v-model="foto" label="Profile Picture">
                      <template v-slot:prepend>
                        <q-icon name="cloud_upload" />
                      </template>
                    </q-file>
                  </q-card-section>
                  <q-card-section>
                    <div class="row q-col-gutter-xs">
                      <div class="col-md-12 col-xs-12 col-sm-12">
                        <q-btn class="full-width" @click="onSubmit()" unelevated color="primary" rounded label="Register"/>
                        <div @click="() => $router.push({ name: 'loginPage'})" class="q-mt-md text-center cursor-pointer">Already have account ? Login</div>
                      </div>
                    </div>
                  </q-card-section>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: null,
        name: null,
        password: null,
        email: null,
        no_telp: null,
        alamat: null,
        role: 3
      },
      gambar: null,
      foto: null
    }
  },
  methods: {
    onSubmit () {
      try {
        const formData = new FormData()
        formData.append('gambar', this.gambar)
        formData.append('foto', this.foto)
        formData.append('data', JSON.stringify(this.form))
        this.$showLoading()
        this.$axios.post('registerpengguna', formData)
          .finally(() => this.$closeLoading())
          .then(res => {
            if (res.data.sukses) {
              this.$showNotif(res.data.pesan, 'positive')
              this.$router.push({ name: 'loginPage' })
            } else {
              this.$showNotif(res.data.pesan, 'negative')
            }
          }).catch(() => {
            this.$errorNotif()
          })
      } catch (e) {
        this.$errorNotif()
      }
    }
  }
}
</script>
