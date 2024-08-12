---
title: Refresh access tokens and rotate refresh tokens
excerpt: How to refresh access tokens and rotate refresh tokens with Okta
layout: Guides
---

This guide explains what refresh tokens are and how to configure your app to use refresh tokens. The guide also covers how to refresh access tokens and how to configure and use refresh token rotation.

---

#### Learning outcomes

* Understand the refresh token benefits and risks.
* Configure a refresh token for your app.
* Refresh access tokens.
* Understand how to set up refresh token rotation.
* Use refresh token rotation.

---

## About refresh tokens

Access and ID [tokens](/docs/reference/api/oidc/#tokens-and-claims) are JSON web tokens that are valid for a specific number of seconds. A user needs a new access token when they attempt to access a resource for the first time. The user also needs a new access token after the previously granted access token expires.

A refresh token is a special token that is used to obtain more access tokens. This allows you to have short-lived access tokens without having to collect credentials every time one expires. You request a refresh token alongside the access and/or ID tokens as part of a user's initial authentication and authorization flow. Apps must then securely store refresh tokens since they allow users to remain authenticated.

### Persistent token benefits

For clients such as mobile apps, persistent refresh tokens help improve a user's authentication experience. For example, persistent tokens allow users to access streaming video services on their smart TVs without signing in after they complete the initial device authorization.

Whether Okta returns a new refresh token with a new access token depends on the [refresh token lifetime](#refresh-token-lifetime) setting. If the lifetime setting hasn't expired, when a client makes a request for a new access token, Okta only returns the new access token. After the lifetime setting expires, Okta returns a new refresh token and a new access token.

> **Note:** See [Token lifetime](/docs/reference/api/oidc/#token-lifetime) for more information on hard-coded and configurable token lifetimes.

### Persistent token risk

Public clients such as browser-based apps have a higher risk of a refresh token being compromised when a persistent refresh token is used. Long-lived refresh tokens aren't suitable for clients such as single-page apps (SPAs). This is because there isn't a way to safely store persistent refresh tokens in a browser and assure access by only the intended app.

These threats are greatly reduced by rotating refresh tokens. [Refresh token rotation](#refresh-token-rotation) helps a public client to securely rotate refresh tokens after each use. Refresh token rotation works with SPAs, mobile apps, and web apps in Okta.

Whether Okta returns a new refresh token with a new access token depends on the [refresh token lifetime](#refresh-token-lifetime) setting. If the lifetime setting hasn't expired, when a client makes a request for a new access token, Okta only returns the new access token. After the lifetime setting expires, Okta returns a new refresh token and a new access token.

## Set up your app

Refresh tokens are available for a subset of Okta OAuth 2.0 client apps, specifically web, single-page, and mobile apps. See our [OAuth 2.0 and OIDC overview](/docs/concepts/oauth-openid/#recommended-flow-by-application-type) for more about creating an OpenID Connect app.

Be sure to specify `refresh_token` as a `data_type` value for the `grant_type` parameter when adding an [OAuth client app](/docs/reference/api/apps/#add-oauth-2-0-client-application) using the `/apps` API.

If you're using the Admin Console to create an app, select **Refresh Token** as a **Grant type** in the **General Settings** section.

If you want to update an existing app to use refresh tokens in the Admin Console, do the following:

1. Open your app and click **Edit** in the **General Settings** section.
2. Select **Refresh Token** as a grant type and click **Save**.

## Refresh token rotation

Refresh token rotation helps a public client to securely rotate refresh tokens after each use. Whether Okta returns a new refresh token with a new access token depends on the [refresh token lifetime](#refresh-token-lifetime) setting. If the lifetime setting hasn't expired, when a client makes a request for a new access token, Okta only returns the new access token. After the lifetime setting expires, Okta returns a new refresh token and a new access token.

### Refresh token reuse detection

When a client wants to renew an access token, it sends the refresh token with the access token request to the `/token` endpoint. Okta validates the incoming refresh token and issues a new set of tokens. When the new tokens are issued, Okta invalidates the refresh token that was passed with the initial request to the `/token` endpoint.

If a previously used refresh token is used again with the token request, the authorization server automatically detects the attempted reuse of the refresh token. As a result, Okta immediately invalidates the most recently issued refresh token and all access tokens issued since the user authenticated. This protects your app from token compromise and replay attacks.

#### System Log events

Okta fires the following System Log [events](/docs/reference/api/event-types/) when token reuse is detected:

* `app.oauth2.as.token.detect_reuse` for [custom authorization servers](/docs/concepts/auth-servers/#custom-authorization-server)
* `app.oauth2.token.detect_reuse` for the [org authorization server](/docs/concepts/auth-servers/#org-authorization-server)

### Grace period for token rotation

Token reuse detection can sometimes impact the user experience. For example, when users with poor network connections access apps, new tokens issued by Okta might not reach the client app. As a result, the client might want to reuse the refresh token to get new tokens from Okta.

Okta offers a grace period when you [configure refresh token rotation](#enable-refresh-token-rotation). After the refresh token is rotated, the previous token remains valid for the configured amount of time to allow clients to get the new token.

### Enable refresh token rotation

Use the following steps to enable refresh token rotation for your app in the Admin Console.

>**Note:** Rotating refresh token behavior is the default for SPAs when you create or edit a SPA.

To update **existing** OpenID Connect apps to use refresh token rotation:

1. Sign in to your Okta organization with your administrator account.
1. In the Admin Console, go to **Applications** > **Applications**.
1. Select the app integration that you want to configure.
1. On the **General** tab, click **Edit** in the **General Settings** section.
1. In the **Grant type** section, select **Refresh Token**.
1. In the **Refresh Token** section, select **Rotate token after every use**.

    The default number of seconds for the **Grace period for token rotation** is set to 30 seconds. You can change the value to any number from 0 through 60 seconds. After the refresh token is rotated, the previous token remains valid for this amount of time to allow clients to get the new token.
1. Click **Save** to confirm your changes.

When you create a mobile or web app and want to use refresh token rotation:

1. Sign in to your Okta organization with your administrator account.
1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration** and select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select the type of app that you want to create, and then click **Next**.
1. In the **Grant type** section, select **Refresh Token**.
1. Select **Allow everyone in your organization to access** in the **Assignments** section, and then click **Save**.
1. In the **General Settings** section, click **Edit**.
1. In the **Refresh Token** section, select **Rotate token after every use**.

    The default number of seconds for the **Grace period for token rotation** is set to 30 seconds. You can change the value to any number from 0 through 60 seconds. After the refresh token is rotated, the previous token remains valid for this amount of time to allow clients to get the new token.
1. Click **Save** to confirm your changes.

> **Note:** When a refresh token is rotated, the new `refresh_token` string in the response has a different value than the previous `refresh_token` string due to security concerns with single-page apps. However, the expiration date remains the same. The lifetime is inherited from the initial refresh token minted when the user first authenticates.

#### Refresh token rotation properties

After you enable refresh token rotation, the `refresh_token` property appears within `settings.oauthClient` for your app. The `refresh_token` property is an object that contains the `rotation_type` and `leeway` properties. Accepted values for `rotation_type` are `ROTATE` or `STATIC`. The accepted value for `leeway` is any number from 0 through 60.

```json
"refresh_token": {
    "rotation_type": "ROTATE",
    "leeway": 30
}
```

> **Note:** A leeway of `0` doesn't necessarily mean that the previous token is immediately invalidated. The previous token is invalidated after the new token is generated and returned in the response.

See [Refresh token object](/docs/reference/api/apps/#refresh-token-object).

### Refresh token lifetime

Refresh token lifetimes are managed through the [access policy](/docs/guides/configure-access-policy/) of the authorization server. The default value for the refresh token lifetime (`refreshTokenLifetimeMinutes`) in the [actions object](/docs/reference/api/authorization-servers/#actions-object) is **Unlimited**. The refresh token lifetime does expire every seven days if it hasn't been used. When you use a refresh token with a SPA, make sure that you keep a short lifetime setting for better security.

## Get a refresh token

To get a refresh token, you send a request to your Okta authorization server.

The only grant type flows that support refresh tokens are the Authorization Code flow and the Resource Owner Password flow. This means that the following combinations of grant type and scope, when sent to the `/token` endpoint, return a refresh token:

> **Note:** The maximum length for the scope parameter value is 4096 characters.

| Grant Type           | Scope                       |
| -----------          | -----                       |
| `authorization_code` | `offline_access` (see Notes)|
| `refresh_token`      | `offline_access`            |
| `password`           | `offline_access`            |

> **Notes:** The Authorization Code flow is unique. The `offline_access` scope must be requested as part of the code request to the `/authorize` endpoint, not the request sent to the `/token` endpoint.
>
> Whether persistent refresh token or rotating refresh token behavior is enabled depends on what type of app that you're using. When you select **Refresh Token** as an allowed grant type, [SPAs use refresh token rotation](#renew-access-and-id-tokens-with-spas) as the default behavior. Mobile apps and web apps use persistent refresh token behavior as the default. See [Refresh token rotation](#refresh-token-rotation).

### Get a refresh token with the code flow

In the case of the Authorization Code flow, you use the authorization server's `/authorize` endpoint to get an Authorization Code, specifying an `offline_access` scope. You then use the `authorization_code` grant with this code in a request to the `/token` endpoint to get an access token and a refresh token.

See [Obtain an authorization grant from a User](/docs/reference/api/oidc/#authorize) and [Implementing the Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/) for more information on the `/authorize` endpoint and the Authorization Code flow.

#### Example request for an Authorization Code and refresh token

The following is an example request to the `/authorize` endpoint for an [Authorization Code](/docs/guides/implement-grant-type/authcode/main/) flow and includes the `offline_access` scope.

```bash
curl -x GET https://{yourOktaDomain}/oauth2/v1/authorize
?client_id={clientId}
&response_type=code
&scope=openid%20offline_access
&redirect_uri=ourApp%3A%2Fcallback
&state=237c671a-29d7-11eb-adc1-0242ac120002
```

The following is an example request to the `/authorize` endpoint for an [Authorization Code with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/#request-an-authorization-code) flow and includes the `offline_access` scope.

```bash
curl -x GET https://{yourOktaDomain}/oauth2/v1/authorize
?client_id={clientId}
&response_type=code
&scope=openid%20offline_access
&redirect_uri=yourApp%3A%2Fcallback
&state=4ff7dcc0-29d7-11eb-adc1-0242ac120002
&code_challenge_method=S256
&code_challenge=qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es
```

#### Example request

The following is an example request to the `/token` endpoint to obtain an access token, an ID token (by including the `openid` scope), and a refresh token for the [Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/). The value for `code` is the Authorization Code that you receive in the response from the request to the `/authorize` endpoint.

```bash
curl --location --request POST 'https://{yourOktaDomain}/oauth2/v1/token' \
-H 'Accept: application/json' \
-H 'Authorization: Basic {Base64({clientId}:{clientSecret})}' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'grant_type=authorization_code' \
-d 'redirect_uri={redirectUri}' \
-d 'code=iyz1Lpim4NgN6gDQdT1a9PJDVTaCdxG1wJMYiUkfGts' \
-d 'state=9606b31k-51d1-4dca-987c-346e3d8767n9' \
-d 'scope=openid offline_access'
```

The following is an example request to the `/token` endpoint to obtain an access token, an ID token (by including the `openid` scope), and a refresh token for the [Authorization Code with PKCE flow](/docs/guides/implement-grant-type/authcodepkce/main/#exchange-the-code-for-tokens). The value for `code` is the code that you receive in the response from the request to the `/authorize` endpoint.

```bash
curl --location --request POST 'https://{yourOktaDomain}/oauth2/v1/token' \
-H 'Accept: application/json' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'grant_type=authorization_code' \
-d 'redirect_uri={redirectUri}' \
-d 'code=iyz1Lpim4NgN6gDQdT1a9PJDVTaCdxG1wJMYiUkfGts' \
-d 'client_id={clientId}' \
-d 'code_verifier=M25iVXpKU3puUjFjYWg3T1NDTDQtcW1rOUY5YXlwalNoc0hhaoxifmZHag'
```

#### Example response

> **Note:** The access and ID tokens are truncated for brevity.

```json
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQ.....rm8EA4osYg",
    "scope": "offline_access openid",
    "refresh_token": "i6mapTIAVSp2oJkgUnCACKKfZxt_H5MBLiqcybBBd04",
    "id_token": "eyJraWQiOiJ.....XAn3ty6o-yeA"
}
```

### Get a refresh token with the Resource Owner Password flow

For the Resource Owner Password flow, you use the authorization server's `/token` endpoint directly.

See [Request a token](/docs/reference/api/oidc/#token) and [Implementing the Resource Owner Password flow](/docs/guides/implement-grant-type/ropassword/main/) for more information on the `/token` endpoint and the Resource Owner Password flow.

#### Example request

With the `password` grant type, you can include an `openid` scope alongside the `offline_access` scope to also get back an ID token.

```bash
curl --location --request POST 'https://{yourOktaDomain}/oauth2/v1/token' \
-H 'Accept: application/json' \
-H 'Authorization: Basic {Base64({clientId}:{clientSecret})}' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'grant_type=password' \
-d 'redirect_uri={redirectUri}' \
-d 'username=example@mailinator.com' \
-d 'password=a.gReAt.pasSword' \
-d 'scope=openid offline_access'
```

#### Example response

You would then get back an ID token and your access and refresh tokens. See the [Okta OAuth 2.0 reference page](/docs/reference/api/oidc/#response-properties).

> **Note:** The access and ID tokens are truncated for brevity.

```json
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQi.....T2aA5ottg",
    "scope": "offline_access openid",
    "refresh_token": "cBMrwDsXRwPqVmCQx7I5IX0jQ9-Lc_zHOgYeab1xZm4",
    "id_token": "eyJra.....ezAriw"
}
```

### Renew access and ID tokens with SPAs

With a SPA, it's undesirable to redirect the user to a sign-in page during normal navigation. To avoid this disruptive redirection, the `/authorize` endpoint allows the use of a request parameter called `prompt`.

If the value of the `prompt` parameter is `none`, this guarantees that the user isn't prompted to sign in, regardless of whether they have an active session. Instead, your app either silently obtains the requested tokens or an OAuth error response occurs. Before [refresh token rotation](#refresh-token-rotation) was available, the `prompt` parameter was the only way for a SPA to maintain user sessions without prompting the user to sign in multiple times.

The introduction of browser privacy controls such as Intelligent Tracking Prevention (ITP) and Enhanced Tracking Prevention (ETP) affect how browsers handle third-party cookies. These browser privacy controls prevent the use of an Okta session cookie to silently renew user sessions. This forces users to reauthenticate and takes away the seamless user experience.

Refresh token rotation provides a solution for SPAs to maintain user sessions in an ITP browser world. Because refresh tokens are independent of any cookies, you don't have to rely on an Okta session cookie to renew access and ID tokens.

> **Note:** You can still use the Okta session cookie and silently renew the tokens as long as the app and Okta are in the same domain.

## Use a refresh token

To refresh your access token and an ID token, you send a token request with a `grant_type` of `refresh_token`. Be sure to include the `openid` scope when you want to refresh the ID token.

```bash
http --form POST https://{yourOktaDomain}/oauth2/v1/token \
  accept:application/json \
  authorization:'Basic MG9hYmg3M...' \
  cache-control:no-cache \
  content-type:application/x-www-form-urlencoded \
  grant_type=refresh_token \
  redirect_uri=http://localhost:8080 \
  scope=offline_access%20openid \
  refresh_token=MIOf-U1zQbyfa3MUfJHhvnUqIut9ClH0xjlDXGJAyqo
```

If the refresh token is valid, then you get back a new access token, a new ID token, and the refresh token. Whether that refresh token is the same one sent in the request or is a new refresh token depends on:

* [Refresh token rotation](#refresh-token-rotation) enabled for the client
* The configured [refresh token lifetime](/docs/reference/api/authorization-servers/#actions-object) in the access policy. See [Refresh token reuse detection](/docs/guides/refresh-tokens/main/#refresh-token-reuse-detection).

> **Note:** The access and ID tokens are truncated for brevity.

```json
{
    "access_token": "eyJhbGciOiJ[...]K1Sun9bA",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "offline_access%20openid",
    "refresh_token": "MIOf-U1zQbyfa3MUfJHhvnUqIut9ClH0xjlDXGJAyqo",
    "id_token": "eyJraWQiO[...]hMEJQX6WRQ"
}
```

## See also

Read more about the SDKs that support refresh token rotation and reuse detection:

* [Okta Auth SDK Guide - JavaScript](/docs/guides/auth-js/main/)
* [Okta Sign-In Widget Guide - JavaScript](/docs/guides/embedded-siw/main/)
* [Okta Sign-In Widget and Angular](/docs/guides/sign-in-to-spa-embedded-widget/angular/main/)
* [Okta Auth JS and Angular](/docs/guides/sign-in-to-spa-authjs/angular/main/)
* [Okta Sign-In Widget and React](/docs/guides/sign-in-to-spa-embedded-widget/react/main/)
* [Okta Auth JS and React](/docs/guides/sign-in-to-spa-authjs/react/main/)
* [Okta Sign-In Widget and Vue](/docs/guides/sign-in-to-spa-embedded-widget/vue/main/)
* [Okta Auth JS and Vue](/docs/guides/sign-in-to-spa-authjs/vue/main/)
