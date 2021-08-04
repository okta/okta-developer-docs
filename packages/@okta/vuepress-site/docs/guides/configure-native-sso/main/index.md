---
title: Configure SSO for Native apps
excerpt: Learn how to configure SSO for Native applications and understand the Native SSO flow
layout: Guides
---

<ApiLifecycle access="ea" /><br>

## Overview

Native SSO allows you to protect native OpenID Connect applications, such as desktop apps and mobile apps, and achieve Single Sign-On (SSO) and Single Logout (SLO) between these applications. SSO between browser-based web applications is achieved by leveraging shared cookies. Unlike web applications, native applications can't use web cookies. Okta offers a token-based approach to achieve SSO between native applications.

This guide provides a high-level overview of the Native SSO feature in Okta and describes how to configure your org to use this feature. See [OpenID Connect & OAuth 2.0 API](/docs/reference/api/oidc/) for more information on the OAuth 2.0 and OpenID Connect endpoints.

If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).

# Before you begin

This guide assumes that you:

* Have an Okta Developer Edition organiztion. Don't have one? [Create one for free](https://developer.okta.com/signup).
* Have the Native SSO feature enabled for your org. From the left navigation pane in the Admin Console, go to **Settings** > **Features**, locate the Native SSO slider, and slide to enable.

## Native SSO flow

![Native SSO flow](/img/native_SSO_flow.png)

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

	![ID token and device secret use](/img/nativeSSO_flow2.png)

8. The authorization server returns a new set of refresh and access tokens specifically for Native app 2. This key part in the Native SSO flow enables a user to be automatically signed in without requiring any user action.

To use the Native SSO functionality, you need to:

* Set up your application
* Configure Native SSO for your Okta org
* Configure your client to participate in Native SSO
* Use Authorization Code with PKCE to obtain the authorization code for client 1
* Exchange the code for tokens
* Exchange existing tokens that are obtained from client 1 for a new set of tokens for client 2
* Validate the device secret
* Revoke the device secret to end a desktop session

