import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import About from './views/About'
import Efforts from './views/Efforts'
import EffortDetails from './views/EffortDetails'
import NewEffortForm from './views/NewEffortForm'
import NewActivityForm from './views/NewActivityForm'
import autocomplete from './components/inputs/Autocomplete'
import DataEntryWorkflow from './views/DataEntryWorkflow'
import ActivityDetails from './views/ActivityDetails'
import FormList from './views/FormList'

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
      path: '/forms',
      name: 'forms',
      component: FormList
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
      path: '/activities/:id',
      name: 'activity',
      component: ActivityDetails
    },
    {
      path: '/autocomplete',
      name: 'autocomplete',
      component: autocomplete
    },
    {
      path: '/forms/data-entry',
      name: 'data entry',
      component: DataEntryWorkflow
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
