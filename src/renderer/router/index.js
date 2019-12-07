import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: require('@/views/Income').default
    },
    {
      path: '/Assignments',
      name: 'assignments-page',
      component: require('@/views/Assignments').default
    },
    {
      path: '/Statistics',
      name: 'statistics-page',
      component: require('@/views/Statistics').default
    },
    {
      path: '/Settings',
      name: 'settings-page',
      component: require('@/views/Settings').default
    },
    {
      path: '/Login',
      name: 'login-page',
      meta: { layout: "no-sidebar" },
      component: require('@/views/Login').default
    },
    {
      path: '/a4',
      name: 'a4-page',
      meta: { layout: "no-sidebar" },
      component: require('@/views/A4').default
    },
    {
      path: '/view',
      name: 'viewview-page',
      meta: { layout: "no-sidebar" },
      component: require('@/views/viewview').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/NewLetter',
      name: 'newletter-page',
      component: require('@/components/NewLetter').default,
      //props: true
    },
    {
      path: '/LetterView',
      name: 'letterview-page',
      component: require('@/views/LetterView').default,
      //props: true
    }
  ]
})
