import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import index from '../views/index.vue'
import admin from '../views/admin.vue'
import login from '../views/login.vue'
import home from '../views/home.vue'
import code_create from '../views/code_create.vue'
import code_list from '../views/code_list.vue'
import code_use_record_list from '../views/code_use_record_list.vue'

const routes: Array<RouteRecordRaw> = [
  // { path: "/", redirect: "/" },
  {
    path: '/',
    name: 'index',
    component: index,
    children: [
      { path: "/", redirect: "/home" },
      {
        path: '/home',
        name: 'home',
        component: home
      },
      {
        path: 'admin',
        name: 'admin',
        component: admin,
        // 登录拦截
        meta: { requireAuth: true },
        children: [
          { path: "", redirect: "admin/codeCreate" },
          {
            path: 'codeCreate',
            name: 'codeCreate',
            component: code_create
          },
          {
            path: 'codeList',
            name: 'codeList',
            component: code_list
          },
          {
            path: 'codeUseRecordList',
            name: 'codeUseRecordList',
            component: code_use_record_list
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
