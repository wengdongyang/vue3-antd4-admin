<!-- @format -->

<template>
  <CaptchaImage v-model:uuid="formState.uuid" @updateCaptchaImage="onUpdateCaptchaImage" />
  {{ formState }}
</template>
<script lang="jsx" setup>
import { ref, computed } from 'vue';
import { get, set, tryOnMounted } from '@vueuse/core';
// apis
// hooks
// types
// stores
// configs
// components
import CaptchaImage from './components/CaptchaImage.vue';

const formState = ref({ username: null, password: null, code: null, uuid: null });

const onUpdateCaptchaImage = () => {
  try {
    set(formState, Object.assign({}, get(formState), { code: null }));
  } catch (error) {
    console.warn(error);
  }
};
</script>
<style lang="less"></style>
