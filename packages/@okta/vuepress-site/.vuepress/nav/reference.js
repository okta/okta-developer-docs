// the navigation that is shown across the reference pages

module.exports = [
    { title: 'API Overview', link: '/docs/reference/api-overview/' },
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
        { title: 'Features', link: '/docs/reference/api/features/'},
        { title: 'Groups', link: '/docs/reference/api/groups/'},
        { title: 'Identity Providers', link: '/docs/reference/api/idps/'},
        { title: 'Inline Hooks', link: '/docs/reference/api/inline-hooks/'},
        { title: 'Linked Objects', link: '/docs/reference/api/linked-objects/'},
        { title: 'Policy', link: '/docs/reference/api/policy/'},
        { title: 'Schemas', link: '/docs/reference/api/schemas/'},
        { title: 'Sessions', link: '/docs/reference/api/sessions/'},
        { title: 'System Log', link: '/docs/reference/api/system-log/'},
        { title: 'Templates', link: '/docs/reference/api/templates/'},
        { title: 'Trusted Origins', link: '/docs/reference/api/trusted-origins/'},
        { title: 'User Types', link: '/docs/reference/api/user-types/'},
        { title: 'Users', link: '/docs/reference/api/users/'},
        { title: 'Zones', link: '/docs/reference/api/zones/'}
      ]
    },
    { title: 'Error Codes', link: '/docs/reference/error-codes/'},
    { title: 'Import Hook', link: '/docs/reference/import-hook/'},
    { title: 'SAML Hook', link: '/docs/reference/saml-hook/'},
    { title: 'Registration Hook', link: '/docs/reference/registration-hook/'},
    { title: 'Token Hook', link: '/docs/reference/token-hook/'},
    { title: 'Okta Expression Language', link: '/docs/reference/okta-expression-language/'},
    { title: 'Postman Collections', link: '/docs/reference/postman-collections/'},
    { title: 'Rate Limits', link: '/docs/reference/rate-limits/'},
    { title: 'Release Life Cycle', link: '/docs/reference/releases-at-okta/'},
    { title: 'SCIM Protocol', link: '/docs/reference/scim/'},
    { title: 'WebFinger', link: '/docs/reference/webfinger/'}
  ]
