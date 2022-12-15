<template>
    <v-container id="doorDesigns" fluid tag="section">
      <ManageGallery :imagesList="doorDesingsImages" folderName="Designs" @updateList="updateList" />
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
        doorDesingsImages: [],
      }
    },
    beforeMount() {
      this.getDoorDesignsImages();
    },
    methods: {
      updateList() {
        this.getDoorDesignsImages();
      },
      async getDoorDesignsImages() {
        await doAPIGet('cloudinary-images/doorDesigns').then((res) => {
          this.doorDesingsImages = res.data
        })
      }
    }
  }
  </script>