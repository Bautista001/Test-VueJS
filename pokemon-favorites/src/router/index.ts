import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import LoadingView from '../views/LoadingView.vue'
import PokemonList from '../views/PokemonListView.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import PokemonListLayout from '../layouts/PokemonListLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: WelcomeView,
      },
      {
        path: 'loading',
        name: 'Loading',
        component: LoadingView,
      },
    ],
  },
  {
    path: '/pokemon-list',
    component: PokemonListLayout,
    children: [
      {
        path: '',
        name: 'PokemonList',
        component: PokemonList,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
