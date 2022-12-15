<template>
  <v-container id="gallery" fluid tag="section">
    <ManageGallery :imagesList="galleryImages" folderName="Gallery" @updateList="updateList" />
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
      galleryImages: [],
    }
  },
  beforeMount() {
    this.getGalleryImages();
  },
  methods: {
    updateList() {
      this.getGalleryImages();
    },
    async getGalleryImages() {
      await doAPIGet('cloudinary-images/galleryImages').then((res) => {
        this.galleryImages = res.data
      })
    }
  }
}
</script>