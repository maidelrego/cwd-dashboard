<template>
  <v-container id="gallery" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-toolbar flat dense>
              <v-toolbar-title>{{ folderName }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-title class="primary--text" v-if="isMultiselection">{{ multipleSelection.length }}
                Assets Selected</v-toolbar-title>
              <v-spacer></v-spacer>
              <Uploads :folderName="folderName" icon @uploaded="refreshList" />
              <v-btn v-if="isMultiselection" small fab color="primary" class="white--text mr-5 ml-5" @click="handleBulkDelete()">
                <v-progress-circular v-if="uploading" indeterminate size="20" color="white"></v-progress-circular>
                <v-icon v-else>mdi-trash-can-outline</v-icon>
              </v-btn>
            </v-toolbar>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-5" v-for="({ url, name, assetId }) in imagesList" :key="name" cols="12" md="3" lg="3">
        <StatsCard @checkboxEvent="checkboxEvent" :heading="name" color="primary" :eventId="assetId">
          <v-card-text>
            <v-sheet>
              <img :src="url" :height="imagesRezise" width="100%" />
            </v-sheet>
          </v-card-text>
          <template v-if="multipleSelection.length === 0" #actions>
            <v-btn @click="handleSingleDelete(assetId)" class="text-center" color="error" rounded>
              Delete
            </v-btn>
          </template>
        </StatsCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StatsCard from '@/components/StatsCard/StatsCard.vue'
import Uploads from '@/components/UploadImages/Uploads.vue'
import { doAPIDelete } from '@/services/api'

export default {
  name: 'ManegeGallery',
  props: {
    imagesList: {
      type: Array,
      required: true
    },
    folderName: {
      type: String,
      required: true
    }
  },
  components: {
    StatsCard,
    Uploads
  },
  data() {
    return {
      expand: false,
      multipleSelection: [],
      uploading: false
    }
  },
  computed: {
    isMultiselection() {
      return this.multipleSelection.length > 0
    },
    imagesRezise() {
      if (this.folderName === 'Finish' || this.folderName === 'Handles') {
        return '200'
      } else {
        return '400'
      }
    }
  },
  watch: {
    multipleSelection() {
      if (this.multipleSelection.length > 0) {
        this.expand = true
      } else {
        this.expand = false
      }
    },
  },
  methods: {
    refreshList() {
      this.$emit('updateList')
    },
    async handleSingleDelete(asset_id) {
      await doAPIDelete('cloudinary/' + asset_id).then((res) => {
        if (res.status === 200) {
          this.$emit('updateList')
        } else {
          console.log('Error', res.data)
        }
      })

    },
    async handleBulkDelete() {
      this.uploading = true
      for (const selection of this.multipleSelection) {
        await this.handleSingleDelete(selection)
      }
      this.multipleSelection = []
      this.uploading = false
    },
    checkboxEvent(checkboxValue, assetId) {
      if (checkboxValue) {
        this.multipleSelection.push(assetId)
      } else {
        this.multipleSelection = this.multipleSelection.filter((item) => item !== assetId)
      }
    },
  }
}
</script>