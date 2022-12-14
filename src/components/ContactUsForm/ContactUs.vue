<template>
  <v-card class="mt-5" flat tile>
    <v-card-text>
      <v-form class="mt-3">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-switch @change="markAsRead" v-model="isRead" :label="isRead ? 'Is Read' : 'Mark As Read'" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field readonly filled rounded dense v-model="name" label="Name" />
          </v-col>
          <v-col cols="12">
            <v-text-field readonly filled rounded dense v-model="email" label="E-mail" />
          </v-col>
          <v-col cols="12">
            <v-textarea readonly filled rounded dense v-model="message" :counter="200" label="Message" />
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
  name: 'ContactUsForm',
  props: {
    idProp: {
      type: Number,
      required: true
    }
  },
  data: () => ({
  }),
  beforeMount() {
    this.$store.dispatch('ContactUs/initById', this.idProp)
  },
  computed: {
    ...mapState('ContactUs', ['obj', 'error', 'changed']),
    ...mapFields({
      fields: [
        'name',
        'message',
        'email',
        'isRead'
      ],
      base: 'ContactUs',
      mutation: 'INIT_OBJECT'
    }),
  },
  methods: {
    markAsRead() {
      this.$store.dispatch('ContactUs/updateData', this.idProp).then(() => {
        this.$emit('updateDashboard')
      })
    },
  },
}
</script>