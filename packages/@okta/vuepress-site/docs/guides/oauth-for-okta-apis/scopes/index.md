---
title: Scopes
---
Every action on an endpoint that supports OAuth 2.0 requires a specific scope. The following table shows the scopes that are currently available as a part of Early Access (EA):

| Namespace              | Scope                    | Description                                                            |
|------------------------|--------------------------|------------------------------------------------------------------------|
| Apps                   | `okta.apps.manage`      | Allows the app to create and manage Apps in your Okta organization     |
|                        | `okta.apps.read`         | Allows the app to read information about Apps in your Okta organization|
| Authorization Servers  | `okta.authorizationServers.manage`| Allows an app to manage authorization servers                 |
|                        | `okta.authorizationServers.read`| Allows an app to read authorization server information          |
| Clients                | `okta.clients.manage`    | Allows an app to manage all OAuth/OIDC clients and to create new clients|
|                        | `okta.clients.read`      | Allows an app to read information for all OAuth/OIDC clients           |
|                        | `okta.clients.register`  | Allows an app to create new OAuth/OIDC clients (but not read information about existing clients)|
| Event Hooks            | `okta.eventHooks.manage` | Allows the app to create and manage Event Hooks in your Okta organization|
|                        | `okta.eventHoods.read`   | Allows the app to read information about Event Hooks in your Okta organization|
| Events                 | `okta.events.read`       | Allows the app to read information about deprecated Events v1 API entries in your Okta organization|
| Factors                | `okta.factors.manage`    | Allows the app to manage all admin operations for org factors (for example, activate, deactive, read)|
|                        | `okta.factors.read`      | Allows the app to read org factors information                          |
| Groups                 | `okta.groups.manage`     | Allows the app to manage groups in your Okta organization               |
|                        | `okta.groups.read`       | Allows the app to read information about groups and their members in your Okta organization|
|                        | `okta.groups.register`   | Allows the app to create new groups in your Okta organization           |
| IDPS                   | `okta.idps.manage`       | Allows the app to create and manage Identity Providers in your Okta organization|
|                        | `okta.idps.read`         | Allows the app to read information about Identity Providers in your Okta organization|
| Logs                   | `okta.logs.read`         | Allows the app to read information about System Log entries in your Okta organization|
| Schemas                | `okta.schemas.manage`    | Allows the app to create and manage Schemas in your Okta organization   |
|                        | `okta.schemas.read`      | Allows the app to read information about Schemas in your Okta organization|
| Users                  | `okta.users.manage`      | Allows an app to manage any user's profile and credential information and to create new users|
|                        | `okta.users.manage.self` | Allows an app to manage the currently signed-in user's profile           |
|                        | `okta.users.read`        | Allows an app to read any user's profile and credential information      |
|                        | `okta.users.read.self`   | Allows an app to read the currently signed-in user's profile and credential information|

The full list of endpoints included in this EA, as well as the scope that is required for each endpoint and action, is located in the <GuideLink link="../supported-endpoints">Supported Endpoints</GuideLink> section.

## Scope Hierarchy 
The available scopes exist in a hierarchy, so that the `manage` scopes can do everything that the `read` scopes do, but more. Additionally, the `self` scopes only allow for access to the user who authorized the token. For example, a `GET` request to the `/users` endpoint with the `okta.users.read` scope returns all the users that the admin has access to. If the same request is sent with the `okta.users.read.self` scope, only the current user's account returns.

## Silent Downscoping
The Okta Org Authorization Server returns all scopes that you request as long as the client app is permitted to request that scope (granted to the client app). It doesn't matter whether you have permissions for all the scopes that you request. If the scopes requested exist in the app's grants collection, those scopes are sent back in the access token. However, when you make a request to perform an action that you don't have permission to perform, the token doesn't work and you receive an error.

For example, you are a Read Only Admin and request an access token that contains the `okta.authorizationServers.manage` scope. That scope exists in the client's grants collection, so the access token returned contains that scope. However, the access token doesn't work when you try to modify an authorization server on `/api/v1/authorizationServers` because you lack the permissions.

<NextSectionLink/>

