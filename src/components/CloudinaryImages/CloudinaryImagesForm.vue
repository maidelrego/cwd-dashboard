<template>
  <v-card class="mt-5" flat tile>
    <v-card-text>
      <v-form class="mt-3">
        <v-row>
          <v-col cols="12">
            <v-text-field filled rounded dense v-model="name" label="Name" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn :disabled="!nameChanged" color="success" small rounded class="white--text" @click="saveData">
              Save Data
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
    
<script>
import { mapFields } from '../../store/dataMappers'
import { mapState } from 'vuex'

export default {
  name: 'CloudinaryImagesForm',
  props: {
    idProp: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    mountedName: '',
  }),
  beforeMount() {
    this.$store.dispatch('CloudinaryImages/initById', this.idProp).then((res) => {
      this.mountedName = res.name
    })
  },
  computed: {
    ...mapState('CloudinaryImages', ['obj', 'error']),
    ...mapFields({
      fields: [
        'name',
      ],
      base: 'CloudinaryImages',
      mutation: 'INIT_OBJECT'
    }),
    nameChanged() {
      return this.mountedName !== this.name
    },
  },
  methods: {
    saveData() {
      this.$store.dispatch('CloudinaryImages/updateData', this.idProp).then(() => {
        this.$emit('nameEdited')
      })
    },
  },
}
</script>