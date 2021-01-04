
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      required: true
    },
    children: [
      { path: '', name: 'dashboardUser', component: () => import('pages/Index.vue') },
      { path: 'vendor', component: () => import('pages/Vendor.vue') },
      { path: 'vendor/detail/:id', name: 'detailVendor', component: () => import('pages/DetailVendor.vue') },
      { path: 'wo/detail/:id', name: 'detailWo', component: () => import('pages/DetailWo.vue') },
      { path: 'cart', name: 'My Cart', component: () => import('pages/Cart.vue') },
      { path: 'mytransaksi', name: 'My Transaction', component: () => import('pages/Transaction.vue') },
      { path: 'wp', name: 'wp', component: () => import('pages/WP.vue') },
      { path: 'detailpaket/:id', name: 'Detail Paket', component: () => import('pages/DetailPaket.vue') },
      { path: 'profile', name: 'profile', component: () => import('pages/Profile.vue') },
      { path: 'inspiration', name: 'inspiration', component: () => import('pages/Inspiration.vue') }
    ]
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/daftar',
    name: 'registPage',
    component: () => import('pages/Daftar.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
