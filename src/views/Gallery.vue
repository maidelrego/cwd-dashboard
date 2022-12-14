<template>
  <v-container id="gallery" fluid tag="section">
    <v-row>
      <v-col class="mb-5" v-for="({ url, name }) in galleryImages" :key="name" cols="12" md="3" lg="3">
        <StatsCard :heading="name" color="primary">
          <v-card-text>
            <v-sheet>
              <img :src="url" width="100%" />
            </v-sheet>
          </v-card-text>
        </StatsCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StatsCard from '@/components/StatsCard/StatsCard.vue'
import { doAPIGet } from '../services/api'

export default {
  name: 'ManegeGallery',
  components: {
    StatsCard,
  },
  data() {
    return {
      stats: [
        {
          actionIcon: 'mdi-badge-account-outline',
          actionText: 'Total Quotes',
          color: 'success',
          icon: 'mdi-badge-account-outline',
          title: 'Quotes',
        },
        {
          actionIcon: 'mdi-message-text-outline',
          actionText: 'Total Messages',
          color: 'success',
          icon: 'mdi-message-text-outline',
          title: 'Messages',
        },
        {
          actionIcon: 'mdi-alert-circle-outline',
          actionText: 'You haven\'t seen these yet',
          color: 'error',
          icon: 'mdi-badge-account-alert-outline',
          title: 'Unread Quotes',
        },
        {
          actionIcon: 'mdi-alert-circle-outline',
          actionText: 'You haven\'t seen these yet',
          color: 'error',
          icon: 'mdi-comment-alert-outline',
          title: 'Unread Messages',
        },
      ],
      galleryImages: [],
    }
  },
  beforeMount() {
    this.getGalleryImages();
  },
  methods: {
    async getGalleryImages() {
      await doAPIGet('cloudinary/galleryImages').then((res) => {
        console.log(res.data)
        this.galleryImages = res.data
      })
    }
  }
}
</script>