import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from './components/Base'
import Home from './components/Home'
import Login from './components/User/Login'
import Error from './components/Error/Error'
import SearchAnimal from  './components/Search/SearchAnimal'
import Monto from './components/Monto/Monto'

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
      {
        path: '/error',
        component: Error,
        name: 'error',
        meta: {
          title: 'Error'
        }
      },
    ]
  },
  {
    path: '/monto',
    component: Monto,
    name: 'monto',
    meta: {
      title: 'Monto'
    }
  },
  {
    path: '/search',
    component: SearchAnimal,
    name: 'search',
    meta: {
      title: 'Search'
    }
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