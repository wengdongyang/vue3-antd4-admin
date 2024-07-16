/** @format */
// apis
// hooks
// utils
// types
// stores
// mixins
// configs
// components
const ENV_MODE = import.meta.env.MODE || 'production'; // 模式

const ENV_TOKEN_KEY = 'TOKEN'; // token的key

export default {
  MODE: ENV_MODE,

  TOKEN_KEY: ENV_TOKEN_KEY,
};
