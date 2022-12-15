<template>
  <v-container id="doorKits" fluid tag="section">
    <ManageGallery v-if="doorKitsImages.length" :imagesList="doorKitsImages" folderName="DoorKits" @updateList="updateList" />
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
      doorKitsImages: [],
    }
  },
  beforeMount() {
    this.getDoorKitsImages();
  },
  methods: {
    updateList() {
      this.getDoorKitsImages();
    },
    async getDoorKitsImages() {
      await doAPIGet('cloudinary/doorKits').then((res) => {
        console.log(res.data)
        this.doorKitsImages = res.data
      })
    }
  }
}
</script>