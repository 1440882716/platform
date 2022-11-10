import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import login from '../views/login.vue'
import home from '../views/home.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/home.vue'),
    meta: { title: "首页" },
  },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
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
      {
        path: '/npcInfo',
        name: 'npcInfo',
        component: () => import(/* webpackChunkName: "about" */ '../views/npcInfo.vue'),
        meta: { title: "代表信息" },
      },
      {
        path: '/npcDetail',
        name: 'npcDetail',
        component: () => import(/* webpackChunkName: "about" */ '../views/npcDetail.vue'),
        meta: { title: "代表详情" },
      },
      {
        path: '/dutiesDetail',
        name: 'dutiesDetail',
        component: () => import(/* webpackChunkName: "about" */ '../views/dutiesDetail.vue'),
        meta: { title: "履职详情" },
      },
      {
        path: '/files',
        name: 'files',
        component: () => import(/* webpackChunkName: "about" */ '../views/files.vue'),
        meta: { title: "文件" },
      },
      {
        path: '/infomation',
        name: 'infomation',
        component: () => import(/* webpackChunkName: "about" */ '../views/infomation.vue'),
        meta: { title: "基本信息" },
      },
      {
        path: '/videoList',
        name: 'videoList',
        component: () => import(/* webpackChunkName: "about" */ '../views/videoList.vue'),
        meta: { title: "视频列表" },
      },
      {
        path: '/video',
        name: 'video',
        component: () => import(/* webpackChunkName: "about" */ '../views/video.vue'),
        meta: { title: "视频播放" },
      }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
