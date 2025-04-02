const FRAMEWORK_TO_COMMON_NAME = {
  js: 'javascript',
  reactjs: 'react',
  node: 'nodejs',
  vuejs: 'vue',
  '.net': 'dotnet',
  net: 'dotnet',
  'react-native': 'reactnative',
  blazorwebasm: 'blazorwebassembly',
};

const COMMON_NAME_TO_FANCY_NAME = {
  apple: 'Apple',
  azure: 'Azure AD',
  javascript: 'JS',
  angular: 'Angular',
  amazon: 'Amazon',
  discord: 'Discord',
  github: 'GitHub',
  gitlab: 'GitLab',
  paypal: 'Paypal',
  salesforce: 'Salesforce',
  spotify: 'Spotify',
  xero: 'Xero',
  yahoo: 'Yahoo!',
  yahoojp: 'Yahoo! Japan',
  smartcard: 'Smart Card',
  react: 'React',
  preact: 'Preact',
  vue: 'Vue.js',
  java: 'Java',
  'spring-boot': 'Spring Boot',
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
  'asp-net-core-3': 'ASP.NET Core 3.x',
  php: 'PHP',
  python: 'Python',
  rest: 'REST',
  reactnative: 'React Native',
  xamarin: 'Xamarin',
  oktatookta: 'Okta-to-Okta',
  openidconnect: 'OpenID Connect',
  saml2: 'SAML 2.0',
  scim: 'SCIM',
  facebook: 'Facebook',
  google: 'Google',
  linkedin: 'LinkedIn',
  microsoft: 'Microsoft',
  nodeexpress: 'Node Express',
  'node-express': 'Node Express',
  ga: 'Authenticator',
  sms: 'SMS',
  cli: 'CLI',
  website: 'Website',
  blazorwebassembly: 'Blazor WebAssembly',
  aspnetwebforms: 'ASP.NET Web Forms',
  blazor: 'Blazor',
  micronaut: 'Micronaut',
  reactnativedroid: 'React Native (Android)',
  reactnativeios: 'React Native (iOS)',
  flask: 'Flask',
  swift: 'Swift',
  authcode: 'Authorization Code',
  authcodepkce: 'Authorization Code with PKCE',
  implicit: 'Implicit',
  clientcreds: 'Client Credentials',
  ropassword: 'Resource Owner Password',
  saml2assert: 'SAML 2.0 Assertion',
  interactioncode: 'Interaction Code',
  wfconnector: 'Workflows connector',
  apiservice: 'API service',
  aotp: 'OTP (primary factor)',
  coobov: 'Okta Verify Push (primary factor)',
  eoobsv: 'Phone (primary factor)',
  dmfaoobov: 'Okta Verify Push (MFA)',
  fmfaoobsv: 'Phone (MFA)',
  bmfaotp: 'OTP (MFA)',
  oidc: 'OIDC',
  saml: 'SAML',
  oktaresourceserver: 'Okta resource server',
  nonoktaresourceserver: 'Non-Okta resource server',
  oktaoidc: 'Okta OIDC IdP',
  oktasaml: 'Okta SAML 2.0 IdP',
  thirdpartyoidc: 'Third-Party OIDC IdP',
  thirdpartysaml: 'Third-Party SAML 2.0 IdP',
};

const COMMON_NAME_TO_ICON_NAME = {
  android: 'code-android-32',
  angular: 'code-angular-32',
  aspnet: 'code-dotnet-32',
  dotnet: 'code-dotnet-32',
  aspnetcore: 'code-dotnet-32',
  aspnetcore3: 'code-dotnet-32',
  'asp-net-core-3': 'code-dotnet-32',
  blazorwebassembly: 'code-dotnet-32',
  go: 'code-go-32',
  ios: 'code-ios-32',
  java: 'code-java-32',
  javascript: 'code-javascript-32',
  netcore: 'code-dotnet-32',
  nodejs: 'code-nodejs-32',
  'node-express': 'code-nodejs-32',
  nodeexpress: 'code-nodejs-32',
  openidconnect: 'openid-16',
  php: 'code-php-32',
  python: 'code-python-32',
  react: 'code-react-32',
  reactnative: 'code-react-32',
  saml2: 'advanced-sso-16-blue',
  'spring-boot': 'code-spring-32',
  springboot: 'code-spring-32',
  vue: 'code-vue-32',
  go: 'code-go-32',
  java: 'code-java-32',
  php: 'code-php-32',
  blazorwebassembly: 'code-dotnet-32',
  aspnetwebforms: 'code-dotnet-32',
  blazor: 'code-dotnet-32',
  reactnativedroid: 'code-react-32',
  reactnativeios: 'code-react-32',
  spring: 'code-spring-32',
  oktaoidc: 'openid-16',
  oktasaml: 'advanced-sso-16-blue',
  thirdpartyoidc: 'openid-16',
  thirdpartysaml: 'advanced-sso-16-blue',
};

const IDP_COMMON_NAME_TO_ICON_NAME = {
  apple: 'apple-16',
  microsoft: 'microsoft-16',
  facebook: 'facebook-16',
  linkedin: 'linkedin-16',
  google: 'google-16',
  oktatookta: 'oktatookta-16',
}

export const commonify = framework => FRAMEWORK_TO_COMMON_NAME[framework] || framework.toLowerCase();
export const fancify = framework => COMMON_NAME_TO_FANCY_NAME[framework] || framework.toUpperCase();
export const iconify = framework => COMMON_NAME_TO_ICON_NAME[framework] || IDP_COMMON_NAME_TO_ICON_NAME[framework] || framework;
export const cssForIcon = framework => `icon ${iconify(framework)}`;
