<template>
  <q-page padding>
    <q-card v-for="(d, i) in data" :key="i">
      <img :src="d.url">

      <q-card-section>
        <div class="text-h6">{{ d.ket }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {
          url: 'https://cdn-image.hipwee.com/wp-content/uploads/2019/08/hipwee-page-73.jpg',
          ket: 'Traditional'
        },
        {
          url: 'https://i.pinimg.com/originals/4d/91/68/4d916828f2ddda1f7242ce51f528fd4a.jpg',
          ket: 'Modern'
        },
        {
          url: 'https://1hq6f244nzqssy4d8fp6y7re-wpengine.netdna-ssl.com/wp-content/uploads/2018/09/elegant-wedding-rustic-greenery-wedding-at-sucrerie-de-la-montagne5-375x195.jpg',
          ket: 'Rustic'
        },
        {
          url: 'https://indonesia.tripcanvas.co/wp-content/uploads/2016/11/4-4-via-hullalalaa.jpg',
          ket: 'Romance'
        },
        {
          url: 'https://london.bridestory.com/images/c_fill,dpr_1.0,f_auto,fl_progressive,pg_1,q_80,w_680/v1/assets/post-9-B1s3YWRkE/elior-design_simple-and-elegant-wedding-of-abraham-and-carin_1.jpg',
          ket: 'Elegant'
        },
        {
          url: 'https://london.bridestory.com/images/c_fill,dpr_1.0,f_auto,fl_progressive,pg_1,q_80,w_680/v1/assets/fm-3-of-4-rk1SxA41E/elior-design_minimalist-grey-and-gold-wedding-of-franky-and-meldi_5.jpg',
          ket: 'Minimalist'
        },
        {
          url: 'https://image.winudf.com/v2/image/Y29tLndlZGRpbmdkZWNvcmF0aW9ucy5hbGlzdHVkaW9fc2NyZWVuc2hvdHNfMF8zMGVlNmM0NA/screen-0.jpg?fakeurl=1&type=.jpg',
          ket: ''
        }
      ]
    }
  }
}
</script>
