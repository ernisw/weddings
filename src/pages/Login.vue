<template>
  <q-layout class="bg-white" view="lHh Lpr lFf">
    <q-page-container>
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pl-md q-pr-md q-pt-sm">
            <q-card flat class="bg-white text-black">
              <div class="row items-center">
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <div class="row q-pt-md q-pb-md">
                    <div class="col-md-8 offset-2 col-xs-8">
                      <q-img src="~/assets/logos.jpg"></q-img>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-xs-12 q-pt-md">
                  <q-card-section>
                    <div class="text-h4 text-secondary q-mb-sm">Shine Moment</div>
                    <div class="text-h6 text-grey-10">Login Akun</div>
                  </q-card-section>
                  <q-card-section>
                    <q-input v-model="form.username" label="Username">
                    </q-input>
                    <q-input v-on:keyup.enter="onSubmit" type="password" class="q-pt-lg" v-model="form.password" label="Password">
                    </q-input>
                  </q-card-section>
                  <q-card-section>
                    <div class="row q-col-gutter-xs">
                      <div class="col-md-12 col-xs-12 col-sm-12">
                        <q-btn class="full-width" @click="onSubmit()" unelevated color="primary" rounded label="Login" />
                        <div @click="() => $router.push({ name: 'registPage' })" class="q-mt-md text-center cursor-pointer">Create New Account</div>
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
        password: null
      }
    }
  },
  methods: {
    onSubmit () {
      try {
        this.$showLoading()
        this.$axios.post('loginpengguna', this.form)
          .finally(() => this.$closeLoading())
          .then(res => {
            if (res.data.sukses) {
              this.setSession(res.data.user)
              this.$router.push({ name: 'dashboardUser' })
            } else {
              this.$showNotif(res.data.pesan, 'negative')
            }
          }).catch(() => {
            this.$errorNotif()
          })
      } catch (e) {
        this.$errorNotif()
      }
    },
    setSession (data) {
      this.$q.localStorage.set('datauser', data)
    }
  }
}
</script>
