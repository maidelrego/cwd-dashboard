<template>
  <v-snackbar v-model="alert.show" :top="true" style="z-index: 9001" :color="alert.color" :elevation="24"
    timeout="3000">
    <v-layout align-center pr-4>
      <v-icon class="pr-3" dark large>{{ alert.icon }}</v-icon>
      <v-layout column>
        <div class="text-center">
          <strong>{{ alert.msg }}</strong>
        </div>
      </v-layout>
    </v-layout>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackbarError',
  computed: {
    alert() {
      return this.$store.state.alert;
    },
  },
}
</script>