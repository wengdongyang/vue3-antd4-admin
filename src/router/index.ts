/** @format */
import { createRouter, createWebHashHistory } from 'vue-router';

import LayoutLoginAdmin from '@src/layouts/login/LayoutLoginAdmin.vue';
import LayoutLoginTenant from '@src/layouts/login/LayoutLoginTenant.vue';
import LayoutLoginTenantSon from '@src/layouts/login/LayoutLoginTenantSon.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: '', redirect: '/adminLogin' },
    { path: '/adminLogin', name: 'adminLogin', component: LayoutLoginAdmin },
    { path: '/tenantLogin', name: 'tenantLogin', component: LayoutLoginTenant },
    { path: '/tenantSonLogin', name: 'tenantSonLogin', component: LayoutLoginTenantSon },
  ],
});

export default router;
