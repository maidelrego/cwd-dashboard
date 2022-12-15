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
              <v-btn color="primary" class="ma-2 white--text" small fab>
                <v-icon dark>mdi-cloud-upload</v-icon>
              </v-btn>
              <v-btn icon large v-if="isMultiselection">
                <v-btn color="primary" class="ma-2 white--text" small fab>
                <v-icon size="23" dark>mdi-trash-can-outline</v-icon>
              </v-btn>
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
          <template #actions>
            <v-btn @click="handleSingleDelete(id)" class="text-center" color="error" rounded>
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
  },
  data() {
    return {
      expand: false,
      multipleSelection: [],
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
    async handleSingleDelete(asset_id) {
      console.log('delete', asset_id)
      await doAPIDelete('cloudinary/' + asset_id).then((res) => {
        if (res.status === 200) {
          this.$emit('updateList')
        } else {
          console.log('Error', res.data)
        }
      })

    },
    checkboxEvent(checkboxValue, id) {
      if (checkboxValue) {
        this.multipleSelection.push(id)
      } else {
        this.multipleSelection = this.multipleSelection.filter((item) => item !== id)
      }
      console.log(this.multipleSelection)
    },
  }
}
</script>