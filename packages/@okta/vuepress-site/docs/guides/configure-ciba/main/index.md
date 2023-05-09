---
title: Transactional verification using CIBA
excerpt: How to implement transactional verification with CIBA and a custom authenticator
layout: Guides
---

<ApiLifecycle access="ie" /><br>

This guide explains how to build transactional verification using a Client-Initiated Backchannel Authentication (CIBA) grant and a custom-branded authenticator.

---

**Learning outcomes**

* Understand the OpenID Connect Client-Initiated Backchannel Authentication (CIBA) flow.
* Set up your OIDC client and an Okta authorization server to use the CIBA grant type.
* Implement the CIBA grant flow in Okta using an Okta custom authenticator.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* A configured [mobile app that verifies user identities for an Okta custom authenticator](/docs/guides/authenticators-custom-authenticator/ios/main/) and [responds to CIBA authorization challenges](https://github.com/okta/okta-devices-swift#enable-using-your-app-for-client-initiated-backchannel-authentication-ciba) sent by Okta in a backchannel request.
* A test user in your org that you can use for testing the CIBA flow with a custom authenticator.
* The CIBA feature enabled for your org. From the left navigation pane in the Admin Console, go to **Settings** > **Features**, locate the Transaction Verification feature and slide to enable.

> **Note:** See the [Okta Devices Swift SDK](https://github.com/okta/okta-devices-swift) for iOS and the [Okta Mobile Kotlin SDK](https://github.com/okta/okta-mobile-kotlin) for Android for more information on the Okta Devices SDK. This guide uses the [Okta Devices Swift SDK](https://github.com/okta/okta-devices-swift#okta-devices-sdk).

**Sample code**

This guide uses the [Okta Authenticator Sample App](https://github.com/okta/okta-devices-swift/tree/master/Examples/PushSampleApp) for iOS to configure the Okta custom authenticator to work with CIBA.

---

## About CIBA

Organizations are constantly looking for ways to strike a balance between offering a frictionless user experience without compromising security. It becomes even more challenging when the users try to perform sensitive transactions. Okta uses CIBA to provide customers with a simple and secure transaction verification solution.

CIBA extends OIDC to define a decoupled flow where the authentication or transaction flow is initiated on one device and verified on another. The device in which the transaction is initiated by the OIDC application is called the consumption device and the device where the user verifies the transaction is called the authentication device.

### CIBA grant-type flow

<div class="three-quarter">

![Sequence diagram that displays the back and forth between the client, authorization server, and authentication device for the client-initiated backchannel authentication flow](/img/authorization/CIBAflow.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true
participant "OIDC client" as client
participant "Authorization server" as as
participant "Authentication device" as device

autonumber "<b>#."
client -> as: Makes POST request to authorization server
as -> client: Sends backchannel authentication response with `auth_req_id`
as -> device: Makes background request for user consent/authorization
client -> as: Begins polling with `auth_req_id` to `/token` for tokens
as -> client: Sends authorization error
device -> as: Returns user consent/authorization
client -> as: Polls with `auth_req_id` to `/token` for tokens
as -> client: Returns requested tokens
@enduml

-->

1. The OIDC application on the consumption device triggers the CIBA authentication flow by sending a POST request to the authorization server’s backchannel authentication endpoint (`/oauth2/v1/bc/authorize`).

    To identify the user that additional authentication is being requested for, the request must include either a previously issued ID token (obtained during the user’s initial authorization) as an `id_token_hint` or the user’s username (email address) as a `login_hint`.

    > **Note:** The `id_token_hint` is used in cases where the user is signed in to the application running on the consumption device, and the user is authenticated by the same authorization server. The user is also in control of both the consumption and authentication devices.

2. The authorization server validates the authentication request and the user identification, and then sends the backchannel authentication response with the authentication request ID (`auth_req_id`) to the client.

3. Okta sends a backchannel request for user approval to a branded authenticator on the user’s device (authentication device). That request contains all the information needed to authenticate the user without asking them for their credentials.

4. The client (consumption device) begins to poll the `/token` endpoint including the `auth_req_id` in the request.

5. An authorization error is sent to the client if the authorization server hasn’t received user approval yet.

6. The user sees the custom-branded push notification on their device and approves it.

7. The client (consumption device) polls the authorization server again.

8. Okta sends back the tokens.

## Configure CIBA for your org

There are a few steps required to configure CIBA for your org:

> **Note:** Ensure that you complete the **What you need** section at the beginning of this guide before proceeding.

* Create an OIDC client integration and enable the CIBA grant type.
* Configure an authorization server access policy to use CIBA.

### Create an OIDC client integration and enable CIBA

Create an Okta OIDC client app integration to represent the consumption device, enable CIBA as a grant type, and associate the client app with the [custom authenticator that you previously configured using the Devices SDK](https://github.com/okta/okta-mobile-swift).

> **Note:** Web apps are currently the only application supported with the CIBA flow.

1. In the Admin Console, go to **Applications** > **Applications**.
2. Click **Create App Integration**.
3. Select **OIDC - OpenID Connect** as the **Sign-in method** and choose which type of application that you want to integrate with Okta. In this example, select **Web Application**.
4. Click **Next**.
5. Enter a name for your app integration.
6. Select the **Client-initiated backchannel authentication flow (CIBA)** checkbox as a **Grant type**.
7. Select the custom authenticator that you [previously configured using the Mobile SDK](https://github.com/okta/okta-mobile-swift) from the **Preferred authenticator for CIBA** dropdown list.
8. In the **Sign-in redirect URIs** box, specify the callback location where Okta returns the tokens after the user finishes authenticating. You can use the default URI for this exercise.

    > **Note:** You can leave the rest of the default values as they work with this guide for testing purposes.

9. In the **Assignments** section, select **Allow everyone in your organization to access**.
10. Click **Save**. The settings page for the app integration appears, showing the **General** tab.
11. Make note of the **Client ID** in the **Client Credentials** section and the client secret in the **CLIENT SECRETS** section. You need this information for the [Test the CIBA flow](#test-the-ciba-flow) section.

#### Use the API

You can also use the [Apps API](/docs/reference/api/apps/#add-oauth-2-0-client-application) to create the OAuth 2.0 client app with the CIBA grant type. Use the following parameters in the request:

**Supported parameters**

| Parameter                    | Value                                                                        |
| :--------------------------- | :--------------------------------------------------------------------------- |
| `grant_types`                | `urn:openid:params:grant-type:ciba`     |
| `backchannel_authentication_request_signing_alg` | (Optional) The signing algorithm for CIBA-signed requests using JWT. If this value isn't set and a JWT-signed request is sent, the request fails. |
| `backchannel_custom_authenticator_id` | The ID of the custom authenticator that authenticates the user.           |
| `backchannel_token_delivery_mode`| (Optional) How CIBA is delivered. Supported value: `poll`. Since `poll` is the only value supported, this parameter is optional. |

> **Note:** The parameters `backchannel_token_delivery_mode`, `backchannel_authentication_request_signing_alg`, and `backchannel_custom_authenticator_id` are only available if the client has `urn:openid:params:grant-type:ciba` defined as one of its allowed `grant_types`. See the [Settings](/docs/reference/api/apps/#settings-10) table on the Apps API Reference page for more information on these new parameters.

**Example request**

```json
{
    "name": "oidc_client",
    "label": "CIBA Client",
    "signOnMode": "OPENID_CONNECT",
    "credentials": {
      "oauthClient": {
        "token_endpoint_auth_method": "client_secret_post"
      }
    },
    "settings": {
      "oauthClient": {
        "client_uri": "http://localhost:8080",
        "logo_uri": null,
        "redirect_uris": [
          "https://example.com/oauth2/callback",
          "myapp://callback"
        ],
        "response_types": [
          "token",
          "id_token",
          "code"
        ],
        "grant_types": [
          "implicit",
          "authorization_code",
          "urn:openid:params:grant-type:ciba"
        ],
        "application_type": "web",
        "backchannel_custom_authenticator_id" : "aut5ur07m58W2sQD01d7"
      }
    }
}
```

> **Note:** You can also use the Apps API to [update an OAuth 2.0 client app to use CIBA](/docs/reference/api/apps/#update-application). See the **Supported parameters** table for the parameters to use.

### Configure an authorization server access policy to use CIBA

You can use either the org authorization server or a custom authorization server with CIBA. In this example, use the `default` custom authorization server.

1. In the Admin Console, go to **Security** > **API**.
2. On the **Authorization Servers** tab, select the edit icon to the right of the authorization server that you want to use. In this example, use the `default` custom authorization server.
3. Select **Access Policies**.
4. Select the edit icon for the Default Policy Rule.
5. Select **Client-initiated backchannel authentication (CIBA)** as a grant type and click **Update rule**.

## Enroll a custom authenticator to use CIBA

Use the Devices SDK and your app to enroll a custom authenticator for the test user. In this example, use the Okta Authenticator Sample App and the Xcode simulator to enroll the authenticator. See the **What you need** section if you haven’t set up the sample app.

1. In the **PushSampleApp** directory of the Okta Devices SDK, run the Okta Authenticator Sample App and then open the mobile app in the simulator.
2. Click **Sign In**, enter the test user’s credentials, and click **Sign In**.
3. Complete any additional two-factor authentication required and click **Verify**.
4. On the **Sign in securely using push notifications** screen, click **Set up**.
5. On the Security Settings screen, slide to enable **Sign in with push notifications**.
6. Click **Ok** at the confirmation dialog. Additional security setting options then appear, including **Enable CIBA transactions**.
7. Slide to select **Enable CIBA transactions**.<br>
   The sample app is set up to include the **Enable CIBA transactions** option by default for the user to enable CIBA themselves in the mobile app. However, you can implement CIBA in your app any way that you want, for example, create an enrollment flow that turns CIBA on by default, making it transparent to users.
8. Click **Ok** at the success dialog and close the Security Settings screen.
9. Leave your test user signed in to the authentication device (the Magenta Bank app on the Xcode simulator).
  <!-- **Note:** See the [MyAccount API](/docs/reference/api/myaccount/) for examples of [enrolling](?link to new api operation?) and [updating](?link to new api operation?) a custom app authenticator to use CIBA by adding `CIBA` to the `transactionTypes` array. -->

## Test the CIBA flow

This section walks you through how to test the CIBA authentication flow using the Okta Authenticator Sample App and the custom authenticator that you previously set up.

### Base64-encode the client ID and secret

The call to the `/bc/authorize` endpoint and to the `/token` endpoint requires authentication. In this case, it’s a Basic Auth digest of the client ID and secret of the OIDC client that you created in [an earlier section of the guide](#create-an-oidc-client-integration-and-enable-ciba). You can find them on the client’s **General** tab in the **Client Credentials** section.

To use a Basic Authorization header in both the `/bc/authorize` and `/token` requests, Base64-encode the string and set it in the Authorization header:

```sh
   Authorization: Basic ${Base64(${clientId}:${clientSecret})}
```

### Initiate the flow

The CIBA challenge request is sent by an OIDC client to an Okta authorization server. This request can include the following parameters:

**Supported parameters**

| Parameter                    | Value                                                                        |
| :--------------------------- | :--------------------------------------------------------------------------- |
| `binding_message`| (Optional) A human-readable message that appears on the authentication device to identify the transaction. |
| `id_token_hint` | An ID token that was issued during initial user authentication. The token is passed back as a hint to identify the user for whom additional authentication is being requested. You can specify either `login_hint` or `id_token_hint` in the authentication request, not both. This parameter isn’t used in this example. |
| `login_hint` | Information that identifies the user for whom authentication is being requested. This is typically the user’s email address. You can specify either `login_hint` or `id_token_hint` in the authentication request, not both. |
| `request`| If you are using `private_key_jwt` as the [token endpoint authentication method](/docs/reference/api/apps/#credentials), this is the JWT created by the client that enables you to pass requests as a single, self-contained parameter. See [Parameter details](/docs/reference/api/oidc/#client-initiated-backchannel-authentication-parameter-details). |
| `request_expiry`| (Optional) A positive integer that allows the client to request how long (in seconds) the authentication request is valid. This value is returned in the response from the authorization server as the `expires_in` parameter. If your request doesn’t contain this parameter, the default time that the request is valid is 300 seconds. |
| `scope` | The `openid` scope is required for authentication requests. You can also include other [scopes](/docs/reference/api/oidc/#access-token-scopes-and-claims).|

> **Note:** For additional request examples using different parameters as well as a public key/private key [client authentication](/docs/reference/api/oidc/#client-authentication-methods) example, see [CIBA request examples](/docs/reference/api/oidc/#ciba-request-examples).

**Example request**

```bash
curl --request GET \
  --url https://${yourOktaDomain}/oauth2/default/v1/bc/authorize \
  --header 'Accept: application/json' \
  --header 'authorization: Basic MG9hY...' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'scope=openid email'
  --data 'binding_message=Test Binding Message'
  --data 'login_hint=test.user@email.com'
```

**Example response**

```json
{
  "auth_req_id": "ftJwF5ZwW2SGPPoTQEKtAr_U8_Ek3RvWyR",
  "expires_in": 300,
  "interval": 5
}
```

Note the response parameters that are passed:

* `auth_req_id` is a unique identifier that identifies the authentication request made by the client. This parameter must be used in the request by the client to the token endpoint.
* `expires_in` is the expiration time of the `auth_req_id` in seconds. 300 seconds is the default.
* `interval` is the minimum amount of time (in seconds) that the client should wait between polling requests to the token endpoint. The default is five minutes.

### Send a request to the token endpoint

The next step in the CIBA authentication flow is to send a request for tokens to the `/token` endpoint.

> **Note:** Currently `poll` is the only supported [backchannel token delivery method](/docs/reference/api/apps/#settings-10).

**CIBA request parameters**

| Parameter                    | Value                                                                        |
| :--------------------------- | :--------------------------------------------------------------------------- |
| `grant_type`| `urn:openid:params:grant-type:ciba` |
| `auth_req_id` | Required if the `grant_type` is `urn:openid:params:grant-type:ciba`. |
| `scope` | This is a list of scopes that the client wants included in the access token. |
| `request` | If you are using `private_key_jwt` as the [client authentication method](/docs/reference/api/apps/#credentials), this is the JWT created by the client that enables you to pass requests as a single, self-contained parameter. See [Parameter details](/docs/reference/api/oidc/#client-initiated-backchannel-authentication-parameter-details). |

1. Send a request for tokens to the `/token` endpoint:

   **Example request**

   ```bash
     curl --request POST \
     --url https://${yourOktaDomain}/oauth2/default/v1/token \
     --header 'Accept: application/json' \
     --header 'authorization: Basic MG9hY...' \
     --header 'Content-Type: application/x-www-form-urlencoded' \
     --data 'grant_type=urn:openid:params:grant-type:ciba&scope=openid email&auth_req_id=ftuPCF1eZ0ujBBC3RlRPwTXucFfFQ1M3bh&login_hint=test.user@email.com'
   ```

   > **Note:** For additional request examples using different parameters as well as a public key/private key [client authentication](/docs/reference/api/oidc/#client-authentication-methods) example, see [CIBA request examples](/docs/reference/api/oidc/#ciba-request-examples).

   An authorization error response is sent to the client when the authorization server hasn’t received the user consent yet:

   **Example error response**

   ```json
   {
       "error": "authorization_pending",
       "error_description": "The authorization request is still pending as the user hasn't yet been authenticated."
   }
   ```

2. On the mobile app in the simulator, click the house icon in the top bar to refresh the screen. The consent page appears.
3. Click **Yes, it’s me**.
4. Click **Ok** in the confirmation dialog.
5. Send the request for tokens again and the authorization server responds with the requested tokens.

   **Example response (truncated for brevity)**

   ```json
   {
       "token_type": "Bearer",
       "expires_in": 3600,
       "access_token": "eyJraWQiOiJlX1duS. . . . .josV5OPNwka0DG2qy0Yg",
       "scope": "openid email",
       "id_token": "eyJraWQiO . . . . RQbdJ4i0Nk4w"
   }
   ```

## See also

* [Okta Devices Swift SDK](https://github.com/okta/okta-devices-swift) for iOS
* [Okta Devices Kotlin SDK](https://github.com/okta/okta-devices-kotlin) for Android
* [Custom authenticator integration guide](/docs/guides/authenticators-custom-authenticator/ios/main/)
