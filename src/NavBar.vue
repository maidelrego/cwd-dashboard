<template>
  <v-container>
    <v-app-bar app absolute class="v-bar--underline" color="transparent" :clipped-left="$vuetify.rtl"
      :clipped-right="!$vuetify.rtl" height="70" flat>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
      <v-btn class="ml-3 mr-4" elevation="1" fab small @click="mini = !mini">
        <v-icon>
          {{ mini ? 'mdi-format-list-bulleted' : 'mdi-dots-vertical' }}
        </v-icon>
      </v-btn>
      <v-toolbar-title>Noted App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer id="default-drawer" v-model="drawer" dark :right="$vuetify.rtl" :mini-variant.sync="mini"
      mini-variant-width="80" app width="260">

      <v-list-item class="ml-1">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>
      </v-list-item>

      <v-divider class="mx-3 mb-2" />

      <DefaultList :items="items" />

      <!-- <div class="px-2">
        <default-drawer-header />

        <v-divider class="mx-3 mb-2" />

        <default-list :items="items" />
      </div> -->
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import DefaultList from './layouts/List.vue'
export default {
  components: {
    DefaultList,
  },
  data() {
    return {
      drawer: true,
      items: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          to: '/',
        },
        {
          title: 'User Profile',
          icon: 'mdi-account',
          to: '/components/profile/',
        },
        {
          title: 'Regular Tables',
          icon: 'mdi-clipboard-outline',
          to: '/tables/regular/',
        },
        {
          title: 'Typography',
          icon: 'mdi-format-font',
          to: '/components/typography/',
        },
        {
          title: 'Icons',
          icon: 'mdi-chart-bubble',
          to: '/components/icons/',
        },
        {
          title: 'Google Maps',
          icon: 'mdi-map-marker',
          to: '/maps/google/',
        },
        {
          title: 'Notifications',
          icon: 'mdi-bell',
          to: '/components/notifications/',
        },
      ],
      mini: true,
    }
  },
}
</script>