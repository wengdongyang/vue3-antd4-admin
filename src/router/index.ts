/** @format */
import { createRouter, createWebHashHistory } from 'vue-router';
// apis
// hooks
// utils
// stores
// mixins
// configs
import { ENV } from '@src/configs';
// components
import LayoutLogin from '@src/layouts/login/LayoutLogin.vue';

import LayoutSystem from '@src/layouts/system/LayoutSystem.vue';

const router = createRouter({
  history: createWebHashHistory(ENV.BASE_URL),
  routes: [
    { path: '/', name: '', redirect: '/login' },
    { path: '/login', name: 'adminLogin', component: LayoutLogin },
    { path: '/system', name: 'system', component: LayoutSystem },
  ],
});

export default router;
