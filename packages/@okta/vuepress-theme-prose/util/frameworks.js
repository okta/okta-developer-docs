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
  apple: 'Apple',
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
  nodeexpress: 'Node Express',
  ga: 'Authenticator',
  sms: 'SMS'
};

const COMMON_NAME_TO_ICON_NAME = {
  android: 'code-android-32',
  angular: 'code-angular-32',
  aspnet: 'code-dotnet-32',
  aspnetcore: 'code-dotnet-32',
  aspnetcore3: 'code-dotnet-32',
  ios: 'code-ios-32',
  netcore: 'code-dotnet-32',
  nodejs: 'code-nodejs-32',
  nodeexpress: 'code-nodejs-32',
  openidconnect: 'openid-16',
  react: 'code-react-32',
  reactnative: 'code-react-32',
  saml2: 'advanced-sso-16-blue',
  springboot: 'code-spring-32',
  vue: 'code-vue-32',
  go: 'code-go-32',
  java: 'code-java-32',
  php: 'code-php-32'
};

export const commonify = framework => FRAMEWORK_TO_COMMON_NAME[framework] || framework.toLowerCase();
export const fancify = framework => COMMON_NAME_TO_FANCY_NAME[framework] || framework.toUpperCase();
export const iconify = framework => COMMON_NAME_TO_ICON_NAME[framework] || framework;
export const cssForIcon = framework => `icon ${iconify(framework)}`;
