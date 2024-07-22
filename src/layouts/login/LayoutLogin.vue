<!-- @format -->
<template>
  <section class="login-layout">
    <section class="login-content">
      <section class="login-form-layout">
        <header class="login-form-header">欢迎登录</header>
        <a-tabs>
          <a-tab-pane key="1" tab="系统用户">
            <AdminLoginForm />
          </a-tab-pane>
          <a-tab-pane key="2" tab="租户">
            <TenantLoginForm />
          </a-tab-pane>
          <a-tab-pane key="3" tab="租户子用户">
            <SonTenantLoginForm />
          </a-tab-pane>
        </a-tabs>
      </section>
    </section>
  </section>
</template>
<script lang="jsx" setup>
import { tryOnMounted } from '@vueuse/core';
// apis
// hooks
// utils
// stores
import { useUserAuth } from '@src/stores';
// configs
// components
import AdminLoginForm from './components/AdminLoginForm.vue';
import SonTenantLoginForm from './components/SonTenantLoginForm.vue';
import TenantLoginForm from './components/TenantLoginForm.vue';

const storeUserAuth = useUserAuth();

tryOnMounted(() => {
  storeUserAuth.$reset();
});
</script>
<style lang="less" scoped>
@import './LayoutLogin.less';
</style>
