---
title: Scopes and supported endpoints
---

Every action on an endpoint that supports OAuth 2.0 requires a specific scope. Okta scopes have the following format: `okta.<resource name>.<operation>`. For example, you can have resources that are users, clients, or apps with `read` or `manage` operations. The `read` scope is used to read information about a resource. The `manage` scope is used to create a new resource, manage a resource, or delete a resource. Use the `okta.<resource>.read` scopes to perform GET API operations and the `okta.<resource>.manage` scopes to perform POST, PUT, and DELETE API operations. The self scopes (`okta.<resource>.<operation>.self`) only allow access to the user who authorized the token. These scopes are used to perform end user API operations.

You can access all of the endpoints mentioned here from the browser in cross-origin scenarios using the bearer token. You don't need to configure Trusted Origin. This is because OAuth for Okta APIs don't rely on cookies. These APIs use bearer tokens instead. See [Enable CORS](/docs/guides/enable-cors/overview/).

The following table shows the scopes that are currently available:

| Scope                    | Description                                                            | API                                    |
| :----------------------- | :--------------------------------------------------------------------- | :------------------------------------- |
| `okta.apps.manage`       | Allows the app to create and manage Apps in your Okta organization     | [Apps API](/docs/reference/api/apps/)  |
| `okta.apps.read`         | Allows the app to read information about Apps in your Okta organization| [Apps API](/docs/reference/api/apps/)  |
| `okta.authorizationServers.manage`| Allows the app to manage authorization servers                 | [Authorization Servers API](/docs/reference/api/authorization-servers/)|
| `okta.authorizationServers.read`| Allows the app to read authorization server information          | [Authorization Servers API](/docs/reference/api/authorization-servers/)|
| `okta.clients.manage`    | Allows the app to manage all OAuth/OIDC clients and to create new clients| [Dynamic Client Registration API](/docs/reference/api/oauth-clients/)|
| `okta.clients.read`      | Allows the app to read information for all OAuth/OIDC clients           | [Dynamic Client Registration API](/docs/reference/api/oauth-clients/)|
| `okta.clients.register`  | Allows the app to register (create) new OAuth/OIDC clients (but not read information about existing clients)| [Dynamic Client Registration API](/docs/reference/api/oauth-clients/#register-new-client) |
| `okta.domain.manage`  | Allows the app to create and manage Domains in your Okta organization| [Domains API](/docs/reference/api/domains/) |
| `okta.domain.read`  | Allows the app to read information about Domains in your Okta organization| [Domain API](/docs/reference/api/domains/) |
| `okta.eventHooks.manage` | Allows the app to create and manage Event Hooks in your Okta organization| [Event Hooks API](/docs/reference/api/event-hooks/)|
| `okta.eventHooks.read`   | Allows the app to read information about Event Hooks in your Okta organization| [Event Hooks API](/docs/reference/api/event-hooks/)|
| `okta.factors.manage`    | Allows the app to manage all admin operations for org factors (for example, activate, deactive, read)| [Factors Administration Operations](/docs/reference/api/factor-admin/#factors-administration-operations)|
| `okta.factors.read`      | Allows the app to read org factors information                          | [Factors Administration Operations](/docs/reference/api/factor-admin/#factors-administration-operations)|
| `okta.groups.manage`     | Allows the app to manage groups in your Okta organization               | [Groups API](/docs/reference/api/groups/#getting-started-with-the-groups-api)|
| `okta.groups.read`       | Allows the app to read information about groups and their members in your Okta organization| [Groups API](/docs/reference/api/groups/#getting-started-with-the-groups-api)|
| `okta.idps.manage`       | Allows the app to create and manage Identity Providers in your Okta organization| [Identity Providers API](/docs/reference/api/idps/#getting-started)|
| `okta.idps.read`         | Allows the app to read information about Identity Providers in your Okta organization| [Identity Providers API](/docs/reference/api/idps/#getting-started)|
| `okta.inlineHooks.manage`| Allows the app to create and manage Inline Hooks in your Okta organization.| [Inline Hooks API](/docs/reference/api/inline-hooks/)|
| `okta.inlineHooks.read` | Allows the app to read information about Inline Hooks in your Okta organization.| [Inline Hooks API](/docs/reference/api/inline-hooks/)|
| `okta.linkedObjects.manage`| Allows the app to manage Linked Object definitions in your Okta organization.| [Linked Objects API](/docs/reference/api/linked-objects/)|
| `okta.linkedObjects.read` | Allows the app to read Linked Object definitions in your Okta organization.| [Linked Objects API](/docs/reference/api/linked-objects/)|
| `okta.logs.read`         | Allows the app to read information about System Log entries in your Okta organization| [System Log API](/docs/reference/api/system-log/)|
| `okta.roles.manage`      | Allows the app to create and manage Administrator Roles in your Okta organization     | [Administrator Roles API](/docs/reference/api/roles/#get-started)|
| `okta.roles.read`        | Allows the app to read information about Administrator Roles in your Okta organization | [Administrator Roles API](/docs/reference/api/roles/#get-started)|
| `okta.schemas.manage`    | Allows the app to create and manage Schemas in your Okta organization   | [Schemas API](/docs/reference/api/schemas/#getting-started)|
| `okta.schemas.read`      | Allows the app to read information about Schemas in your Okta organization| [Schemas API](/docs/reference/api/schemas/#getting-started)|
| `okta.sessions.manage`      | Allows the app to manage all sessions in your Okta organization | [Sessions API](/docs/reference/api/sessions/#session-operations) |
| `okta.sessions.read`        | Allows the app to read all sessions in your Okta organization | [Sessions API](/docs/reference/api/sessions/#session-operations) |
| `okta.templates.manage` | Allows the app to manage all custom templates in your Okta organization | [Custom Templates API](/docs/reference/api/templates/#template-operations) |
| `okta.templates.read` | Allows the app to read all custom templates in your Okta organization | [Custom Templates API](/docs/reference/api/templates/#template-operations) |
| `okta.trustedOrigins.manage` | Allows the app to manage all Trusted Origins in your Okta organization | [Trusted Origins API](/docs/reference/api/trusted-origins/#trusted-origins-api-operations) |
| `okta.trustedOrigins.read` | Allows the app to read all Trusted Origins in your Okta organization | [Trusted Origins API](/docs/reference/api/trusted-origins/#trusted-origins-api-operations) |
| `okta.users.manage`      | Allows the app to create and manage users and read all profile and credential information for users| [Users API](/docs/reference/api/users/#user-operations), [User Lifecycle Operations](/docs/reference/api/users/#lifecycle-operations), [User Consent Grant Operations](/docs/reference/api/users/#user-consent-grant-operations), [Identity Provider User Operations](/docs/reference/api/idps/#identity-provider-user-operations)|
| `okta.users.read`        | Allows the app to read any user's profile and credential information      | [Users API](/docs/reference/api/users/#user-operations), [User Lifecycle Operations](/docs/reference/api/users/#lifecycle-operations), [User Consent Grant Operations](/docs/reference/api/users/#user-consent-grant-operations), [Identity Provider User Operations](/docs/reference/api/idps/#identity-provider-user-operations)|
| `okta.users.manage.self` | Allows the app to manage the currently signed-in user's profile. Currently only supports user profile attribute updates. |   |
| `okta.users.read.self`   | Allows the app to read the currently signed-in user's profile and credential information| [Users API](/docs/reference/api/users/#get-current-user) |
| `okta.policies.manage`    | Allows the app to manage Policies in your Okta organization   | [Policy API](/docs/reference/api/policy/#policy-api-operations)|
| `okta.policies.read`      | Allows the app to read information about Policies in your Okta organization| [Policy API](/docs/reference/api/policy/#policy-api-operations)|

## Scope Naming

The available scopes exist in a hierarchy, so that the `manage` scopes can do everything that the `read` scopes do, but more. Additionally, the `self` scopes only allow for access to the user who authorized the token. For example, a `GET` request to the `/users` endpoint with the `okta.users.read` scope returns all the users that the admin has access to. If the same request is sent with the `okta.users.read.self` scope, only the current user's account returns.

## Silent Downscoping

The Okta [Org Authorization Server](/docs/concepts/auth-servers/) returns all scopes that you request as long as the client app is permitted to use that scope (granted to the client app). It doesn't matter whether you have permissions for all the scopes that you request. If the scopes requested exist in the app's grants collection, those scopes are sent back in the access token. However, when you make a request to perform an action that you don't have permission to perform, the token doesn't work and you receive an error.

For example, if you are a Read Only Admin and request an access token that contains the `okta.authorizationServers.manage` scope and that scope exists in the client's grants collection, the access token returned contains that scope. However, the access token doesn't work when you try to modify an authorization server on `/api/v1/authorizationServers` because you lack the permissions.
