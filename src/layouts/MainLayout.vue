<template>
  <q-layout view="lHh Lpr lFf">
    <q-header unelevated class="bg-white">
      <q-toolbar>
        <q-toolbar-title class="text-blue-grey-14">
          <div v-if="$route.name === 'My Cart' || $route.name === 'My Transaction' || $route.name === 'Detail Paket'">
            <q-btn icon="keyboard_arrow_left" flat round @click="() => $router.go(-1)"/>
            {{ $route.name }}
          </div>
          <div v-else>
            Shine Moment
          </div>
        </q-toolbar-title>

        <div v-if="!($route.name === 'My Cart' || $route.name === 'My Transaction' || $route.name === 'Detail Paket')">
          <q-btn color="grey-8" flat :to="{name: 'My Cart'}" icon="fas fa-shopping-bag" unelevated round/>
          <q-btn color="grey-8" flat :to="{name: 'My Transaction'}" icon="fas fa-clipboard-list" unelevated round/>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-tabs
      v-model="tab"
      active-color="primary"
      no-caps
      v-if="!($route.name === 'My Cart' || $route.name === 'My Transaction' || $route.name === 'Detail Paket')"
      shrink
      indicator-color="transparent"
      class="bg-white text-blue-grey-4 text-secondary fixed-bottom visible"
      >
      <q-route-tab to="/" name="explore" icon="fas fa-home">
        <div>Wo</div>
      </q-route-tab>
      <q-route-tab to="/vendor" name="cart" icon="fas fa-store-alt">
        <div>Vendor</div>
      </q-route-tab>
      <q-route-tab :to="{ name: 'inspiration' }" name="addevent" icon="add_box">
        Insiration
      </q-route-tab>
      <q-route-tab :to="{ name: 'wp' }" name="yourevent" icon="event_note">
        <div>WP</div>
      </q-route-tab>
      <q-route-tab :to="{ name: 'profile' }" name="eventfollow" icon="person">
        <div>User</div>
      </q-route-tab>
    </q-tabs>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      tab: 'mails'
    }
  }
}
</script>
