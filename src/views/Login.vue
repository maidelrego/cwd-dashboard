<template>
  <v-card class="login">
    <v-card-title class="text-center">
      <img src="@/assets/logo.png" height="100" class="login" alt="Logo" />
    </v-card-title>
    <v-card-text>
      <v-form class="mt-3">
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="username" filled rounded dense label="Username" />
          </v-col>
          <v-col>
            <v-text-field v-model="password" filled rounded dense label="Password" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn @click="login" color="primary" rounded class="white--text">
              Login
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
 
<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$store.dispatch('Auth/login', { username: this.username, password: this.password });
    },
  },
};
</script>
 
<style>
.login {
  max-width: 400px;
  margin: 0 auto;
  top: 15%;
}
</style>
 