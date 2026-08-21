---
title: Implement XAA token exchange for your requesting app
excerpt: Implement XAA token exchange for your requesting app
layout: Guides
---

This guide explains how to enable Cross App Access (XAA) token exchange for a requesting agentic app (client) that federates enterprise users through Security Assertion Markup Language (SAML) 2.0.

---

#### Learning outcomes

Understand how to implement the XAA token exchange sequences necessary for a requesting agentic app (the XAA client).

#### What you need

* An agentic app that federates enterprise users through SAML 2.0, and assumes the requesting app role in the XAA flow
* An Okta org used for SAML 2.0 federation, such as an [Okta Integrator Free Plan org](https://developer.okta.com/signup)
  * You've registered your requesting app with SAML SSO and XAA capabilities in your Okta org. See [Create SAML app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-saml) and [Configure the requesting app](/docs/guides/xaa-agent-to-app/main/#configure-the-ai-agent-requesting-app).
  [[style="list-style-type:square"]]

---

## Overview

The [Identity Assertion JWT Authorization Grant](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-identity-assertion-authz-grant) specification, which forms the basis for XAA, was originally designed for OpenID Connect (OIDC). By following this guide, you can support XAA in SAML-based agentic apps without migrating your core authentication infrastructure to OIDC. Review the [XAA concept](/docs/concepts/xaa/) for more information.

This guide focuses on the interactions required for the **Client (requesting app)** in the following XAA token exchange flow:

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

## Okta configuration variables

You need to to pass configuration values from the Okta org and resource server to your requesting app at runtime to complete the XAA flow. The table below provides the minimium variables you need to pass to your SAML requesting app:

| Variable | Description |
|---|---|
| `{yourOktaDomain}` | Your Okta org domain. For example, `integrator-1234567.okta.com`. |
| `{samlMetadataUrl}` | The URL to your SAML SSO metadata in XML format. For example, `https://integrator-1234567.okta.com/app/my-saml-requesting-app_1/exkzkmlrpqpLBtMPL1d7/sso/saml` |
| `{spAcsUrl}` | The service provider (SP) ACS URL. The SP is your requesting app. For example: `http://localhost:52118/saml/acs` |
| `{spEntityId}` | The SP entity ID. This is a globally unique URI that identifies your SAML requesting app to the IdP. For example: `http://localhost/sso-debug` |
| `{spSigningKey}` | The SP signing key. `private key JWK (kid 623a99274239c682f400554a325c3f40)` |
| `{agentId}` | The AI agent ID. The agent assumes the role of the client, so this is also referred to as the client ID. For example, `wlpzkmw02c30VEZru1d7`. |
| `{agentKey}` | The AI agent's private key. The agent assumes the role of the client, so this is also referred to as the client private key. |
| `{resourceAud}` | The resource audience. For example, `http://motd.local3:31245/`. |
| `{resourceTokenUrl}` | The resource token URL. For example, `http://motd.local3:31245/token` |
| `{resourceApiUrl}` | The resource API URL. For example, `http://motd.local3:31245/motd` |
| `{clientRefreshScopes}` | The refresh scopes for the SAML requesting app. For example, `openid offline_access email`. |
| `{idJagScopes}` | The scopes for the ID-JAG token. For example, `my.xaa.a.read my.xaa.b.manage` |
| `{idPSignCert}` | The IdP signing certificate for the SAML requesting app in PEM format. |

Some values are obtained after you register your agentic requesting app and resource server in your Okta org.

1. See [Configure the AI agent (requesting app)](/docs/guides/xaa-agent-to-app/main/#configure-the-ai-agent-requesting-app) to register your agentic requesting app in Okta. At the end of this process, you have two objects and the following variables to pass to your app:
    1. AI agent: `{agentId}` as the AI agent's unique ID, `{agentKey}` as the AI agent's client private key.
    [[style="list-style-type:lower-alpha"]]
    1. The SAML app integration instance: `{samlMetadataUrl}` as the SAML assertion in XML, `{idPSignCert}` as the IdP's SAML signing certificates
1. See [Configure the resource app](/docs/guides/xaa-agent-to-app/main/#configure-the-resource-app) to register your resource server in Okta. At the end of this process, you have an app integration instance and the following variables to pass to your app:
    1. App integration instance : `{resourceAud}` as the resource audience, `{resourceTokenUrl}` as the resource token URL, and `{resourceApiUrl}` as the resource API URLs your AI agent wants to access.
    [[style="list-style-type:lower-alpha"]]

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

1. **[User SSO](#user-sso)**:
   1. The user initiates sign in to your app, which uses the IdP to SSO with SAML 2.0
   [[style="list-style-type:lower-alpha"]]
   1. After the user is authenticated, the IdP returns the SAML assertion response to your app.
   1. Your app uses the SAML assertion to request for a refresh token from the IdP

1. **Refresh token issued**: The IdP returns a refresh token.
1. **[Token exchange for ID-JAG](#token-exchange-for-id-jag)**: To access a specific resource on behalf of the user, your app exchanges the refresh token to obtain an Identity Assertion JWT Authorization Grant (ID-JAG) token.
1. **ID-JAG token issued**: The IdP issues an ID-JAG token to the client if the client has a trusted connection to the resource server.
1. **JWT Authorization Grant**: Your app presents the ID-JAG token to the resource authorization server.
1. **Resource access token issued**: The resource authorization server validates the ID-JAG and issues a short-lived, scoped access token.
1. **Client accesses resource data**: The requesting client uses the short-lived, scoped token to access the protected resource app on the user's behalf.

---

### User SSO

1. When a user signs into your federated app, your app uses SAML and redirects the user to the IdP for SSO. As a prerequisite for this to happen, your app has to integrate and register with the IdP with SAML SSO. See [SAML concept](/docs/concepts/saml/) and [SAML app integrations](https://help.okta.com/okta_help.htm?id=ext-apps-about-saml) in the product documentation for details.

2. After the user is authenticated, the IdP returns the users's SAML assertion response (`<SAMLResponse>`) to your requesting app. Save this base64-encoded SAML response as `{SAMLReponse}` for the refresh token exchange.

3. Use the SAML assertion to exchange for a refresh token from your Okta org's [OAuth 2.0 token endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/orgas/token). This exchange follows the [OAuth 2.0 Token Exchange (RFC 8693)](https://datatracker.ietf.org/doc/html/rfc8693) specification.

   Add code to your app to handle the token exchange:

   1. Create the client assertion JWT (the `{client_assertion}` used in the token exchange). See [Build a JWT for client authentication](/docs/guides/build-self-signed-jwt/js/main/).
    [[style="list-style-type:lower-alpha"]]

      This assertion is in `private_key_jwt` form and tells the IdP who the client is.  Specify the following claims in your JWT payload:

      | Claim    | Description                                                  | Type        |
      |----------|--------------------------------------------------------------|-------------|
      | `aud`      | The full URL of the resource that you're trying to access using the JWT to authenticate. Set to the Okta IdP's token exchange endpoint: `https://{yourOktaDomain}/oauth2/v1/token` | String  |
      | `iss`      | Set to `{agentId}`. The issuer of the token. | String      |
      | `sub`      | Set to `{agentId}`. The subject of the token.  | String      |
      | `exp`      | The token expiration time in UNIX timestamp format. This claim fails the request if the expiration time is more than one hour in the future or if the token is already expired. | Integer |
      | `jti`      | Optional. The unique token identifier. If you specify this parameter, the token can only be used once and, as a result, subsequent token requests don't succeed. | String   |
      | `iat`      | Optional. When the token was issued in UNIX timestamp format. If specified, it must be a time before the request is received. | Integer |

      Sign your JWT with the private key from the AI agent (`{agentKey}`) in Okta. See [Build a JWT with a private key](https://developer.okta.com/docs/guides/build-self-signed-jwt/js/main/#build-a-jwt-with-a-private-key) for guidance on how to build your JWT with a private key.

     1. Send a POST request to your Okta org's [OAuth 2.0 token endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/orgas/token) with the following parameters to obtain a refresh token.

        | Parameter             | Type   | Required | Description   |
        |-----------------------|--------|----------|-----------------------------|
        | `grant_type`          | String | Yes      | Set to `urn:ietf:params:oauth:grant-type:token-exchange`. |
        | `client_id`           | String | Yes      | Set to `{agentId}`. This is client ID of the requesting app role, which is the AI agent in Okta. |
        | `client_assertion_type` | String | Yes    | Set to `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
        | `client_assertion`    | String | Yes      | Set to `{client_assertion}`, the signed JWT generated from the previous step. |
        | `subject_token`       | String | Yes      | Set to `{SAMLResponse}`, the base64-encoded SAML 2.0 assertion received from the IdP.  |
        | `subject_token_type`  | String | Yes      | Set to `urn:ietf:params:oauth:token-type:saml2` |
        | `requested_token_type` | String | Yes     | Set to `urn:ietf:params:oauth:token-type:refresh_token` |
        | `scope`               | String | Yes      | Set to `openid offline_access email` (`offline_access` is required to issue a refresh token). |

          ```bash
          POST /oauth2/v1/token HTTP/1.1
          Host: {yourOktaDomain}
          Content-Type: application/x-www-form-urlencoded

          grant_type=urn:ietf:params:oauth:grant-type:token-exchange&
          subject_token={SAMLResponse}&
          subject_token_type=urn:ietf:params:oauth:token-type:saml2&
          requested_token_type=urn:ietf:params:oauth:token-type:refresh_token&
          scope=openid+offline_access+email&
          client_id={agentId}&
          client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&
          client_assertion={client_assertion}
          ```

4. After the refresh token exchange request is sent, the IdP (Okta) responds with the requested token. For example:

```JSON
{
    "access_token": "eyJraWQ.....rm8EA4osYg",
    "expires_in": 7776000,
    "issued_token_type": "urn:ietf:params:oauth:token-type:refresh_token",
    "scope": "offline_access openid",
    "token_type": "N_A",
}
```

Despite the returned property name of `access_token`, this value is the refresh token. The `issued_token_type` is authoritative and indicates what type of token is returned. Save the `access_token` value as the `{refresh_token}` variable to use in your token exchange for ID-JAG in the next step.

### Token exchange for ID-JAG

Use the refresh token obtained from the previous step to request an ID-JAG token from the Okta org authorization server. The ID-JAG acts as the signed identity assertion presented to the target resource.

> **Note:** You're using the same Okta org authorization server's [OAuth 2.0 token endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/orgas/token) for this token exchange.

| Parameter             | Type   | Required | Description   |
|-----------------------|--------|----------|-----------------------------|
| `grant_type`          | String | Yes      | Set to `urn:ietf:params:oauth:grant-type:token-exchange`. |
| `client_id`           | String | Yes      | Set to `{agentId}`. This is client ID of the requesting app role, which is the AI agent in Okta. |
| `client_assertion_type` | String | Yes    | Set to `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| `client_assertion`    | String | Yes      | Set to `{client_assertion_idjag}`, the signed JWT generated from the previous step. |
| `subject_token`       | String | Yes      | Set to `{refresh_token}`, which identifies the user. |
| `subject_token_type`  | String | Yes      | Set to `urn:ietf:params:oauth:token-type:refresh_token` |
| `requested_token_type` | String | Yes     | Set to `urn:ietf:params:oauth:token-type:id-jag` |
| `scope`               | String | Yes      | Set to `{idJagScopes}`, the scopes allowed to access the resource server |


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