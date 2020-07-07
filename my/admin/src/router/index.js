import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Good from '../views/good/goods.vue'
import OverView from '../views/order/overView.vue'
import Machine from '../views/machine/index.vue'
import Cloud from '../views/cloud/cloud.vue'
import Supply from '../views/machine/supplyhistory.vue'
import Order from '../views/order/order.vue'
import Stats from '../views/order/stats.vue'
import Sales from '../views/order/sale.vue'
import Ticket from '../views/order/ticket.vue'
import Shares from '../views/order/shares.vue'
import Review from '../views/order/orderReview.vue'
import Dimension from '../views/order/dimension.vue'
import User from '../views/User/user.vue'
import Policy from '../views/policys/policys.vue'
import Login from '../views/login.vue'
import Check from '../views/check.vue'
import Verify from '../views/check/verify.vue'
import Refund from '../views/order/refund.vue'
import Error from '../views/error.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/check', component: Check },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/overview',
    children: [
      {
        path: '/overview',
        component: OverView
      },
      {
        path: '/review',
        component: Review
      },
      {
        path: '/users',
        component: User
      },
      {
        path: '/policys',
        component: Policy
      },
      {
        path: '/dimension',
        component: Dimension
      },
      {
        path: '/device',
        component: Cloud
      },
      {
        path: '/shares',
        component: Shares
      },
      {
        path: '/verify',
        component: Verify
      },
      {
        path: '/stats',
        component: Stats
      },
      {
        path: '/ticket',
        component: Ticket
      },
      {
        path: '/supplyhistory',
        component: Supply
      },
      {
        path: '/good',
        component: Good
      },
      {
        path: '/machine',
        component: Machine
      },
      {
        path: '/order',
        component: Order
      },
      {
        path: '/sales',
        component: Sales
      },
      {
        path: '/refund',
        component: Refund
      },
      {
        path: '/error',
        component: Error
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
const whiteList = ['/login', '/check']
router.beforeEach((to, from, next) => {
  const userCookie = document.cookie
  if (userCookie !== '') {
    if (to.path === '/login') {
      next('/home')
    } else {
      if (to.matched.length === 0) {
        next('/home') // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到首页面
      }
      next() // 如果匹配到正确跳转
    }
  // 无cookie
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 还没有登录过 则跳转到登录界面
      // next('/login')
      if (to.path.slice(1) !== '') {
        if (to.matched.length === 0) {
          router.push({
            path: '/login'
          })
        } else {
          router.push({
            path: '/login',
            query: {
              redirect: to.path.slice(1)
            }
          })
        }
      } else {
        router.push({
          path: '/login'
        })
      }
    }
  }
})
export default router
