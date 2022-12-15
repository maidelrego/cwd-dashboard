import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/manage-gallery',
    name: 'ManegeGallery',
    component: () => import('../views/Gallery.vue')
  },
  {
    path: '/door-designs-gallery',
    name: 'DoorDesignsGallery',
    component: () => import('../views/DoorDesignsGallery.vue')
  },
  {
    path: '/door-kits-gallery',
    name: 'DoorKitsGallery',
    component: () => import('../views/DoorKitsGallery.vue')
  },
  {
    path: '/finish-paints-gallery',
    name: 'FinishPaintsGallery',
    component: () => import('../views/FinishPaintsGallery.vue')
  },
  {
    path: '/handles-gallery',
    name: 'HandlesGallery',
    component: () => import('../views/HandlesGallery.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
