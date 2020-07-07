import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/question',
    name: 'question',
    component: () => import('../views/question.vue')
  },
  {
    path: '/login',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/change',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('../views/error/error.vue')
  },
  {
    path: '/supplylogin',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/supplyCheck',
    name: 'Check',
    component: () => import('../views/check.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/order/order.vue')
  },
  {
    path: '/ticket',
    name: 'Ticket',
    component: () => import('../views/ticket/ticket.vue')
  },
  {
    path: '/currentMachine',
    name: 'currentMachine',
    component: () => import('../views/supply/currentMachine.vue')
  },
  {
    path: '/supplyGoods',
    name: 'supplyGoods',
    component: () => import('../views/supply/supplyGoods.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
