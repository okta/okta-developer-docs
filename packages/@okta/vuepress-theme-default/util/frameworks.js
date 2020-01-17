const FRAMEWORK_TO_COMMON_NAME = {
  js: 'javascript',
  reactjs: 'react',
  node: 'nodejs',
  vuejs: 'vue',
  '.net': 'dotnet',
  net: 'dotnet',
  'react-native': 'reactnative',
};

const COMMON_NAME_TO_FANCY_NAME = {
  azure: 'Azure AD',
  javascript: 'JS',
  angular: 'Angular',
  react: 'React',
  preact: 'Preact',
  vue: 'Vue.js',
  java: 'Java',
  springboot: 'Spring Boot',
  nodejs: 'Node.js',
  android: 'Android',
  ios: 'iOS',
  osx: 'OSX',
  go: 'Go',
  spring: 'Spring',
  dotnet: '.NET',
  netcore: '.NET Core',
  aspnet: 'ASP.NET',
  aspnetcore: 'ASP.NET Core 2.x',
  aspnetcore3: 'ASP.NET Core 3.x',
  php: 'PHP',
  python: 'Python',
  rest: 'REST',
  reactnative: 'React Native',
  xamarin: 'Xamarin',
  oktatookta: 'Okta-to-Okta',
  openidconnect: 'OpenID Connect',
  saml2: 'SAML 2.0',
  facebook: 'Facebook',
  google: 'Google',
  linkedin: 'LinkedIn',
  microsoft: 'Microsoft',
  nodeexpress: 'Node Express'
};

const COMMON_NAME_TO_ICON_NAME = {
  reactnative: 'react',
  netcore: 'dotnet',
  aspnet: 'dotnet',
  aspnetcore: 'dotnet',
  aspnetcore3: 'dotnet',
  springboot: 'spring',
  nodeexpress: 'nodejs'
};

export const commonify = framework => FRAMEWORK_TO_COMMON_NAME[framework] || framework.toLowerCase();
export const fancify = framework => COMMON_NAME_TO_FANCY_NAME[framework] || framework.toUpperCase();
export const iconify = framework => COMMON_NAME_TO_ICON_NAME[framework] || framework;
export const cssForIcon = framework => `icon code-${iconify(framework)}-32`;
