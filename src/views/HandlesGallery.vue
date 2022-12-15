<template>
  <v-container id="handles" fluid tag="section">
    <ManageGallery v-if="handlesImages.length" :imagesList="handlesImages" folderName="Handles" />
  </v-container>
</template>
  
<script>
import ManageGallery from '../components/ManageGallery/ManageGallery.vue'
import { doAPIGet } from '../services/api'

export default {
  name: 'ManegeGallery',
  components: {
    ManageGallery,
  },
  data() {
    return {
      handlesImages: [],
    }
  },
  beforeMount() {
    this.getHandlesImages();
  },
  methods: {
    async getHandlesImages() {
      await doAPIGet('cloudinary/handles').then((res) => {
        console.log(res.data)
        this.handlesImages = res.data
      })
    }
  }
}
</script>