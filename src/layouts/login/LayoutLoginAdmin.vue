<!-- @format -->
<template>
  <section class="login-layout">
    <section class="login-content">
      <section class="login-form-layout">
        <header class="login-form-header">欢迎登录</header>
        <section class="login-form-content">
          <a-form class="form" layout="vertical" :model="formState" @finish="onFinish" size="large">
            <a-form-item class="form-item" label="账号" name="username" :rules="[{ required: true }]">
              <a-input class="input" v-model:value="formState.username" placeholder="账号" type="text" />
            </a-form-item>
            <a-form-item class="form-item" label="密码" name="password" :rules="[{ required: true }]">
              <a-input class="input" v-model:value="formState.password" placeholder="密码" type="password" />
            </a-form-item>
            <a-form-item class="form-item" label="验证码" name="code" :rules="[{ required: true }]">
              <a-row :gutter="12">
                <a-col :span="18">
                  <a-input class="input-code" v-model:value="formState.code" placeholder="验证码" />
                </a-col>
                <a-col :span="6">
                  <CaptchaImage
                    class="captcha-image"
                    :ref="(ref) => (captchaImageRef = ref)"
                    v-model:uuid="formState.uuid"
                    @updateCaptchaImage="onUpdateCaptchaImage"
                  />
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item class="form-item">
              <a-checkbox class="remember-me" v-model:checked="isRememberMe">记住密码</a-checkbox>
            </a-form-item>
            <a-form-item class="form-item">
              <a-button class="login-btn" type="primary" block html-type="submit"> 登 录 </a-button>
            </a-form-item>
          </a-form>
        </section>
      </section>
    </section>
  </section>
</template>
<script lang="jsx" setup>
import { get, set, tryOnMounted } from '@vueuse/core';
import { message } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// apis
import { apiGetGetInfo, apiPostLoginPlatform } from '@src/apis';
// hooks
// utils

// stores
import { useLoginFormState, useUserAuth } from '@src/stores';
// configs
import { ENV } from '@src/configs';
// components
import CaptchaImage from './components/CaptchaImage.vue';

const { push } = useRouter();
const storeUserAuth = useUserAuth();
const storeLoginFormState = useLoginFormState();
const { computedLoginFormState, computedIsRememberMe } = storeToRefs(storeLoginFormState);

const captchaImageRef = ref();

const defaultFormState =
  ENV.MODE === 'development'
    ? { username: ENV.PLATFORM_USERNAME, password: ENV.PLATFORM_PASSWORD, code: null, uuid: null }
    : { username: null, password: null, code: null, uuid: null };

const formState = ref(defaultFormState);

const isRememberMe = ref(false);

const initFormState = () => {
  try {
    const storeIsRememberMe = get(computedIsRememberMe);
    const storeLoginFormState = get(computedLoginFormState);
    if (storeIsRememberMe) {
      set(isRememberMe, storeIsRememberMe);
      set(formState, Object.assign(storeLoginFormState, { code: null, uuid: null }));
    }
  } catch (error) {
    console.warn(error);
  }
};

const getUserinfoPermissionsRoles = async () => {
  try {
    const res = await apiGetGetInfo();
    const { code, msg } = res;
    if (code === 200) {
      storeUserAuth.setUserinfoPermissionsRoles(res);
      push({ path: '/system' });
    } else {
      message.error(msg);
    }
  } catch (error) {
    console.warn(error);
  }
};

const onUpdateCaptchaImage = () => {
  try {
    set(formState, Object.assign({}, get(formState), { code: null }));
  } catch (error) {
    console.warn(error);
  }
};

const onFinish = async () => {
  try {
    const values = get(formState);
    const res = await apiPostLoginPlatform(values);
    const innerIsRememberMe = get(isRememberMe);

    const { code, msg } = res;
    if (code === 200) {
      storeUserAuth.setLoginToken(res);

      sessionStorage.setItem(ENV.TOKEN_KEY, res.token);
      sessionStorage.setItem(ENV.MG_TOKEN_KEY, res.mgToken);

      storeLoginFormState.setLoginFormState(innerIsRememberMe ? values : {});
      storeLoginFormState.setIsRememberMe(innerIsRememberMe);

      getUserinfoPermissionsRoles();
    } else {
      message.error(msg);
      captchaImageRef.value?.resetCaptchaImage();
    }
  } catch (error) {
    console.warn(error);
  }
};
tryOnMounted(() => {
  initFormState();
});
</script>
<style lang="less">
@import './LayoutLoginAdmin.less';
</style>
