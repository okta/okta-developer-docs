// the navigation that is shown across the guides pages

module.exports = [
  { title: 'Guides', path: '/docs/guides/' },
  { 
    title: 'Basics', 
    subLinks: [
      { title: 'Create an API token', guideName: 'create-an-api-token' },
      { title: 'Enable CORS', guideName: 'enable-cors' },
      { title: 'Find your Okta domain', guideName: 'find-your-domain' },
      { title: 'Find your application credentials', guideName: 'find-your-app-credentials' },
      { title: 'Share Application Key Credentials for IdPs Across Apps', guideName: 'sharing-cert' },
      { title: 'Set up SAML Tracer', guideName: 'saml-tracer' },
      { title: 'Upgrade SAML Apps to SHA256', guideName: 'updating-saml-cert' },
      { title: 'Sign the Okta certificate with your own CA', guideName: 'sign-your-own-saml-csr' },
    ] 
  },
  { 
    title: 'Sign Users In', 
    subLinks: [
      { title: 'Add an external Identity Provider', guideName: 'add-an-external-idp' },
      { title: 'Add multifactor authentication', guideName: 'mfa' },
      {
        title: "Mobile App",
        subLinks: [
          { title: 'Unlock a mobile app with biometrics', guideName: 'unlock-mobile-app-with-biometrics' },
          { title: 'Build a custom sign-in UI in your mobile app', guideName: 'build-custom-ui-mobile' },
          { title: 'Sign users in to your mobile app', guideName: 'sign-into-mobile-app' },
          { title: 'Share a sign-in session with native mobile apps', guideName: 'shared-sso-android-ios' },
        ]
      },
      { title: 'Sign users in to your single-page application', guideName: 'sign-into-spa' },
      { title: 'Sign users in to your web application', guideName: 'sign-into-web-app' },
      { title: 'Sign users out', guideName: 'sign-users-out' },
    ] 
  },
  { 
    title: 'Authorization', 
    subLinks: [
      { title: 'Implement the Authorization Code Flow', guideName: 'implement-auth-code' },
      { title: 'Implement the Authorization Code Flow with PKCE', guideName: 'implement-auth-code-pkce' },
      { title: 'Create an Authorization Server', guideName: 'customize-authz-server' },
      { title: 'Implement the Client Credentials Flow', guideName: 'implement-client-creds' },
      { title: 'Implement the Implicit Flow', guideName: 'implement-implicit' },
      { title: 'Request user consent', guideName: 'request-user-consent' },
      { title: 'Implement the Resource Owner Password Flow', guideName: 'implement-password' },
      {
        title: 'Tokens',
        subLinks: [
          { title: 'Build a JWT for Client Authentication', guideName: 'build-self-signed-jwt' },
          { title: 'Customize tokens returned from Okta', guideName: 'customize-tokens-returned-from-okta' },
          { title: 'Refresh access tokens', guideName: 'refresh-tokens' },
          { title: 'Revoke Tokens', guideName: 'revoke-tokens' },
          { title: 'Work with Okta session cookies', guideName: 'session-cookie' },
          { title: 'Validate Access Tokens', guideName: 'validate-access-tokens' },
          { title: 'Validate ID Tokens', guideName: 'validate-id-tokens' },
        ]
      }
    ] 
  },
  { 
    title: 'Brand and Customize', 
    subLinks: [
      { title: 'Customize the Okta-hosted error pages', guideName: 'custom-error-pages' },
      { title: 'Customize the Okta URL domain', guideName: 'custom-url-domain' },
      { title: 'Customize the Okta-hosted sign-in page', guideName: 'custom-hosted-signin' },
      { title: 'Style the Widget', guideName: 'style-the-widget' },
    ]
  },
  { 
    title: 'OIN Partner Integrations', 
    subLinks: [
      { title: 'Build a SCIM provisioning integration', guideName: 'build-provisioning-integration' },
      { title: 'Build a Single Sign-On (SSO) integration', guideName: 'build-sso-integration' },
      { title: 'Submit an app integration', guideName: 'submit-app' },        
    ]
  },
  { 
    title: 'API Security',
    subLinks: [
      { title: 'Implement OAuth for Okta', guideName: 'implement-oauth-for-okta' },
      { title: 'Implement OAuth for Okta with a Service App', guideName: 'implement-oauth-for-okta-serviceapp' },
      { title: 'Protect your API endpoints', guideName: 'protect-your-api' },
    ]
  },
  { 
    title: 'Hooks',
    subLinks: [
      { title: 'Set Up Event Hooks', guideName: 'set-up-event-hook' },
      { title: 'Implement a Password Import Inline Hook', guideName: 'password-import-hook' },    
    ] 
  },
];
