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

## Variables used in the XAA token exchange

You need to to pass configuration values from the Okta org and resource server to your requesting app at runtime to complete the XAA flow. The following table provides the variables you need in your requesting app.

| Variable | Description |
|---|---|
| `{yourOktaDomain}` | Your Okta org domain. For example, `integrator-1234567.okta.com`. |
| `{clientId}` | The AI agent assumes the role of the client, so this is the AI agent's client ID. You can find this value in the AI agent's **Client registration** tab. For example, `wlpa0eiuaoCNrpoaE0g7`. |
| `{clientKey}` | The agent assumes the role of the client, so this is the AI agent's client private key. You can find this value in the AI agent's **Client registration** tab.|
| `{clientRefreshScopes}` | The refresh scopes for the SAML requesting app. For example, `openid offline_access email`. |
| `{SAMLReponse}` | The base64-encoded SAML assertion response from the IdP to the agentic requesting app after the user is authenticated. |
| `{idJagScopes}` | The scopes for the ID-JAG token. These are the scopes that the AI agent wants to access in the resource server. For example, `my.xaa.a.read my.xaa.b.manage` |
| `{resourceAud}` | The resource's authorization server issuer URI. This is the resource audience where the client intends to send the ID-JAG. For example, `https://as.myresource.com`. |
| `{resourceTokenUrl}` | The resource token URL. For example, `https://as.myresource.com/oauth/v1/token` |
| `{resourceApiUrl}` | The resource server's API base URL. For example, `https://myresource.example.com/api/v1/` |
| `{resourceClientId}` | The resource server's client ID. If you've registered the resource server in Okta, this is the resource app's client ID value. |
| `{resourceClientSecret}` | The resource server's client secret. If you've registered the resource server in Okta, this is the resource app's client secret value. |
| `{idPSignCert}` | The IdP signing certificate for the SAML requesting app in PEM format. |
| `{samlMetadataUrl}` | The URL to your SAML SSO metadata in XML format. For example, `https://integrator-1234567.okta.com/app/my-saml-requesting-app_1/exkzkmlrpqpLBtMPL1d7/sso/saml` |
| `{spAcsUrl}` | The service provider (SP) ACS URL. The SP is your requesting app. For example: `http://localhost:52118/saml/acs` |
| `{spEntityId}` | The SP entity ID. This is a globally unique URI that identifies your SAML requesting app to the IdP. For example: `http://localhost/sso-debug` |
| `{spSigningKey}` | The SP signing key. `private key JWK (kid 623a99274239c682f400554a325c3f40)` |

Some values are obtained after you register your agentic requesting app and resource server in your Okta org.

