/** @format */
import dayjs from 'dayjs';
import { get, set } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
// apis
// hooks
// utils
// types
import type { ILoginToken, IUserinfo } from '@src/types/index.d';
// stores
// mixins
// configs
// components
export const useUserAuth = defineStore(
  'auth',
  () => {
    const LOGIN_TOKEN = ref<ILoginToken>({});
    const USERINFO = ref<IUserinfo>({});
    const ROLES = ref<string[]>([]);
    const PERMISSIONS = ref<string[]>([]);

    const token = computed(() => get(LOGIN_TOKEN, 'token') || '');
    const mgToken = computed(() => get(LOGIN_TOKEN, 'mgToken') || '');

    const roles = computed(() => get(ROLES));
    const userinfo = computed(() => get(USERINFO));
    const permissions = computed(() => get(PERMISSIONS));

    const setLoginToken = (loginTokenInfo: ILoginToken) => {
      try {
        set(LOGIN_TOKEN, loginTokenInfo);
      } catch (error) {
        console.warn(error);
      }
    };

    const setUserinfoPermissionsRoles = ({
      roles,
      userinfo,
      permissions,
    }: {
      roles: string[];
      userinfo: IUserinfo;
      permissions: string[];
    }) => {
      try {
        set(ROLES, roles);
        set(USERINFO, userinfo);
        set(PERMISSIONS, permissions);
      } catch (error) {
        console.warn(error);
      }
    };

    return { token, mgToken, userinfo, roles, permissions, setLoginToken, setUserinfoPermissionsRoles };
  },
  { persist: { storage: sessionStorage } },
);
