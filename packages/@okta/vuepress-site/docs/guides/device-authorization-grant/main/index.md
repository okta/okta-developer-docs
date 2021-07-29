---
title: Device Authorization
excerpt: Learn how to use a secondary device to complete sign-in to applications
layout: Guides
---

<ApiLifecycle access="ea" /><br>

The Device Authorization feature is an OAuth 2.0 grant type. It allows users to sign in to input constrained devices and also to devices with no browser, such as smart TVs, digital picture frames, and printers. The Device Authorization grant type enables you to use a secondary device, such as a laptop or mobile phone, to complete sign-in to applications that run on such devices.

The Device Authorization feature is available for both Okta Classic and Okta Identity Engine orgs. You can enable this feature yourself in your org. <!-- Tell them how to do that here with a few bulleted steps. Hint: info is also in the Native SSO guide.... -->

<!-- are you doing nutritional facts for this guide? If not, then you need to include this section:

This guide assumes that you:

- Have an Okta Developer Edition organization. Don't have one? [Create one for free](https://developer.okta.com/signup).
- Have enabled the Device Authorization feature for your org.-->

<!-- need a section that defines what they're going to do - because it's a lot:

To use the Device Authorization Grant, you need to:

* Configure an application to use the Device Authorization Grant
* Configure the Authorization Server policy rule for the Device Authorization grant type
* Configure the smart device
-->


If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).

## Configure an application to use the Device Authorization Grant

To configure an application to support the Device Authorization Grant type, create a Native OIDC application from the Okta Admin Console and select **Device Authorization** as the allowed **Grant type** in the General Settings. <!-- we need the actual step by step content here-->

> **Note:** The Device Authorization Grant is only supported <!--for use --> with a native application.

![Device Authorization Grant:](/img/device-auth-grant1.png "Displays the Device Authorization as the Grant Type in the General Settings for a Native OIDC application")
<!-- is this a difficult to find area? Otherwise, we don't typically insert images of basic, easy to find items. I suggest that you remove it -->
Alternatively, you can use the `/apps` or `/clients` API to add the Device Authorization grant type to your application. <!-- To do this, update your client and include--> `urn:ietf:params:oauth:grant-type:device_code` as the grant type. <!-- The following example is using the /clients endpoint.>

<!-- Example request-->

```json
  curl --request PUT \
  --url https://tenant.okta.com/oauth2/v1/clients/{clientID} \ <!-- it's not "tenant.okta.com" - use the "yourOktadomain" variable that we use in our examples-->
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
<!-- I think that "token_endpoint_auth_method" should be "none" above. The app that I created in the UI and then went to test in Postman to do an update had "none" as the "token_endpoint_auth_method" verify with Lars-->

## Configure the Authorization Server policy rule for the Device Authorization grant type

Both Org and Custom Authorization Servers support the Device Authorization grant type. Ensure that the Device Authorization grant type is enabled at the policy rule level.

To check that the Device Authorization grant type is enabled: <!-- you should just focus on one - so tell them that in these examples, the "default" Custom Authorization Server is being used. And then change the URLs appropriately (meaning change {AUthorizationServerId} to default instead.)>

1. <!--In the left navigation pane of--> the Admin Console, go to **Security** > **API** and select the "default" Custom Authorization Server.
1. On the **Access Policies** tab, click the pencil icon for the access policy <!-- which access policy? one that they have created or the Default Policy? I would say: On the **Access Policies** tab, select the access policy that you want to configure Device Authorization for. Then another step is "click the pencil icon for the Default Policy Rule. >.
1. In the Edit Rule dialog box, select **Device Authorization** for the grant type <!-- and click **Update Rule**.>.

<!-- remove this content - let's just focus on using the UI to config, since they can (unlike NativeSSO)

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
end of removal of content -->

## Configure the smart device

### Request the device verification code

The smart device first needs to call the `/device/authorize` endpoint to obtain the unique verification code.

Request example

```bash
  curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/device/authorize \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'client_id={clientId}' \
  --data-urlencode 'scope=openid profile offline_access'
