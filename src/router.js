import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Efforts from './views/Efforts.vue'
import EffortDetails from './views/EffortDetails.vue'
import NewEffortForm from './views/NewEffortForm.vue'
import NewActivityForm from './views/NewActivityForm.vue'
import autocomplete from './components/inputs/Autocomplete.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/efforts',
      name: 'efforts',
      component: Efforts
    },
    {
      path: '/forms/new-effort',
      name: 'new Efforts',
      component: NewEffortForm
    },
    {
      path: '/forms/new-activity',
      name: 'new Activity',
      component: NewActivityForm
    },
    {
      path: '/efforts/:id',
      name: 'effort',
      component: EffortDetails
    },
    {
      path: '/autocomplete',
      name: 'autocomplete',
      component: autocomplete
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
