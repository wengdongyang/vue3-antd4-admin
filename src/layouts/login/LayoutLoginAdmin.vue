<!-- @format -->
<template>
  <section class="login-layout">
    <section class="login-content">
      <section class="login-form-layout">
        <header class="login-form-header">欢迎登录</header>
        <section class="login-form-content">
          <a-form class="form" layout="vertical" :model="formState" @finish="onFinish" size="large">
            <a-form-item class="form-item" label="账号" name="username" :rules="[{ required: true }]">
              <a-input class="input" v-model:value="formState.username" placeholder="账号" />
            </a-form-item>
            <a-form-item class="form-item" label="密码" name="password" :rules="[{ required: true }]">
              <a-input class="input" v-model:value="formState.password" placeholder="密码" />
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
import { get, set } from '@vueuse/core';
import { ref } from 'vue';
import { message } from 'ant-design-vue';
// apis
import { apiPostLoginPlatform, apiPostLoginTenant, apiPostLoginSonTenant, apiGetGetInfo } from '@src/apis';
// hooks
// types
// stores
import { useUserAuth } from '@src/stores';
// configs
// components
import CaptchaImage from './components/CaptchaImage.vue';

const { setLoginToken, setUserinfoPermissionsRoles } = useUserAuth();

const captchaImageRef = ref();

const formState = ref({ username: null, password: null, code: null, uuid: null });

const isRememberMe = ref(false);

const getUserinfoPermissionsRoles = async () => {
  try {
    const res = await apiGetGetInfo(values);
    const { code, data, msg } = res;
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
    const { code, data, msg } = res;
    if (code === 200) {
      setLoginToken(res);
      sessionStorage.setItem('TOKEN', data.token);
      sessionStorage.setItem('MGTOKEN', data.mgToken);

      getUserinfoPermissionsRoles();
    } else {
      message.error(msg);
      captchaImageRef.value?.resetCaptchaImage();
    }
  } catch (error) {
    console.warn(error);
  }
};
</script>
<style lang="less">
@import './LayoutLoginAdmin.less';
</style>
