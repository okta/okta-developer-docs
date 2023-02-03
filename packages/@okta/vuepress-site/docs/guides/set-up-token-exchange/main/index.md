---
title: Set up OAuth 2.0 On-Behalf-Of Token Exchange
meta:
  - name: description
    content: This guide discusses how to retain user context in requests to downstream services using On-Behalf-Of Token Exchange with a single custom authorization server or between other custom authorization servers under the same Okta tenant.
layout: Guides
---

<ApiLifecycle access="ea" />

This guide discusses how to retain user context in requests to downstream services using On-Behalf-Of Token Exchange with a single custom authorization server or between other custom authorization servers under the same Okta tenant.

---

**Learning outcomes**

Know the purpose of OAuth 2.0 On-Behalf-Of Token Exchange.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* Two custom authorization servers. See [Create an authorization server](/docs/guides/customize-authz-server/main/#create-an-authorization-server) if you need to add them for use with this guide.
* The OAuth 2.0 On-Behalf-Of Token Exchange feature enabled for your org. From the left navigation pane in the Admin Console, go to **Settings** > **Features**, locate the OAuth 2.0 On-Behalf-Of Token Exchange feature and slide to enable.

---
Overview

OAuth 2.0 solves the problem of delegated access to resources across services mediated by an authorization server. For example, a user delegates permission to a social networking mobile app to manage the user’s profile and run background processes on behalf of the user, like reminding the user about upcoming events. However, with the adoption of microservices, a resource server must sometimes access resources hosted by other downstream services on behalf of the user to satisfy a client request. Traditionally these API calls are made as machine-to-machine requests using an access token obtained using the client credentials grant type. However, the user context is lost while making these machine-to-machine requests.

[OAuth On-Behalf-Of Token Exchange](https://tools.ietf.org/html/rfc8693) helps retain the user context in requests to downstream services. It provides a protocol approach to support scenarios where a client can exchange an access token received from an upstream client with a new token by interacting with the authorization server.
Token Exchange Flow


> **Note:** This flow assumes that authentication and authorization of the user are complete and an access token and ID token have been issued by the Okta authorization server.

1. The user is successfully signed in to a mobile app and makes a request.
2. The mobile app includes the user’s valid access token in a request to the API1 service. 
3. API1 needs to talk to API2 to further process the user request. The API1 makes a request to the Okta authorization server to exchange the user’s access token for a new token with appropriate scopes to make requests to the API2 service on behalf of the user. This helps retain the user context.
4. The Okta authorization server validates the user’s access token and grants a new access token to the API1 service with scopes that allow that service to make requests to the API2 service. The new access token retains the user context so API2 service knows on whose behalf the request is being made.
5. The API1 service makes a request to the API2 service with the new access token.

> **Note:** You can determine which API service made API calls on behalf of which user by analyzing the Okta System Log and looking for token grant events (link to token grant event may be?).

Set up token exchange
The following sections walk you through the set up for an example token exchange flow using a single custom authorization server.

> **Note:** You can use a service, web, native, and SPA app to exchange a token with a service app.
Create a native app integration
In the Admin Console, go to Applications > Applications.
Click Create App Integration.
Select OIDC - OpenID Connect, and then Native Application.
Name your application and at the bottom of the page select Assign everyone in your organization to access.
Click Save and at the top of the page click Back to Applications.

Note: We recommend that native applications use the Authorization Code with PKCE authentication flow. See Implement authorization by grant type for more information on creating the Proof Key for Code Exchange (PKCE) for your native application.
Create a service app
In token exchange use cases, an API microservice can act both as a resource server and a client. For this example, the native app gets an access token to make API requests to API1. API1 acts as the resource server. When API1 needs to talk to API2 on behalf of the user, the API1 becomes the OAuth client.

Create a service app that represents API1.

1. On the Applications page, click **Create App Integration**.
2. Select **API Services**, and then click **Next**.
3. Name your application. For this example, enter **API1**, and then click
**Save**.
4. In the **General Settings** section of the **General** tab, click **Edit** and select **Token Exchange** as the grant type for your application.
5. Click **Save**.
6. Copy the client ID in the **Client Credentials** section, and then copy the client secret in the **CLIENT SECRETS** section.
7. [Base64 encode](/docs/guides/implement-grant-type/clientcreds/main/#flow-specifics) the client ID and client secret for use in the token exchange request from API1 to API2.
Update the custom authorization servers
You need to complete a few tasks to update the custom authorization servers that you plan to use for this example.
Create custom scopes
Add some custom scopes to both custom authorization servers to request during the token exchange calls.

> **Note:** You can't include the `offline_access` scope or any of the OpenID Connect scopes when using a service app. This means that you can't request refresh tokens or ID tokens in a service app-initiated token exchange flow.

From the Admin Console, select **Security** > **API**, and then select one of the authorization servers that you want to use.
Select the **Scopes** tab, and then click **Add Scope**.
In the dialog that appears, enter a scope name (**api:access:read**). 
Click Create.
Repeat steps 1-4 and create a second custom scope called **api:access:write**.
Repeat steps 1-5 for the second authorization server that you want to use.
Update audience
Just for this example, update the audience of the authorization servers to help with understanding the token exchange flow when you view the responses from each authorization server.

On the **API** page, select the pencil icon on the right of one of the authorization servers.
In the **Settings** section, click **Edit**.
Change the **Audience** to **com.api.atko** and click **Save**. 
Repeat steps 1-3 for the second authorization server.
Create access policies and rules
An access policy helps you secure your APIs by defining different access token lifetimes for a given combination of the grant type, user, and scope. You create policy rules to determine if an application should be permitted to access specific information from your protected APIs and for how long. Access policies are specific to a particular authorization server, the client applications that you designate for the policy, and the API resource for which you want to mint tokens. 

From the **API** page, select the pencil icon for the authorization server that you want to use for the initial authentication.
Select the Access Policies tab, and then click Add New Access Policy to add a policy that allows the native app to access API1.
In the Add Policy dialog that appears, enter the following:
Name: Enter a name for the new access policy (**Access API1**).
Description: Enter a description.
Assign to: Select The following clients, start typing the name of the native app that you created earlier, and select it from the list that appears.
Click Create Policy.
Click Add Rule and in the dialog that appears, enter the following:
Name: Enter a name for the rule (**Mobile app to API1**).
AND Scopes requested: Select The following scopes and enter **openid**.
Click Create rule.
Repeat steps 1-5 to create a policy and a rule that allows the service app that represents API1 to talk to API2.

Use the following values for the policy:
Name: Access API2.
Assign to: Select The following clients, start typing **API1** (the service app that you created earlier) and select it from the list that appears.

Use the following values for the rule:
Name: For this example, enter: API1 to API2.
AND Scopes requested: Select The following scopes, start typing **api:access:read** and select it from the list that appears. Repeat for **api:access:write** and select it from the list.
Flow specifics
Authorization Code with PKCE request
Use the Authorization Code with PKCE flow to obtain an authorization code for the client. In this case, the mobile app requests tokens so that it can talk to API1.
 
```curl
curl --location --request POST \
 --url 'https://${yourOktaDomain}/oauth2/{authServerId}/v1/authorize' \
 --header 'Accept: application/json' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'client_id=${nativeAppclientId}' \
 --data-urlencode 'redirect_uri=${configuredRedirectUri}' \
 --data-urlencode 'response_type=code' \
 --data-urlencode 'scope=openid' \
 --data-urlencode 'state=testState' \
 --data-urlencode 'code_challenge_method=S256' \
 --data-urlencode 'code_challenge=${code_challenge}' \
```

Response

```bash
https://${configuredRedirectUri}/?code=FQGFlDO-J1jXl....7-cfYJ0KtKB8&state=testState`
```
Exchange code for tokens request
```curl
curl --location --request POST \
 --url 'https://${yourOktaDomain}/oauth2/{authServerId}/v1/token' \
 --header 'Accept: application/json' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=authorization_code' \
 --data-urlencode 'redirect_uri=${configuredRedirectUri}' \
 --data-urlencode 'code=FQGFlDO-J1j.....QvabuZ7-cfYJ0KtKB8' \
 --data-urlencode 'code_verifier=xO5wgOEH5UA2XUdVQ88pM.....Rtc5ERKq1MeonMo8QLCSRYlDk' \
 --data-urlencode 'client_id=${NativeappclientId}'
```

Response

```json
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJ6………X1Z4QA",
    "scope": "openid"
}
```
Token exchange request from service app
> **Note:** Use the Base64 encoded client ID and secret for the service app that you generated during the service app creation earlier. Place that in the Authorization header. See the following example for the format.

```curl
curl --location --request POST \
 --url 'https://${yourOktaDomain}/oauth2/default/v1/token' \
 --header 'Accept: application/json' \
 --header 'Authorization: Basic {Base64 encoded service app client ID and client secret}' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:token-exchange' \
 --data-urlencode 'subject_token_type=urn:ietf:params:oauth:token-type:access_token' \
 --data-urlencode 'subject_token={access token from the Authorization Code with PKCE flow}' \
 --data-urlencode 'scope=api:access:read api:access:write' \
 --data-urlencode 'audience=com.api.atko' \
```

Properties sent in the request body:
`grant-type`: urn:ietf:params:oauth:grant-type:token-exchange
`subject_token_type`: urn:ietf:params:oauth:token-type:access_token
`subject_token`: the access token from the Authorization Code with PKCE flow
`scope`: the scopes required for API1 to talk to API2.
`audience`: audience of the authorization server

Example response

{
    {
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJBVj.....bsW6C8Qg",
    "scope": "api:access:read api:access:write",
    "issued_token_type": "urn:ietf:params:oauth:token-type:access_token"
     }
}


Access token decoded
To check the returned access token payload, you can copy the value and paste it into any JWT decoder (for example: https://jwt.io/). Then, verify that the scope claim (`scp`) and the audience claim (`aud`) are correct. The audience should match the default authorization server audience.

```json
{
  "ver": 1,
  "jti": "AT.nmEEZjEgPk62Us10J5aG4kUfg7DWoLIExSotYJA-rJ4",
  "iss": "https://{yourOktaDomain}/oauth2/default",
  "aud": "com.api.atko",
  "iat": 1675220791,
  "exp": 1675224391,
  "cid": "0oa9aw62CPUnXomeU9c5",
  "uid": "00u930ooYXgBltqbs9c5",
  "scp": [
    "api:access:read",
    "api:access:write"
  ],
  "auth_time": 1675220791,
  "sub": "user@example.com"
}
```
Trusted servers
You can perform token exchange within a single custom authorization server or between other custom authorization servers under the same Okta tenant. The example discussed above is a token exchange within a single custom authorization server. When you want to perform token exchange between custom authorization servers within the same tenant, you need to make the authorization server that issued the subject token as trusted under the authorization server against which the token exchange request is made.

A trusted server handles authenticated requests after the application obtains an access token. The incoming subject token (access token) is used to evaluate a subject.

The following example walks you through how to set up a trusted server, scopes, access policy, and rule. Then, you can make the token exchange request with the trusted server.
Add a trusted server
Add the custom authorization server that you used in the previous flow as a trusted server of the authorization server that handles the token exchange in the trusted server flow.

In the Admin Console, go to Security > API.
Select the pencil icon on the right of the custom authorization server that you want to associate a trusted server with for this example.
In the **Trusted servers** section, click **Add Server**.
In the **Search** field, enter the name of the authorization server that you used in the token exchange flow previously. Matching results appear in a list. If more than 20 results appear, you can click **Show more**.
Click **Add** beside the authorization server, and then click *Done**. The authorization server appears in the **Trusted servers** section.
Create an access policy and rule
Create an access policy and rule so that the service app can access API2 using a different authorization server than the one that granted the original access token for the user.

Select the Access Policies tab, and then click Add New Access Policy to add a policy that allows the service app to access API2.
In the Add Policy dialog that appears, enter the following:
Name: Enter a name for the new access policy (**Access API2**).
Description: Enter a description.
Assign to: Select The following clients, start typing API1, and then select it from the list that appears.
Click Create Policy.
Click Add Rule and in the dialog that appears, enter the following:
Name: Enter a name for the rule (**API1 to API2**).
AND Scopes requested: Select The following scopes, start typing **api:access:read** and select it from the list that appears. Repeat for **api:access:write** and select it from the list.
Click Create rule.
Flow specifics with a trusted server
Perform the requests in the previous [Flow specifics](#flow-specifics) section. When you reach the [token exchange request from the service app](#token-exchange-request-from-the-service-to-api) request, it should look like the following:

> **Note:** Use the Base64 encoded client ID and secret for the service app that you generated during the service app creation earlier. Place that in the Authorization header. See the following example for the format.

```curl
curl --location --request POST \
 --url 'https://${yourOktaDomain}/oauth2/{trustedauthServerId}/v1/token' \
 --header 'Accept: application/json' \
 --header 'Authorization: Basic {Base64 encoded service app client ID and client secret}' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:token-exchange' \
 --data-urlencode 'subject_token_type=urn:ietf:params:oauth:token-type:access_token' \
 --data-urlencode 'subject_token={access token from the Authorization Code with PKCE flow}' \
 --data-urlencode 'scope=api:access:read api:access:write' \
 --data-urlencode 'audience=com.api.atko' \
```

This request is being sent to the authorization server that trusts the authorization server that granted the original access token during the Authorization Code with PKCE flow.

Properties sent in the request body:
`grant-type`: urn:ietf:params:oauth:grant-type:token-exchange
`subject_token_type`: urn:ietf:params:oauth:token-type:access_token
`subject_token`: access token from the Authorization Code with PKCE flow
`scope`: the scopes required for API1 to talk to API2
`audience`: the audience of the custom authorization server that trusts the default authorization server

Response

```json
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJR.....ajXZIk3GryDPC8OIhLsQ",
    "scope": "api:access:read api:access:write",
    "issued_token_type": "urn:ietf:params:oauth:token-type:access_token"
}

Access token decoded
The decoded access token shows the audience of the custom authorization server, the scopes requested, and the original user as the `sub`.

```json
{
  "ver": 1,
  "jti": "AT.cW5tnqgEKrm2Us9t2W3YXWOz1HYc3JOmA4aPYkthJJM",
  "iss": "https://{yourOktaDomain}/oauth2/aus9awb5qgcRPB2Ey9c5",
  "aud": "com.api.atko",
  "iat": 1675287544,
  "exp": 1675291144,
  "cid": "0oa9aw62CPUnXomeU9c5",
  "uid": "00u930ooYXgBltqbs9c5",
  "scp": [
    "api:access:read",
    "api:access:write"
  ],
  "auth_time": 1675287544,
  "sub": "user@example.com"
}
```

