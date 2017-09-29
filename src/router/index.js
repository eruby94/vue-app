import Vue from 'vue'
import Router from 'vue-router'
import ToDo from '@/components/ToDo'
import Archive from '@/components/Archive'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: ToDo
    },
    {
      path: '/archive',
      component: Archive
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
