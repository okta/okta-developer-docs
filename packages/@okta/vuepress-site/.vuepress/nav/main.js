module.exports = [
  {
    title: "Concepts",
    links: [
      { title: 'Inline Hooks', link: '/docs/concepts/inline-hooks/'},
      { title: 'Authentication', link: '/docs/concepts/authentication/'},
      { title: 'Events API Migration', link: '/docs/concepts/events-api-migration/'},
      { title: 'Multi-Factor Authentication', link: '/docs/guides/mfa/'},
      { title: 'API Access Management', link: '/docs/concepts/api-access-management/'}
    ]
  },
  {
    title: "Guides",
    links: [
      { title: 'OAuth 2.0 Overview', link: '/authentication-guide/auth-overview/'},
      { title: 'Implementing OAuth 2.0', link: '/authentication-guide/implementing-authentication/', subLinks: [
          {title: 'Authorization Code Flow', link: '/authentication-guide/implementing-authentication/auth-code/'},
          {title: 'Authorization Code Flow with PKCE', link: '/authentication-guide/implementing-authentication/auth-code-pkce/'},
          {title: 'Client Credentials Flow', link: '/authentication-guide/implementing-authentication/client-creds/'},
          {title: 'Implicit Flow', link: '/authentication-guide/implementing-authentication/implicit/'},
          {title: 'Resource Owner Password Flow', link: '/authentication-guide/implementing-authentication/password/'},
          {title: 'Customizing Your Authorization Server', link: '/authentication-guide/implementing-authentication/set-up-authz-server/'}
        ]
      },
      { title: 'Social Login', link: '/authentication-guide/social-login/', subLinks: [
          { title: 'Facebook', link: '/authentication-guide/social-login/facebook/'},
          { title: 'Google', link: '/authentication-guide/social-login/google/'},
          { title: 'LinkedIn', link: '/authentication-guide/social-login/linkedin/'},
          { title: 'Microsoft', link: '/authentication-guide/social-login/microsoft/'},
          { title: 'Social IdP Settings', link: '/authentication-guide/social-login/social-settings/'}
        ]
      },
      { title: 'Add a SAML Identity Provider', link: '/authentication-guide/saml-login/'},
      { title: 'Working With Tokens', link: '/authentication-guide/tokens/', subLinks: [
          { title: 'Validating Access Tokens', link: '/authentication-guide/tokens/validating-access-tokens/'},
          { title: 'Validating ID Tokens', link: '/authentication-guide/tokens/validating-id-tokens/'},
          { title: 'Verifying the Token Signature and Managing Key Rotation', link: '/authentication-guide/tokens/verifying-token-signature/'},      
          { title: 'Refreshing Access Tokens', link: '/authentication-guide/tokens/refreshing-tokens/'},
          { title: 'Revoking Tokens', link: '/authentication-guide/tokens/revoking-tokens/'}
        ]
      },
      { title: 'Generic OpenID Connect IdP', link: '/authentication-guide/generic-oidc/'},
      { title: 'Request user consent during authentication', link: '/docs/guides/request-user-consent/'},
      { title: 'Create tokens with group claims', link: '/docs/guides/create-token-with-groups-claim/'}
    ]
  },
  {
    title: "Reference",
    links: [
        { title: 'Sign in Your Users', link: '/docs/reference/api/oidc/', subLinksId: 'Sidebar_References', subLinks: [
          { title: 'OpenID Connect & OAuth 2.0 API', link: '/docs/reference/api/oidc/'},
          { title: 'Authentication', link: '/docs/reference/api/authn/'}
        ]
      },
      { title: 'Manage Okta Resources', link: '/docs/reference/api/roles/',  subLinksId: 'Sidebar_Resources',  subLinks: [
          { title: 'Administrator Roles', link: '/docs/reference/api/roles/'},
          { title: 'Apps', link: '/docs/reference/api/apps/'},
          { title: 'Authorization Servers', link: '/docs/reference/api/authorization-servers/'},
          { title: 'Dynamic Client Registration', link: '/docs/reference/api/oauth-clients/'},
          { title: 'Event Hooks', link: '/docs/reference/api/event-hooks/'},
          { title: 'Factors', link: '/docs/reference/api/factors/'},
          { title: 'Groups', link: '/docs/reference/api/groups/'},
          { title: 'Identity Providers', link: '/docs/reference/api/idps/'},
          { title: 'Inline Hooks', link: '/docs/reference/api/inline-hooks/'},
          { title: 'Linked Objects', link: '/docs/reference/api/linked-objects/'},
          { title: 'Policy', link: '/docs/reference/api/policy/'},
          { title: 'Schemas', link: '/docs/reference/api/schemas/'},
          { title: 'Sessions', link: '/docs/reference/api/sessions/'},
          { title: 'System Log', link: '/docs/reference/api/system_log/'},
          { title: 'Templates', link: '/docs/reference/api/templates/'},
          { title: 'Trusted Origins', link: '/docs/reference/api/trusted-origins/'},
          { title: 'Users', link: '/docs/reference/api/users/'},
          { title: 'Zones', link: '/docs/reference/api/zones/'}
        ]
      },
      { title: 'API Overview', link: '/docs/reference/api-overview/', subLinks: [
          { title: 'Find Your Application Credentials', link: '/docs/guides/find-your-app-credentials/'},
          { title: 'Find Your Okta Domain', link: '/docs/guides/find-your-domain/'},
          { title: 'Create an API Token', link: '/docs/guides/create-an-api-token/'},
          { title: 'Enabling CORS', link: '/docs/guides/enabling-cors/'},
          { title: 'Rate limits', link: '/docs/reference/rate-limits/'},
          { title: 'Release Lifecycle', link: '/docs/reference/releases-at-okta/'}
        ]
      },
      { title: 'Event Hooks', link: '/docs/reference/api/event-hooks/'},
      { title: 'Error Codes', link: '/docs/reference/error-codes/'},
      { title: 'Okta Expression Language', link: '/docs/reference/okta-expression-language/'},
      { title: 'Postman Collections', link: '/docs/reference/postman-collections/'},
      { title: 'SCIM Protocol', link: '/docs/reference/scim/'},
      { title: 'WebFinger', link: '/docs/reference/webfinger/'},
    ]
  },
  {
    title: "Release Notes",
    links: [
      { title: 'Okta API Products Release Notes', link: '/docs/release-notes/'}
    ]
  }
]
