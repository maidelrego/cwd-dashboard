<template>
  <v-container id="handles" fluid tag="section">
    <ManageGallery :imagesList="handlesImages" folderName="Handles" @updateList="updateList" />
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
    updateList() {
      this.getHandlesImages();
    },
    async getHandlesImages() {
      await doAPIGet('cloudinary-images/handles').then((res) => {
        this.handlesImages = res.data
      })
    }
  }
}
</script>