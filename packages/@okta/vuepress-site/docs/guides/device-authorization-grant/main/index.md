---
title: Configure Device Authorization Grant Flow
excerpt: Learn how to use a secondary device to complete sign-in to applications
layout: Guides
---

This guide describes the Device Authorization feature, which allows users to sign in to input-constrained devices and devices without a browser.

---

#### Learning outcomes

* Create and configure a native OpenID Connect application to support Device Authorization.
* Enable Device Authorization at the policy rule level.
* Request the device verification code.
* Retrieve tokens for the user.
* Revoke the tokens.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Device Authorization feature enabled for your org](#before-you-begin)

---

## About the Device Authorization feature

The Device Authorization feature is an OAuth 2.0 grant type. It allows users to sign in to input-constrained devices, such as smart TVs, digital picture frames, and printers, and devices with no browser. Device Authorization enables you to use a secondary device, such as a laptop or mobile phone, to complete sign-in to applications that run on such devices.

The Device Authorization feature is available for both Classic Engine and Identity Engine orgs.

## Before you begin

This guide assumes that you:

* Have an Okta Developer Edition organization. Don't have one? [Create one for free](https://developer.okta.com/signup).
* Have the Device Authorization feature enabled for your org. From the left navigation pane in the Admin Console, go to **Settings** > **Features**, locate the Device Authorization Grant slider, and slide to enable.

## Configure an application to use the Device Authorization Grant

To create a Native OpenID Connect application and then configure it to support Device Authorization:

1. In the left navigation pane of the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. On the Create a new app integration page, select **OIDC - OpenID Connect** as the **Sign-in method**, and then pick **Native Application**.
1. On your native application page, fill in the application settings. Ensure that you select **Device Authorization** as the allowed **Grant type** in the General Settings.

> **Note:** Device Authorization is only supported for use with a native application.

## Configure the authorization server policy rule for Device Authorization

Both org and custom authorization servers support Device Authorization. Ensure that Device Authorization is enabled at the policy rule level if you're planning to use a custom authorization server. If you're planning to use the org authorization server, you can skip this step. Examples in this guide use the "default" custom authorization server.

To check that Device Authorization is enabled:

1. In the left navigation pane of the Admin Console, go to **Security** > **API** and select the "default" custom authorization server.
1. On the **Access Policies** tab, select the access policy that you want to configure Device Authorization for.
1. Click the pencil icon for the Default Policy Rule.
1. In the Edit Rule dialog box, select **Device Authorization** for the grant type and click **Update Rule**.

## Configure the smart device

### Request the device verification code

The smart device first needs to call the `/device/authorize` endpoint to obtain the unique verification code.

**Example request**

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/device/authorize \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'client_id=${clientId}' \
  --data-urlencode 'scope=openid profile offline_access'
```

The device authorization request passes the following parameters:

* `client_id`: Matches the Client ID of the OAuth 2.0 application that you created
* `scope`: Specifies which access privileges are being requested for the access token. See [Scopes](/docs/reference/api/oidc/#scopes) for a list of supported scopes.

**Example response**

```json
{
    "device_code": "4ebdb4de-1f8b-4497-be01-ddfaf83c4e9c",
    "user_code": "MHXTFRPK",
    "verification_uri": "https://{yourOktaDomain}/activate",
    "verification_uri_complete": "https://{yourOktaDomain}/activate?user_code=MHXTFRPK",
    "expires_in": 600,
    "interval": 5
}
```

The properties in the response are:

* `device_code`: The long string that the device uses to exchange for an access token.
* `user_code`: The text that you enter at the URL that is listed as the value for `verification_uri`.
* `verification_uri`: The URL that the user needs to access from their device to start the sign-in process.
* `verification_uri_complete`: The URL that the client uses to generate the QR Code for the user to scan.
* `expires_in`: The number of seconds that this set of values is valid. After the device code and user code expire, the user has to start the device verification process over.
* `interval`: The number of seconds that the device should wait between polling to see if the user has finished signing in.

The `user_code` and `verification_uri` must appear on the smart device for the user. To display the QR Code, the client generates the code by using the `verification_uri_complete` value that was returned in the response and displays it on the device for the user to scan.

#### Example of the display on a smart device

<div class="three-quarter border">

![Verification on the smart device](/img/authorization/QRActivate.png)

</div>

### Request access, ID, and refresh tokens

To retrieve tokens for the user, the smart device needs to make a request to the `/token` endpoint.

**Request example**

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'client_id=${clientId}' \
  --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:device_code' \
  --data-urlencode 'device_code=${deviceCode}'
```

Note the parameters that are being passed:

* `grant_type`: Identifies the mechanism that Okta uses to retrieve the tokens. Value: `urn:ietf:params:oauth:grant-type:device_code`
* `device_code`: The string that the device uses to exchange for an access token. Use the `device_code` value from the device verification response.

**Example response**

Okta returns a pending response if the user doesn't complete the authentication.

```json
{
  "error": "authorization_pending",
  "error_description": "The device authorization is pending. Please try again later."
}
```

After the user visits the `/activate` URL, follows the instructions on their device to input the activation code, and completes the authentication and authorization, the tokens are returned in the response from the `/token` endpoint.

```json
{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "eyJraWQ...JQuDJh8g",
  "scope": "openid profile offline_access",
  "refresh_token": "zcLdr1FBXwtI9ej98VVVwtjDd-SmaoL06qr_UcY2tNA",
  "id_token": "eyJraWQ...WI6KR0aQ"
}
```

If you need a refresh token, ensure that you've initially requested the `offline_access` scope through the `/device/authorize` endpoint. To renew access tokens in the future, you can use the refresh token.

> **Note:** The unique user code is valid for 10 minutes. The user needs to use this code and complete the authentication process within that time. If not, the unique user code expires and the device can request a new user code by using the `/device/authorize` endpoint.

## Revoke the token

To revoke the tokens, the smart device must make a request to the `/revoke` endpoint.

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/revoke \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'token=${refreshToken}' \
  --data-urlencode 'token_type_hint=refresh_token' \
  --data-urlencode 'client_id=${clientId}'
```

**Example response**

```bash
  HTTP/1.1 200 OK
```
