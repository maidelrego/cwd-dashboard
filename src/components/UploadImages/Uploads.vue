<template>
  <v-dialog v-model="dialog" width="800" persistent scrollable>
    <!-- max-width set in app.vue (max-width 400px) -->
    <template v-slot:activator="{ on: dialog, attrs }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn @click="openDialog" color="primary" class="ma-2 white--text" small fab v-bind="attrs"
            v-on="{ ...tooltip, ...dialog }">
            <v-icon dark>mdi-cloud-upload</v-icon>
          </v-btn>
        </template>
        <span>Upload Images</span>
      </v-tooltip>
    </template>
    <v-card flat tile>
      <v-toolbar dense dark flat color="primary">
        <v-toolbar-title class="white--text">Upload Images</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog" color="error" title small>
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form class="mt-5">
          <v-file-input v-model="files" dense filled rounded color="primary" counter label="File input" multiple
            placeholder="Select your files" prepend-icon="mdi-paperclip">
            <template v-slot:selection="{ index, text }">
              <v-chip v-if="index < 2" color="primary" dark label small>
                {{ text }}
              </v-chip>

              <span v-else-if="index === 2" class="text-overline grey--text text--darken-3 mx-2">
                +{{ files.length - 2 }} File(s)
              </span>
            </template>
          </v-file-input>
          <v-col align="right">
            <v-btn :disabled="!hasFiles" color="primary" class="white--text" @click="uploadImages">
              <v-progress-circular v-if="uploading" indeterminate size="20" color="white"></v-progress-circular>
              <span v-else>Upload<v-icon class="mr-5">mdi-cloud-upload</v-icon></span>
            </v-btn>
          </v-col>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { doAPIPost } from '@/services/api'
export default {
  name: 'UploadImages',
  props: {
    folderName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      files: [],
      uploading: false,
    }
  },
  computed: {
    hasFiles() {
      return this.files.length > 0
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false
    },
    openDialog() {
      this.dialog = true
    },
    async uploadImages() {
      this.uploading = true
      var formData = [] 
      var promises = []

      for (const img of this.files) {
        formData = new FormData()
        formData.append('file', img)
        formData.append('name', img.name)
        formData.append('folder', this.folderName)
        formData.append('url', '')
        formData.append('assetId', '')
        promises.push(doAPIPost('cloudinary/upload', formData))
      }

      await Promise.all(promises).then(() => {
        this.uploading = false
        this.$emit('uploaded')
        this.closeDialog()
      })
      
    },
  },
}
</script>