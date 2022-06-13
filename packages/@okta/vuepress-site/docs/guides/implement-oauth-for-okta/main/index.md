---
title: Implement OAuth for Okta
excerpt: Learn how to interact with Okta APIs by using scoped OAuth 2.0 access tokens.
layout: Guides
---

This guide explains how to interact with Okta APIs by using scoped OAuth 2.0 access tokens.

---

**Learning outcomes**

* Define allowed scopes for your app.
* Get an access token and make an API request.
* Know what are the available scopes and supported endpoints.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Postman client](https://www.getpostman.com/downloads/) to test requests with the access token. See [Get Started with the Okta APIs](https://developer.okta.com/code/rest/) for information on setting up Postman.

> **Note:** At this time, OAuth for Okta works only with the APIs listed in the [Scopes and supported endpoints](#scopes-and-supported-endpoints) section. We are actively working towards supporting additional APIs. Our goal is to cover all public Okta API endpoints.

---

## About OAuth 2.0 for Okta API endpoints

Most Okta API endpoints require that you include an API token with your request. Currently, this API token takes the form of an SSWS token that you generate in the Admin Console. With OAuth for Okta, you are able to interact with Okta APIs using scoped OAuth 2.0 access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains.

> **Important:** You request an access token by making a call to your Okta [Org Authorization Server](/docs/concepts/auth-servers/#org-authorization-server) `/authorize` endpoint. Only the Org Authorization Server can mint access tokens that contain Okta API scopes. See [Which authorization server should you use](/docs/concepts/auth-servers/#which-authorization-server-should-you-use).

Scoped access tokens have a number of advantages, including:

* More access granularity
* Shorter token lifespans
* Can be generated and retrieved using an API

## Create an OAuth 2.0 app in Okta

Create the client application that you want to use with the Okta APIs.

1. Sign in to your Okta organization as a user with administrative privileges. [Create an org for free](https://developer.okta.com/signup).

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. On the Create a new app integration page, select **OIDC - OpenID Connect** as the **Sign-in method**. Choose any **Application type**. Creating a web, single-page, or native app is an easy way to test scope-based access to Okta's APIs using an OAuth 2.0 bearer token. Click **Next**.

    > **Note:** It is important to choose the appropriate application type for apps that are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients are not designed to have, and would break the sign-in or sign-out flow.

1. Enter a name for your app integration. In the **Sign-in redirect URIs** box, specify the callback location where Okta returns a browser (along with the token) after the user finishes authenticating.
1. We recommend that you always use the Authorization Code grant flow and clear the **Implicit (Hybrid)** check box.

    > **Note:** You can leave the rest of the defaults as they work with this guide for testing purposes.

1. Click **Done**. The settings page for the app integration appears, showing the **General** tab. Make note of the **Client ID** listed in the **Client Credentials** section at the bottom of the page. You need this in the [Get an access token and make a request](#get-an-access-token-and-make-a-request) section.
1. Click the **Assignments** tab and ensure that the right users are assigned to the app. For instructions on how to assign the app integration to individual users and groups, see the [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign) topic in the Okta product documentation. For more information about which users have access to which scopes, see the [Scopes and supported endpoints](#scopes-and-supported-endpoints) section.

## Define allowed scopes

When a request is sent to the Okta Org Authorization Server's `/authorize` endpoint, it validates all of the requested scopes in the request against the app's grants collection. The scope is granted if it exists in the app's grants collection.

> **Note:** Only the Super Admin role has permissions to grant scopes to an app.

1. Sign in to your Okta organization with your administrator account.
1. In the Admin Console, go to **Applications** > **Applications**.
1. Select the OpenID Connect (OIDC) or OAuth 2.0 app that needs grants added.
1. Select the **Okta API Scopes** tab and then click **Grant** for each of the scopes that you want to add to the application's grant collection.

Alternatively, you can add grants using the [Apps API](/docs/reference/api/apps/#application-oauth-2-0-scope-consent-grant-operations). The following is an example request to create a grant for the `okta.users.read` scope.

```bash
curl --location --request POST 'https://${yourOktaDomain}/api/v1/apps/${appInstanceId}/grants' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: SSWS ${api_token}' \
--data-raw '{
    "scopeId": "okta.users.read",
    "issuer": "https://${yourOktaDomain}"
}'
```

> **Note:** You can find a list of available values for `scopeId` in the [Scopes and supported endpoints](#scopes-and-supported-endpoints) section.

## Get an access token and make a request

After you have the following, you can get an access token and make a request to an endpoint.

* An Okta OpenID Connect or OAuth 2.0 Service app
* One or more grants associated with that app
* Users with appropriate permissions associated with the app
* Users with appropriate administrator permissions in Okta

Request an access token by making a request to your Okta [Org Authorization Server](/docs/concepts/auth-servers/) `/authorize` endpoint. Only the Org Authorization Server can mint access tokens that contain Okta API scopes.

> **Note:** See [Token lifetime](/docs/reference/api/oidc/#token-lifetime) for more information on hard-coded and configurable token lifetimes.

This page helps you build a request in Postman. You can also manually build the request URL and paste it into a private browser window. After you authenticate, the browser returns the access token in the address bar. Your request URL should look something like this:

```
https://${yourOktaDomain}/oauth2/v1/authorize?client_id=0oan47pj9BsB30h7&response_type=token&response_mode=fragment&scope=okta.users.read&redirect_uri=${yourConfiguredRedirectUri}&nonce=UBGW&state=1234
```

We recommend that you always use the Authorization Code grant flow. See [Implement the Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/) for details on this grant type.

> **Note:** If this is your first time working with the Okta APIs, read [Get Started with the Okta REST APIs](/code/rest/) first.

1. In Postman, select the request that you want to make, such as a `GET` request to the `/api/v1/users` endpoint to get back a list of all users.
2. On the **Header** tab, remove the existing SSWS Authorization API Key.
3. Click the **Authorization** tab and from the **Type** drop-down list, select **OAuth 2.0**.
4. On the right, click **Get New Access Token**.
5. In the dialog box that appears, enter a name for the token and select **Authorization Code (With PKCE)** as the grant type.
6. Define the following for the token request:

    * **Callback URL**: Define the callback location where Okta returns the token after the user finishes authenticating. This URL must match one of the redirect URIs that you configured in the [Create an OAuth 2.0 app in Okta](#create-an-oauth-2-0-app-in-okta) section.
    * **Auth URL**: Enter the authorization endpoint for your Org Authorization Server, for example, `https://${yourOktaDomain}/oauth2/v1/authorize`.
    * **Access Token URL**: Enter the token endpoint for your Org Authorization Server, for example, `https://${yourOktaDomain}/oauth2/v1/token`.
    * **Code Challenge Method**: Leave the default of `SHA-256` selected.
    * **Code Verifier**: Leave it empty so that Postman generates its own.
    * **Client ID**: Use the `client_id` of your Okta OAuth 2.0 application that you created in the [Create an OAuth 2.0 app in Okta](#create-an-oauth-2-0-app-in-okta) section.
    * **Scope**: Include the scopes that allow you to perform the actions on the endpoint that you want to access. The scopes requested for the access token must already exist in the application's grants collection, and the user must have the permission to perform those actions. See [Scopes and supported endpoints](#scopes-and-supported-endpoints).
    * **State**: Use any alphanumeric value. The authorization server reflects this string when redirecting the browser back to the client, which your client can verify to help prevent cross-site request forgery attacks.
    * **Client Authentication**: Set to **Send client credentials in body**.

7. Click **Request Token**. You are prompted to sign in to your Okta org. After you are authenticated, the **Manage Access Tokens** window displays the access token, including the scopes requested. The token also automatically populates the **Available Token** drop-down list.
    > **Note:** The lifetime for this token is fixed at one hour.
8. Click **Use Token** at the bottom of the window to use this access token in your request to the `/users` endpoint.
9. Click **Send**. Since you requested `okta.users.read`, the response should contain an array of all the users associated with your app. This is dependent on the user's permissions.

## Scopes and supported endpoints

Every action on an endpoint that supports OAuth 2.0 requires a specific scope. Okta scopes have the following format: `okta.<resource name>.<operation>`. For example, you can have resources that are users, clients, or apps with `read` or `manage` operations. The `read` scope is used to read information about a resource. The `manage` scope is used to create a new resource, manage a resource, or delete a resource. Use the `okta.<resource>.read` scopes to perform GET API operations and the `okta.<resource>.manage` scopes to perform POST, PUT, and DELETE API operations. The self scopes (`okta.<resource>.<operation>.self`) only allow access to the user who authorized the token. These scopes are used to perform end user API operations.

You can access all of the endpoints mentioned here from the browser in cross-origin scenarios using the bearer token. You don't need to configure Trusted Origin. This is because OAuth for Okta APIs don't rely on cookies. These APIs use bearer tokens instead. See [Enable CORS](/docs/guides/enable-cors/).

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
| `okta.devices.manage`		| Allows the app to manage any Device's profile     | [Devices API](/docs/reference/api/devices/) |
| `okta.devices.read`		| Allows the app to read any Device's profile      | [Devices API](/docs/reference/api/devices/) |
| `okta.domains.manage`  | Allows the app to create and manage Domains in your Okta organization| [Domains API](/docs/reference/api/domains/) |
| `okta.domains.read`  | Allows the app to read information about Domains in your Okta organization| [Domains API](/docs/reference/api/domains/) |
| `okta.eventHooks.manage` | Allows the app to create and manage Event Hooks in your Okta organization| [Event Hooks API](/docs/reference/api/event-hooks/)|
| `okta.eventHooks.read`   | Allows the app to read information about Event Hooks in your Okta organization| [Event Hooks API](/docs/reference/api/event-hooks/)|
| `okta.factors.manage`    | Allows the app to manage all admin operations for org factors (for example, activate, deactivate, read)| [Factors Administration Operations](/docs/reference/api/factor-admin/#factors-administration-operations)|
| `okta.factors.read`      | Allows the app to read org factors information                          | [Factors Administration Operations](/docs/reference/api/factor-admin/#factors-administration-operations)|
| `okta.groups.manage`     | Allows the app to manage groups in your Okta organization               | [Groups API](/docs/reference/api/groups/#getting-started-with-the-groups-api)|
| `okta.groups.read`       | Allows the app to read information about groups and their members in your Okta organization| [Groups API](/docs/reference/api/groups/#getting-started-with-the-groups-api)|
| `okta.idps.manage`       | Allows the app to create and manage Identity Providers in your Okta organization| [Identity Providers API](/docs/reference/api/idps/#getting-started)|
| `okta.idps.read`         | Allows the app to read information about Identity Providers in your Okta organization| [Identity Providers API](/docs/reference/api/idps/#getting-started)|
| `okta.inlineHooks.manage`| Allows the app to create and manage Inline Hooks in your Okta organization | [Inline Hooks API](/docs/reference/api/inline-hooks/)|
| `okta.inlineHooks.read` | Allows the app to read information about Inline Hooks in your Okta organization | [Inline Hooks API](/docs/reference/api/inline-hooks/)|
| `okta.linkedObjects.manage`| Allows the app to manage Linked Object definitions in your Okta organization | [Linked Objects API](/docs/reference/api/linked-objects/)|
| `okta.linkedObjects.read` | Allows the app to read Linked Object definitions in your Okta organization | [Linked Objects API](/docs/reference/api/linked-objects/)|
| `okta.logs.read`         | Allows the app to read information about System Log entries in your Okta organization | [System Log API](/docs/reference/api/system-log/)|
| `okta.policies.manage`    | Allows the app to manage Policies in your Okta organization | [Policy API](/docs/reference/api/policy/#policy-api-operations)|
| `okta.policies.read`      | Allows the app to read information about Policies in your Okta organization | [Policy API](/docs/reference/api/policy/#policy-api-operations)|
| `okta.profileMappings.manage`| Allows the app to manage user profile mappings in your Okta organization | [Mappings API](/docs/reference/api/mappings/)|
| `okta.profileMappings.read`| Allows the app to read user profile mappings in your Okta organization | [Mappings API](/docs/reference/api/mappings/)|
| `okta.pushProviders.manage`| Allows the app to create and manage push notification providers such as APNs and FCM | [Push Providers API](/docs/reference/api/push-providers/)|
| `okta.pushProviders.read`| Allows the app to read push notification providers such as APNs and FCM | [Push Providers API](/docs/reference/api/push-providers/)|
| `okta.roles.manage`        | Allows the app to read information about Administrator Roles in your Okta organization | [Administrator Roles API](/docs/reference/api/roles/#get-started)|
| `okta.roles.read`        | Allows the app to read information about Administrator Roles in your Okta organization | [Administrator Roles API](/docs/reference/api/roles/#get-started)|
| `okta.schemas.manage`    | Allows the app to create and manage Schemas in your Okta organization | [Schemas API](/docs/reference/api/schemas/#getting-started)|
| `okta.schemas.read`      | Allows the app to read information about Schemas in your Okta organization | [Schemas API](/docs/reference/api/schemas/#getting-started)|
| `okta.sessions.manage`      | Allows the app to manage all sessions in your Okta organization | [Sessions API](/docs/reference/api/sessions/#session-operations) |
| `okta.sessions.read`        | Allows the app to read all sessions in your Okta organization | [Sessions API](/docs/reference/api/sessions/#session-operations) |
| `okta.templates.manage` | Allows the app to manage all custom templates in your Okta organization | [Custom Templates API](/docs/reference/api/templates/#template-operations) |
| `okta.templates.read` | Allows the app to read all custom templates in your Okta organization | [Custom Templates API](/docs/reference/api/templates/#template-operations) |
| `okta.trustedOrigins.manage` | Allows the app to manage all Trusted Origins in your Okta organization | [Trusted Origins API](/docs/reference/api/trusted-origins/#trusted-origins-api-operations) |
| `okta.trustedOrigins.read` | Allows the app to read all Trusted Origins in your Okta organization | [Trusted Origins API](/docs/reference/api/trusted-origins/#trusted-origins-api-operations) |
| `okta.users.manage`      | Allows the app to create and manage users and read all profile and credential information for users | [Users API](/docs/reference/api/users/#user-operations), [User Lifecycle Operations](/docs/reference/api/users/#lifecycle-operations), [User Consent Grant Operations](/docs/reference/api/users/#user-consent-grant-operations), [Identity Provider User Operations](/docs/reference/api/idps/#identity-provider-user-operations)|
| `okta.users.read`        | Allows the app to read any user's profile and credential information      | [Users API](/docs/reference/api/users/#user-operations), [User Lifecycle Operations](/docs/reference/api/users/#lifecycle-operations), [User Consent Grant Operations](/docs/reference/api/users/#user-consent-grant-operations), [Identity Provider User Operations](/docs/reference/api/idps/#identity-provider-user-operations)|
| `okta.users.manage.self` | Allows the app to manage the currently signed-in user's profile. Currently only supports user profile attribute updates. |   |
| `okta.users.read.self`   | Allows the app to read the currently signed-in user's profile and credential information | [Users API](/docs/reference/api/users/#get-current-user) |
| `okta.userTypes.manage`    | Allows the app to manage user types in your Okta organization | [User Types API](/docs/reference/api/user-types/)|
| `okta.userTypes.read`    | Allows the app to read user types in your Okta organization | [User Types API](/docs/reference/api/user-types/)|

### Scope naming

The available scopes exist in a hierarchy, so that the `manage` scopes can do everything that the `read` scopes do, but more. Additionally, the `self` scopes only allow for access to the user who authorized the token. For example, a `GET` request to the `/users` endpoint with the `okta.users.read` scope returns all the users that the admin has access to. If the same request is sent with the `okta.users.read.self` scope, only the current user's account returns.

### Silent downscoping

The Okta [Org Authorization Server](/docs/concepts/auth-servers/) returns all scopes that you request as long as the client app is permitted to use that scope (granted to the client app). It doesn't matter whether you have permissions for all the scopes that you request. If the scopes requested exist in the app's grants collection, those scopes are sent back in the access token. However, when you make a request to perform an action that you don't have permission to perform, the token doesn't work and you receive an error.

For example, if you are a Read Only Admin and request an access token that contains the `okta.authorizationServers.manage` scope and that scope exists in the client's grants collection, the access token returned contains that scope. However, the access token doesn't work when you try to modify an authorization server on `/api/v1/authorizationServers` because you lack the permissions.

## Support

If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).