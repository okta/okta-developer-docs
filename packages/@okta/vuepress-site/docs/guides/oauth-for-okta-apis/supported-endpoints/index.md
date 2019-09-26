---
title: Supported Endpoints
---
## Grants endpoint actions

`POST /api/v1/apps/${applicationId}/grants`

Creates the new grant. Contains a `scopeId` (one of seven possible values) and an `issuer` (your Org URL)

`GET /api/v1/apps/${applicationId}/grants`

Returns all grants for that application

`GET /api/v1/apps/${applicationId}/grants/${grantId}`

Returns the specified grant

`DELETE /api/v1/apps/${applicationId}/grants/${grantId}`

Deletes the specified grant

## User endpoints that accept OAuth tokens

| Namespace                                                      | Scope                          | 
|----------------------------------------------------------------|--------------------------------|
| [`GET /api/v1/users`](/docs/reference/api/users/#list-users)    | `okta.users.read.self`         | 
| [`POST /api/v1/users`](/docs/reference/api/users/#create-user)  | `okta.users.manage`            | 
| [`GET /api/v1/users/{id}`](/docs/reference/api/users/#get-user) | `okta.users.read`              |
| [`GET /api/v1/users/me`](/docs/reference/api/users/#get-current-user)| `okta.users.read.self`    |
| [`DELETE /api/v1/users/{id}`](/docs/reference/api/users/#delete-user)| `okta.users.manage`       |
| [`PUT /api/v1/users/{id}`](/docs/reference/api/users/#update-user)| `okta.users.manage`          |
| [`POST /api/v1/users/{id}`](/docs/reference/api/users/#update-profile)| `okta.users.manage`      |
| [`GET /api/v1/users/{id}/appLinks`](/docs/reference/api/users/#get-assigned-app-links)| `okta.users.read`|
| [`GET /api/v1/users/{id}/groups`](/docs/reference/api/users/#get-member-groups)| `okta.users.read`|
| [`POST /api/v1/users/{id}/credentials/change_password`](/docs/reference/api/users/#change-password)| `okta.users.manage`|
| [`POST /api/v1/users/me/credentials/change_password`](/docs/reference/api/users/#change-password)| `okta.users.manage.self`|
| [`POST /api/v1/users/{id}/credentials/change_recovery_question`](/docs/reference/api/users/#change-recovery-question)| `okta.users.manage`|
| [`POST /api/v1/users/me/credentials/change_recovery_question`](/docs/reference/api/users/#change-recovery-question)| `okta.users.manage.self`|
| [`POST /api/v1/users/{id}/credentials/forgot_password`](/docs/reference/api/users/#forgot-password)| `okta.users.manage`|
| [`POST /api/v1/users/me/credentials/forgot_password`](/docs/reference/api/users/#forgot-password)| `okta.users.manage.self`|
| [`POST /api/v1/users/{id}/lifecycle/reset_factors`](/docs/reference/api/users/#reset-factors)| `okta.users.manage`|
| [`POST /api/v1/users/me/lifecycle/reset_factors`](/docs/reference/api/users/#reset-factors)|`okta.users.manage.self`|
| [`POST /api/v1/users/{id}/lifecycle/expire_password`](/docs/reference/api/users/#expire-password)| `okta.users.manage`|
| [`POST /api/v1/users/{id}/lifecycle/reset_password`](/docs/reference/api/users/#reset-password)| `okta.users.manage`|
| [`POST /api/v1/users/{id}/lifecycle/forgot_password`](/docs/reference/api/users/#forgot-password)| `okta.users.manage`|
| [`POST /api/v1/users/{id}/lifecycle/activate`](/docs/reference/api/users/#activate-user)| `okta.users.manage`|
| [`POST /api/v1/users/{id}/lifecycle/reactivate`](/docs/reference/api/users/#reactivate-user)| `okta.users.manage`|
| [`POST /api/v1/users/{id}/lifecycle/deactivate`](/docs/reference/api/users/#deactivate-user)| `okta.users.manage`|
| [`POST /api/v1/users/{id}/lifecycle/unlock`](/docs/reference/api/users/#unlock-user)| `okta.users.manage`|
| [`POST /api/v1/users/{id}/lifecycle/suspend`](/docs/reference/api/users/#suspend-user)| `okta.users.manage`|
| [`POST /api/v1/users/{id}/lifecycle/unsuspend`](/docs/reference/api/users/#unsuspend-user) | `okta.users.manage`|

## Client endpoints that accept OAuth tokens
| Namespace                                                      | Scope                          | 
|----------------------------------------------------------------|--------------------------------|
| [`GET /oauth2/v1/clients`](/docs/reference/api/oauth-clients/#list-client-applications) | `okta.clients.read`|
| [`POST /oauth2/v1/clients`](/docs/reference/api/oauth-clients/#register-new-client)| `okta.clients.register`|
| [`GET /oauth2/v1/clients/{clientId}`](/docs/reference/api/oauth-clients/#get-oauth-client)| `okta.clients.read`|
| [`DELETE /oauth2/v1/clients/{clientId}`](/docs/reference/api/oauth-clients/#remove-client-application)| `okta.clients.manage`|
| [`PUT /oauth2/v1/clients/{clientId}`](/docs/reference/api/oauth-clients/#update-client-application)| `okta.clients.manage`|
| [`POST /oauth2/v1/clients/{clientId}/lifecycle/newSecret`](/docs/reference/api/oauth-clients/#generate-new-client-secret)| `okta.clients.manage`|

## Authorization server endpoints that accept OAuth tokens
All authorization server endpoints listed on [this page](/docs/reference/api/authorization-servers/) accept OAuth tokens.

As with other namespaces, any POST/PUT/DELETE request requires the `okta.authorizationServers.manage` scope, while any GET request requires the `okta.authorizationServers.read `scope.

## Groups endpoints that accept OAuth tokens
All the Groups endpoints listed on [this page](/docs/reference/api/groups/) accept OAuth tokens.

As with other namespaces, any POST/PUT/DELETE requests require the `okta.groups.manage` scope, while any GET request requires the `okta.groups.read` scope.

<NextSectionLink/>
