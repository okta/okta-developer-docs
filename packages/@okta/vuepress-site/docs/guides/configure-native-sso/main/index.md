---
title: Configure SSO for Native apps
excerpt: Learn how to configure SSO for Native applications and understand the Native SSO flow
layout: Guides
---

<ApiLifecycle access="ea" /><br>

Native SSO allows you to protect native OpenID Connect applications, such as desktop apps and mobile apps, and achieve Single Sign-On (SSO) and Single Logout (SLO) between these applications. SSO between browser-based web applications is achieved by leveraging shared cookies. Unlike web applications, native applications can't use web cookies. Okta offers a token-based approach to achieve SSO between native applications.

This guide provides a high-level overview of the Native SSO feature in Okta and describes how to configure your org to use this feature.

If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).

## Set up your application
<!--move this section to below all of the introductory stuff-->

Set up your OpenID Connect application using the Okta Admin Console:

1. From the left navigation pane in the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. On the Create a new app integration page, select **OIDC - OpenID Connect** as the **Sign-in method** and then pick **Native Application** as the **Application type**. Click **Next**.
1. Fill in the details for your app integration, and then click **Save**.
<!-- I added this next step because they need this later to make requests-->
1. On the **General** tab, click the **Copy to clipboard** icon for the **Client ID** and save the ID somewhere.

## Use the Native SSO flow
<!-- I would change this to just be "Native SSO flow". I don't think you even need a stem sentence or any intro paragraph for it, since you just introduced it in the paragraph right above it at the very beginning.>

