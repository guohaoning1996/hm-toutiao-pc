import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login/index.vue'
import home from '@/views/home'
import NotFound from '@/views/404'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: home
  },
  {
    path: '*',
    component: NotFound
  }
  ]
})
export default router
