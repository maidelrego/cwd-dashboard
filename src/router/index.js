import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/manage-gallery',
    name: 'ManegeGallery',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Gallery.vue')
  },
  {
    path: '/door-designs-gallery',
    name: 'DoorDesignsGallery',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/DoorDesignsGallery.vue')
  },
  {
    path: '/door-kits-gallery',
    name: 'DoorKitsGallery',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/DoorKitsGallery.vue')
  },
  {
    path: '/finish-paints-gallery',
    name: 'FinishPaintsGallery',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/FinishPaintsGallery.vue')
  },
  {
    path: '/handles-gallery',
    name: 'HandlesGallery',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/HandlesGallery.vue')
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/Login.vue')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('CWD_TOKEN')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (token == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
