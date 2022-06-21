import { createWebHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/pages/Login/index.vue'),
    meta: {}
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes: [...constantRoutes]
})
