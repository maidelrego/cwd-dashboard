<template>
  <v-container>
    <v-app-bar app absolute class="v-bar--underline" dense color="transparent" :clipped-left="$vuetify.rtl"
      :clipped-right="!$vuetify.rtl" flat>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
      <v-btn class="ml-3 mt-5 hidden-sm-and-down" elevation="1" fab small @click="mini = !mini">
        <v-icon>
          {{ mini ? 'mdi-format-list-bulleted' : 'mdi-dots-vertical' }}
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer id="default-drawer" v-model="drawer" dark :right="$vuetify.rtl" :mini-variant.sync="mini"
      mini-variant-width="80" app width="260">

      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>John Leider</v-list-item-title>
      </v-list-item>
      <v-divider class="mx-3 mb-2" />
      <DefaultList :items="items" />
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
          title: 'Gallery',
          icon: 'mdi-image-multiple',
          to: '/manage-gallery',
        },
        {
          title: 'Door Designs',
          icon: 'mdi-door-sliding',
          to: '/door-designs-gallery',
        },
        {
          title: 'Door Kits',
          icon: 'mdi-hanger',
          to: '/door-kits-gallery',
        },
        {
          title: 'Finish Paints',
          icon: 'mdi-brush-variant',
          to: '/finish-paints-gallery',
        },
        {
          title: 'Handles',
          icon: 'mdi-hand-extended',
          to: '/handles-gallery',
        }
      ],
      mini: true,
    }
  },
}
</script>

<style lang="sass">
.logo 
  margin: auto
  width: 150px

#default-drawer
  .v-list-item
    margin-bottom: 8px

  .v-list-item::before,
  .v-list-item::after
    display: none

  .v-list-group__header__prepend-icon,
  .v-list-item__icon
    margin-top: 12px
    margin-bottom: 12px
    margin-left: 4px

  &.v-navigation-drawer--mini-variant
    .v-list-item
      justify-content: flex-start !important
</style>