```

The POST request passes the following parameters:

* `client_id`, which matches the Client ID of the OAuth 2.0 application that you created
* `scope` to request an access token for the `openid`, `profile`, and `offline_access` scopes <!-- this isn't correct. reword using the information from this table: https://developer.okta.com/docs/reference/api/oidc/#scopes >

Response example

The response returns the following information. <!-- this sentence is really not needed.-->

```json
{
   "device_code": "f5ec0430-c2fe-4a93-912d-08631f1effed",
   "user_code": "HMBSRJRC",
   "verification_uri": "https://org/activate",
   "expires_in": 600,
   "interval": 5
}
```

<!-- we don't use "org" in URLs foor Okta orgs (in the example above) - we use what? :)-->

The properties in the response are:

<!-- future tense - avoid it -->

* `device_code`: The long string that the device will use to eventually exchange for an access token. <!-- take out evenutally - ambiguous -->
* `user_code`: The text that you will enter at the URL in `verification_uri`. <!-- at URL listed as the value foor `verification_uri` -->
* `verification_uri`: The URL that you need to enter into your phone to start signing in. <!-- the user - we are are talking to the developer here, so it's their user that is performing these actions, not the developer. The developer is configuring this for their users.-->
* `expires_in`: The number of seconds that this set of values is valid. After this amount of time passes, the `device_code` and `user_code` expire and the device has to start over. <!-- change "After this amount of time passes" to "After the device code and user code expire, the user has to start the device verification process over.>
* `interval`: The number of seconds that the device should wait between polling to see if the user has finished signing in.

The `user_code` and `verification_uri` must be displayed for the end user on the smart device. <!-- must appear on the smart device for the user, not must be displayed -->

> **Note:** A QR code compliant `verification_uri` will be available soon. <!-- is coming soon - avoid future tense-->

#### Example of the display on the smart device

![Verification on the smart device:](/img/device-auth-grant2.png "Displays the verification code on the smart device for the end user")

<!-- redo with the new alt text format, please-->

### Request for user access, ID and Refresh tokens <!-- serial comma and lower case r-->

To retrieve tokens for the user, the smart device needs to make a request to the token endpoint. <!-- correctly format the word token -->

Request example

<!-- you need to tell the dev that they need to use the device_code value from the device verification response here. probably in a list below the example that talks about the parameters being sent in the request that seems to be missing...hmmmmmm you can just talk about the grant_type and device_code parameters...it's over kill to keep talking about the client id and scope.....-->

```bash
  curl --location --request POST 'https://org.oktapreview.com/oauth2/default/v1/token' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'client_id={clientId}' \
  --data-urlencode 'scope=openid profile' \
  --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:device_code' \
  --data-urlencode 'device_code={deviceCode)' \
```

Response example

If the user has not completed the authentication, then Okta will return a pending response, as shown in the following example. <!-- reword not using future tense and using conversational tone - Hint: a contraction is needed, also you don't need to say "as shown in the following example" -->

```json
  {
     "error": "authorization_pending",
     "error_description": "The device authorization is pending. Please try again later."
  }
```

After you complete the authentication process by visiting the `/activate` URL, the token is returned through the token endpoint.

<!-- couple things:

- the token is returned in the response from the token endpoint.
- format the word token properly
- after THE USER COMPLETES - not YOU
- they visit the activate url and follow the instructions on their device to get an activation code
- I've been adding "json" and "bash" to your examples throughout my reviews. Just an FYI - it tells vuepress to highlight the code with colors-->

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

If you need a refresh token, ensure that you've initially requested the `offline_access` scope through the device authorization endpoint <!-- `/device/authorize` endpoint-->. To renew access tokens in the future, you can use the refresh tokens. <!-- you can use the refresh token-->

Note: The unique user code is valid for 10 minutes. The user needs to use this code and complete the authentication process within that time. If not, the unique user code will expire and the device can request for a new user code using the device `/device/authorize` endpoint.

<!-- wrong formatting for the note above
-no future tense
-"the device can request a new user code using the `/device/authorize` endpoint -->

## Token Revocation <!-- Revoke the token -->

To revoke the tokens, the smart device must make a request to the OAuth revocation endpoint. <!-- to the `/revoke` endpoint-->

<!-- this needs to be: ```bash and indent the code two spaces - not flush left like it is-->

```
curl --location --request POST 'https://org/oauth2/default/v1/revoke' \
--header 'Accept: application/json' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'token=refresh_token' \
--data-urlencode 'token_type_hint=refresh_token' \
--data-urlencode 'client_id={client #1 id}' \
```
<!-- in the example request above - for client id - was there more than one client in this use case???-->
