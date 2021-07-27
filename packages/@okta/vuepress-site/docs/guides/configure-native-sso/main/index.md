---
title: Configure SSO for Native apps
excerpt: Learn how to configure SSO for Native applications and understand the Native SSO flow
layout: Guides
---

<ApiLifecycle access="ea" /><br>

Native SSO allows you to protect native OpenID Connect applications, such as desktop apps and mobile apps, and achieve Single Sign-On (SSO) and Single Logout (SLO) between these applications. SSO between browser-based web applications is achieved by leveraging shared cookies. Unlike web applications, native applications can't use web cookies. Okta offers a token-based approach to achieve SSO between Native applications.

This guide provides a high-level overview of the Native SSO feature in Okta and describes how to configure your org to use this feature.

If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).

## Set up your application

You set up your OpenID Connect application inside the Okta Admin Console:

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. On the Create a new app integration page, select **OIDC - OpenID Connect** as the **Sign-in method** and then pick **Native Application** as the **Application type**.
1. Fill in the details for your app integration, and then click **Save**.

## Use the Native SSO flow

To get an authorization code, your app redirects the user to your [Authorization Server's](/docs/concepts/auth-servers/) `/authorize` endpoint. The following shows the Native SSO flow.

![Native SSO flow:](/img/native_SSO_flow.png "Displays the flow to achieve SSO between Native apps")

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

In the Native SSO flow:
1. Native app 1 starts by redirecting the user's browser to the [authorization server](/docs/concepts/auth-servers/) `/authorize` endpoint.
1. The user is prompted to authenticate.
1. The user enters their credentials to allow the application to access resources protected by scopes.
1. The authorization server returns the authorization code to Native app 1.
1. The client sends the authorization code in the request for tokens.
1. The authorization server returns the tokens (`id_token`, `refresh_token`, and `access_token`) and the `device_secret` in the response.
1. Native app 2 makes a request for a `refresh_token` and `access_token`. The request contains the `id_token` and the `device_secret`.

	For Native app 2, each client can use the `id_token` and the `device_secret` obtained from the first client that authenticated (see the following diagram). To sign in automatically, each client can use the `id_token` and `device_secret` in their `/token` request.

	![ID token and device secret use](/img/nativeSSO_flow2.png "Displays each client using the ID token and device secret")

8. The authorization server returns the refresh and access tokens. This key part in the Native SSO flow enables a user to be automatically signed in without requiring any user action.

To use the Native SSO functionality, you need to:
* Configure Native SSO for your Okta org
* Send the authorization request
* Revoke the device secret to end desktop sessions
* Validate the device_secret

This feature is based on the [OpenID Connect Native SSO for Mobile Apps](https://openid.net/specs/openid-connect-native-sso-1_0.html) draft specification.

## Configure Native SSO for your Okta org

1. In the Admin Console, go to **Security** > **API** to view your authorization servers.
1. On the **Authorization Servers** tab, click the **edit** pencil icon for the "default" Custom Authorization Server.
1. On the **Scopes** tab, verify that `offline_access`, `device_sso`, and `openid` appears in the scopes table.
1. Ensure authorization policies are set up to allow the scopes that you verified. See [Create access policies](/docs/guides/customize-authz-server/create-access-policies/) and [Create rules for each access policy](/docs/guides/customize-authz-server/create-rules-for-policy/).
1. Use the following API requests to update the policy rule to allow the token exchange grant.

> **Note:** At this time, you must use the API to update the policy rule.

##### Request to get the current access policy rule

```
curl --request GET \
--url https://${yourOktaDomain}/api/v1/authorizationServers/{AuthorizationServerId}/policies/{policyId}/rules/{ruleId} \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: SSWS <apiKey>'
```

##### Request to put the token exchange into the allowed grant types

```
curl --request PUT
--url https://${yourOktaDomain}/api/v1/authorizationServers/{AuthorizationServerId}/policies/{policyId}/rules/{ruleId} \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: SSWS <apiKey>' \
-d '{
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
            	"Password",
		"client_credentials",
            	"authorization_code",
            	"urn:ietf:params:oauth:grant-type:token-exchange" // insert token exchange into allowed grant types in policy rule
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

##### Request to fetch the client
```
curl --request GET \
--url https://${yourOktaDomain}/oauth2/v1/clients/{clientId}' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: SSWS <apiKey>'
```

##### Request to update the client with the token exchange grant
```
curl --request PUT \
--url https://${yourOktaDomain}/oauth2/v1/clients/{clientId} \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: SSWS <apiKey>' \
-d '{
	"client_id": "0oa3egpQ0IA4HftFU0g4",
	"client_id_issued_at": 1618351934,
	"client_name": "Target Client",
	"client_uri": null,
	"logo_uri": null,
	"redirect_uris": [
    	"https://httpbin.org/get"
	],
	"response_types": [
    	"code"
	],
	"grant_types": [
    	"authorization_code",
    	"refresh_token",
    	"urn:ietf:params:oauth:grant-type:token-exchange" // insert token exchange as allowed grant type for client
	],
	"token_endpoint_auth_method": "none",
	"application_type": "native"
}'
```

## Create a Native desktop session lifetime

With Native SSO, you can create a separate forked session and associate it with the device secret. The device secret assumes the lifetime of the first refresh token that it was minted with. The device secret has the same idle time and maximum time according to the Authorization Server policy through which it was minted. From there, the device secret and refresh token idle lifetimes are independent of each other.

Other refresh tokens (and other tokens) that are minted by using the device secret are mandated by the Authorization Server policy through which these tokens are generated. Whenever a device secret is used to generate a new set of tokens, the device secret's idle lifetime or the maximum lifetime is still governed by the original Authorization Server policy through which the device secret was minted, and it is updated accordingly.

### Make an authorization request

1. Open an embedded browser and call the following endpoints with the following scopes:
	* `device_sso`
	* `openid`
	* `offline_access`
	
	The following parameters are returned:
	* `device_secret`
	* `id_token`
	* `access_token`
	* `refresh_token`
	> **Note:** You need to store `device_secret` in a secure location on the device, such as the iOS keychain. Ensure that only authorized applications have access to the device secret.

1. Use the token exchange call to exchange the refresh token for additional access tokens.

	The device secret assumes the lifetime of the first refresh token that it was minted with. The device secret has the same idle time and maximum time according to the Authorization Server policy through which it was minted.

	From there, device secret and refresh token idle lifetimes are independent of each other. All other refresh tokens (and other tokens) that are minted by using device secret are mandated by the Authorization Server policy through which these tokens are generated.

	When a device secret is used to generate a new set of tokens, the device secret's idle lifetime or maximum lifetime is still governed by the original Authorization Server policy through which the device secret was minted, and it is updated accordingly.

### Authorize request for client 1

In this use case example, you want to request SSO to multiple apps that are created by the same company. Each client represents one app, and you can register multiple clients for SSO. When a user signs in to one app, all the other apps that are registered are also automatically signed in.

Provide the `device_sso` scope in the first request. The authorization server response includes the `device_secret`, which should be securely stored and only accessible by the registered apps.

To make a request for a new set of tokens (refresh and access), your request would look something like this:
```
`https://${yourOktaDomain}/oauth2/{authorizationServerId}/v1/authorize?client_id={client #1 id}&response_mode=fragment&response_type=code&redirect_uri={configured redirect_uri}&scope=openid device_sso offline_access&nonce=nonce&state=state`
```
The user is prompted to provide their credentials. After the authorization server verifies those credentials, the authorization code is sent to the `redirect_uri` that you configured in the client app.

The following is an example of the authorization code returned.
```
`http://localhost/{configured redirect_uri}#code=jYFTmYbRs43gljHZPinY1bXnr_R-yIP3NDqLpQRCMeQ&state=state`
```

You can follow the [authorization code flow](https://developer.okta.com/docs/guides/implement-auth-code/use-flow/) with the only difference being the `scope`, which requires it to be:

* `openid`
* `device_sso`
* `offline_access`

In addition to the required scopes, you can also request other scopes.

##### Example response with device secret

```
{
   "token_type": "Bearer",
   "expires_in": 3600,
   "access_token": "eyJraW...4bYtRJw",
   "scope": "openid device_sso",
   "id_token": "eyJraW...Nt-5eBMIA",
   "device_secret": "EhfY9QxeuCTLtzkRyh/wWVGQH4EVm7Etp3zEH5R9m0M="
}
```

### Exchange Existing Tokens for New Tokens for a New Client

When you make a token exchange request, the response will return the tokens that you need to use for client 2.

##### Example of a token exchange request for client 2

```
curl --request POST \
--url https://${yourOktaDomain}/oauth2/{authorizationServerId}/v1/token \
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

The properties in the request are:
* `client_id`: Identifies the new client (for example, client #2) and matches the Client ID of the OAuth 2.0 application that was created.
* `grant_type`: Identifies the mechanism that Okta uses to authorize the creation of the tokens. The value is * `urn:ietf:params:oauth:grant-type:token-exchange`.
* `actor_token`: Identifies the `device_secret` that was returned from the authorization code request.
* `actor_token_type`: Identifies the type of token in the `actor_token` parameter.
* `subject_token`: Identifies the `id_token` that was returned from the authorization code request.
* `subject_token_type`: Identifies the type of token in the `subject_token` parameter. The value is * `urn:ietf:params:oauth:token-type:id_token`.
* `scope`: The scopes that the client wants to be included in the access token. You can request any scope that you want.
* `audience`: Identifies the audience of the authorization server. Locate the `audience` value for the `audience` parameter in the Admin Console. From the left navigation pane, select **Security** > **API** > **Authorization Servers** tab.
If the request is successful, the response returned includes: `id_token`, `refresh_token`, and `access token`.

> **Note:** You can pass an expired ID token as part of the token exchange grant as long as the `device_secret` (`sid`) that the `id_token` is associated with is still valid.

##### Response example for the token exchange request for client 2:

```
{
   "token_type": "Bearer",
   "expires_in": 3600,
   "access_token": "eyJraW...TbvY9A",
   "scope": "openid",
   "id_token": "eyJraW...5aCZrA",
   "issued_token_type": "urn:ietf:params:oauth:token-type:access_token"
}
```

## Revoke device_secret to end desktop sessions
Sometimes, you have to end a user's desktop session. When you do that, you are signing the user out of one app as well as all of the other registered apps. To end a desktop session, you must revoke the `device_secret`. The revoke request signs the user out from all of the apps that are a part of Native SSO.

After you've revoked the `device_secret`, all of the corresponding access, refresh, and ID tokens are also revoked for that device.

##### Example of a revoke request to client 1

```
curl --request POST \
--url https://${yourOktaDomain}/oauth2/{authorizationServerId}/v1/revoke \
--header 'Accept: application/json' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'token={device_secret}' \
--data-urlencode 'client_id={client #1 id}' \
```
Client 2 tokens are automatically revoked as well.

## Validate the device secret
Occasionally, you may want to verify that `device_secret` is still valid by using the `introspect` endpoint.

##### Example of an introspect request

```
curl --request POST \
--url https://org/oauth2/authorizationserver/v1/introspect \
--header 'Accept: application/json' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id={client #1 id}' \
--data-urlencode 'token={device_secret}' \
--data-urlencode 'token_type_hint={device_secret}'
```

The `introspect` endpoint returns the `sid` that it's tied to. The same value will be present in the ID token. By using this method, you can correlate and identify the ID tokens that are minted with the same `device_secret`.
