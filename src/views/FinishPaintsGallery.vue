<template>
    <v-container id="finishPaints" fluid tag="section">
      <ManageGallery :imagesList="finishPaintsImages" folderName="Finish" @updateList="updateList" />
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
        finishPaintsImages: [],
      }
    },
    beforeMount() {
      this.getFinishPaintsImages();
    },
    methods: {
      updateList() {
        this.getFinishPaintsImages();
      },
      async getFinishPaintsImages() {
        await doAPIGet('cloudinary-images/finishColors').then((res) => {
          this.finishPaintsImages = res.data
        })
      }
    }
  }
  </script>