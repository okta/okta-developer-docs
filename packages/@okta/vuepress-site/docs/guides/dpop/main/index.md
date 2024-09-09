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

<StackSnippet snippet="whatyouneed" />

---

## Overview

OAuth 2.0 Demonstrating Proof-of-Possession (DPoP) helps prevent unauthorized parties from using leaked or stolen access tokens. When you use DPoP, you create an application-level mechanism to sender-constrain both access and refresh tokens. This helps prevent token replays at different endpoints.

> **Note:** The Okta DPoP feature is based on the current [RFC](https://datatracker.ietf.org/doc/html/rfc9449).

DPoP enables a client to prove possession of a public/private key pair by including a DPoP header in a `/token` endpoint request. The value of the DPoP header is a JSON Web Token (JWT) and is called a DPoP proof. This DPoP proof enables the authorization server to bind issued tokens to the public part of a client's key pair. Recipients of these tokens (such as an <StackSnippet snippet="overview" inline />) can then verify that binding, which provides assurance that the client presenting the token also possesses the private key.

<StackSnippet snippet="overview2" />

## OAuth 2.0 DPoP JWT flow

<StackSnippet snippet="diagram" />

## Before you begin

Create or update an app to include the DPoP parameter. Then, create a JSON Web Key to sign the JSON Web Token (JWT) with for use with DPoP.

### Configure your app with the DPoP parameter

Whether you create an app or update one, be sure to use the following parameters:

> **Note:** The app examples in this guide use a native app.

* Use the `authorization_code` and `refresh_token` grant types.
* Select the **Require Demonstrating Proof of Possession (DPoP) header in token requests** checkbox for **Proof of possession**. If using the API, add the DPoP parameter (`dpop_bound_access_tokens: true`) to `settings.oauthClient`.

> **Note:** See [Implement the Authorization Code grant type](https://developer.okta.com/docs/guides/implement-grant-type/authcode/main/) for more information on configuring your app to use the Authorization Code grant type.>
>
> See the [Request Body Schema](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/createApplication!path=4/settings/oauthClient/dpop_bound_access_tokens&t=request) section of the Applications API reference for more information on the DPoP parameter.

### Create a JSON Web Key

Create a [JSON Web Key](https://www.rfc-editor.org/rfc/rfc7517) (JWK) for use with DPoP. A JWK is a cryptographic key or key pair expressed in JSON format. Use the generated public and private keys to sign the JSON Web Token (JWT) for use with DPoP in the next section.

> **Note:** The JWK that's used for DPoP authentication is separate from the JWK used for client authentication.

Use your internal instance of a key pair generator to generate the public/private key pair for use with DPoP in a production org. See this [key pair generator](https://github.com/mitreid-connect/mkjwk.org) for an example. For testing purposes only, you can use this [simple JWK generator](https://mkjwk.org/) to generate a key pair for an example setup.

1. Use the following values when you use the simple JWK generator, and then click **Generate**.

    * **Key Use**: Signature
    * **Algorithm**: RS256
    * **Key ID**: SHA-256
    * **Show X.509**: Yes

2. Copy the **Public Key**, the **Private Key (X.509 PEM Format)**, and the **Public Key (X.509 PEM Format)** for use in the next steps.

> **Note:** Use only asymmetric keys with DPoP. See [Asymmetric Encryption: Definition, Architecture, Usage](https://www.okta.com/identity-101/asymmetric-encryption/).

### Create the JSON Web Token

A JWT is a compact, URL-safe way to represent claims transferred between two parties. A common use case example for JWTs is to declare the scope of the access token. Create a DPoP proof [JWT](https://www.rfc-editor.org/rfc/rfc7519). A DPoP proof JWT includes a header and payload with claims, and then you sign the JWT with the private key from the [previous section](#create-a-json-web-key). Use use the DPoP proof JWT to obtain a DPoP-bound access token.

Use your internal instance to sign the JWT for a production org. See this [JWT generator](https://github.com/jwtk/njwt) for an example of how to make and use JWTs in Node.js apps. For testing purposes only, you can use this [JWT tool](https://jwt.io/) to build, sign, and decode JWTs. See [Use the JWT tool](#use-the-jwt-tool).

#### Parameters and claims

Include the following required parameters in the JWT header:

* `typ`: Type header. Declares that the encoded object is a JWT and meant for use with DPoP. This must be `dpop+jwt`.
* `alg`: Algorithm. Indicates that the asymmetric algorithm is RS256 (RSA using SHA256). This algorithm uses a private key to sign the JWT and a public key to verify the signature. Must not be `none` or an identifier for a symmetric algorithm. This example uses `RS256`.
* `jwk`: JSON Web Key. Include the public key (in JWK string format) that you create in the [Create a JSON Web Key](#create-a-json-web-key) section. Okta uses this public key to verify the JWT signature. See the [Application JSON Web Key Response properties](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/Client/#tag/Client/operation/createClient!c=201&path=jwks&t=response) for a description of the public key properties.

Include the following required claims in the JWT payload:

<StackSnippet snippet="claims" />

#### Use the JWT tool

Follow these steps if you use the [JWT tool](https://jwt.io/). See the [previous section](#parameters-and-claims) for parameter and claim descriptions.

1. Select **RS256** as the **Algorithm**.
2. Build the JWT header in the **HEADER** section. Include the public key from the public/private key pair generated in the [previous section](#create-a-json-web-key).

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

3. In the **PAYLOAD** section, build the JWT payload and include the following claims:

  <StackSnippet snippet="payload" />

4. In the **VERIFY SIGNATURE** section:

    * **First box:** Paste the public key (X.509 PEM format) from the previous section.
    * **Second box:** Paste the private key (X.509 PEM format).

5. Copy the JWT that appears in the **Encoded** section.


## Implement DPoP

This section explains how to implement DPoP.

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

## Make a request to a non-Okta resource

Now that you have a DPoP-bound access token, you can make requests to DPoP-protected resources. The following example request displays the DPoP-bound access token in the `Authorization` header and the DPoP proof JWT in the `DPoP` header. Values are truncated for brevity.

```bash
curl -v -X GET \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: DPoP eyJraWQiOiJRVX.....wt7oSakPDUg' \
  --header 'DPoP: eyJ0eXAiOiJkcG9w.....H8-u9gaK2-oIj8ipg' \
  "https://resource.example.org"
```

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
