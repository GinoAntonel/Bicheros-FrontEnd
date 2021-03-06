import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from './components/Base'
import Home from './components/Home'
import Login from './components/User/Login'
import Error from './components/Error/Error'
import SearchAnimal from  './components/Search/SearchAnimal'
import Monto from './components/Monto/Monto'
import Register from './components/User/Register'
import ListCAP from "./components/CAP/ListCAP"
import DonationList from "./components/Donation/DonationList"
import Veterinaria from './components/Veterinaria/Veterinaria'
import SearchVeterinaria from './components/Veterinaria/SearchVeterinaria'
import SearchCAP from './components/CAP/SearchCAP'
import HistorialMedico from './components/Historial/HistorialMedico'
import Donations from './components/Donation/Donations'
import store from './store/index'

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
    path: '/clientes',
    component: ListCAP,
    name: 'listCAP',
    meta: {
      title: 'Lista Clientes'
    }
  },
  {
    path: '/donations',
    component: Donations,
    name: 'Donation',
    meta: {
      title: 'Lista donaciones'
    }
  },
  {
    path: '/historial/:id',
    component: HistorialMedico,
    name: 'historial',
    meta: {
      title: 'Historial Medico'
    }
  },
  {
    path: '/searchCap',
    component: SearchCAP,
    name: 'searchCap',
    meta: {
      title: 'Clietnes Buscados'
    }
  },
  {
    path: '/searchVet',
    component: SearchVeterinaria,
    name: 'searchVet',
    meta: {
      title: 'Veterinarias Buscadas'
    }
  },
  {
    path: '/veterinarias',
    component: Veterinaria,
    name: 'veterinaria',
    meta: {
      title: 'Lista Veterinarias'
    }
  },
  {
    path: '/donaciones',
    component: DonationList,
    name: 'DonationList',
    meta: {
      title: 'Donciones'
    }
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
  {
    path: '/register',
    component: Register,
    name: 'register',
    meta: {
      title: 'Register'
    }
  },
]

let router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  switch (to.name) {
    case 'home':
    case 'monto':
    case 'DonationList':
    case 'veterinaria':
    case 'searchVet':
    case 'searchCap':
    case 'historial':
    case 'Donation':
    case 'listCAP':
      store.state.user.token === null ? next({ name: 'login' }) : null
      break
  }
  next()
})

export default router