This feature is based on the [OpenID Connect Native SSO for Mobile Apps](https://openid.net/specs/openid-connect-native-sso-1_0.html) draft specification.

## Set up your application

To configure Native SSO, start by setting up your application. To walk through this use case example, you need to set up two separate native applications to represent client 1 and client 2.

1. From the left navigation pane in the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. On the Create a new app integration page, select **OIDC - OpenID Connect** as the **Sign-in method** and then pick **Native Application** as the **Application type**. Click **Next**.
1. Fill in the details for your app integration, and then click **Save**.
1. On the **General** tab, click the **Copy to clipboard** icon for the **Client ID** and save the ID somewhere.

## Configure Native SSO for your Okta org

Configure Native SSO for your org by updating the authorization server policy rule to allow the token exchange grant. In this use case example, we are using the "default" Custom Authorization Server. Org Authorization Server is not supported with this feature.

1. From the left navigation pane in the Admin Console, go to **Security** > **API** to view your authorization servers.
1. On the **Authorization Servers** tab, click the **edit** pencil icon for the "default" Custom Authorization Server.
1. On the **Scopes** tab, verify that `offline_access`, `device_sso`, and `openid` appear in the scopes table.
1. Ensure that an authorization server policy and a rule are set up to allow the scopes that you need. See [Create access policies](/docs/guides/customize-authz-server/create-access-policies/) and [Create rules for each access policy](/docs/guides/customize-authz-server/create-rules-for-policy/).
1. Use the following API requests to update the policy rule to allow the token exchange grant.

> **Note:** At this time, you must use the API to update the policy rule.

### Obtain the policy ID

Make a request to obtain the policy ID for the policy that you just created in the "Configure Native SSO for your Okta org" section. In this example, we are using the "default" Custom Authorization Server, so the `{authorizationServerID}` is `default`.

**Request example**

```bash
  curl --location --request GET 'https://${yourOktaDomain}/api/v1/authorizationServers/default/policies' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: SSWS {apiKey}' \
```

In the response, locate the "id" for the policy that you created in the "Configure Native SSO for your Okta org" section and save it somewhere.

### Obtain the rule ID

Make a request to obtain the rule ID of the policy that you just created in the "Configure Native SSO for your Okta org" section. In this use case example we are using the "default" Custom Authorization Server, so the `{authorizationServerID}` is `default`.

**Request example**

```bash
  curl --location --request GET 'https://${yourOktaDomain}/api/v1/authorizationServers/default/policies/{policyId}/rules' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: SSWS {apiKey}' \
```

In the response, locate the ID of the rule and save it somewhere.

### Get the current access policy rule

Use the `policyId` and `ruleId` that you obtained in the previous section to obtain the current access policy rule.

```bash
  curl --request GET \
  --url https://${yourOktaDomain}/api/v1/authorizationServers/default/policies/{policyId}/rules/{ruleId} \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'Authorization: SSWS {apiKey}'
```

### Add the token exchange grant type to the policy

Next, configure the token exchange grant type for the client that is using the API. You need to update the `grantTypes` property by including the value `urn:ietf:params:oauth:grant-type:token-exchange` so that the token exchange is an allowed grant type in the policy rule.

> **Note:** The `*` value in `scopes` means any scope is valid here.

**Update example**

```json
curl --location --request PUT
--url https://${yourOktaDomain}/api/v1/authorizationServers/default/policies/{policyId}/rules/{ruleId} \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: SSWS {apiKey}' \
-d '{
  "id": "{ruleId}",
  "status": "ACTIVE",
  "name": "allow token exchange",
  "priority": 1,
  "created": "2021-04-14T17:47:42.000Z",
  "lastUpdated": "2021-04-14T17:47:42.000Z",
  "system": false,
  "conditions": {
    "people": {
      "users": {
        "include": [],
        "exclude": []
      },
      "groups": {
        "include": [
          "EVERYONE"
        ],
        "exclude": []
      }
    },
    "grantTypes": {
      "include": [
        "implicit",
        "password",
        "client_credentials",
        "authorization_code",
        "urn:ietf:params:oauth:grant-type:token-exchange"
      ]
    },
    "scopes": {
      "include": [
        "*"
      ]
    }
  },
  "actions": {
    "token": {
      "accessTokenLifetimeMinutes": 60,
      "refreshTokenLifetimeMinutes": 0,
      "refreshTokenWindowMinutes": 10080
    }
  },
  "type": "RESOURCE_ACCESS"
}'
```

## Configure your client to participate in Native SSO

This is applicable for all clients participating in Native SSO (for example, client 1 and client 2). In this request, use the client ID for the client that you created in the "Set up the application" section. Copy the response that is returned from this request for use in the next step.

**Request example**

```bash
  curl --request GET \
  --url https://${yourOktaDomain}/oauth2/v1/clients/{clientId}' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'Authorization: SSWS {apiKey}'
```

### Update the client with the token exchange grant

In this request, update the client with the token exchange grant. Use the response from the last step to create your UPDATE request. You need to update the `grant_types` parameter by adding the value `urn:ietf:params:oauth:grant-type:token-exchange` so that the token exchange is an allowed grant type for the client.

> **Note:** All clients that want to leverage Native SSO and SLO must be configured with this grant type.

```json
  curl --location --request PUT \
  --url https://${yourOktaDomain}/oauth2/v1/clients/{clientId} \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'Authorization: SSWS <apiKey>' \
  -d '{
      "client_id": "{clientId}",
      "client_id_issued_at": 1618351934,
      "client_name": "Target Client",
      "client_uri": null,
      "logo_uri": null,
      "redirect_uris": [
        "yourApp:/callback"
      ],
      "post_logout_redirect_uris": [
        "yourApp:/logout/callback"
      ],
      "response_types": [
         "code"
      ],
      "grant_types": [
          "authorization_code",
          "refresh_token",
          "urn:ietf:params:oauth:grant-type:token-exchange"
      ],
      "token_endpoint_auth_method": "none",
      "application_type": "native"
    }'
```

## Native SSO desktop session lifetime

The device secret assumes the lifetime of the first refresh token that it was minted with. The device secret has the same idle time and maximum time as the refresh token according to the authorization server policy through which it was minted. From there, the device secret and refresh token idle lifetimes are independent of each other.

Other refresh tokens (and other tokens) that are minted by using the device secret are mandated by the authorization server policy through which these tokens are generated. Whenever a device secret is used to generate a new set of tokens, the device secret's idle lifetime or the maximum lifetime is still governed by the original authorization server policy through which the device secret was minted, and it is updated accordingly.

To generate a new set of tokens:

* Use Auth Code with PKCE to obtain the authorization code for the first client.
* Exchange the code for tokens.
* Exchange the existing tokens from client 1 for new tokens for client 2.

In this example, you want to SSO to multiple apps that are created by the same company. Each client represents one app, and you can register multiple clients for SSO. When a user signs in to one app, all the other apps that are registered are also automatically signed in.

### Use Authorization Code with PKCE to obtain the authorization code for client 1

Provide the `device_sso`, `openid`, and `offline_access` scopes in the first request to the `/authorize` endpoint using the Authorization Code with PKCE flow. See [Use the Authorization Code flow with PKCE](/docs/guides/implement-auth-code-pkce/use-flow/) for information on the parameters that are being passed in this request.

**Example Authorization Code with PKCE request**

```
  https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id={clientId}&response_type=code&scope=openid device_sso offline_access&redirect_uri={configuredRedirectUri}&state=state-8600b31f-52d1-4dca-987c-386e3d8967e9&code_challenge_method=S256&code_challenge=qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es
```

The user is prompted to provide their credentials. After the authorization server verifies those credentials, the authorization code is sent to the `redirect_uri` that you specified. The following is an example of the authorization code returned.

**Example response**

```
  https://{configured_redirect_uri}/?code=S_NuB0TNeDMXD_5SKZO6FuXFOi_J9XB-sHAk0Dc0txQ&state=state-8600b31f-52d1-4dca-987c-386e3d8967e9
```

### Exchange the code for tokens

To exchange the authorization code for tokens, pass the code to your authorization server's `/token` endpoint along with the `code_verifier` that was generated. See [Exchange the code for tokens](/docs/guides/implement-auth-code-pkce/exchange-code-token/) for information on the parameters that are being passed in this request.

**Example request**

```bash
curl --location --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=authorization_code&client_id={clientId}&redirect_uri=yourApp%3A%2Fcallback&code=CKA9Utz2GkWlsrmnqehz&code_verifier=M25iVXpKU3puUjFaYWg3T1NDTDQtcW1ROUY5YXlwalNoc0hhakxifmZHag'
```

**Example response**

The authorization server response includes the `device_secret`, as well as the `id_token`, `access_token`, and `refresh_token`:

```json
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJra....3pcxrrhSAw",
    "scope": "offline_access openid device_sso",
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
  curl --location --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'client_id={client #2 id}' \
  --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:token-exchange' \
  --data-urlencode 'actor_token={device_secret}' \
  --data-urlencode 'actor_token_type=urn:x-oath:params:oauth:token-type:device-secret' \
  --data-urlencode 'subject_token={id_token}' \
  --data-urlencode 'subject_token_type=urn:ietf:params:oauth:token-type:id_token' \
  --data-urlencode 'scope=openid offline_access' \
  --data-urlencode 'audience={audience}'
```

Note the parameters that are being passed:

* `client_id`: Identifies the new client (for example, client #2) and matches the Client ID of the OAuth 2.0 application that you created.
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
    "scope": "offline_access openid device_sso",
    "refresh_token": "dd1LXWH5qug6tHAZDhYBOHbqg5TxxbXvwpsIR5qjZRw",
    "id_token": "eyJraWQiOiJZQ...woMh1u6jHMQTI0fA",
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
  --data-urlencode 'client_id={client #1 id}' \
  --data-urlencode 'token={device_secret}' \
  --data-urlencode 'token_type_hint=device_secret'
```

**Example introspect response**

```json
{
    "active": true,
    "sid": "102oRgEWx5lRTWHilEoGfed4w",
    "token_type": "urn:x-oath:params:oauth:token-type:device-secret"
}
```

The `/introspect` endpoint returns the `sid` that the device secret is tied to. The same value is present in the ID token. By doing this, you can correlate and identify the ID tokens that are minted with the same device secret.

## Revoke the device secret to end a desktop session

Sometimes you have to end a user's desktop session. When you do that, you are signing the user out of one app as well as all of the other registered apps. To end a desktop session, you must revoke the device secret. The revoke request signs the user out from all of the apps that are a part of the Native SSO flow.

**Example request**

```bash
curl --location --request POST \
--url https://${yourOktaDomain}/oauth2/default/v1/revoke \
--header 'Accept: application/json' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'token={device_secret}' \
--data-urlencode 'client_id={client #1 id}' \
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

When the user signs out of an application, the application sends a `/logout` request to the Okta Authorizataion Server, which revokes the device secret.

```bash
  curl --location --request GET `https://${yourOktaDomain}/oauth2/default/v1/logout` \
  --data-urlencode `id_token_hint={id_token}` \
  --data-urlencode `device_secret={device_secret}` \
  --data-urlencode `post_logout_redirect_uris=https%3A%2F%2Fclient1.example.${yourOktaDomain}%2Flogout` \
  --data-urlencode `state=2OwvFrEMTJg` \
```

The Authorization Server invalidates the access and refresh tokens that are issued for the `sid` and `device_secret`. If the invalidated refresh token is used to renew tokens, the request fails.

Okta returns a response to the `post_logout_redirect_uri`.

```bash
  https://{configured_post_logout_redirect_uri}/logout&state=2OwvFrEMTJg
```