<!-- this first sentence isn't super helpful. You mention this in step 1 below. The focus of this isn't getting the authorization code. The focus of this is using Native SSO. I would just remove it.-->
To get an authorization code, your app redirects the user to your [authorization server's](/docs/concepts/auth-servers/) `/authorize` endpoint. The following shows the Native SSO flow.

![Native SSO flow:](/img/native_SSO_flow.png "Displays the flow to achieve SSO between Native apps")
<!-- you may have missed this conversation in Slack, but the way we do alt text in markdown has changed to just this: ![explanation text here](/img_link_here.png). So, update your alt text to this format throughout the doc>

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

In the Native SSO flow: <!-- you don't need this stem sentence for these steps-->

1. Native app 1 starts by redirecting the user's browser to the [authorization server](/docs/concepts/auth-servers/) `/authorize` endpoint.
1. The user is prompted to authenticate.
1. The user enters their credentials to allow the application to access resources protected by scopes.
1. The authorization server returns the authorization code to Native app 1.
1. The client sends the authorization code in the request for tokens.
1. The authorization server returns the tokens (`id_token`, `refresh_token`, and `access_token`) and the `device_secret` in the response.
1. Native app 2 makes a request for a `refresh_token` and `access_token`. The request contains the `id_token` and the `device_secret`.

	For Native app 2, each client can use the `id_token` and the `device_secret` obtained from the first client that authenticated (see the following diagram). To sign in automatically, each client can use the `id_token` and `device_secret` in their `/token` request.

	![ID token and device secret use](/img/nativeSSO_flow2.png "Displays each client using the ID token and device secret")

8. The authorization server returns the refresh and access tokens <!--for Native app 2-->. This key part in the Native SSO flow enables a user to be automatically signed in without requiring any user action.

To use the Native SSO functionality, you need to:

* Configure Native SSO for your Okta org
* Send the authorization request <!-- Replace with Configure the Token Exchange grant type for client 2>
* <!-- Use Authorization Code with PKCE to obtain the authorization code for client 1>
* <!-- Exchange the code for tokens -->
* <!-- Exchange existing tokens from client 1 for new tokens for client 2>
* Validate the device secret
* Revoke the device secret to end a desktop session

This feature is based on the [OpenID Connect Native SSO for Mobile Apps](https://openid.net/specs/openid-connect-native-sso-1_0.html) draft specification.

<!--need a stem sentence here that says something like...to configure Native SSO, get started here or something like that-->

<!-- set up application section needs to be first here - also add a note that they need two separate Native apps to walk through this use case -->

## Configure Native SSO for your Okta org

<!-- configure Native SSO for your org by updating the authorization server policy rule to allow the token exchange grant. In this use case example, we are using the "default" Custom Authorization Server.-->

1. In left navigation pane of the Admin Console, go to **Security** > **API** to view your authorization servers.
1. On the **Authorization Servers** tab, click the **edit** pencil icon for the "default" Custom Authorization Server.
1. On the **Scopes** tab, verify that `offline_access`, `device_sso`, and `openid` appear in the scopes table.
1. Ensure that an authorization server policy and a rule are set up to allow the scopes that you need. See [Create access policies](/docs/guides/customize-authz-server/create-access-policies/) and [Create rules for each access policy](/docs/guides/customize-authz-server/create-rules-for-policy/).
1. Use the following API requests to update the policy rule to allow the token exchange grant.

> **Note:** At this time, you must use the API to update the policy rule.

<!-- add this section first - because how will they know what the authorization server ID is or the policy ID for the policy that they are trying to get?>

### Obtain the policy ID

Make a request to obtain the policy ID for the policy that you just created in the Configure Native SSO for your Okta org" section. In this use case example we are using the "default" Custom Authorization Server, so the {authorizationServerID} is `default`.

Request example

```bash
  curl --location --request GET 'https://${yourOktaDomain}/api/v1/authorizationServers/default/policies' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: SSWS {apiKey}' \
```

In the response, locate the "id" for the policy that you created in the "Configure Native SSO for your Okta org" section and save it somewhere.

### Obtain the rule ID

Make a request to obtain the rule ID of the policy that you just created in the "Configure Native SSO for your Okta org" section. In this use case example we are using the "default" Custom Authorization Server, so the {authorizationServerID} is `default`.

Request example

```bash
  curl --location --request GET 'https://${yourOktaDomain}/api/v1/authorizationServers/default/policies/{policyId}/rules' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: SSWS {apiKey}' \
```

In the response, locate the "id" of the rule and save it somewhere.

-->

### Get the current access policy rule

Use the `policyId` and `ruleId` that you obtained in the previous section to obtain the current access policy rule.

```bash
  curl --request GET \
  --url https://${yourOktaDomain}/api/v1/authorizationServers/{AuthorizationServerId}/policies/{policyId}/rules/{ruleId} \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'Authorization: SSWS {apiKey}'
```

### Add the token exchange grant type to the policy

<!-- Some text here like "Next you need to configure the token exchange grant type for the client using the API." Also, you still have one comment in this example. Remove it and add it to a sentence here, instead. for example - "the `urn:ietf:params:oauth:grant-type:token-exchange` property inserts the token exchange into allowed grant types in the policy rule...or something like that  ADDITIONALLY -  you need to point out in a bulleted list in this section before the example what the properties are that they are updating. I can't tell by looking at this what I need to include. I mean, I KNOW it's the urn:ietf:params:oauth:grant-type:token-exchange - and also it looks like scopes has "*" as the value - should point that out in the bulleted list and explain what "*" means-->

Update example

```json
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
            	"password",
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

## Configure the Token Exchange grant type for client 2

<!-- add content here along the lines of "use the client ID that you obtained in the "set up the application" section in this request" -->

<!-- you need to add content here about the user needing to copy the response they get back from this request to use in the next step. Just FYI (not for the doc) - Using the template that is in the postman collection causes them to have to update too many fields.-->

Request example

```bash
  curl --request GET \
  --url https://${yourOktaDomain}/oauth2/v1/clients/{clientId}' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'Authorization: SSWS <apiKey>'
```

### Update client 2 with the token exchange grant

<!-- you have a note in the example below. Please move that information up into an introductory sentence/bulleted list that explains what they are updating in this request like above (looks like just the token exchange parameter here...you might not need a bulleted list since it's just one thing) Be sure to mention that the first client doesn't require the token exchange grant type be enabled - it is only all of the other registered apps-->

```json
  curl --request PUT \
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

With Native SSO, you can create a separate forked session and associate it with the device secret. The device secret assumes the lifetime of the first refresh token that it was minted with. The device secret has the same idle time and maximum time according to the authorization server policy through which it was minted. From there, the device secret and refresh token idle lifetimes are independent of each other.

Other refresh tokens (and other tokens) that are minted by using the device secret are mandated by the authorization server policy through which these tokens are generated. Whenever a device secret is used to generate a new set of tokens, the device secret's idle lifetime or the maximum lifetime is still governed by the original authorization server policy through which the device secret was minted, and it is updated accordingly.

1. Use the token exchange call to exchange the refresh token for additional access tokens.<!-- remove this line -->
<!-- Spell out the flow using this information. Combine it with what is in the "Create a Native desktop session lifetime" section.  -->

	The device secret assumes the lifetime of the first refresh token that it was minted with. The device secret has the same idle time and maximum time according to the Authorization Server policy through which it was minted.

	From there, device secret and refresh token idle lifetimes are independent of each other. All other refresh tokens (and other tokens) that are minted by using device secret are mandated by the Authorization Server policy through which these tokens are generated.

	When a device secret is used to generate a new set of tokens, the device secret's idle lifetime or maximum lifetime is still governed by the original Authorization Server policy through which the device secret was minted, and it is updated accordingly.

In this example, you want to SSO to multiple apps that are created by the same company. Each client represents one app, and you can register multiple clients for SSO. When a user signs in to one app, all the other apps that are registered are also automatically signed in.

### Use Authorization Code with PKCE to obtain the authorization code for client 1

Provide the `device_sso`, `openid`, and `offline_access` scopes in the first request to the `/authorize` endpoint using the Authorization Code with PKCE flow. See [Use the Authorization Code flow with PKCE](/docs/guides/implement-auth-code-pkce/use-flow/) for information on the parameters that are being passed in this request.

Example Authorization Code with PKCE request

```
  https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id=0oa10sqibtVca6tme1d7&response_type=code&scope=openid device_sso offline_access&redirect_uri={configured_redirect_uri}&state=state-8600b31f-52d1-4dca-987c-386e3d8967e9&code_challenge_method=S256&code_challenge=qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es
```

The user is prompted to provide their credentials. After the authorization server verifies those credentials, the authorization code is sent to the `redirect_uri` that you specified. The following is an example of the authorization code returned.

Example response

```
  https://{configured_redirect_uri}/?code=S_NuB0TNeDMXD_5SKZO6FuXFOi_J9XB-sHAk0Dc0txQ&state=state-8600b31f-52d1-4dca-987c-386e3d8967e9
```

### Exchange the code for tokens

To exchange the authorization code for tokens, pass the code to your authorization server's `/token` endpoint along with the code_verifier that was generated. See [Exchange the code for tokens](/docs/guides/implement-auth-code-pkce/exchange-code-token/) for information on the parameters that are being passed in this request.

Example request

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=authorization_code&client_id={clientId}&redirect_uri=yourApp%3A%2Fcallback&code=CKA9Utz2GkWlsrmnqehz&code_verifier=M25iVXpKU3puUjFaYWg3T1NDTDQtcW1ROUY5YXlwalNoc0hhakxifmZHag'
```

Example response

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

When you make a token exchange request, the response returns the tokens that you need to use for client 2.

Example request

```bash
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

Response example

```JSON
{
   "token_type": "Bearer",
   "expires_in": 3600,
   "access_token": "eyJraW...TbvY9A",
   "scope": "openid",
   "id_token": "eyJraW...5aCZrA",
   "issued_token_type": "urn:ietf:params:oauth:token-type:access_token"
}
```

## Validate the device secret

Occasionally you may want to verify that the device secret is still valid by using the `/introspect` endpoint.

Example introspect request

```bash
  curl --request POST \
  --url https://${yourOktaDomain}/oauth2/v1/introspect \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'client_id={client #1 id}' \
  --data-urlencode 'token={device_secret}' \
  --data-urlencode 'token_type_hint={device_secret}'
```

The `/introspect` endpoint returns the `sid` that it's tied to. The same value is present in the ID token. By doing this, you can correlate and identify the ID tokens that are minted with the same device secret.

## Revoke the device secret to end a desktop session

Sometimes you have to end a user's desktop session. When you do that, you are signing the user out of one app as well as all of the other registered apps. To end a desktop session, you must revoke the device secret. The revoke request signs the user out from all of the apps that are a part of the Native SSO flow.

Example request

```bash
curl --request POST \
--url https://${yourOktaDomain}/oauth2/{authorizationServerId}/v1/revoke \
--header 'Accept: application/json' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'token={device_secret}' \
--data-urlencode 'client_id={client #1 id}' \
```

After you've revoked the device secret, the corresponding access, refresh, and ID tokens are also revoked for that device. You can verify that the revoke was successful by making a request to the `/introspect` endpoint again for that client. You should receive the following response:

```json
{
    "active": false
}
```

To verify that the tokens are also automatically revoked for other clients, repeat the `/introspect` request using those client IDs.
