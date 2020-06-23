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
    { title: 'Error Codes', path: '/docs/reference/error-codes/'},
    { title: 'Import Hook', path: '/docs/reference/import-hook/'},
    { title: 'SAML Hook', path: '/docs/reference/saml-hook/'},
    { title: 'Registration Hook', path: '/docs/reference/registration-hook/'},
    { title: 'Token Hook', path: '/docs/reference/token-hook/'},
    { title: 'Okta Expression Language', path: '/docs/reference/okta-expression-language/'},
    { title: 'Password Hook', path: '/docs/reference/password-hook/'},
    { title: 'Postman Collections', path: '/docs/reference/postman-collections/'},
    { title: 'Rate Limits', path: '/docs/reference/rate-limits/'},
    { title: 'Release Life Cycle', path: '/docs/reference/releases-at-okta/'},
    { title: 'SCIM Protocol', path: '/docs/reference/scim/'},
    { title: 'Social IdP Settings', path: '/docs/reference/social-settings/'},
    { title: 'WebFinger', path: '/docs/reference/api/webfinger/'}
  ]
