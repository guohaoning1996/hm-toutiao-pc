import myBread from '@/components/my-bread/index.vue'
export default {
  install (Vue) {
    // Vue 是一个构造函数
    Vue.component('my-bread', myBread)
  }
}
