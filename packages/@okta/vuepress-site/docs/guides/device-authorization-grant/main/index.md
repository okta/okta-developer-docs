---
title: Device Authorization Grant
excerpt: Learn how to use a secondary device to complete sign-in to applications
layout: Guides
---

<ApiLifecycle access="ea" /><br>

The Device Authorization grant feature is an OAuth 2.0 grant type. It allows you to sign in to input constrained devices and also to devices that lack support to web browsers natively. The OAuth 2.0 grant enables you to use a secondary device, such as a laptop or mobile phone, to complete sign-in to applications that run on such devices.
The Device Authorization grant feature can be accessed in your Okta preview and prod environment. It is available through the Okta Identity Engine and Okta Classic pipeline. You can enable the feature on your Okta org in the Admin Console.

If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).

## Configure the application for the Device Authorization grant type

To configure the application to support the Device Authorization grant type, create a Native OIDC application from the Okta Admin Console and select **Device Authorization** as the allowed **Grant type** in the General Settings.

> **Note:** The Device Authorization grant is only supported with a Native OIDC application.

![Device Authorization grant:](/img/device-auth-grant1.png "Displays the Device Authorization as the Grant Type in the General Settings for a Native OIDC application")

Alternatively, you can use the `/apps` or `/clients` API to add the Device Authorization grant type to your application. Include `urn:ietf:params:oauth:grant-type:device_code` as the grant type.

```
curl --request PUT \
--url https://tenant.okta.com/oauth2/v1/clients/{clientID} \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: SSWS <apiKey>'
--data-raw '{
   "client_id": {client_id},
   "client_secret_expires_at": 0,
   "client_name": {client_name},
   "client_uri": null,
   "logo_uri": null,
   "redirect_uris": [
       "https://uri.com/",
   ],
   "response_types": [
       "code",
       "token"
   ],
   "grant_types": [
       "password",
       "authorization_code",
       "urn:ietf:params:oauth:grant-type:saml2-bearer",
       "implicit",
       "urn:ietf:params:oauth:grant-type:device_code",
       "refresh_token"
   ],
   "token_endpoint_auth_method": "client_secret_basic",
   "application_type": "native"
}'
```

## Configure the Authorization Server policy rule for the Device Authorization grant type

Both org and custom Authorization Servers support the Device Authorization grant type. Ensure that the Device Authorization grant type is enabled at your policy rule level.

To check that the Device Authorization grant type is enabled:
1. From the Admin Console, go to **Security** > **API** and select the Authorization Server.
1. On the **Access Policies** tab, click the **edit** pencil icon for the access policy.
1. In the Edit Rule dialog box, select **Device Authorization** for the grant type.

You can also use the following API requests to update the access policy rule to support the Device Authorization grant type.

##### Request to get the current access policy rule

```
curl --request GET \
--url https://${yourOktaDomain}/api/v1/authorizationServers/{AuthorizationServerId}/policies/{policyId}/rules/{ruleId} \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: SSWS <apiKey>'
```

See [Get all policy rules](/docs/reference/api/authorization-servers/#get-all-policy-rules) for a description of the request parameters.

##### Request to put the token exchange into the allowed grant types

```
curl --request PUT \
--url https://${yourOktaDomain}/api/v1/authorizationServers/<targetAuthorizationServerId>/policies/{policyId}/rules/{ruleId} \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: SSWS <apiKey>' \
--data-raw '{
	"id": "0pr3erdfwAnLPICrw0g4",
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
            	"authorization_code",
             "urn:ietf:params:oauth:grant-type:device_code"
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

## Configure the smart device

### Request the device verification code

The smart device first needs to call the `/device/authorize` endpoint to obtain the unique verification code.

##### Request example

```
curl --request POST \
--url https://${yourOktaDomain}/oauth2/default/v1/device/authorize \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id={clientId}' \
--data-urlencode 'scope=openid profile offline_access'
```

The POST request passes the following parameters:
* `client_id`, which matches the Client ID of the OAuth 2.0 application that you created
* `scope` to request an access token for the `openid`, `profile`, and `offline_access` scopes

##### Response example
The response returns with the following information.

```
{
   "device_code": "f5ec0430-c2fe-4a93-912d-08631f1effed",
   "user_code": "HMBSRJRC",
   "verification_uri": "https://org/activate",
   "expires_in": 600,
   "interval": 5
}
```

The properties in the response are:
* `device_code`: The long string that the device will use to eventually exchange for an access token.
* `user_code`: The text that you will enter at the URL in `verification_uri`.
* `verification_uri`: The URL that you need to enter into your phone to start signing in.
* `expires_in`: The number of seconds that this set of values is valid. After this amount of time passes, the `device_code` and `user_code` expire and the device has to start over.
* `interval`: The number of seconds that the device should wait between polling to see if the user has finished signing in.

The `user_code` and `verification_uri` must be displayed for the end user on the smart device.

> **Note:** A QR code compliant `verification_uri` will be available soon.

##### Example of the display on the smart device

![Verification on the smart device:](/img/device-auth-grant2.png "Displays the verification code on the smart device for the end user")

### Request for user access, ID and Refresh tokens

To retrieve tokens for the user, the smart device needs to make a request to the token endpoint.

##### Request example

```
curl --location --request POST 'https://org.oktapreview.com/oauth2/default/v1/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id={clientId}' \
--data-urlencode 'scope=openid profile' \
--data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:device_code' \
--data-urlencode 'device_code={deviceCode)' \
```

##### Response example

If the user has not completed the authentication, then Okta will return a pending response, as shown in the following example.

```
{
   "error": "authorization_pending",
   "error_description": "The device authorization is pending. Please try again later."
}
```

After you complete the authentication process by visiting the `/activate` URL, the token is returned through the token endpoint.

```
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

If you need a refresh token, ensure that you've initially requested the `offline_access` scope through the device authorization endpoint. To renew access tokens in the future, you can use the refresh tokens.

Note: The unique user code is valid for 10 minutes. The user needs to use this code and complete the authentication process within that time. If not, the unique user code will expire and the device can request for a new user code using the device `/device/authorize` endpoint.

## Token Revocation
To revoke the tokens, the smart device must make a request to the OAuth revocation endpoint.

```
curl --location --request POST 'https://org/oauth2/default/v1/revoke' \
--header 'Accept: application/json' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'token=refresh_token' \
--data-urlencode 'token_type_hint=refresh_token' \
--data-urlencode 'client_id={client #1 id}' \
```