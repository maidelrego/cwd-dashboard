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
              <v-btn v-if="isMultiselection" small fab color="primary" class="white--text mr-5 ml-5"
                @click="handleBulkDelete()">
                <v-progress-circular v-if="uploading" indeterminate size="20" color="white"></v-progress-circular>
                <v-icon v-else>mdi-trash-can-outline</v-icon>
              </v-btn>
            </v-toolbar>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-5" v-for="({ url, name, id }) in imagesList" :key="name" cols="12" md="3" lg="3">
        <StatsCard @checkboxEvent="checkboxEvent" :heading="name" color="primary" :eventId="id">
          <v-card-text>
            <v-sheet>
              <img :src="url" :height="imagesRezise" width="100%" />
            </v-sheet>
          </v-card-text>
          <template v-if="multipleSelection.length === 0" #actions>
            <v-btn @click="handleSingleDelete(id)" color="primary" icon class="white--text">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn @click="editName(id)" color="primary" icon class="white--text">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
        </StatsCard>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-model="cloudinaryDialog" width="500" persistent scrollable>
        <v-card flat>
          <v-toolbar dense dark flat color="primary">
            <v-toolbar-title class="white--text">Edit Image Name</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="closeCloudinaryDialog" color="error" title small>
              <v-icon>mdi-window-close</v-icon>
            </v-btn>
          </v-toolbar>
          <CloudinaryImagesForm @nameEdited="nameEdited" v-if="cloudinaryDialog" :idProp="imageId" />
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import StatsCard from '@/components/StatsCard/StatsCard.vue'
import Uploads from '@/components/UploadImages/Uploads.vue'
import { doAPIDelete } from '@/services/api'
import CloudinaryImagesForm from '@/components/CloudinaryImages/CloudinaryImagesForm.vue'

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
    Uploads,
    CloudinaryImagesForm
  },
  data() {
    return {
      expand: false,
      multipleSelection: [],
      uploading: false,
      cloudinaryDialog: false,
      imageId: null
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
    nameEdited() {
      this.$emit('updateList')
      this.closeCloudinaryDialog()
    },
    refreshList() {
      this.$emit('updateList')
    },
    async handleSingleDelete(id) {
      await doAPIDelete('cloudinary/' + id).then((res) => {
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
    editName(id) {
      this.imageId = id
      this.cloudinaryDialog = true
    },
    closeCloudinaryDialog() {
      this.cloudinaryDialog = false
    },
  }
}
</script>