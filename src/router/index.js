// File: src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import invitation from '../views/invitation.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Ini jalur dinamisnya. ':slug' bakal nangkep "romeo-juliet"
      path: '/:slug',
      name: 'invitation',
      component: invitation
    }
  ]
})

export default router