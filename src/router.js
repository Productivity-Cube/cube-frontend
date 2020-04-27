import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import EventsList from './views/EventsList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/events/:name',
      name: 'eventsList',
      component: EventsList
    }
  ]
})
