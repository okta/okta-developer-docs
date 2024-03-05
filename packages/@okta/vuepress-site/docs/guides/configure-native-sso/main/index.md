---
title: Configure SSO for Native apps
excerpt: Learn how to configure SSO for Native applications and understand the Native SSO flow
layout: Guides
---

This guide provides a high-level overview of the Native SSO feature in Okta. It also provides a use case example of how to configure your org to use this feature.

---

**Learning outcomes**

* Understand the Native SSO flow.
* Set up your native application.
* Update the authorization server policy rule to allow the token exchange grant.
* Understand the device secret and refresh token idle lifetimes.
* Verify that the device secret is valid.
* End a desktop session by revoking the device secret.
* Use the `/logout` request to revoke the device secret.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Native SSO feature enabled for your org](#before-you-begin)

---

## About the Native SSO feature

Native SSO allows you to protect native OpenID Connect applications, such as desktop apps and mobile apps, and achieve Single Sign-On (SSO) and Single Logout (SLO) between these applications. SSO between browser-based web applications is achieved by sharing cookies. Unlike web applications, native applications can't use web cookies. Okta offers a token-based approach to achieve SSO between native applications. See [OpenID Connect & OAuth 2.0 API](/docs/reference/api/oidc/) for more information on the OAuth 2.0 and OpenID Connect endpoints.

## Before you begin

This guide assumes that you have an Okta Developer Edition organization. Don't have one? [Create one for free](https://developer.okta.com/signup).

## Native SSO flow

<div class="three-quarter">

![A flow diagram showing the interactions in a single sign-in flow between two native applications, a user on a browser, and Okta](/img/sso/native_SSO_flow.png)

<!--
  Image source: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4349%3A10337&mode=design&t=Zl0pQHW1kqZli8ZO-1  native_SSO_flow
-->

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true

participant "Native App #1" as app1
participant "Native App #2" as app2
participant "Browser" as browser
participant "Authorization Server (Okta)" as okta

app1 -> browser: Start authorization flow
browser -> okta: 1. Send request to /authorize with `device_sso` scope
okta -> browser: 2. Prompts the user to authenticate
browser -> okta: 3. Enter credentials to authorize and provide consent
okta -> app1: 4. Returns the authorization code
app1 -> okta: 5. Send the authorization code in the request for tokens
okta -> app1: 6. Returns `id_token`, `refresh_token`, `access_token`, and `device_secret`
app2 -> okta: 7. Request for an `access_token` and `refresh_token`
okta -> app2: 8. Returns an `access_token` and `refresh_token`

-->

1. Native app 1 starts by redirecting the user's browser to the [authorization server](/docs/concepts/auth-servers/) `/authorize` endpoint and requests the `device_sso` scope.
1. The user is prompted to authenticate.
1. The user enters their credentials to allow the application to access resources protected by scopes.
1. The authorization server returns the authorization code for Native app 1.
1. The client exchanges the authorization code for tokens.
1. The authorization server returns the tokens (`id_token`, `refresh_token`, and `access_token`) and the `device_secret` in the response.
1. Native app 2 makes a request for a `refresh_token` and `access_token`. The request contains the `id_token` and the `device_secret`.

	 Native app 2, and any other client that participates in the Native SSO flow, can use the `id_token` and the `device_secret` obtained from the initial client that authenticated (see the following diagram). To sign in automatically, the clients can use the `id_token` and `device_secret` and exchange them for tokens by making a `/token` request.

   <div class="three-quarter">

	 ![ID token and device secret use](/img/sso/nativeSSO_flow2.png)

   </div>

8. The authorization server returns a new set of refresh and access tokens specifically for Native app 2. This key part in the Native SSO flow enables a user to be automatically signed in without requiring any user action.

To use the Native SSO functionality, you need to:

* Set up your application
* Configure Native SSO for your Okta org
* Use Authorization Code with PKCE to obtain the authorization code for client 1
* Exchange the code for tokens
* Exchange existing tokens that are obtained from client 1 for a new set of tokens for client 2
* Validate the device secret
* Revoke the device secret to end the session

This feature is based on the [OpenID Connect Native SSO for Mobile Apps](https://openid.net/specs/openid-connect-native-sso-1_0.html) draft specification.

## Set up your application

To configure Native SSO, start by setting up your application. To walk through this use case example, you need to set up two separate native applications to represent client 1 and client 2.

1. From the left navigation pane in the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. On the Create a new app integration page, select **OIDC - OpenID Connect** as the **Sign-in method** and choose **Native Application** as the **Application type**. Click **Next**.
1. Enter a name for your new app integration.
1. Click **Advanced** in the **Grant type** section, and then select **Token Exchange**.
    **Note**: If you're using Okta Classic Engine, select **Token Exchange** in the **Grant type** section.
1. In this example, we are granting everyone access to the application. In the **Assignments** section, select **Allow everyone in your organization to access**. Click **Save**.
1. On the **General** tab, click the **Copy to clipboard** icon for the **Client ID** and save the ID somewhere.
1. Repeat the steps for client 2.

## Configure Native SSO for your Okta org

Configure Native SSO for your org by updating the authorization server policy rule to allow the token exchange grant. In this example, we are using the "default" custom authorization server. The org authorization server isn't supported.

> **Note:** You must have an authorization server policy and a rule set up to allow the scopes that you need. See [Create access policies](/docs/guides/customize-authz-server/main/#create-access-policies) and [Create rules for each access policy](/docs/guides/customize-authz-server/main/#create-rules-for-each-access-policy).

To update the authorization server policy rule:

1. From the left navigation pane in the Admin Console, go to **Security** > **API** to view your authorization servers.
1. On the **Authorization Servers** tab, click the pencil icon for the "default" custom authorization server.
1. On the **Scopes** tab, verify that `offline_access`, `device_sso`, and `openid` appear in the scopes table.
1. Select the **Access Policies** tab and click the pencil for the Default Policy Rule to access the **Edit Rule** dialog.
1. Select **Advanced** in the **IF Grant type is** section, and then select **Token Exchange**.

  **Note**: If you're using Okta Classic Engine, select **Token Exchange** in the **IF Grant type is** section.

1. Click **Update Rule**

## Native SSO desktop session lifetime

The device secret assumes the lifetime of the first refresh token that it was minted with. The device secret has the same idle time and maximum time as the refresh token according to the authorization server policy through which it was minted. From there, the device secret and refresh token idle lifetimes are independent of each other.

Other refresh tokens (and other tokens) that are minted by using the device secret are mandated by the authorization server policy through which these tokens are generated. Whenever a device secret is used to generate a new set of tokens, the device secret's idle lifetime or the maximum lifetime is still governed by the original authorization server policy through which the device secret was minted, and it is updated accordingly.

To generate a new set of tokens:

* Use Authorization Code flow with PKCE to obtain the authorization code for the first client.
* Exchange the code for tokens.
* Exchange the existing tokens from client 1 for new tokens for client 2.

In this example, you want to SSO to multiple apps that are created by the same company. Each client represents one app, and you can register multiple clients for SSO. When a user signs in to one app, all the other apps that are registered are also automatically signed in.

> **Note:** Performing Native SSO token exchange with an application that has a low assurance policy configured and another application that has a high assurance policy results in an error.

### Use Authorization Code with PKCE to obtain the authorization code for client 1

Provide the `device_sso`, `openid`, and `offline_access` scopes in the first request to the `/authorize` endpoint using the Authorization Code with PKCE flow. All three scopes are required in the request. You must use `device_sso` with `openid` and `offline_access`. See [Authorization Code flow with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/#flow-specifics) for information on the parameters that are being passed in this request.

**Example Authorization Code flow with PKCE request**

```
  https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id=${clientId}&response_type=code&scope=openid device_sso offline_access&redirect_uri=${configuredRedirectUri}&state=state-8600b31f-52d1-4dca-987c-386e3d8967e9&code_challenge_method=S256&code_challenge=qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es
```

The user is prompted to provide their credentials. After the authorization server verifies those credentials, the authorization code is sent to the `redirect_uri` that you specified. The following is an example of the authorization code returned.

**Example response**

```
  https://${configuredRedirectUri}/?code=S_NuB0TNeDMXD_5SKZO6FuXFOi_J9XB-sHAk0Dc0txQ&state=state-8600b31f-52d1-4dca-987c-386e3d8967e9
```

### Exchange the code for tokens

To exchange the authorization code for tokens, pass the code to your authorization server's `/token` endpoint along with the `code_verifier` that was generated. See [Exchange the code for tokens](/docs/guides/implement-grant-type/authcodepkce/main/#flow-specifics) for information on the parameters that are being passed in this request.

**Example request**

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data-urlencode 'grant_type=authorization_code' \
  --data-urlencode 'client_id=${clientId}' \
  --data-urlencode 'redirect_uri=${configuredRedirectUri}' \
  --data-urlencode 'code=CKA9Utz2GkWlsrmnqehz' \
  --data-urlencode 'code_verifier=M25iVXpKU3puUjFaYWg3T1NDTDQtcW1ROUY5YXlwalNoc0hhakxifmZHag'
```

**Example response**

The authorization server response includes the `device_secret`, as well as the `id_token`, `access_token`, and `refresh_token`:

```json
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJra....3pcxrrhSAw",
    "scope": "openid device_sso offline_access",
    "refresh_token": "FOxRzDPAGtOapDzap-rNBOSWznClz3p-zypbZ157W6c",
    "id_token": "eyJraWQiOi....VQT8GGmg",
    "device_secret": "+oUXe6pnhkDOTTjR5ZGFQoZGVBrQPiDsUWIk27ioyhM="
}
```

> **Note:** Store the `device_secret` in a secure location on the device, such as the iOS keychain. Ensure that only authorized applications have access to the device secret.

### Exchange existing tokens from client 1 for new tokens for client 2

Client 2 makes a token exchange request, and the response returns the tokens applicable for client 2.

**Example request**

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'client_id=${client 2 ID}' \
  --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:token-exchange' \
  --data-urlencode 'actor_token=${deviceSecret}' \
  --data-urlencode 'actor_token_type=urn:x-oath:params:oauth:token-type:device-secret' \
  --data-urlencode 'subject_token=${idToken}' \
  --data-urlencode 'subject_token_type=urn:ietf:params:oauth:token-type:id_token' \
  --data-urlencode 'scope=openid offline_access' \
  --data-urlencode 'audience=${audience}'
```

Note the parameters that are being passed:

* `client_id`: Identifies the new client (for example, client 2) and matches the Client ID of the OAuth 2.0 application that you created.
* `grant_type`: Identifies the mechanism that Okta uses to authorize the creation of the tokens. Value: `urn:ietf:params:oauth:grant-type:token-exchange`
* `actor_token`: Identifies the `device_secret` that was returned in response to the authorization code request.
* `actor_token_type`: Identifies the type of token in the `actor_token` parameter.
* `subject_token`: Identifies the `id_token` that was returned in response to the authorization code request.
* `subject_token_type`: Identifies the type of token in the `subject_token` parameter. Value: `urn:ietf:params:oauth:token-type:id_token`
* `scope`: The scopes that you want to be included in the access token.
* `audience`: Identifies the audience of the authorization server. Locate the value for the `audience` parameter in the Admin Console. From the left navigation pane, select **Security** > **API**. On the **Authorization Server** tab, select the pencil icon for the authorization server that you need the `audience` value for.

If the request is successful, the response returned includes the following tokens: `id_token`, `refresh_token`, and `access token`.

> **Note:** You can pass an expired ID token as part of the token exchange grant as long as the `device_secret` (`sid`) that the `id_token` is associated with is still valid.

**Example response**

```JSON
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJZQ...VNL3SttonAlV4NYMQ",
    "scope": "openid offline_access",
    "refresh_token": "dd1LXWH5qug6tHAZDhYBOHbqg5TxxbXvwpsIR5qjZRw",
    "id_token": "eyJraWQiOiJZQ...woMh1u6jHMQTI0fA"
}
```

## Validate the device secret

Occasionally you may want to verify that the device secret is still valid by using the `/introspect` endpoint.

**Example introspect request**

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/introspect \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'client_id=${client 1 ID}' \
  --data-urlencode 'token=${deviceSecret}' \
  --data-urlencode 'token_type_hint=device_secret'
```

**Example introspect response**

```json
{
    "active": true,
    "sid": "102oRgEWx5lRTWHilEoGfed4w",
    "token_type": "urn:x-oath:params:oauth:token-type:device-secret",
    "exp": 1628886628
}
```

The `/introspect` endpoint returns the `sid` that the device secret is tied to. The same value is present in the ID token. By doing this, you can correlate and identify the ID tokens that are minted with the same device secret.

## Revoke the device secret to end a desktop session

Sometimes you have to end a user's desktop session. When you do that, you’re signing the user out of every registered app. To end a desktop session, you must revoke the device secret. The revoke request signs the user out from all of the apps that are a part of the Native SSO flow.

**Example request**

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/revoke \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'token=${deviceSecret}' \
  --data-urlencode 'client_id=${client 1 ID}'
```

**Example response**

```
HTTP/1.1 200 OK
```

After you've revoked the device secret, the corresponding access and refresh tokens are invalidated for that device. You can verify that the revoke was successful by introspecting the device secret again for that client. You should receive the following response:

```json
{
    "active": false
}
```

To verify that the refresh and access tokens are also automatically invalidated for other clients, repeat the `/introspect` request for those tokens by using the corresponding client IDs.

## Request Logout

When the user signs out of an application, the application sends a `/logout` request to the Okta authorization server, which revokes the device secret.

```bash
curl --request GET \
  --url https://${yourOktaDomain}/oauth2/default/v1/logout?id_token_hint=${idToken}&device_secret=${deviceSecret}&post_logout_redirect_uris=${configuredPostLogoutRedirectUri}&state=2OwvFrEMTJg
```

The authorization server invalidates the access and refresh tokens that are issued for the `sid` and `device_secret`. If the invalidated refresh token is used to renew tokens, the request fails.

Okta returns a response to the `post_logout_redirect_uri`.

```bash
  https://${configuredPostLogoutRedirectUri}/?state=2OwvFrEMTJg
```
