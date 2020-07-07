import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
 
export default new Router({
    routes: [
        { path: '/getGoupons',  component: () => import('@/components/goupons.vue')},
        { path: '/discount',  component: () => import('@/components/discount.vue')},
        { path: '/', component: () => import('@/components/login.vue')},
        { path: '/login',  component: () => import('@/components/login.vue')},
        { path: '/home', redirect: '/timeviewerall',  component: () => import('@/components/home.vue'),
        children: [
            { path: '/device', component: () => import('@/components/device/device.vue')},
            { path: '/user', component: () => import('@/components/user/user.vue')},
            { path: '/map', component: () => import('@/components/map/map.vue')},
            { path: '/timeviewer', name: 'timeviewer', component: () => import('@/components/time/time.vue')},
            { path: '/timeviewerall', component: () => import('@/components/time/timeTable.vue')},
            { path: '/transportation', component: () => import('@/components/transition/transition.vue')},
        ]}
    ]
})
