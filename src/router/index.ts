import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import login from '../views/login.vue'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'login',
        component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/home.vue'),
        meta: { title: "首页" },
      },
      {
        path: '/result',
        name: 'Result',
        component: () => import(/* webpackChunkName: "about" */ '../views/result.vue'),
        meta: { title: "成果展示" },
      },
      {
        path: '/workSystem',
        name: 'WorkSystem',
        component: () => import(/* webpackChunkName: "about" */ '../views/workSystem.vue'),
        meta: { title: "工作制度" },
      },
      {
        path: '/active',
        name: 'Active',
        component: () => import(/* webpackChunkName: "about" */ '../views/active.vue'),
        meta: { title: "活动情况" },
      },
      {
        path: '/representative',
        name: 'Representative',
        component: () => import(/* webpackChunkName: "about" */ '../views/representative.vue'),
        meta: { title: "代表信息" },
      },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
