module.exports = [
  {
    title: "Authentication Guide",
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
      { title: 'SAML Login', link: '/authentication-guide/saml-login/'},
      { title: 'Working With Tokens', link: '/authentication-guide/tokens/', subLinks: [
          { title: 'Validating Access Tokens', link: '/authentication-guide/tokens/validating-access-tokens/'},
          { title: 'Validating ID Tokens', link: '/authentication-guide/tokens/validating-id-tokens/'},
          { title: 'Refreshing Access Tokens', link: '/authentication-guide/tokens/refreshing-tokens/'},
          { title: 'Revoking Tokens', link: '/authentication-guide/tokens/revoking-tokens/'}
        ]
      },
      { title: 'Generic OpenID Connect IdP', link: '/authentication-guide/generic-oidc/'}
    ]
  },
  {
    title: 'Use Cases',
    links: [
      { title: 'Inline Hooks', link: '/use_cases/inline_hooks/'},
      { title: 'Authentication', link: '/use_cases/authentication/'},
      { title: 'Events API Migration', link: '/use_cases/events-api-migration/'},
      { title: 'Multi-Factor Authentication', link: '/use_cases/mfa/'},
      { title: 'API Access Management', link: '/use_cases/api_access_management/'},
      { title: 'Relationships with Linked Objects', link: '/use_cases/relationships/'}
    ]
  },
  {
    title: 'API Reference',
    links: [
      { title: 'Sign in Your Users', link: '/docs/api/resources/oidc/', subLinksId: 'Sidebar_References', subLinks: [
          { title: 'OpenID Connect & OAuth 2.0 API', link: '/docs/api/resources/oidc/'},
          { title: 'Authentication', link: '/docs/api/resources/authn/'}
        ]
      },
      { title: 'Manage Okta Resources', link: '/docs/api/resources/roles/',  subLinksId: 'Sidebar_Resources',  subLinks: [
          { title: 'Administrator Roles', link: '/docs/api/resources/roles/'},
          { title: 'Apps', link: '/docs/api/resources/apps/'},
          { title: 'Authorization Servers', link: '/docs/api/resources/authorization-servers/'},
          { title: 'Dynamic Client Registration', link: '/docs/api/resources/oauth-clients/'},
          { title: 'Event Hooks', link: '/docs/api/resources/event-hooks/'},
          { title: 'Factors', link: '/docs/api/resources/factors/'},
          { title: 'Groups', link: '/docs/api/resources/groups/'},
          { title: 'Identity Providers', link: '/docs/api/resources/ipds/'},
          { title: 'Inline Hooks', link: '/docs/api/resources/inline-hooks/'},
          { title: 'Linked Objects', link: '/docs/api/resources/linked-objects/'},
          { title: 'Policy', link: '/docs/api/resources/policy/'},
          { title: 'Schemas', link: '/docs/api/resources/schemas/'},
          { title: 'Sessions', link: '/docs/api/resources/sessions/'},
          { title: 'System Log', link: '/docs/api/resources/system_log/'},
          { title: 'Templates', link: '/docs/api/resources/templates/'},
          { title: 'Trusted Origins', link: '/docs/api/resources/trusted-origins/'},
          { title: 'Users', link: '/docs/api/resources/users/'},
          { title: 'Zones', link: '/docs/api/resources/zones/'}
        ]
      },
      { title: 'API Concepts', link: '/docs/api/getting_started/design_principles/', subLinks: [
          { title: 'Design Principles', link: '/docs/api/getting_started/design_principles/'},
          { title: 'Finding Your Application Credentials', link: '/docs/api/getting_started/finding_your_app_credentials/'},
          { title: 'Finding Your Okta Domain', link: '/docs/api/getting_started/finding_your_domain/'},
          { title: 'Getting a Token', link: '/docs/api/getting_started/getting_a_token/'},
          { title: 'Enabling CORS', link: '/docs/api/getting_started/enabling_cors/'},
          { title: 'Rate limits at Okta', link: '/docs/api/getting_started/rate-limits/'},
          { title: 'Okta Release Lifecycle', link: '/docs/api/getting_started/releases-at-okta/'}
        ]
      },
      { title: 'Error Codes', link: '/reference/error_codes/'},
      { title: 'Okta Expression Language', link: '/reference/okta_expression_language/'},
      { title: 'Postman Collections', link: '/reference/postman_collections/'},
      { title: 'SCIM Protocol', link: '/reference/scim/'},
      { title: 'WebFinger', link: '/reference/webfinger/'},
    ]
  },
  {
    title: "Change Log",
    links: [
      { title: 'Okta API Products Change Log', link: '/docs/change-log/'}
    ]
  },
  {
    title: "How-To",
    links: [
      { title: 'Add User Consent to Your Authentication Flow', link: '/docs/how-to/add-user-consent-to-flow/'},
      { title: 'Upload Your Own Certificates for Outbound SAML Apps', link: '/docs/how-to/byo_saml/'},
      { title: 'Create an ID Token or Access Token Containing a Groups Claim', link: '/docs/how-to/creating-token-with-groups-claim/'},
      { title: 'Share Application Key Credentials for IdPs Across Apps', link: '/docs/how-to/sharing-cert/'},
      { title: 'Upgrade SAML Apps to SHA256', link: '/docs/how-to/updating_saml_cert/'}
    ]
  }
]
