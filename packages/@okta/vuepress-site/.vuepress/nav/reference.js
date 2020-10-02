// the navigation that is shown across the reference pages

module.exports = [
    { title: 'Reference' },
    { title: 'API Overview', path: '/docs/reference/api-overview/' },
    { title: 'Sign in Your Users', subLinks: [
      { title: 'OpenID Connect & OAuth 2.0 API', path: '/docs/reference/api/oidc/'},
      { title: 'Authentication', path: '/docs/reference/api/authn/'}
    ]
    },
    { title: 'Manage Okta Resources', subLinks: [
        { title: 'Administrator Roles', path: '/docs/reference/api/roles/'},
        { title: 'Apps', path: '/docs/reference/api/apps/'},
        { title: 'Authorization Servers', path: '/docs/reference/api/authorization-servers/'},
        { title: 'Dynamic Client Registration', path: '/docs/reference/api/oauth-clients/'},
        { title: 'Event Hooks', path: '/docs/reference/api/event-hooks/'},
        { title: 'Event Types', path: '/docs/reference/api/event-types/'},
        { title: 'Factors', path: '/docs/reference/api/factors/'},
        { title: 'Features', path: '/docs/reference/api/features/'},
        { title: 'Groups', path: '/docs/reference/api/groups/'},
        { title: 'Identity Providers', path: '/docs/reference/api/idps/'},
        { title: 'Inline Hooks', path: '/docs/reference/api/inline-hooks/'},
        { title: 'Linked Objects', path: '/docs/reference/api/linked-objects/'},
        { title: 'Policy', path: '/docs/reference/api/policy/'},
        { title: 'Schemas', path: '/docs/reference/api/schemas/'},
        { title: 'Sessions', path: '/docs/reference/api/sessions/'},
        { title: 'System Log', path: '/docs/reference/api/system-log/'},
        { title: 'Templates', path: '/docs/reference/api/templates/'},
        { title: 'Trusted Origins', path: '/docs/reference/api/trusted-origins/'},
        { title: 'User Types', path: '/docs/reference/api/user-types/'},
        { title: 'Users', path: '/docs/reference/api/users/'},
        { title: 'Zones', path: '/docs/reference/api/zones/'}
      ]
    },
    { title: 'Rate Limits', subLinks: [
      { title: 'Rate limits overview', path: '/docs/reference/rate-limits/'},
      { title: 'Authentication/End-user rate limits', path: '/docs/reference/rl-global-enduser/'},
      { title: 'Management rate limits', path: '/docs/reference/rl-global-mgmt/'},
      { title: 'Other endpoint rate limits', path: '/docs/reference/rl-global-other-endpoints/'},
      { title: 'Additional limits', path: '/docs/reference/rl-additional-limits/'},
      { title: 'Rate limit best practices', path: '/docs/reference/rl-best-practices/'},
      { title: 'Client-based rate limits', path: '/docs/reference/rl-clientbased/'},
      { title: 'DynamicScale', path: '/docs/reference/rl-dynamic-scale/'},
      { title: 'Previous rate limits', path: '/docs/reference/rl-previous/'}
      ]
    },
    { title: 'Error Codes', path: '/docs/reference/error-codes/'},
    { title: 'Import Hook', path: '/docs/reference/import-hook/'},
    { title: 'Okta Expression Language', path: '/docs/reference/okta-expression-language/'},
    { title: 'Password Hook', path: '/docs/reference/password-hook/'},
    { title: 'Postman Collections', path: '/docs/reference/postman-collections/'},
    { title: 'Registration Hook', path: '/docs/reference/registration-hook/'},
    { title: 'Release Life Cycle', path: '/docs/reference/releases-at-okta/'},
    { title: 'SAML Hook', path: '/docs/reference/saml-hook/'},
    { title: 'SCIM Protocol', path: '/docs/reference/scim/'},
    { title: 'Social IdP Settings', path: '/docs/reference/social-settings/'},
    { title: 'Token Hook', path: '/docs/reference/token-hook/'},
    { title: 'WebFinger', path: '/docs/reference/api/webfinger/'},
    { title: 'Advanced Server Access', subLinks: [
        { title: 'ASA Projects API', path: '/docs/reference/api/asa/projects/'},
      ]
    }
  ]
