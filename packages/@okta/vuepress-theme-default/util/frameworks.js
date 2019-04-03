const FRAMEWORK_TO_COMMON_NAME = { 
  js: 'javascript',
  reactjs: 'react',
  // nodejs: 'node',
  node: 'nodejs',
  vuejs: 'vue',
  '.net': 'dotnet',
  net: 'dotnet',
};

const COMMON_NAME_TO_FANCY_NAME = { 
  javascript: 'JS',
  angular: 'Angular',
  react: 'React',
  preact: 'Preact',
  vue: 'Vue.js',
  java: 'Java',
  nodejs: 'Node.js',
  android: 'Android',
  ios: 'iOS',
  osx: 'OSX',
  go: 'Go',
  spring: 'Spring',
  dotnet: '.NET',
  netcore: '.NET Core',
  php: 'PHP',
  python: 'Python',
  rest: 'REST',
  reactnative: 'React Native',
  xamarin: 'Xamarin',
};

const COMMON_NAME_TO_ICON_NAME = { 
  reactnative: 'react',
  netcore: 'dotnet',
};

export const commonify = framework => FRAMEWORK_TO_COMMON_NAME[framework] || framework.toLowerCase();
export const fancify = framework => COMMON_NAME_TO_FANCY_NAME[framework] || framework.toUpperCase();
export const iconify = framework => COMMON_NAME_TO_ICON_NAME[framework] || framework;
export const cssForIcon = framework => `icon code-${iconify(framework)}-32`;
