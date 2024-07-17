<!-- @format -->
<template>
  <section>root</section>
</template>
<script lang="jsx" setup>
import { get, set, tryOnMounted } from '@vueuse/core';
import { message } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// apis
// hooks
// utils
// stores
import { useLoginFormState, useUserAuth } from '@src/stores';
// configs
// components
const storeLoginFormState = useLoginFormState();
const { setLoginToken, setUserinfoPermissionsRoles } = useUserAuth();
const { setAdminLoginFormState, setAdminIsRememberMe } = storeLoginFormState;
const { computedAdminLoginFormState, computedAdminIsRememberMe } = storeToRefs(storeLoginFormState);
</script>
<style lang="less" module></style>
