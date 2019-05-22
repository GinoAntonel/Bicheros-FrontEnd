import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from './components/Base'
import Home from './components/Home'
import Login from './components/Login/Login'
import Card from './components/Animal/Card'
import Footer from './components/Base/Footer'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Base,
    name: 'base',
    meta: {
      title: 'Base'
    }, 
    children: [
      {
        path: '',
        component: Home,
        name: 'home',
        meta: {
          title: 'Bicheros'
        }
      },
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      title: 'Login'
    }
  },
]

export default new VueRouter({
  routes,
  mode: 'history'
})