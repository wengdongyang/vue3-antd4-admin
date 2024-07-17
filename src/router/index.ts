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
import LayoutLoginAdmin from '@src/layouts/login/LayoutLoginAdmin.vue';
import LayoutLoginTenant from '@src/layouts/login/LayoutLoginTenant.vue';
import LayoutLoginTenantSon from '@src/layouts/login/LayoutLoginTenantSon.vue';

import LayoutSystem from '@src/layouts/system/LayoutSystem.vue';

const router = createRouter({
  history: createWebHashHistory(ENV.BASE_URL),
  routes: [
    { path: '/', name: '', redirect: '/adminLogin' },
    { path: '/adminLogin', name: 'adminLogin', component: LayoutLoginAdmin },
    { path: '/tenantLogin', name: 'tenantLogin', component: LayoutLoginTenant },
    { path: '/tenantSonLogin', name: 'tenantSonLogin', component: LayoutLoginTenantSon },
    { path: '/system', name: 'system', component: LayoutSystem },
  ],
});

export default router;
