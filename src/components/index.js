import myBread from '@/components/my-bread/index.vue'
import MyChannel from '@/components/my-channel'
import MyImage from '@/components/my-image'
export default {
  install (Vue) {
    // Vue 是一个构造函数
    Vue.component('my-bread', myBread)
    Vue.component('my-channel', MyChannel)
    Vue.component('my-image', MyImage)
  }
}
