import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login/index.vue'
import home from '@/views/home'
import NotFound from '@/views/404'
import local from '@/utils/local'
import Article from '@/views/article'
import welcome from '@/views/welcome'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: home,
    children: [{
      path: '',
      component: welcome
    }, {
      path: '/article',
      component: Article
    }]
  },
  {
    path: '*',
    component: NotFound
  }
  ]
})
// 添加路由的 导航守卫（前置导航守卫）
router.beforeEach((to, from, next) => {
  // 当每次跳转路由前触发
  // to 跳转到目标 路由对象
  // from 从哪里跳转过来  路由对象
  // next 下一步方法  next()放行  next(‘/login’) 拦截
  const user = local.getUser()
  // 如果登录
  if (user && user.token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
