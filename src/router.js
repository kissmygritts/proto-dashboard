import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Efforts from './views/Efforts.vue'
import NewEffort from './views/NewEffort.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/about',
      name: 'about',
      component: About
    }, {
      path: '/efforts',
      name: 'efforts',
      component: Efforts
    }, {
      path: '/efforts/new',
      name: 'new Efforts',
      component: NewEffort
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
