---
title: Implement OAuth for Okta
excerpt: Learn how to interact with Okta APIs by using scoped OAuth 2.0 access tokens.
layout: Guides
---

This guide explains how to interact with Okta APIs by using scoped OAuth 2.0 access tokens.

---

#### Learning outcomes

* Define allowed scopes for your app.
* Get an access token and make an API request.
* Know what are the available scopes and supported endpoints.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Postman client](https://www.getpostman.com/downloads/) to test requests with the access token. See [Get Started with the Okta APIs](https://developer.okta.com/docs/reference/rest/) for information on setting up Postman.

> **Note:** OAuth for Okta works only with the APIs listed on the [OAuth 2.0 Scopes](https://developer.okta.com/docs/api/oauth2/) page.

---

## About OAuth 2.0 for Okta API endpoints

Most Okta API endpoints require you to include an API token with your request. Currently, this API token takes the form of an SSWS token that you generate in the Admin Console. With OAuth for Okta, you're able to interact with Okta APIs using scoped OAuth 2.0 access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints. The scopes within the access token control that ability.

> **Important:** Request an access token from your Okta [org authorization server](/docs/concepts/auth-servers/#org-authorization-server) `/authorize` endpoint. Only the org authorization server can mint access tokens that contain Okta API scopes. Refer to [Which authorization server should you use](/docs/concepts/auth-servers/#which-authorization-server-should-you-use) for more information on authorization servers and how to use them.

Scoped access tokens have several advantages, including:

* More access granularity
* Shorter token lifespans
* Can be generated and retrieved using an API

## Create an OAuth 2.0 app in Okta

Create the client app that you want to use with the Okta APIs.

1. Sign in to your Okta organization with your administrator account.
1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. On the **Create a new app integration** page, select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Choose **Web Application** for the **Application type**. Creating a web app is an easy way to test scope-based access to the Okta APIs using an OAuth 2.0 bearer token. Click **Next**.

    > **Note:** It's important to choose the appropriate app type for apps that are public clients. Choosing the wrong app type may result in Okta API endpoints attempting to verify an app's client secret. Because public clients aren't designed to have these, the sign-in or sign-out flow can break.

1. Enter a name for your app integration.
1. For **Grant type**, the **Authorization Code** is required. It's selected by default, and you can't clear the checkbox.
1. In the **Sign-in redirect URIs** box, specify the callback location where Okta returns a browser (along with the token) after the user authenticates. You can use the default URI for this exercise.
    > **Note:** You can leave the rest of the default values, as they work with this guide for testing purposes.
1. In the **Assignments** section, select **Limit access to selected groups** and add a group or **Skip group assignment for now**.
    > **Note:** It's good practice to create and use groups for testing purposes.
1. Click **Save**. The settings page for the app integration appears. Make note of the **Client ID** and **Client secret** listed in the **Client Credentials** section. You need this information for the [Get an access token and make a request](#get-an-access-token-and-make-a-request) task.
1. Click the **Assignments** tab and ensure that the right users are assigned to the app. If you skipped the assignment during the app integration creation, you must add one or more users now. For instructions on how to assign the app integration to individual users and groups, see the [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign) topic in the Okta product documentation. For more information about which users have access to which scopes, see the [Scopes and supported endpoints](#scopes-and-supported-endpoints) section.
1. Optional. Click the **Application rate limits** tab to adjust the rate-limit capacity percentage for this app. By default, each new app sets this percentage at 50%.

## Define allowed scopes

When a request is sent to the org authorization server's `/authorize` endpoint, it validates all requested scopes in the request against the app's grants collection. The scope is granted if it exists in the app's grants collection.

> **Note:** Only the Super Admin role has permission to grant scopes to an app.

1. Sign in to your Okta organization with your administrator account.
1. In the Admin Console, go to **Applications** > **Applications**.
1. Select the OpenID Connect (OIDC) or OAuth 2.0 app that needs grants added.
1. Select the **Okta API Scopes** tab, and then click **Grant** for each scope that you want to add to the app's grants collection. For this example, make sure to grant access to `okta.users.read`.

Alternatively, you can add grants using the [Apps API](/docs/reference/api/apps/#application-oauth-2-0-scope-consent-grant-operations). The following is an example request to create a grant for the `okta.users.read` scope.

```bash
curl --location --request POST 'https://{yourOktaDomain}/api/v1/apps/{appInstanceId}/grants' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: SSWS {api_token}' \
--data-raw '{
    "scopeId": "okta.users.read",
    "issuer": "https://{yourOktaDomain}"
}'
```

> **Note:** You can find a list of available values for `scopeId` in the [Scopes and supported endpoints](#scopes-and-supported-endpoints) section.

## Get an access token and make a request

You can get an access token and make a request to an endpoint after you have the following:

* An Okta OpenID Connect or OAuth 2.0 Service app
* One or more grants associated with that app
* Users with appropriate permissions associated with the app
* Users with appropriate administrator permissions in Okta

Request an access token by making a request to your Okta [org authorization server](/docs/concepts/auth-servers/) `/authorize` endpoint. Only the org authorization server can mint access tokens that contain Okta API scopes.

> **Note:** See [Token lifetime](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#token-lifetime) for more information on hard-coded and configurable token lifetimes.

This page helps you build a request in Postman. You can also manually build the request URL and paste it into a private browser window. After you authenticate, the browser returns the access token in the address bar. Your request URL should look something like this:

```bash
https://{yourOktaDomain}/oauth2/v1/authorize?client_id=0oan47pj9BsB30h7&response_type=token&response_mode=fragment&scope=okta.users.read&redirect_uri={yourConfiguredRedirectUri}&nonce=UBGW&state=1234
```

Okta recommends that you always use the Authorization Code with PKCE grant flow. See [Implement the Authorization Code with PKCE flow](/docs/guides/implement-grant-type/authcodepkce/main/) for details on this grant type.

> **Note:** If this is your first time using the Okta APIs, read [Get Started with the Okta REST APIs](/docs/reference/rest/) first.

1. In Postman, select the request that you want to make, such as a `GET` request to the `/api/v1/users` endpoint to get back a list of all users.
2. On the **Header** tab, remove the existing SSWS Authorization API Key.
3. Click the **Authorization** tab and from the **Auth Type** dropdown list, select **OAuth 2.0**.
4. On the right pane, go to the **Configure New Token** section.
5. In the first field, enter a name for the token and select **Authorization Code (With PKCE)** as the grant type.
6. Define the remaining fields for the token request:

    * **Callback URL**: Define the callback location where Okta returns the token after the user finishes authenticating. This URL must match one of the redirect URIs that you configured in the [Create an OAuth 2.0 app in Okta](#create-an-oauth-2-0-app-in-okta) section.
    * **Auth URL**: Enter the authorization endpoint for your org authorization server, for example, `https://{yourOktaDomain}/oauth2/v1/authorize`.
    * **Access Token URL**: Enter the token endpoint for your org authorization server, for example, `https://{yourOktaDomain}/oauth2/v1/token`.
    * **Client ID**: Use the `client_id` of your Okta OAuth 2.0 app that you created in the [Create an OAuth 2.0 app in Okta](#create-an-oauth-2-0-app-in-okta) section.
    * **Client secret**: Use the `client_secret` of your Okta OAuth 2.0 app that you created in the [Create an OAuth 2.0 app in Okta](#create-an-oauth-2-0-app-in-okta) section.
    * **Code Challenge Method**: Leave the default of `SHA-256` selected.
    * **Code Verifier**: Leave it empty so that Postman generates its own.
    * **Scope**: Use `okta.users.read` for this example. Include the scopes that allow you to perform the actions on the endpoint that you want to access. Scopes requested for the access token must exist in the app's grants collection, and the user must have permission to perform those actions. See [Scopes and supported endpoints](#scopes-and-supported-endpoints).
    * **State**: Use the default value or any alphanumeric value. The authorization server reflects this string when it redirects the browser back to the client. Your client can then verify the string to help prevent cross-site request forgery attacks.
    * **Client Authentication**: Set to **Send client credentials in body**.

7. Click **Get New Access Token**. You're prompted to sign in to your Okta org.
8. Sign in as the user that you assigned to the OIDC app in the [Create an OAuth 2.0 app in Okta](#create-an-oauth-20-app-in-okta) section. After you’re authenticated, the **Manage Access Tokens** window displays the access token, including the scopes requested. The token also automatically populates the **Available Token** dropdown list.
    > **Note:** The lifetime for this token is fixed at one hour.
9. Click **Use Token** at the top of the window to use this access token in your request to the `/users` endpoint.
10. Click **Send**. Since you requested `okta.users.read`, the response should contain an array of all the users associated with your app. This depends on the user's permissions.

## Scopes and supported endpoints

Every action on an endpoint that supports OAuth 2.0 requires a specific scope. Okta scopes have the following format: `okta.<resource name>.<operation>`. For example, you can have resources that are users, clients, or apps with `read` or `manage` operations. The `read` scope is used to read information about a resource. The `manage` scope is used to create a resource, manage a resource, or delete a resource.

Use the `okta.<resource>.read` scopes to perform GET API operations. Use the `okta.<resource>.manage` scopes to perform any GET operations and POST, PUT, and DELETE API operations. The self scopes (`okta.<resource>.<operation>.self`) only allow access to the user who authorized the token. These scopes are used to perform end user API operations.

You can access all the endpoints from the browser in cross-origin scenarios using the bearer token. You don't need to configure Trusted Origin. This is because OAuth for Okta APIs don't rely on cookies. These APIs use bearer tokens instead. See [Enable CORS](/docs/guides/enable-cors/).

See [OAuth 2.0 Scopes](https://developer.okta.com/docs/api/oauth2/) in our API Reference content for the list of supported scopes.

### Scope naming

The available scopes exist in a hierarchy, so that the `manage` scopes can do everything that the `read` scopes do, but more. Also, the `self` scopes only allow for access to the user who authorized the token. For example, a `GET` request to the `/users` endpoint with the `okta.users.read` scope returns all the users that the admin has access to. If the same request is sent with the `okta.users.read.self` scope, only the current user's account returns.

### Silent downscoping

The Okta [org authorization server](/docs/concepts/auth-servers/) returns all scopes that you request. It returns all requested scopes as long as the client app is permitted to use that scope (granted to the client app). It doesn't matter whether you have permissions for all the scopes that you request. If the scopes requested exist in the app's grants collection, those scopes are sent back in the access token. However, when you make requests to perform actions that you don't have permissions for, the token doesn't work, and you receive an error.

For example, if you're a Read Only Admin and request an access token that contains the `okta.authorizationServers.manage` scope and that scope exists in the client's grants collection, the access token returned contains that scope. However, the access token doesn't work when you try to modify an authorization server on `/api/v1/authorizationServers` because you lack the permissions.
