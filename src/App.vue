<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view />
      <SnackbarError />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './NavBar.vue';
import { mapState } from 'vuex';
import SnackbarError from '@/misc/SnackbarError.vue';
import '@/styles/overrides.sass'

export default {
  name: 'App',
  components: {
    NavBar,
    SnackbarError
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapState([
      'alert',
    ]),
  },
};
</script>
