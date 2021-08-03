---
title: Configure Device Authorization Grant Flow
excerpt: Learn how to use a secondary device to complete sign-in to applications
layout: Guides
---

<ApiLifecycle access="ea" /><br>

## Overview

The Device Authorization feature is an OAuth 2.0 grant type. It allows users to sign in to input constrained devices, such as smart TVs, digital picture frames, and printers, as well as devices with no browser. Device Authorization enables you to use a secondary device, such as a laptop or mobile phone, to complete sign-in to applications that run on such devices.

The Device Authorization feature is available for both Okta Classic and Okta Identity Engine orgs.

If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).

## Before you begin

This guide assumes that you:

* Have an Okta Developer Edition organiztion. Don't have one? [Create one for free](https://developer.okta.com/signup).
* Have the Native SSO feature enabled for your org. From the left navigation pane in the Admin Console, go to **Settings** > **Features**, locate the Native SSO slider, and slide to enable.

## Configure an application to use the Device Authorization Grant

To create a Native OpenID Connect application and then configure it to support Device Authorization:

1. In the left navigation pane of the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. On the Create a new app integration page, select **OIDC - OpenID Connect** as the **Sign-in method**, and then pick **Native Application**.
1. On your native application page, fill in the application settings. Ensure that you select **Device Authorization** as the allowed **Grant type** in the General Settings.

> **Note:** Device Authorization is only supported for use with a native application.

## Configure the Authorization Server policy rule for Device Authorization

<<<<<<< HEAD
Both Org and Custom Authorization Servers support Device Authorization. Ensure that Device Authorization is enabled at the policy rule level.

To check that Device Authorization is enabled:
=======
Both Org and Custom Authorization Servers support the Device Authorization grant type. Ensure that the Device Authorization grant type is enabled at the policy rule level if you're using a Custom Authorization Server.

To check that the Device Authorization grant type is enabled for a Custom Authorization Server:
>>>>>>> 81a2ab6435faed193403cfd19b3656d2041eed26

1. In the left navigation pane of the Admin Console, go to **Security** > **API** and select the "default" Custom Authorization Server. Note that the examples in this guide use the "default" Custom Authorization Server.
1. On the **Access Policies** tab, select the access policy that you want to configure Device Authorization for.
1. Click the pencil icon for the Default Policy Rule.
1. In the Edit Rule dialog box, select **Device Authorization** for the grant type and click **Update Rule**.

## Configure the smart device

### Request the device verification code

The smart device first needs to call the `/device/authorize` endpoint to obtain the unique verification code.

**Request example**

```bash
  curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/device/authorize \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'client_id={clientId}' \
  --data-urlencode 'scope=openid profile offline_access'
```

The POST request passes the following parameters:

* `client_id`, which matches the Client ID of the OAuth 2.0 application that you created
* `scope` to specify which access privileges are being requested for access tokens. See [Scopes](https://developer.okta.com/docs/reference/api/oidc/#scopes) for a list of supported scopes.

**Response example**

```json
{
   "device_code": "f5ec0430-c2fe-4a93-912d-08631f1effed",
   "user_code": "HMBSRJRC",
   "verification_uri": "https://${yourOktaDomain}/activate",
   "expires_in": 600,
   "interval": 5
}
```

The properties in the response are:

* `device_code`: The long string that the device uses to exchange for an access token.
* `user_code`: The text that you enter at the URL that is listed as the value for `verification_uri`.
* `verification_uri`: The URL that the user needs to enter into their phone to start signing in.
* `expires_in`: The number of seconds that this set of values is valid. After the device code and user code expire, the user has to start the device verification process over.
* `interval`: The number of seconds that the device should wait between polling to see if the user has finished signing in.

The `user_code` and `verification_uri` must appear on the smart device for the user.

> **Note:** A QR code compliant `verification_uri` is coming soon.

#### Example of the display on the smart device

![Verification on the smart device:](/img/DeviceAuthGrant2.png)

### Request for user access, ID, and refresh tokens

To retrieve tokens for the user, the smart device needs to make a request to the `/token` endpoint.

**Request example**

```bash
  curl --location --request POST 'https://${yourOktaDomain}/oauth2/default/v1/token' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'client_id={clientId}' \
  --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:device_code' \
  --data-urlencode 'device_code={deviceCode)' \
```

Note the paramters that are being passed:

* `grant_type`: Identifies the mechanism that Okta uses to retrieve the tokens. Value: `urn:ietf:params:oauth:grant-type:device_code`
* `device_code`: The string that the device uses to exchange for an access token. Use the `device_code` value from the device verification response.

**Response example**

Okta returns a pending response if the user doesn't complete the authentication.

```json
  {
     "error": "authorization_pending",
     "error_description": "The device authorization is pending. Please try again later."
  }
```

After the user completes the authentication process by visiting the `/activate` URL and follow the instructions on their device to get an activation code, the token is returned in the response from the `/token` endpoint.

```json
 {
   "token_type": "Bearer",
   "expires_in": 3600,
   "access_token":
      "eyJraWQ...JQuDJh8g",
   "scope": "offline_access openid profile",
   "refresh_token": "zcLdr1FBXwtI9ej98VVVwtjDd-SmaoL06qr_UcY2tNA",
   "id_token": "eyJraWQ...WI6KR0aQ"
 }
```

If you need a refresh token, ensure that you've initially requested the `offline_access` scope through the `/device/authorize` endpoint. To renew access tokens in the future, you can use the refresh token.

> **Note:** The unique user code is valid for 10 minutes. The user needs to use this code and complete the authentication process within that time. If not, the unique user code expires and the device can request a new user code by using the `/device/authorize` endpoint.

## Revoke the token

To revoke the tokens, the smart device must make a request to the `/revoke` endpoint.

```bash
  curl --location --request POST 'https://${yourOktaDomain}/oauth2/default/v1/revoke' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'token=refresh_token' \
  --data-urlencode 'token_type_hint=refresh_token' \
  --data-urlencode 'client_id={client_id}' \
```
