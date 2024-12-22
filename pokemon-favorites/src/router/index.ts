import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import LoadingView from '@/views/LoadingView.vue'
import ListView from '@/views/ListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Welcome', component: WelcomeView },
    { path: '/loading', name: 'Loading', component: LoadingView },
    { path: '/list', name: 'List', component: ListView },
  ],
})

export default router
