import { createRouter, createWebHistory } from 'vue-router'
import DockSearch from '../components/Dock/DockSearch.vue'

const router = createRouter({
  history: createWebHistory('/obs-sda-hymnal/'),
  routes: [
    {
      path: '/',
      component: () => import('../views/Dock.vue'),
      children: [
        {
          path: '/',
          name: 'dock-search',
          component: () => import('../components/Dock/DockSearch.vue')
        },
        {
          path: '/dock-queue',
          name: 'dock-queue',
          component: () => import('../components/Dock/DockQueue.vue')
        },

        {
          path: '/dock-settings',
          name: 'dock-settings',
          component: () => import('../components/Dock/DockSettings.vue')
        },
      ]
    },
    {
      path: '/obs-sda-hymnal/browser',
      name: 'browser',
      component: () => import('../views/Browser.vue')
    }
  ]
})

export default router