1. See [Configure the AI agent (requesting app)](/docs/guides/xaa-agent-to-app/main/#configure-the-ai-agent-requesting-app) to register your agentic requesting app in Okta. At the end of this process, you have two objects and the following variables to pass to your app:
    1. AI agent: `{clientId}` as the AI agent's client ID, `{clientKey}` as the AI agent's client private key. For AI Agents registering with an OIDC app, the AI agent's ID and the OIDC app's client ID are the same value.
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
1. **[Exchange ID-JAG for access token](#exchange-id-jag-for-access-token)**: Your app presents the ID-JAG token to the resource authorization server for an access token.
1. **Resource access token issued**: The resource authorization server validates the ID-JAG and issues a short-lived, scoped access token.
1. **[Client accesses resource data](#client-access-resource-data)**: The requesting client (AI agent) uses the short-lived, scoped token to access the protected resource app on the user's behalf.

---

### User SSO

1. When a user signs into your federated app, your app uses SAML and redirects the user to the IdP for SSO. As a prerequisite for this to happen, your app has to integrate and register with the IdP with SAML SSO. See [SAML concept](/docs/concepts/saml/) and [SAML app integrations](https://help.okta.com/okta_help.htm?id=ext-apps-about-saml) in the product documentation for details.

2. After the user is authenticated, the IdP returns the users's SAML assertion response (`<SAMLResponse>`) to your requesting app. Save this base64-encoded SAML response as `{SAMLReponse}` for the refresh token exchange.

3. Use the SAML assertion to exchange for a refresh token from your Okta org's [OAuth 2.0 token endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/orgas/token). This exchange follows the [OAuth 2.0 Token Exchange (RFC 8693)](https://datatracker.ietf.org/doc/html/rfc8693) specification.

   Add code to your app to handle the token exchange:

   1. Create a client assertion JWT (`{client_assertion}`) for the token exchange payload. This assertion is in `private_key_jwt` form and informs the IdP who the client is. Specify the following claims in your JWT payload:
    [[style="list-style-type:lower-alpha"]]

      | Claim    | Type    | Description                                                  |
      |----------|---------|--------------------------------------------------------------|
      | `aud`    | String  | Set to `https://{yourOktaDomain}/oauth2/v1/token` (Okta's token exchange endpoint). This is the full URL of the resource that you're trying to access using the JWT to authenticate.  |
      | `iss`    | String  | Set to `{clientId}`. The AI agent's client ID, which is the issuer of the token. |
      | `sub`    | String  | Set to `{clientId}`. The AI agent's client ID, which the subject of the token.  |
      | `exp`    | Integer | The token expiration time in UNIX timestamp format. The request fails from this claim if the expiration time is more than one hour in the future or if the token is already expired. |
      | `jti`    | String  | Optional. The unique token identifier. If you specify this parameter, the token can only be used once and, as a result, subsequent token requests don't succeed. |
      | `iat`    | Integer | Optional. When the token was issued in UNIX timestamp format. If specified, it must be a time before the request is received. |

      Sign your JWT with the private key from the AI agent (`{clientKey}`) in Okta. See [Build a JWT with a private key](https://developer.okta.com/docs/guides/build-self-signed-jwt/js/main/#build-a-jwt-with-a-private-key) for guidance on how to build your JWT with a private key.

   1. Send a POST request to your Okta org's [OAuth 2.0 token endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/orgas/token) with the following parameters to obtain a refresh token.

        | Parameter              | Type   | Description |
        |------------------------|--------|-------------|
        | `grant_type`           | String | Set to `urn:ietf:params:oauth:grant-type:token-exchange`. |
        | `client_id`            | String | Set to `{clientId}`. This is client ID of the requesting app role, which is the AI agent in Okta. |
        | `client_assertion_type`| String | Set to `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
        | `client_assertion`     | String | Set to `{client_assertion}`, the signed JWT generated from the previous step. |
        | `subject_token`        | String | Set to `{SAMLResponse}`, the base64-encoded SAML 2.0 assertion received from the IdP. |
        | `subject_token_type`   | String | Set to `urn:ietf:params:oauth:token-type:saml2` |
        | `requested_token_type` | String | Set to `urn:ietf:params:oauth:token-type:refresh_token` |
        | `scope`                | String | Set to `openid offline_access email` (`offline_access` is required to issue a refresh token). |

        For example:

        ```bash
        POST /oauth2/v1/token HTTP/1.1
        Host: {yourOktaDomain}
        Content-Type: application/x-www-form-urlencoded

        grant_type=urn:ietf:params:oauth:grant-type:token-exchange&
        subject_token={SAMLResponse}&
        subject_token_type=urn:ietf:params:oauth:token-type:saml2&
        requested_token_type=urn:ietf:params:oauth:token-type:refresh_token&
        scope=openid+offline_access+email&
        client_id={clientId}&
        client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&
        client_assertion={client_assertion}
        ```

4. After the refresh token exchange request is sent, the IdP (Okta) responds with the requested token. For example:

```JSON
{
    "access_token": "eyJraWQ.....rm8EA4osYg",
    "expires_in": 3600,
    "issued_token_type": "urn:ietf:params:oauth:token-type:refresh_token",
    "scope": "offline_access openid",
    "token_type": "N_A",
}
```

The `access_token` property value contains the refresh token. The `issued_token_type` is authoritative and indicates what type of token is returned. Save the `access_token` value as the `{refresh_token}` variable to use in your token exchange for ID-JAG in the next step.

### Token exchange for ID-JAG

Use the refresh token obtained from the previous step to request an ID-JAG token from the Okta org authorization server. The ID-JAG acts as the signed identity assertion presented to the target resource.

> **Note:** You're using the same Okta org authorization server's [OAuth 2.0 token endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/orgas/token) for this token exchange.

#### Create a client assertion JWT

Before the token exchange request, create a client assertion JWT (`{client_assertion}`) for the payload. Specify the following claims in your JWT payload:

| Claim    | Type    | Description                                                  |
|----------|---------|--------------------------------------------------------------|
| `aud`    | String  | Set to `https://{yourOktaDomain}/oauth2/v1/token` (Okta's token exchange endpoint). This is the full URL of the resource that you're trying to access using the JWT to authenticate. |
| `iss`    | String  | Set to `{clientId}`. The AI agent's client ID, which is the issuer of the token. |
| `sub`    | String  | Set to `{clientId}`. The AI agent's client ID, which the subject of the token.  |
| `exp`    | Integer | The token expiration time in UNIX timestamp format. The request fails from this claim if the expiration time is more than one hour in the future or if the token is already expired. |
| `jti`    | String  | Optional. The unique token identifier. If you specify this parameter, the token can only be used once and, as a result, subsequent token requests don't succeed. |
| `iat`    | Integer | Optional. When the token was issued in UNIX timestamp format. If specified, it must be a time before the request is received. |

Sign your JWT with the client private key from the AI agent (`{clientKey}`) in Okta. See [Build a JWT with a private key](https://developer.okta.com/docs/guides/build-self-signed-jwt/js/main/#build-a-jwt-with-a-private-key) for guidance on how to build your JWT with a private key.

#### Send the ID-JAG token exchange request

Send a POST request to your Okta org's [OAuth 2.0 token endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/orgas/token) with the following parameters to obtain an ID-JAG token.

| Parameter              | Type   | Description |
|------------------------|--------|-------------|
| `grant_type`           | String | Set to `urn:ietf:params:oauth:grant-type:token-exchange`. |
| `client_id`            | String | Set to `{clientId}`. This is client ID of the requesting app role, which is the AI agent in Okta. |
| `client_assertion_type`| String | Set to `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| `client_assertion`     | String | Set to `{client_assertion}`, the signed JWT generated from [Create a client assertion JWT](#create-a-client-assertion-jwt). |
| `subject_token`        | String | Set to `{refresh_token}`, which identifies the user. |
| `subject_token_type`   | String | Set to `urn:ietf:params:oauth:token-type:refresh_token` |
| `requested_token_type` | String | Set to `urn:ietf:params:oauth:token-type:id-jag` |
| `audience`             | String | Set to `{resourceAud}`, the issuer URL of the resource app's authorization server. |
| `scope`                | String | Set to `{idJagScopes}`, the scopes requested to access the resource server. |
| `resource`             | String | Set to `{resourceApiUrl}`, the resource server's API base URL. |
| `actor_token`          | String | Set to `{client_assertion}`, the signed JWT generated from [Create a client assertion JWT](#create-a-client-assertion-jwt). In the SAML requesting app XAA flow, this parameter is the delegated actor (the party authorized to act on behalf of the subject). |
| `actor_token_type`     | String | Set to `urn:ietf:params:oauth:token-type:jwt`. Specify this parameter when `actor_token` is provided. |

For example:

```bash
POST /oauth2/v1/token HTTP/1.1
Host: your-okta-domain.okta.com
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:token-exchange&
client_id={clientId}&
client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&
client_assertion={client_assertion}&
subject_token={refresh_token}&
subject_token_type=urn:ietf:params:oauth:token-type:refresh_token&
requested_token_type=urn:ietf:params:oauth:token-type:id-jag&
audience={resourceAud}&
scope={idJagScopes}&
resource={resourceApiUrl}&
actor_token={client_assertion}&
actor_token_type=urn:ietf:params:oauth:token-type:jwt
```

After the ID-JAG token exchange request is sent, the IdP (Okta) responds with the requested token. For example:

```json
{
  "access_token": "eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWV...",
  "expires_in": 300,
  "issued_token_type": "urn:ietf:params:oauth:token-type:id-jag",
  "token_type": "N_A"
}
```

The returned `access_token` value contains the ID-JAG token. The `issued_token_type` indicates what type of token is returned. Save the `access_token` value in the `{id-jag_token}` variable to use in your request for an access token from the resource's authorization server.

#### Contents of ID-JAG

If you decode the ID-JAG token, the following payload appears for a SAML requesting app that has the AI agent as a delegated actor.

ID-JAG payload example:

```JSON
// header
{ "kid": "1T4g9ux3EsFK_tpGeqfv7lIccFt9SPV5AqlhrMI2adE",
  "typ": "oauth-id-jag+jwt", "alg": "RS256" }
// payload
{
  "sub": "00uzkk8ctx1WtQ8fy1d7",     // The user (from SAML NameID)
  "sub_profile": "user",
  "act": {                           // The delegation
    "sub": "wlpa0eiuaoCNrpoaE0g7",   // The AI agent (from {client_assertion})
    "sub_profile": "ai_agent"
  },
  "aud": "https://as.myresource.com", // The resource audience: {resourceAud}
  "client_id": "0oaa0esowyOyPreaI0g7",   // The resource server's client ID: {resourceClientId}
  "email": "example.user@okta.com",    // The user's email
  "scope": "my.xaa.a.read my.xaa.b.manage",             // resource server scopes requested: {idJagScopes}
  "iss": "https://{yourOktaDomain}", // The Okta org that issued the ID-JAG
  "iat": 1781223753,
  "exp": 1781224053,                 // 5-minute lifetime
  "jti": "IDAAG.OmT8mh0IPyEwvTM6MYodfTFB_dYo4JmZIHP4tnh9xoA"
}
```

> **Note:** When the ID-JAG expires, you can request for a new ID-JAG using the refresh token. If you use an expired refresh token, your ID-JAG request returns an `invalid_grant` error. You need to obtain a new refresh token by having the user sign in through SSO again.

### Exchange ID-JAG for access token

Send the ID-JAG token to the resource authorization server for an access token. Your requesting app uses the `{resourceTokenUrl}` value to send the access token request. For authorization, the following examples used the base64-encoded `{resourceClientId}` and `{resourceClientSecret}` values. You need to use the authorization scheme supported by the resource server. These values need to be preconfigured in your app or passed in as a variable (see [Variables used in the XAA token exchange](#variables-used-in-the-xaa-token-exchange)).

Access token request example:

```bash
POST {resourceTokenUrl} HTTP/1.1
Host: the-resource-server.example.com
Content-Type: application/x-www-form-urlencoded
Authorization: Basic <base64({resourceClientId}:{resourceClientSecret})>

grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&
assertion={id-jag_token}&
scope={IdJagScopes}
```

The resource authorization server validates the ID-JAG token. It resolves the user ID and verifies that the user has access to the requested resources before returning an access token.

Access token response example:

```json
{
  "access_token": "cd1c5a78d5e5d257aa257fa967f377218151f935d085899285e56a92c45a4c438e0aa389bfcbef0b",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

In this example, the resource authorization server returns an access token for the AI agent to use on behalf of the specified user for one hour.
Save the access token value as `{resource_access_token}` and use it to access the resource APIs.

### Client access resource data

The requesting client (AI agent) uses the short-lived, scoped access token to access the protected resource app on the user's behalf. For example:

```bash
GET https://{resourceApiUrl}/{resourceXXX}/
Authorization: Bearer {resource_access_token}
```

## Handle token expiration and renewal

If your tokens expire in the XAA flow, you can request for another token depending on the condition of the token:

* When the resource access token expires, you need to request for another access token through the ID-JAG request. See [Exchange ID-JAG for access token](#exchange-id-jag-for-access-token) if the ID-JAG token hasn't expired and you're requesting for the same resource scopes as the original ID-JAG.
* If the ID-JAG token expired, you need can reuse the refresh token to perform another token exchange. See [Token exchange for ID-JAG](#token-exchange-for-id-jag) with the existing refresh token.
* If the refresh token expired, obtain a new refresh token by having the user sign in through SSO again. See [User SSO](#user-sso).


## Troubleshooting

The following list provides common issues, causes, and resolutions for the XAA token exchange.

| Issue / Error | Cause | Resolution |
| --- | --- | --- |
| `invalid_client`: Private key JWT signature verification failed | The `client_assertion` was signed with an unrecognized key or invalid AI Agent ID. | Verify that the `kid` in the client assertion header matches the public key registered under **Directory > AI Agents > Client registration** in Okta. See [Create a client assertion JWT](#create-a-client-assertion-jwt). |
| `invalid_grant`: SAML assertion invalid | The SAML assertion is expired or signature validation failed. | Ensure that your app passes a fresh, unexpired SAML assertion. |
| `invalid_target`: Resource mismatch | The `resource` parameter in [Token exchange for ID-JAG](#token-exchange-for-id-jag) doesn't match the configured resource connection in Okta. | Confirm that the resource URL matches the exact issuer string configured in **Directory > AI Agents > Resource connections**. |
| `unauthorized_client`: Scope not permitted | Requested scope isn't allowed in the AI Agent resource connection policy. | Update the scopes in the **Directory > AI Agents > Resource connections** settings to allow the requested scope. |
| "invalid subject token" | Possible cause is that the the SAML audience isn't configured properly. | The SAML audience needs to be set to the client ID of the AI agent.  |
| "Failed to save XAA configuration. Please try again." | An error message appears from configuring XAA resource app in Okta. A possible reason is that the issuer URL is assgined to another app. | Verify the issuer URL in the resource app configuration in Okta. |
| No email appears in ID-JAG | `email` isn't populated in the decoded ID-JAG payload. | Ensure that the "Name ID format" is set to `EmailAddress` on the SAML resource app. Also ensure that the user is assigned to the resource app. |
| `requested_token_type` invalid or not supported | IdP authorization server might not support XAA | Verify that you're making the request to the Okta org authorization server, and not to an Okta custom authorization server. There should be no `/default/` in the token endpoint URL. | 

## See also

* [Set up AI agent token exchange](https://developer.okta.com/docs/guides/ai-agent-token-exchange/agent-to-agent/main/): For the Okta for AI Agents token exchange guide
* [Enable Your SAML Requesting App for Cross App Access](https://developer.okta.com/blog/2026/07/17/xaa-saml-requester#xaa-implementation-checklist-for-saml-federated-applications): July 2026 blog on enabling SAML requesting apps for XAA
* [Enabling Cross App Access for SAML-Based Resource Apps](https://developer.okta.com/blog/2026/07/03/cross-app-access-saml): July 2026 blog on enabling SAML resource apps for XAA