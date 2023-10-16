import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useFirebaseAuth} from 'vuefire'
import {onAuthStateChanged} from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/propiedad/:id',
      name:'propiedad',
      component:() => import('../views/PropiedadView.vue')
    },
    {
      path: '/iniciar-sesion',
      name:'iniciar-sesion',
      component: () => import('../views/LoginView.vue')
    },
    {
      path:'/admin',
      name:'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta:{requiresAuth: true},
      children:[
        {
          path:'/admin/propiedades',
          name:'admin-propiedades',
          component: () => import('../views/admin/AdminView.vue')
        },
        {
          path:'/admin/nueva',
          name:'nueva-propiedad',
          component: () => import('../views/admin/NuevaPropiedadView.vue')
        },
        {
          path:'/admin/editar/:id',
          name:'editar-propiedad',
          component:() => import('../views/admin/EditarNuevaPropiedad.vue')
        }
      ]
    }
    
  ]
})

router.beforeEach(async(to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if(requiresAuth){
    //comprueba si el usuario esta autenticado
    try {
      await authenticateUser()
      next()
    } catch (error) {
      console.log(error)
      next({name:'iniciar-sesion'})
    }
  }else{
    //no protegido, muestra la vista
    next()
  }
})


function authenticateUser() {
  const auth = useFirebaseAuth();

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if(user) {
        resolve(user)
      } else {
        reject()
      }
    })
  })
}



export default router
