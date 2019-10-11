// the navigation that is shown across the reference pages

module.exports = [
    {
        title: "Overview",
        link: "/docs/reference/"
    },
    {
        title: "OpenID Connect & OAuth 2.0 API",
        link: "#"
    },
    {
        title: "Authentication API",
        link: "#"
    },
    {
        title: "Management APIs",
        link: "#",
        links: [
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
    {
        title: "Design Principles",
        link: "#"
    },
    {
        title: "Error Codes",
        link: "#"
    },
    {
        title: "Okta Expression Language",
        link: "#"
    },
    {
        title: "Rate Limits",
        link: "#"
    },
    {
        title: "Postman Collections",
        link: "#"
    }
]