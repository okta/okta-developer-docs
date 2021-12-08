---
title: Implement OAuth for Okta with a service app
excerpt: Learn how to interact with Okta APIs using scoped OAuth 2.0 access tokens for a service app.
layout: Guides
---

This guide shows you how to interact with Okta APIs using scoped OAuth 2.0 access tokens for a service app.

---
<!-- Nutrition facts bullets -->
**Learning outcomes**

* Create a public/private key pair.
* Create a service app with grant scopes.
* Create and sign the JSON Web Token (JWT).
* Get an access token to make an API request.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Postman client](https://www.getpostman.com/downloads/) to test requests with the access token. See [Get Started with the Okta APIs](https://developer.okta.com/code/rest/) for information on setting up Postman.

---

## Overview

Most Okta API endpoints require that you include an API token with your request. Currently, this API token takes the form of an SSWS token that you generate in the Admin Console. With OAuth for Okta, you are able to interact with Okta APIs using scoped OAuth 2.0 access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains.

### Use the Client Credentials grant flow

For machine-to-machine use cases where a backend service or a daemon has to call Okta APIs, use the Client Credentials grant flow with an OAuth service app. The Client Credentials grant flow is the only grant flow supported with the OAuth service app when you want to mint access tokens that contain Okta scopes.

The following are the high-level steps required to perform the Client Credentials grant flow with an OAuth service app:

1. Create a public/private JSON Web Key Set (JWKS) key pair and extract the public key to pass it along with the client creation API call.
1. Create the app and register the public key with the app.
1. Grant the required OAuth scopes to the app.
1. Create a JSON Web Token (JWT) and sign it using the private key for use as the client assertion when making the `/token` endpoint API call.

> **Note:** At this time, OAuth for Okta works only with the APIs listed on the [Scopes and supported endpoints](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints) page. We are actively working towards supporting additional APIs. Our goal is to cover all public Okta API endpoints.

## Create a public/private key pair

The `private_key_jwt` client authentication method is the only supported method for OAuth service apps that want to get access tokens with Okta scopes.

The private key that you use to sign the JWT must have the corresponding public key registered in the [JWKSet](/docs/reference/api/oauth-clients/#json-web-key-set) of the OAuth service app. We recommend generating the public/private key pair first before creating the OAuth service app.

1. Use a tool such as this [JSON Web Key Generator](https://mkjwk.org/) to generate a JWKS public/private key pair for testing. Okta supports both RSA and Elliptic Curve (EC) keys. In this example, we are selecting **RSA** as the encryption algorithm. Select the following values:

    * Key size &mdash; 2048
    * Key use &mdash; signature
    * Algorithm &mdash; RSA256
    * Key ID &mdash; (Optional) This can be any random value.

> **Note:** Use the JSON Web Key Generator link to generate a JWKS public/private key pair for testing purposes only. For a production use case, use your own [internal instance](https://github.com/mitreid-connect/mkjwk.org) of the key pair generator.

2. The JSON Web Key Generator tool extracts the public key from the key pair automatically. For testing purposes, copy the Public Key that is provided.

> **Note:** Some Okta SDKs require that keys be in Privacy Enhanced Mail (PEM) format. If you are working with an Okta SDK that requires that the key be in PEM format, use a [JWK to PEM Convertor tool](https://www.npmjs.com/package/pem-jwk) and then use the private key in PEM format when signing the JWT.

The JWKS should look something like this:

```json
{
  "keys": [
    {
      "kty": "RSA",
      "e": "AQAB",
      "use": "sig",
      "kid": "my_key_id",
      "alg": "RS256",
      "n": "u0VYW2-76A_lYg5NQihhcPJYYU9-NHbNaO6LFERWnOUbU7l3MJdmCailwSzjO76O-2GdLE-Hn2kx04jWCCPofnQ8xNmFScNo8UQ1dKVq0UkFK-sl-Z0Uu19GiZa2fxSWwg_1g2t-ZpNtKCI279xGBi_hTnupqciUonWe6CIvTv0FfX0LiMqQqjARxPS-6fdBZq8WN9qLGDwpjHK81CoYuzASOezVFYDDyXYzV0X3X_kFVt2sqL5DVN684bEbTsWl91vV-bGmswrlQ0UVUq6t78VdgMrj0RZBD-lFNJcY7CwyugpgLbnm4HEJmCOWJOdjVLj3hFxVVblNJQQ1Z15UXw"
    }
  ]
}
```

## Create a service app and grant scopes

Create an OAuth service app and register the public key with the service app using the dynamic client registration endpoint (`/oauth2/v1/clients`). Then grant the scopes that you want to allow for the service app.

### Create a service app

1. Use the following POST example to create your service app using the `/oauth2/v1/clients` endpoint and provide values for these parameters:

    * `client_name` &mdash; name of the service app
    * `grant_types` &mdash; `client_credentials`
    * `token_endpoint_auth_method` &mdash; `private_key_jwt`
    * `application_type` &mdash; `service`
    * `jwks` &mdash; add the JSON Web Key Set (JWKS) that you created in the [last step](#create-a-public-private-key-pair).

```bash
curl --location --request POST 'https://${yourOktaDomain}/oauth2/v1/clients' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: SSWS ${api_token}' \
--data-raw ' {
    "client_name": "Service Client Name",
    "response_types": [
      "token"
    ],
    "grant_types": [
      "client_credentials"
    ],
    "token_endpoint_auth_method": "private_key_jwt",
    "application_type": "service",
    "jwks": {
                "keys": [
                    {
                      "kty": "RSA",
                      "e": "AQAB",
                      "use": "sig",
                      "kid": "O4O",
                      "alg": "RS256",
                      "n": "l-iy7THGCtFVMK6izukV_0K858jhoxg9-d99b6t6cn3Ydy6jNrHl5_OrisCpdJvzTVskQ8XrJulKkPa91JVTPIhCWvVHIKyi43qlLEJE4t0qF1hkUL1Qyhl3cM-oXtyKu9MHBqSSBoMokLSlaOAa_Lx6yDGsCy-ZWSwGdxH5zuygOX1k3tpotbZ7773uFMPEK-6Ol7v0_E9PY-lPUK8M6nH_DNp3TIqn6h2W0r_L2N-M5HBGbfUf0xWtoV5yyRpde6tsA8XnsSjBfR-N_e2xItrQ3uJ5Fk5MdWoZBw5hLNtcUkOt9qbwv6WlLl0UEBEl9dzwJKWEYmoJg3Gai6Z5-w"
                      }
                  ]
              }
 }'
```

2. Make note of the `client_id` that is returned in the response. You need that to grant scopes to your service app and when you create and sign the JWT.

### Grant allowed scopes

When a request is sent to the Okta Org Authorization Server's `/token` endpoint, it validates all of the requested scopes in the request against the service app's grants collection. The scope is granted if the scope exists in the service app's grants collection.

> **Note:** You can find a list of available values for `scopeId` on the [Scopes and supported endpoints](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints) page.

Now that you've created the service app and registered the public key with that service app, you need to define the allowed scopes.

> **Note:** Only the Super Admin role has permissions to grant scopes to an app.

1. Use the `/grants` API to add a grant for an allowed scope to your service app. The POST example request below creates a grant for the `okta.users.read` scope.

2. Provide values for these parameters in your request:

    * `scopeID` &mdash; `okta.users.read`
    * `issuer` &mdash; `https://${yourOktaDomain}`<br>

```bash
curl --location --request POST 'https://${yourOktaDomain}/api/v1/apps/{serviceappclient_id}/grants' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: SSWS 00...Y' \
--header 'Cache-Control: no-cache' \
--data-raw '{
    "scopeId": "okta.users.read",
    "issuer": "https://${yourOktaDomain}"
}'
```

> **Note:** You can also use the Admin Console to grant allowed scopes to your service app on the **Okta API Scopes** tab. Click **Grant** for each of the scopes that you want to add to the application's grant collection.

## Create and sign the JWT

> **Note:** Okta SDKs support creating and signing the JWT and requesting an access token. If you are using an Okta SDK, you can skip this section and the [Get an access token](#get-an-access-token) section.

Create and sign the JWT with your private key for use as a JWT assertion in the request for a scoped access token. You can create this `client_credentials` JWT in several ways.

For testing purposes, use [this tool](https://www.jsonwebtoken.dev) to generate and sign a JWT. This tool supports both JWT and PEM formats. For a production use case, see [Build a JWT with a private key](/docs/guides/build-self-signed-jwt/java/main/#build-a-jwt-with-a-private-key) for both a Java and a JavaScript example of signing the JWT.

> **Note:** After the service app has Okta-scoped grants, only an admin with Super Admin role permissions can rotate the keys.

You can use the following [JWT claims](/docs/reference/api/oidc/#token-claims-for-client-authentication-with-client-secret-or-private-key-jwt) in the request for a scoped access token:

* `alg` &mdash; one of the supported algorithm values: RS265, RS384, RS512, ES256, ES384, or ES512. This is required for Okta to successfully verify the token using the signing keys provided in the [previous step](#create-a-service-app-and-grant-scopes). The `alg` parameter goes in the header of the JWT rather than a claim in the payload of the body.
* `aud` &mdash; the full URL of the resource that you're using the JWT to authenticate to
* `exp` &mdash; the expiration time of the token in seconds since January 1, 1970 UTC (current UNIX timestamp). This value must be a maximum of only an hour in the future.
* `jti` &mdash; (Optional) A unique identifier of the token. This value is used to prevent the JWT from being replayed. The claim is a case-sensitive string.
* `iat` &mdash; (Optional) the issuing time of the token in seconds since January 1, 1970 UTC (current UNIX timestamp)
* `iss` &mdash; the issuer of the token. This value must be the same as the `client_id`.
* `sub` &mdash; the subject of the token. This value must be the same as the `client_id`.

1. For this example, include the following parameters in the payload of the JWT:

    * `aud` &mdash; `https://${yourOktaDomain}/oauth2/v1/token`
    * `iss` &mdash; `client_id`
    * `sub` &mdash; `client_id`
    * `exp` &mdash; `1614664267`

    **Payload example**

```json
{
    "aud": "https://${yourOktaDomain}/oauth2/v1/token",
    "iss": "0oar95zt9zIpYuz6A0h7",
    "sub": "0oar95zt9zIpYuz6A0h7",
    "exp": "1614664267"
}
```

2. In the **Signing Key** box, paste the public and private key that you generated in the [Create a public/private key pair](#create-a-public-private-key-pair) step.

3. For the key format, use either the default of **JWT** or switch to **PEM**, and then click **Generate JWT**.

4. The signed JWT appears. Copy the JWT for use in the [Get an access token](#get-an-access-token) step.

## Get an access token

To request an access token using the Client Credentials grant flow, your app makes a request to your Okta [Org Authorization Server's](/docs/concepts/auth-servers) `/token` endpoint.

Include the following parameters:

* `scope` &mdash; include the scopes that allow you to perform the actions on the endpoint that you want to access. The scopes requested for the access token must already be in the [application's grants collection](#grant-allowed-scopes). See [Scopes and supported endpoints](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints).

    In this example, we only request access for one scope. When you request an access token for multiple scopes, the format for the scope value looks like this: `scope=okta.users.read okta.apps.read`

* `client_assertion_type` &mdash; specifies the type of assertion, in this case a JWT token:  `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`

* `client_assertion` &mdash; the signed JWT. Paste the JWT that you signed in the [Create and sign the JWT](#create-and-sign-the-jwt) section.

The following is an example request for an access token (the JWT is truncated for brevity).

```bash
curl --location --request POST 'https://${yourOktaDomain}/oauth2/v1/token' \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'grant_type=client_credentials' \
    --data-urlencode 'scope=okta.users.read' \
    --data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \
    --data-urlencode 'client_assertion=eyJhbGciOiJSU....tHQ6ggOnrG-ZFRSkZc8Pw'
```

The response should look something like this (the token is truncated for brevity):

```json
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJ.....UfThlJ7w",
    "scope": "okta.users.read"
}
```

> **Note:** The lifetime for this token is fixed at one hour.

### Make a request

Make a request to the `/users` endpoint using the access token.

1. If you are using Postman to test, select the **List Users** `GET` request to the `/api/v1/users` endpoint to get back a list of all users.
2. On the **Header** tab, remove the existing Okta API token (SSWS Authorization API Key).
3. Click the **Authorization** tab and from the **Type** drop-down box, select **OAuth 2.0**.
4. On the right, paste the access token into the **Access Token** box and click **Send**. The response should contain an array of all the users associated with your app. This is dependent on the user's permissions.

**Example Request**

```bash
curl -X GET "https://${yourOktaDomain}/api/v1/users"
    -H "Accept: application/json"
    -H "Content-Type: application/json"
    -H "Authorization: Bearer eyJraWQiOiJEa1lUbmhTdkd5OEJkbk9yMVdYTENhbVFRTUZiNTlYbHdBWVR2bVg5ekxNIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmRNcmJJc1paTWtMR0FyN1gwRVNKdmdsX19JOFF4N0pwQlhrVjV6ZGt5bk0iLCJpc3MiOiJodHRwczovL2xvZ2luLndyaXRlc2hhcnBlci5jb20iLCJhdWQiOiJodHRwczovL2dlbmVyaWNvaWRjLm9rdGFwcmV2aWV3LmNvbSIsInN1YiI6IjBvYXI5NXp0OXpJcFl1ejZBMGg3IiwiaWF0IjoxNTg4MTg1NDU3LCJleHAiOjE1ODgxODkwNTcsImNpZCI6IjBvYXI5NXp0OXpJcFl1ejZBMGg3Iiwic2NwIjpbIm9rdGEudXNlcnMubWFuYWdlIl19.TrrStbXUFtuH5TemMISgozR1xjT3rVaLHF8hqnwbe9gmFffVrLovY-JLl63G8vZVnyudvZ_fWkOBUxip1hcGm80KvrSgpdOp9Nazz-mjkP6T6JwslRFHDe8SC_4h2LG9zi5PV9y3hAayBK51q1HIwgAxl_2F7q4l0jLKDFsWjQS8epNaB05NLI12BDvO-C-7ZGGJ4EQfGS9EjN9lS-vWnt_V3ojTL0BJCKgL5Y0c9D2VkSqVN4j-7BSRZt0Un3MAEgznXmk2ecg3y7s9linGR0mC3QqKeyDfFNdsUJG6ac0h2CFFZQizpQu1DFmI_ADKmzxVQGPICuslgJFFoIF4ZA"
```

## Support

If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).
