---
title: Configure OAuth 2.0 Demonstrating Proof-of-Possession
excerpt: Learn how to implement OAuth 2.0 Demonstrating Proof-of-Possession
layout: Guides
---

This guide discusses how to create sender-constrained access tokens that are an application-level mechanism for preventing token replays at different endpoints.

---

**Learning outcomes**

* Understand the purpose of Demonstrating Proof-of-Possession
* Understand how to configure OAuth 2.0 Demonstrating Proof-of-Possession (DPoP) for your org and app

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Glitch](https://glitch.com/) project or account
* The OAuth 2.0 Demonstrating Proof-of-Possession feature enabled for your org. From the left navigation pane in the Admin Console, go to **Settings** > **Features**, locate the OAuth 2.0 Demonstrating Proof-of-Possession feature and enable.

---

## Overview

OAuth 2.0 Demonstrating Proof-of-Possession (DPoP) helps prevent unauthorized or illegitimate parties from using leaked or stolen access tokens. When you use DPoP, you create an application-level mechanism to sender-constrain both access and refresh tokens, which helps prevent token replays at different endpoints.

> **Note:** The Okta DPoP feature is based on the current [DPoP draft specification](https://www.ietf.org/archive/id/draft-ietf-oauth-dpop-04.html). Okta intends to address any enhancements or modifications made to the specification before ratification.

DPoP enables a client to prove possession of a public/private key pair by including a DPoP header in a `/token` endpoint request. The value of the DPoP header is a JSON Web Token (JWT) that enables the authorization server to bind issued tokens to the public part of a client's key pair. Recipients of these tokens (such as an API) can then verify that binding, which provides assurance that the client presenting the token also possesses the private key.

## OAuth 2.0 DPoP JWT flow

<div class="three-quarter">

![Sequence diagram that displays the back and forth between the client, authorization server, and resource server for Demonstrating Proof-of-Possession](/img/authorization/Dpopflow.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true
participant "OIDC client" as client
participant "Authorization server" as as
participant "Resource server" as rs

autonumber "<b>#."
client -> client: Generates public/private key pair for use with DPoP
client -> client: Adds public key to JWT header and signs JWT with private key
client -> as: Adds JWT to `DPoP` request header and sends request to token endpoint
as -> client: Verifies `DPoP` header and sends error with `dpop-nonce` header in response
client -> as: Adds `nonce` and `jti` values to JWT payload and sends request again
as -> client: Binds public key to access token and sends response
client -> rs: Sends DPoP-bound access token to resource server
rs -> client: Validates the DPoP-bound access token and grants access to client
@enduml

-->

> **Note:** These steps assume that you've already made a request to the `/authorize` endpoint to obtain the authorization code for the [Authorization Code with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/) flow.

1. Client generates a public/private key pair for use with DPoP.
2. Client adds the public key in the header of the JWT and signs the JWT with the private key.
3. Client adds the JWT to the `DPoP` request header and sends the request to the `/token` endpoint for an access token.
4. The authorization server verifies the `DPoP` header and sends back an "Authorization server requires nonce in DPoP proof"  error and includes the `dpop-nonce` header in the response.
5. Client adds the `nonce` and `jti` values to the JWT payload, updates the request header with the new JWT value, and sends the access token request again.
6. The authorization server binds the public key to the access token and sends the response.
7. Client sends the request for access to the resource and includes the DPoP-bound access token and the DPoP proof JWT in the header.
8. The resource validates the DPoP-bound access token by verifying that the public key of the DPoP proof JWT in the `DPoP` header matches the public key that the access token is bound to. When validation is successful, the resource grants access.

## Configure DPoP

This section explains how to configure DPoP in your org and prepare the DPoP JWT.

### Configure the app integration

Create or update an app to include the DPoP parameter.

#### Create an app

1. Sign in to your Okta organization with your administrator account and go to **Applications** > **Applications**.
2. Click **Create App Integration**.
3. Select **OIDC - OpenID Connect**, and then **Native Application**.
4. Name your application and scroll down to the bottom of the page and select **Allow everyone in your organization to access**.
5. Click **Save** and then click **Edit** in the **General Settings** section of the page that appears.
6. Select the **Require Demonstrating Proof of Possession (DPoP) header in token requests** checkbox for **Proof of possession**.
7. Click **Save**.

#### Update an existing app

1. On the **Applications** page, open the app.
2. Click **Edit** in **General Settings**.
3. Select the **Require Demonstrating Proof of Possession (DPoP) header in token requests** checkbox for **Proof of possession**.
4. Click **Save**.

#### Use the API

You can also use the Apps API to create an OAuth 2.0 client app and enable the DPoP parameter. Use the following parameters in the request:

* `response_types`: This example uses the Authorization Code grant type, so `code` is the correct response type.
* `grant_types`: This example uses `authorization_code` and `refresh_token`.
* `dpop_bound_access_tokens`: This example uses `true` to indicate that the app accepts DPoP-bound access tokens.

> **Note:** See the [Request Body Schema](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/createApplication) section of the Applications API reference for more information on the new DPoP parameter.

**Example request**

In the POST (create the client app) or PUT (update the client app) request, add the DPoP parameter to `settings.oauthClient`:

```json
{
  "id":"0oafj3uhoKh5M9izF0g4",
  "name":"oidc_client",
  "label":"[Dev App] SPA Client",
  "status":"ACTIVE",
  "settings": {
    "oauthClient": {
      "response_types":["code"],
      "grant_types":[
            "authorization_code",
            "refresh_token"
      ],
      "application_type":"browser",
      "wildcard_redirect":"DISABLED"
      "dpop_bound_access_tokens": true
    }
  }
}
```

### Create a JSON Web Key

Create a [JSON Web Key](https://www.rfc-editor.org/rfc/rfc7517) (JWK) for use with DPoP. A JWK is a cryptographic key or key pair expressed in JSON format. You use the generated public and private key to sign the JSON Web Token (JWT) for use with DPoP in the next section.

> **Note:** The JWK that is used for DPoP authentication is separate from the JWK used for client authentication.

Use your internal instance of a key pair generator to generate the public/private key pair for use with DPoP in a production org. See this [key pair generator](https://github.com/mitreid-connect/mkjwk.org) for an example.

> **Note:** Use only asymmetric keys with DPoP. See [Asymmetric Encryption: Definition, Architecture, Usage](https://www.okta.com/identity-101/asymmetric-encryption/).

For testing purposes only, you can use the [simple JWK generator](https://mkjwk.org/) to generate a key pair. Follow these steps if you use the simple JWK generator:

1. Select the following and then click **Generate**.

    * **Key Use**: Signature
    * **Algorithm**: RS256
    * **Key ID**: SHA-256
    * **Show X.509**: Yes

2. Copy the **Public Key**, the **Private Key (X.509 PEM Format)**, and the **Public Key (X.509 PEM Format)** for use in the next steps.

### Create the JSON Web Token

Create the DPoP [JWT](https://www.rfc-editor.org/rfc/rfc7519). A JWT is a compact, URL-safe way to represent claims transferred between two parties. The most common use case for JWTs is to declare the scope of the access token. A DPoP JWT includes a header and payload with claims, and then you sign the JWT with the private key from the [previous section](#create-a-json-web-key).

Use your internal instance to sign the JWT for a production org. See this [JWT generator](https://github.com/jwtk/njwt) for an example of how to make and use JWTs in Node.js apps.

For testing purposes only, you can use the [JWT tool](https://jwt.io/) to build, sign, and decode JWTs. Follow these steps if you use the JWT tool:

1. Select **RS256** as the **Algorithm**.
2. In the **HEADER** section, build the JWT header by including the public key from the public/private key pair that you created in the [previous section](#create-json-web-key).

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

**Required Parameters**

* `typ`: Type header. Declares that the encoded object is a JWT and meant for use with DPoP. This example uses `dpop+jwt`.
* `alg`: Algorithm. Indicates that the asymmetric algorithm is RS256 (RSA using SHA256). This algorithm uses a private key to sign the JWT and a public key to verify the signature. Must not be `none` or an identifier for a symmetric algorithm. This example uses `RS256`.
* `jwk`: JSON Web Key. Include the public key (in JWK string format) that you create in the [Create a JSON Web Key](#create-a-json-web-key) section. Okta uses this public key to verify the JWT signature. See the [Application JSON Web Key Response properties](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/Client/#tag/Client/operation/createClient!c=201&path=jwks&t=response) for a description of the public key properties.

3. In the **PAYLOAD** section, build the JWT payload and include the following claims:

  ```json
  {
    "htm": "POST",
    "htu": "http://${yourOktaDomain}/oauth2/default/v1/token",
    "iat": 1516239022
  }
  ```

**Claims**

* `htm`: HTTP method. The HTTP method of the request that the JWT is attached to. This value is always `POST`.
* `htu`: HTTP URI. The `/token` endpoint URL for the Okta authorization server that you want to use. Example: `http://${yourOktaDomain}/oauth2/{$authServerId}/v1/token`
* `iat`: Issued at. Identifies the time at which the JWT is issued. The time appears in seconds since the Unix epoch. The Unix epoch is the number of seconds that have elapsed since January 1, 1970 at midnight UTC.

4. In the **VERIFY SIGNATURE** section, paste the public key (X.509 PEM format) from the previous section in the first box.
5. Paste the private key (X.509 PEM format) in the second box.
6. Copy the JWT that appears in the **Encoded** section.

### Build the request

Your next step is to build the request to the `/token` endpoint for an access token. Two requests to the `/token` endpoint are necessary. The initial request obtains the `dpop-nonce` header value from the authorization server. The second request includes an updated JWT with the `dpop-nonce` header value in the JWT payload.

The additional header in the initial request is `DPoP`. The value for `DPoP` is the DPoP proof JWT from the previous section. The request should look something like the following. Some values are truncated for brevity.

```bash
  curl --request POST
  --url 'https://${yourOktaDomain}/oauth2/default/v1/token' \
  --header 'Accept: application/json' \
  --header 'DPoP: eyJ0eXAiOiJkcG9w.....H8-u9gaK2-oIj8ipg' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'grant_type=authorization_code' \
  --data 'redirect_uri=https://${yourOktaDomain}/app/oauth2' \
  --data 'code=XGa_U6toXP0Rvc.....SnHO6bxX0ikK1ss-nA' \
  --data 'code_verifier=k9raCwW87d_wYC.....zwTkqPqksT6E_s' \
  --data 'client_id=${clientId}'
```

The authorization server verifies the JWT in the request and sends back an "Authorization server requires nonce in DPoP proof" error and a `dpop-nonce` header and value.

The authorization server provides the `dpop-nonce` value to limit the lifetime of DPoP proof JWTs and renews the value every 24 hours. The old `dpop-nonce` value continues to work for three days after generation. Be sure to save the `dpop-nonce` value from the token response header and refresh it every 24 hours.

Use the value of the `dpop-nonce` header in the JWT payload and update the JWT:

1. If you're using the JWT tool to test this example, copy the `dpop-nonce` header value. Then, add it as a `nonce` claim to the DPoP proof JWT payload along with a `jti` claim. The payload should look something like this:

```json
{
   "htm": "POST",
   "htu": "https://${yourOktaDomain}/oauth2/default/v1/token",
   "iat": 1516239022,
   "nonce": "dsGuZVkXzEdbNb8yxI3Fi-cnuzkH_E0k",
   "jti": "123456788"
}
```

**Claims**

* `nonce`: Used only once. A recent `nonce` value provided by the authorization server using the `dpop-nonce` HTTP header. The authorization server provides the DPoP nonce value to limit the lifetime of DPoP proof JWTs.
* `jti`: JWT ID. A unique [JWT identifier](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.7) for the request

2. Copy the new DPoP proof JWT and add it to the DPoP header in the request.

3. Send the request for an access token again. The authorization server should return the access token. In the following example, tokens are truncated for brevity.

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

4. Use the JWT tool to decode the access token to view the claims. The decoded access token should look something like this:

  ```json
      {
        "ver": 1,
        "jti": "AT.pKoLFoM7X4P4DrJBRvXaJzj9g0-naK1ChGH_oTbStYE",
        "iss": "https://{yourOktaDomain}/oauth2/default",
        "aud": "api://default",
        "iat": 1677530933,
        "exp": 1677534533,
        "cnf": {
          "jkt": "2HR2BW5-tan1aI6yIPHVOHwirAy4kQGWULoQHKUO0s4"
          },
        "cid": "0oa4dr9kzkykPrLhq0g7",
        "uid": "00u47ijy7sRLaeSdC0g7",
        "scp": [
          "openid"
        ],
        "auth_time": 1677521913,
        "sub": "user@example.com"
      }
  ```

**Claims**

* `cnf`: Confirmation. Claim that contains the confirmation method.
* `jkt`: JWK confirmation method. A base64url encoding of the JWK SHA-256 hash of the DPoP public key (in JWK format) to which the access token is bound.

> **Note:** If your client has DPoP enabled, then you can't add or modify the `cnf` claim using token inline hooks.

The following example request to a protected resource displays the DPoP-bound access token in the `Authorization` header and the DPoP proof JWT in the `DPoP` header. Values are truncated for brevity.

```bash
curl -v -X GET \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: DPoP eyJraWQiOiJRVX.....wt7oSakPDUg' \
  --header 'DPoP: eyJ0eXAiOiJkcG9w.....H8-u9gaK2-oIj8ipg' \
  "https://resource.example.org"
```

## Validate the token and DPoP header

The resource server must perform validation on the access token to complete the flow and grant access. When the client sends an access request with the access token, validation should verify that the `cnf` claim is present. Then validation should compare the `jkt` in the access token with the public key in the JWT value of the `DPoP` header.

The following is a high-level overview of the validation steps that the resource server must perform.

* Read the value in the `DPoP` header and decode the DPoP JWT.
* Get the `jwk` (public key) from the header portion of the DPoP JWT.
* Verify the signature of the DPoP JWT using the public key and algorithm in the JWT header.
* Verify that the `htu` and `htm` claims are in the DPoP JWT payload and match with the current API request HTTP method and URL.
* Calculate the `jkt` (SHA-256 thumbprint of the public key).
* Extract the DPoP-bound access token from the `Authorization` header, verify it with Okta, and extract the claims. You can also use the `/introspect` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/introspectCustomAS) to extract the access token claims.
* Validate the token binding by comparing `jkt` from the access token with the calculated `jkt` from the `DPoP` header.

> **Note:** The resource server must not grant access to the resource unless all checks are successful.

For instructional purposes, this guide provides example validation in a Node.js Express app using the third-party site Glitch. Glitch is a browser-based development environment that can build a full-stack web application online. Use the Glitch example to review and quickly implement the validation code. It includes all dependencies required to complete validation.

Copy (remix on Glitch) the [Validation DPoP Tokens](https://glitch.com/~validate-dpop-tokens) Glitch project to have a working code sample. The validation steps at the beginning of this section are included in the code for quick implementation.

> **Note:** See [Libraries for Token Signing/Verification](https://jwt.io/libraries) to view other libraries/SDKs in different languages that you can use for JWT verification.

## Refresh an access token

To refresh your DPoP-bound access token, send a token request with a `grant_type` of `refresh_token`. Then, include the same `DPoP` header value that you used to obtain the refresh token in the `DPoP` header for this request. Include the `openid` scope when you also want to refresh an ID token. In the following examples, tokens are truncated for brevity.

**Example request**

```bash
  curl --request POST
  --url 'https://${yourOktaDomain}/oauth2/default/v1/token' \
  --header 'Accept: application/json' \
  --header 'DPoP: eyJ0eXAiOiJkcG9w.....H8-u9gaK2-oIj8ipg' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'grant_type=refresh_token' \
  --data 'redirect_uri=${redirectUri}' \
  --data 'client_id=${clientId}' \
  --data 'scope=offline_access openid' \
  --data 'refresh_token=3CEz0Zvjs0eG9mu4w36n-c2g6YIqRfyRSsJzFAqEyzw'
```

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
