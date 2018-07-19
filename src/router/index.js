import Vue from 'vue' // 导入Vue
import Router from 'vue-router' // 导入vue-router 库
import Layouts from '@/components/layouts' // 导入layouts.vue 组件

Vue.use(Router) // 全局注册Router组件，它会绑定到Vue实例里面

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layouts',
      component: Layouts
    }
  ]
})
