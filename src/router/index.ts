import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// const { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } = vueRouter
import Home from '../views/Home.vue'
import Other from '../views/Other.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/other',
    name: 'Other',
    component: Other
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
