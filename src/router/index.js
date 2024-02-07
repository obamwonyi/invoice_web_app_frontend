import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// stores/counter.js
import { defineStore } from 'pinia'


/**
 * The various components we will be using
 */
import DashboardView from '../views/dashboard/DashBoard.vue';

import SignUp from '../views/SignUp.vue';

import Login from '../views/LogIn.vue';

import AddClientTemplateVue from '@/views/dashboard/AddClientTemplate.vue';

import AddInvoiceTemplateVue from '@/views/dashboard/AddInvoiceTemplate.vue';

import ClientTemplateVue from '@/views/dashboard/ClientTemplate.vue';

import ClientsTemplateVue from '@/views/dashboard/ClientsTemplate.vue';

import EditClientTemplateVue from '@/views/dashboard/EditClientTemplate.vue';

import EditTeamTemplateVue from '@/views/dashboard/EditTeamTemplate.vue';         

import InvoiceTemplateVue from '@/views/dashboard/InvoiceTemplate.vue';

import InvoicesTemplateVue from '@/views/dashboard/InvoicesTemplate.vue';

import MyAccountTemplateVue from '@/views/dashboard/MyAccountTemplate.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    
    // Dashboard view
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },

    // Signup view
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },

    // Login view
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    // AddClientTemplate view
    {
      path: '',
      name: 'AddClient',
      component: AddClientTemplateVue
    },

    // AddInvoiceTemplate view
    {
      path: '',
      name: 'AddInvoice',
      component: AddInvoiceTemplateVue
    },

    // ClientTemplate view
    {
      path: '',
      name: 'Client',
      component: ClientTemplateVue
    },

    // ClientsTemplate view
    {
      path: '',
      name: 'Clients',
      component: ClientsTemplateVue
    },

    // EditClientTemplate view
    {
      path: '',
      name: 'EditClient',
      component: EditClientTemplateVue
    },

    // EditTeamTemplate view
    {
      path: '',
      name: 'EditTeam',
      component: EditTeamTemplateVue
    },

    // InvoiceTemplate view
    {
      path: '',
      name: 'Invoice',
      component: InvoiceTemplateVue
    },

    // InvoicesTemplate view
    {
      path: '',
      name: 'Invoices',
      component: InvoicesTemplateVue
    },

    // MyAccountTemplate view
    {
      path: '',
      name: 'MyAccount',
      component: MyAccountTemplateVue
    }
    
  ]
})


localStorage['token'] = "token";


/**
 * Note in the state above the user in the first parameter serves as 
 * the id of the state . 
 */
export const userState = defineStore({
  id : 'user',

  state: () => {
    return { 
      user: {
        username : ''
      }, 
      isAuthenticated: false,
      token: ''

    }
  },



  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      //no actions declared yet . 
    },

    initializeStore(state)
    {
      if (localStorage.getItem['token'])
      {
        state.token = localStorage.getItem['token'];
        state.isAuthenticated = true;
      }
      // else
      // {
      //   state.token = '';
      //   state.isAuthenticated = false;
      // }
    },

    // set the token received from the api
    setToken(state, token)
    {
      state.token = token;
      state.isAuthenticated = true;
    },

    // remove the token received from the api 
    removeToken(state)
    {
      state.token = '';
      state.isAuthenticated = false;
    },
  },
})






export default router
