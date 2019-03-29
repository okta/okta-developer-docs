const FRAMEWORK_TO_COMMON_NAME = { 
  js: 'javascript',
  reactjs: 'react',
  nodejs: 'node',
  vuejs: 'vue',
  '.net': 'dotnet',
};

const COMMON_NAME_TO_FANCY_NAME = { 
  javascript: 'JS',
  angular: 'Angular',
  react: 'React',
  vue: 'Vue.js',
  java: 'Java',
  node: 'Node.js',
  android: 'Android',
  ios: 'iOS',
  go: 'Go',
  dotnet: '.NET',
  php: 'PHP',
  rest: 'REST',
  reactnative: 'React Native',
};

const COMMON_NAME_TO_ICON_NAME = { 
  reactnative: 'react',
  netcore: 'dotnet',
};

export const commonify = framework => FRAMEWORK_TO_COMMON_NAME[framework] || framework.toLowerCase();
export const fancify = framework => COMMON_NAME_TO_FANCY_NAME[framework] || framework.toUpperCase();
export const iconify = framework => COMMON_NAME_TO_ICON_NAME[framework] || framework;
export const cssForIcon = framework => `icon code-${iconify(framework)}-32`;
