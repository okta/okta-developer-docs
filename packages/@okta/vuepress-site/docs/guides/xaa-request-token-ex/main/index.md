---
title: Implement XAA token exchange for your requesting app
excerpt: Implement XAA token exchange for your requesting app
layout: Guides
---

This guide explains how to enable Cross App Access (XAA) token exchange for a requesting app (client) that federates enterprise users through Security Assertion Markup Language (SAML) 2.0.

---

#### Learning outcomes

Understand how to implement the XAA token exchange sequences necessary for a requesting app (the XAA client).

#### What you need

* An app that federates enterprise users through SAML 2.0, and assumes the requesting app role in the XAA flow
* An Okta org used for SAML 2.0 federation, such as an [Okta Integrator Free Plan org](https://developer.okta.com/signup)
  * You've registered your requesting app with SAML SSO and XAA capabilities in your Okta org. See [Create SAML app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-saml) and [Configure the requesting app](/docs/guides/xaa-agent-to-app/main/#configure-the-ai-agent-requesting-app).
  [[style="list-style-type:square"]]

---

## Overview

The [Identity Assertion JWT Authorization Grant](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-identity-assertion-authz-grant) specification, which forms the basis for XAA, was originally designed for OpenID Connect (OIDC). By following this guide, you can support XAA in SAML-based apps without migrating your core authentication infrastructure to OIDC. Review the [XAA concept](/docs/concepts/xaa/) for more information.

In the following XAA token exchange flow, this guide focuses on the interactions required for the **Client (requesting app)**.

<div class="full">

![XAA token exchange flow](/img/concepts/xaa-token-exchange-flow.svg)

</div>
<!--
See http://www.plantuml.com/plantuml/uml/
@startuml
participant WebApp as "Client (requesting app)"
participant OAS as "IdP (Okta)"
participant CAS as "Resource authorization server"
participant RS as "Resource server (resource app)"
WebApp -> OAS: 1. User SSO
OAS -> WebApp: 2. Sends ID/refresh token
WebApp -> OAS: 3. Token exchange with ID/refresh token
OAS -> WebApp: 4. Returns ID-JAG
WebApp -> CAS: 5. Sends ID-JAG
CAS -> CAS: 6. Validates ID-JAG and resolves user identity
CAS -> WebApp: Returns access token for resource app
WebApp -> RS: 7 Resource request with access token (such as API requests)
RS -> WebApp: Returns resource data
@enduml
-->

## Flow specifics for SAML requesting app

In a SAML-based XAA flow, your requesting app acts on behalf of an authenticated user. Instead of exchanging an OIDC ID token, your app exchanges a SAML 2.0 assertion for an OAuth 2.0 refresh token, obtains an Identity Assertion JWT  Authorization Grant (ID-JAG) token from Okta, and then redeems that ID-JAG for an access token at the target resource's authorization server.

<div class="full">

![XAA token exchange flow](/img/concepts/xaa-saml-token-exchange.png)

</div>
<!--
See http://www.plantuml.com/plantuml/uml/
@startuml
participant WebApp as "Client (requesting app)"
participant OAS as "IdP (Okta)"
participant CAS as "Resource authorization server"
participant RS as "Resource server (resource app)"
WebApp -> OAS: 1a. User signs in with SAML SSO assertion request
OAS -> WebApp: 1b. Returns SAML assertion response for a successful sign-on
WebApp -> OAS: 1c. Use SAML assertion to request for a refresh token
OAS -> WebApp: 2. Returns refresh token
WebApp -> OAS: 3. Token exchange with refresh token
OAS -> WebApp: 4. Returns ID-JAG
WebApp -> CAS: 5. Sends ID-JAG
CAS -> CAS: 6. Validates ID-JAG and resolves user identity
CAS -> WebApp: 7. Returns access token for resource app
WebApp -> RS: 8. Resource request with access token (such as API requests)
RS -> WebApp: 9. Returns resource data
@enduml
-->

1. **User SSO**:
   1. The user initiates sign in to your app, which uses the IdP to SSO with SAML 2.0
   [[style="list-style-type:lower-alpha"]]
   1. After the user is authenticated, the IdP returns the SAML assertion response to your app.
   1. Your app uses the SAML assertion to request for a refresh token from the IdP

1. **ID/refresh token issued**: The IdP returns a refresh token.
1. **Token exchange for ID-JAG**: To access a specific resource on behalf of the user, your app exchanges the refresh token to obtain an Identity Assertion JWT Authorization Grant (ID-JAG) token.
1. **ID-JAG token issued**: The IdP issues an ID-JAG token to the client if the client has a trusted connection to the resource server.
1. **JWT Authorization Grant**: Your app presents the ID-JAG token to the resource authorization server.
1. **Resource access token issued**: The resource authorization server validates the ID-JAG and issues a short-lived, scoped access token.
1. **Client accesses resource data**: The requesting client uses the short-lived, scoped token to access the protected resource app on the user's behalf.

---

### User SSO

1. When a user signs into your federated app, your app uses SAML and redirects the user to the IdP for SSO. As a prerequisite for this to happen, your app has to integrate and register with the IdP with SAML SSO. See [SAML concept](/docs/concepts/saml/) and [SAML app integrations](https://help.okta.com/okta_help.htm?id=ext-apps-about-saml) in the product documentation for details.
[[style="list-style-type:lower-alpha"]]

2. After the user is authenticated, the IdP returns the users's SAML assertion response to your requesting app (`SAMLResponse>`).

1. Use the SAML assertion to exchange for a refresh token from your IdP's [OAuth 2.0 token endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/orgas/token). Add code to your app to handle the token exchange.

    1. Create the client assertion JWT.
       This assertion is in `private_key_jwt` form and tells the IdP who the client is. See [Build a JWT for client authentication](/docs/guides/build-self-signed-jwt/js/main/). Specify the following claims in your JWT payload:

        | Claim    | Description                                                  | Type        |
        |----------|--------------------------------------------------------------|-------------|
        | `aud`      | Required. The full URL of the resource that you're trying to access using the JWT to authenticate. For example: `https://{yourOktaDomain}/oauth2/default/v1/token` | String  |
        | `exp`      | Required. The token expiration time in seconds since January 1, 1970 UTC (UNIX timestamp), for example, `1555594819`. This claim fails the request if the expiration time is more than one hour in the future or if the token is already expired.            | Integer     |
        | `iss`      | Required. The issuer of the token. This value must be the same as the `client_id` of the application that you’re accessing.  | String      |
        | `sub`      | Required. The subject of the token. This value must be the same as the `client_id` of the application that you’re accessing. | String       |
        | `jti`      | Optional. The unique token identifier. If you specify this parameter, the token can only be used once and, as a result, subsequent token requests don't succeed. | String    |
        | `iat`      | Optional. When the token was issued in seconds since January 1, 1970 UTC (UNIX timestamp), for example, `1555591219`. If specified, it must be a time before the request is received. | Integer     |
        

        ```json
        // header
        { "typ": "JWT", "alg": "RS256", "kid": "623a99274239c682f400554a325c3f40" }
        // payload
        {
          "iss": "wlpzkmw02c30VEZru1d7",   // THE AGENT (issuer == subject)
          "sub": "wlpzkmw02c30VEZru1d7",
          "aud": "https://dev-njoshi-oie-op3.oktapreview.com/oauth2/v1/token",
          "exp": 1781224051,
          "iat": 1781223751,               // exp = iat + 300s
          "jti": "17845943-3f7c-418a-90c8-6cc499c6a6a3"
        }
        ```


    ```http
    POST /oauth2/v1/token HTTP/1.1
    Host: {yourOktaDomain}
    Content-Type: application/x-www-form-urlencoded

    grant_type=uurn:ietf:params:oauth:grant-type:token-exchange
    &assertion={base64_encoded_saml_assertion}
    &client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
    &client_assertion={your_requesting_signed_client_jwt}
    &scope=offline_access
    ```
    
1. 
1. 
1. 



Request Format
Send an HTTP POST request to your Okta org authorization server /token endpoint using client_credentials authentication signed by your AI Agent's private key (private_key_jwt).
HTTP

### Token request parameters
| Parameter             | Type   | Required | Description   |
|-----------------------|--------|----------|-----------------------------|
| `grant_type`          | String | Yes      | Must be set to `urn:ietf:params:oauth:grant-type:saml2-bearer`.                             |
| `assertion`           | String | Yes      | The Base64-encoded SAML 2.0 assertion received from the IdP.                                |
| `client_assertion_type` | String | Yes    | Must be set to `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.                    |
| `client_assertion`    | String | Yes      | A signed JWT generated by your app using the registered AI Agent's private key.             |
| `scope`               | String | Yes      | Must include `offline_access` to issue a refresh token.                                      |
<!-- ...existing code... -->

Response Example
JSON
{
  "access_token": "eyJhbGciOi...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "r10a_example_refresh_token_value",
  "scope": "offline_access"
}
Step 2: Request the ID-JAG Token
Use the refresh token obtained in Step 1 to request an ID-JAG token from the Okta org authorization server. The ID-JAG acts as the signed identity assertion presented to the target resource.
Request Format
Send an HTTP POST request to the org authorization server's /token endpoint:
HTTP
POST /oauth2/v1/token HTTP/1.1
Host: {yourOktaDomain}
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token
&refresh_token={refresh_token}
&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer
&client_assertion={ai_agent_signed_client_jwt}
&requested_token_type=urn%3Aietf%3Aparams%3Aoauth%3Atoken-type%3Aid-jag
&resource={target_resource_authorization_server_issuer_url}
Parameter Reference
Parameter
Type
Required
Description
grant_type
String
Yes
Must be set to refresh_token.
refresh_token
String
Yes
The refresh token obtained during Step 1.
client_assertion_type
String
Yes
Must be set to urn:ietf:params:oauth:client-assertion-type:jwt-bearer.
client_assertion
String
Yes
A signed client assertion JWT generated with the AI Agent private key.
requested_token_type
String
Yes
Must be set to urn:ietf:params:oauth:token-type:id-jag.
resource
String
Yes
The Issuer URL of the target resource's authorization server (matches the aud claim in the issued ID-JAG).

Response Example
JSON
{
  "issued_token_type": "urn:ietf:params:oauth:token-type:id-jag",
  "token_type": "N_A",
  "access_token": "eyJhbGciOiJSUzI1NiIsIms...",
  "expires_in": 300
}
Note: The access_token field in this response contains the raw ID-JAG JWT string.
Step 3: Redeem the ID-JAG for an Access Token
Present the ID-JAG token to the target resource application's OAuth authorization server to receive a scoped access token.
Request Format
Send an HTTP POST request to the resource authorization server's /token endpoint:
HTTP
POST /oauth2/v1/token HTTP/1.1
Host: {resourceAuthServerDomain}
Content-Type: application/x-www-form-urlencoded

grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer
&assertion={id_jag_token}
&client_id={resource_app_client_id}
&client_secret={resource_app_client_secret}
&scope={requested_scopes}
Parameter Reference
Parameter
Type
Required
Description
grant_type
String
Yes
Must be set to urn:ietf:params:oauth:grant-type:jwt-bearer.
assertion
String
Yes
The ID-JAG JWT string received in Step 2.
client_id
String
Yes
The Client ID registered for the resource application.
client_secret
String
Yes
The Client Secret associated with the resource application.
scope
String
Optional
Space-separated list of custom scopes requested on the target authorization server (for example, xaa:read).

Response Example
JSON
{
  "access_token": "eyJhbGciOiJSUzI1Ni...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "xaa:read"
}
Step 4: Make Authorized Requests to the Resource API
Include the access token obtained in Step 3 in the Authorization header of HTTP requests sent to the protected resource server.
Request Example
HTTP
GET /api/v1/todos HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJSUzI1Ni...
Accept: application/json
Step 5: Handle Token Expiration and Renewal
Manage token lifetimes properly to maintain continuous session access without forcing users to complete SAML SSO repeatedly.
1.Monitor Access Token Lifetime:Short-lived credentials.
Access tokens issued by the resource authorization server are short-lived (typically valid for 60 minutes). Store the token expiration time (expires_in) in your application session context.
2.Exchange Refresh Token for a New ID-JAG:Org authorization server call.
When the access token expires or is about to expire, do not re-trigger SAML SSO. Instead, use your cached OAuth refresh_token to request a new ID-JAG from the Okta org authorization server (repeat Step 2).
3.Redeem New ID-JAG for a Fresh Access Token:Resource authorization server call.
Pass the newly issued ID-JAG to the resource authorization server token endpoint to obtain a new access token (repeat Step 3).
4.Re-authenticate User on Refresh Token Expiration:Fallback mechanism.
If the refresh token itself expires or is revoked, clear the user session and redirect the user through the standard SAML SSO workflow.
Troubleshooting & Verification
If token exchange fails during testing, verify your configuration against the following common issues:
Issue / Error
Cause
Resolution
invalid_grant: SAML assertion invalid
The SAML assertion is expired or signature validation failed.
Ensure clock skew is within tolerance and check that your application passes a fresh, unexpired SAML assertion.
invalid_client: Private key JWT signature verification failed
The client_assertion was signed with an unrecognized key or invalid AI Agent ID.
Verify that the kid in the client assertion header matches the public key registered under Directory > AI Agents > Credentials in Okta.
invalid_target: Resource mismatch
The resource parameter in Step 2 does not match the configured Resource Connection.
Confirm the resource URL matches the exact issuer string configured in Directory > AI Agents > Resource Connections.
unauthorized_client: Scope not permitted
Requested scope is not allowed in the AI Agent resource policy.
Update the Scope Condition in the Resource Connection settings to allow the requested scope.

See also

* [Set up AI agent token exchange](https://developer.okta.com/docs/guides/ai-agent-token-exchange/agent-to-agent/main/): For the Okta for AI Agents token exchange guide
* [Enable Your SAML Requesting App for Cross App Access](https://developer.okta.com/blog/2026/07/17/xaa-saml-requester#xaa-implementation-checklist-for-saml-federated-applications): July 2026 blog on enabling SAML requesting apps for XAA
* [Enabling Cross App Access for SAML-Based Resource Apps](https://developer.okta.com/blog/2026/07/03/cross-app-access-saml): July 2026 blog on enabling SAML resource apps for XAA