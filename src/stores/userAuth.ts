/** @format */
import { get, set } from '@vueuse/core';
import lodash from 'lodash';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
// apis
// hooks
// utils
import type { ILoginFormState, ILoginToken, IUserinfo } from '@src/types/index.d';
// stores
// mixins
// configs
// components
export const useLoginFormState = defineStore(
  'loginFormState',
  () => {
    const LOGIN_FORM_STATE = ref<ILoginFormState>({});
    const IS_REMEMBER_ME = ref<boolean>(false);

    const computedLoginFormState = computed(() => get(LOGIN_FORM_STATE));

    const computedIsRememberMe = computed(() => get(IS_REMEMBER_ME));

    const setLoginFormState = (loginFormState: ILoginFormState) => {
      try {
        set(LOGIN_FORM_STATE, lodash.cloneDeep(loginFormState));
      } catch (error) {
        console.warn(error);
      }
    };

    const setIsRememberMe = (isRememberMe: boolean) => {
      try {
        set(IS_REMEMBER_ME, lodash.cloneDeep(isRememberMe));
      } catch (error) {
        console.warn(error);
      }
    };

    return {
      LOGIN_FORM_STATE,
      IS_REMEMBER_ME,
      computedLoginFormState,
      computedIsRememberMe,
      setLoginFormState,
      setIsRememberMe,
    };
  },
  { persist: { storage: localStorage } },
);

export const useUserAuth = defineStore(
  'userAuth',
  () => {
    const LOGIN_TOKEN = ref<ILoginToken>({});
    const USERINFO = ref<IUserinfo>({});
    const ROLES = ref<string[]>([]);
    const PERMISSIONS = ref<string[]>([]);

    const computedToken = computed(() => get(LOGIN_TOKEN, 'token') || '');
    const computedMgToken = computed(() => get(LOGIN_TOKEN, 'mgToken') || '');

    const computedRoles = computed(() => get(ROLES));
    const computedUserinfo = computed(() => get(USERINFO));
    const computedPermissions = computed(() => get(PERMISSIONS));

    const setLoginToken = (loginTokenInfo: ILoginToken) => {
      try {
        set(LOGIN_TOKEN, lodash.cloneDeep(loginTokenInfo));
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
        set(ROLES, lodash.cloneDeep(roles));
        set(USERINFO, lodash.cloneDeep(userinfo));
        set(PERMISSIONS, lodash.cloneDeep(permissions));
      } catch (error) {
        console.warn(error);
      }
    };

    return {
      LOGIN_TOKEN,
      USERINFO,
      ROLES,
      PERMISSIONS,
      computedToken,
      computedMgToken,
      computedRoles,
      computedUserinfo,
      computedPermissions,
      setLoginToken,
      setUserinfoPermissionsRoles,
    };
  },
  { persist: { storage: sessionStorage, paths: ['LOGIN_TOKEN', 'USERINFO', 'ROLES', 'PERMISSIONS'] } },
);
