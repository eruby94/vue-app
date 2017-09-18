import Vue from 'vue'
import Router from 'vue-router'
import ToDo from '@/components/ToDo'
import Archive from '@/components/Archive'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ToDo',
      component: ToDo
    },
    {
      path: '/archive',
      name: 'Archive',
      component: Archive
    }
  ]
})
