<template>
  <v-app>
    <NavBar v-if="isAuthenticated" />
    <v-main>
      <router-view />
      <SnackbarError />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './NavBar.vue';
import { mapState, mapGetters } from 'vuex';
import SnackbarError from '@/misc/SnackbarError.vue';
import { loadLocalUserAuthToken } from '@/services/auth';
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
  beforeMount() {
    this.checkForUserToken();
  },
  computed: {
    ...mapState('Auth', ['obj', 'error']),
    ...mapState([
      'alert',
    ]),
    ...mapGetters('Auth', ['isAuthenticated'])
  },
  methods: {
    checkForUserToken() {
      const token = loadLocalUserAuthToken()
      console.log('token', token);
      const credentials = {
        token: token,
        isLoggedIn: true,
      };

      if (token) {
        this.$store.dispatch('Auth/setCredentials', credentials);
      } else {
        this.$store.dispatch('Auth/logout');
      }
    },
  },
};
</script>
