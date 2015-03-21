import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocation,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';

import store from '@/store';

import CompanyView from '../views/company';

const isAuthenticated = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  if ((store.state as any).user.accessToken) {
    next();
  } else {
    next('/login');
  }
};

const isAnonymous = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  if ((store.state as any).user.accessToken) {
    next('/');
  } else {
    next();
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: CompanyView,
    beforeEnter: (to, from, next) => next('/company/NKE'),
  },
  {
    path: '/company/:symbol',
    name: 'company',
    component: () => import(/* webpackChunkName: "company" */ '../views/company'),
    beforeEnter: isAuthenticated,
  },
  {
    path: '/list/:id',
    name: 'list',
    component: () => import(/* webpackChunkName: "list" */ '../views/list'),
    beforeEnter: isAuthenticated,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    beforeEnter: isAnonymous,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue'),
    beforeEnter: isAnonymous,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
