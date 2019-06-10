module.exports = [
  {
    title: "Concepts",
    links: [
      { title: 'API Access Management', link: '/docs/concepts/api-access-management/'},
      { title: 'Authentication', link: '/docs/concepts/authentication/'},
      { title: 'Events API Migration', link: '/docs/concepts/events-api-migration/'},
      { title: 'Inline Hooks', link: '/docs/concepts/inline-hooks/'},
      { title: 'Key Rotation', link: '/docs/concepts/key-rotation/'},
      { title: 'OAuth 2.0 & OIDC', link: '/docs/concepts/oauth-overview/'},
      { title: 'Okta-Hosted Flows', link: '/docs/concepts/okta-hosted-flows/'},
      { title: 'Social Login', link: '/docs/concepts/social-login/'}
    ]
  },
  {
    title: "Guides",
    links: [
      { title: 'Create tokens with group claims', link: '/docs/guides/create-token-with-groups-claim/'},
      { title: 'Protect your API endpoints', link: '/docs/guides/protect-your-api/'},
      { title: 'Request user consent during authentication', link: '/docs/guides/request-user-consent/'},
      { title: 'Sign users in to your Web Application', link: '/docs/guides/sign-into-web-app/'},
      { title: 'Sign users in to your SPA', link: '/docs/guides/sign-into-spa/'},
      { title: 'Sign users out', link: '/docs/guides/sign-users-out/'},
      { title: 'More...', link: '/docs/guides/' }
    ]
  },
  {
    title: "Reference",
    links: [
      { title: 'API Overview', link: '/docs/reference/api-overview/', subLinks: [
        { title: 'Rate limits', link: '/docs/reference/rate-limits/'},
        { title: 'Release Lifecycle', link: '/docs/reference/releases-at-okta/'}
      ]
      },
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
          { title: 'System Log', link: '/docs/reference/api/system-log/'},
          { title: 'Templates', link: '/docs/reference/api/templates/'},
          { title: 'Trusted Origins', link: '/docs/reference/api/trusted-origins/'},
          { title: 'Users', link: '/docs/reference/api/users/'},
          { title: 'Zones', link: '/docs/reference/api/zones/'}
        ]
      },
      { title: 'Error Codes', link: '/docs/reference/error-codes/'},
      { title: 'Token Hooks', link: '/docs/reference/token-hooks/'},
      { title: 'Import Hooks', link: '/docs/reference/import-hooks/'},
      { title: 'SAML Hooks', link: '/docs/reference/saml-hooks/'},
      { title: 'Okta Expression Language', link: '/docs/reference/okta-expression-language/'},
      { title: 'Postman Collections', link: '/docs/reference/postman-collections/'},
      { title: 'SCIM Protocol', link: '/docs/reference/scim/'},
      { title: 'WebFinger', link: '/docs/reference/webfinger/'}
    ]
  },
  {
    title: "Release Notes",
    links: [
      { title: 'Okta API Products Release Notes', link: '/docs/release-notes/'}
    ]
  }
]
