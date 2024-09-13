---
title: Configure OAuth 2.0 Demonstrating Proof-of-Possession
excerpt: Learn how to implement OAuth 2.0 Demonstrating Proof-of-Possession
layout: Guides
---

This guide discusses how to create sender-constrained access tokens that are an application-level mechanism for preventing token replays at different endpoints.

---

#### Learning outcomes

* Understand the purpose of Demonstrating Proof-of-Possession
* Understand how to configure OAuth 2.0 Demonstrating Proof-of-Possession (DPoP) for your org and app

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Glitch](https://glitch.com/) project or account
* An [OAuth 2.0 client app](/docs/concepts/oauth-openid/#oauth-2-0) that has the **Require Demonstrating Proof of Possession (DPoP) header in token requests** checkbox enabled.<br>
  If you are using the API, add the [DPoP parameter](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/createApplication!path=4/settings/oauthClient/dpop_bound_access_tokens&t=request) (`dpop_bound_access_tokens: true`) to `settings.oauthClient` in your app.
* Be able to [build a request](/docs/guides/implement-grant-type/authcode/main/#flow-specifics) and obtain an access token for your app.
* Be able to create a [JSON Web Key](https://www.rfc-editor.org/rfc/rfc7517). In a production environment, use your internal instance of a key pair generator to generate the JWK for use with DPoP. See this [key pair generator](https://github.com/mitreid-connect/mkjwk.org) for an example. For testing purposes only, you can use this [simple JWK generator](https://mkjwk.org/) to generate a key pair for an example setup. Use only [asymmetric keys](https://www.okta.com/identity-101/asymmetric-encryption/) with DPoP.

  > **Note:** The JWK that's used for DPoP authentication is separate from the JWK used for client authentication.

---

## Overview

OAuth 2.0 Demonstrating Proof-of-Possession (DPoP) helps prevent unauthorized parties from using leaked or stolen access tokens. When you use DPoP, you create an application-level mechanism to sender-constrain both access and refresh tokens. This helps prevent token replays at different endpoints.

> **Note:** The Okta DPoP feature is based on the current [RFC](https://datatracker.ietf.org/doc/html/rfc9449).

DPoP enables a client to prove possession of a public/private key pair by including a DPoP header in a `/token` endpoint request. The value of the DPoP header is a JSON Web Token (JWT) and is called a DPoP proof. This DPoP proof enables the authorization server to bind issued tokens to the public part of a client's key pair. Recipients of these tokens (such as an <StackSnippet snippet="overview" inline />) can then verify that binding, which provides assurance that the client presenting the token also possesses the private key.

<StackSnippet snippet="overview2" />

## OAuth 2.0 DPoP JWT flow

<StackSnippet snippet="diagram" />

## Before you begin

Create a [DPoP proof JWT](https://www.rfc-editor.org/rfc/rfc7519). A DPoP proof JWT includes a header and payload with claims, and then you sign the JWT with the private key from [your JSON Web Key](#what-you-need) (JWK). You use the DPoP proof JWT to obtain a DPoP-bound access token. Use your internal instance to sign the JWT for a production org. See this [JWT generator](https://github.com/jwtk/njwt) for an example of how to make and use JWTs in Node.js apps. For testing purposes only, you can use this [JWT tool](https://jwt.io/) to build, sign, and decode JWTs.

### Parameters and claims

Include the following required parameters in the JWT header:

* `typ`: Type header. Declares that the encoded object is a JWT and meant for use with DPoP. This must be `dpop+jwt`.
* `alg`: Algorithm. Indicates that the asymmetric algorithm is RS256 (RSA using SHA256). This algorithm uses a private key to sign the JWT and a public key to verify the signature. Must not be `none` or an identifier for a symmetric algorithm. This example uses `RS256`.
* `jwk`: JSON Web Key. Include the public key (in JWK string format). Okta uses this public key to verify the JWT signature. See the [Application JSON Web Key Response properties](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/Client/#tag/Client/operation/createClient!c=201&path=jwks&t=response) for a description of the public key properties.

**Example JWT header**

  ```json
    {
      "typ": "dpop+jwt",
      "alg": "RS256",
      "jwk": {
        "kty": "RSA",
        "e": "AQAB",
        "use": "sig",
        "kid": "XUl71vpgPXgxSTCYHbvbEHDrtj-adpVcxXH3TKjKe7w",
        "alg": "RS256",
        "n": "4LuWNeMa7.....zLvDWaJsF0"
      }
    }
  ```

Include the following required claims in the JWT payload:

<StackSnippet snippet="claims" />

## Configure DPoP

This section explains how to configure DPoP.

> **Note** This guide uses a native app with the `authorization_code` with PKCE and `refresh_token` [grant types](https://developer.okta.com/docs/guides/implement-grant-type/authcode/main/) enabled for the examples.

### Build the request

Your next step is to build the POST request to the `/token` endpoint for an access token. Two requests to the `/token` endpoint are necessary. The initial request obtains the `dpop-nonce` header value from the <StackSnippet snippet="buildreq" inline /> authorization server. The second request includes an updated JWT with the `dpop-nonce` header value in the JWT payload. After you receive a `nonce` value from the `/token` endpoint, you can continue to use that value utnil you receive an error with a new `dpop-nonce` header.

The additional header in the initial request is `DPoP`. The value for `DPoP` is the DPoP proof JWT from the previous section.

Request example:

> **Note:** Some values are truncated for brevity.

<StackSnippet snippet="initialrequest" />

The <StackSnippet snippet="buildreq" inline /> authorization server verifies the JWT in the request and sends back an "Authorization server requires nonce in DPoP proof" error and a `dpop-nonce` header and value.

The <StackSnippet snippet="buildreq" inline /> authorization server provides the `dpop-nonce` value to limit the lifetime of DPoP proof JWTs and renews the value every 24 hours. The old `dpop-nonce` value continues to work for three days after generation. Be sure to save the `dpop-nonce` value from the token response header and refresh it every 24 hours.

Use the value of the `dpop-nonce` header in the JWT payload and update the JWT:

1. Add the `dpop-nonce` header value as the `nonce` claim value in the JWT payload along with a `jti` claim.

    Example payload:

    <StackSnippet snippet="payload2" />

    **Claims**

    * `nonce`: Used only once. A recent `nonce` value provided by the authorization server using the `dpop-nonce` HTTP header. The authorization server provides the DPoP nonce value to limit the lifetime of DPoP proof JWTs.
    * `jti`: JWT ID. A unique [JWT identifier](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.7) for the request

1. Copy the new DPoP proof and add it to the DPoP header in the request.

1. Send the request for an access token again. The <StackSnippet snippet="buildreq" inline /> authorization server should return the access token. In the following example, tokens are truncated for brevity.

    ```json
      {
          "token_type": "DPoP",
          "expires_in": 3600,
          "access_token": "eyJraWQiOiJRVX.....wt7oSakPDUg",
          "scope": "openid offline_access",
          "refresh_token": "3CEz0Zvjs0eG9mu4w36n-c2g6YIqRfyRSsJzFAqEyzw",
          "id_token": "eyJraWQiOiJRVXlG.....m5h5-NAtVFdwD1bg2JprEJQ"
      }
    ```

#### Decode the access token

You can use the [JWT tool](https://jwt.io/) to decode the access token to view the included claims. The decoded access token should look something like this:

<StackSnippet snippet="decoded" />

**Claims**

* `cnf`: Confirmation. Claim that contains the confirmation method.
* `jkt`: JWK confirmation method. A base64url encoding of the JWK SHA-256 hash of the DPoP public key (in JWK format) to which the access token is bound.

> **Note:** If your client has DPoP enabled, then you can't add or modify the `cnf` claim using token inline hooks.

## Make a request to a DPoP-protected resource

Now that you have a DPoP-bound access token, you can make requests to DPoP-protected resources.

<StackSnippet snippet="requestresource" />

## Validate token and DPoP header

The resource server must perform validation on the access token to complete the flow and grant access. When the client sends an access request with the access token, validation should verify that the `cnf` claim is present. Then validation should compare the `jkt` in the access token with the public key in the JWT value of the `DPoP` header.

The following is a high-level overview of the validation steps that the resource server must perform.

> **Note:** The resource server must not grant access to the resource unless all checks are successful.

<StackSnippet snippet="validate" />

<StackSnippet snippet="glitch" />

## Refresh an access token

To refresh your DPoP-bound access token, send a token request with a `grant_type` of `refresh_token`. Then, include the same `DPoP` header value that you used to obtain the refresh token in the `DPoP` header for this request. Include the `openid` scope when you also want to refresh an ID token. In the following examples, tokens are truncated for brevity.

**Example request**

<StackSnippet snippet="refresh" />

**Example response**

```json
{
    "token_type": "DPoP",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJRVXlGdjB.....RxDhLJievVVN5WQrAZlw",
    "scope": "offline_access openid",
    "refresh_token": "3CEz0Zvjs0eG9mu4w36n-c2g6YIqRfyRSsJzFAqEyzw",
    "id_token": "eyJraWQiOiJRVX.....3SA6LTm7mA"
}
```
