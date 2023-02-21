---
title: Implement OAuth for Okta with a service app
excerpt: Learn how to interact with Okta APIs by using scoped OAuth 2.0 access tokens for a service app.
layout: Guides
---

This guide explains how to interact with Okta APIs by using scoped OAuth 2.0 access tokens for a service app.

---

**Learning outcomes**

* Create a public/private key pair.
* Create a service app with grant scopes.
* Create and sign the JSON Web Token (JWT).
* Get an access token to make an API request.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Postman client](https://www.getpostman.com/downloads/) to test requests with the access token. See [Get Started with the Okta APIs](https://developer.okta.com/code/rest/) for information on setting up Postman.

---

## About scoped OAuth 2.0 access tokens

Most Okta API endpoints require that you include an API token with your request. Currently, this API token takes the form of an SSWS token that you generate in the Admin Console. With OAuth for Okta, you are able to interact with Okta APIs using scoped OAuth 2.0 access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains.

## Use the Client Credentials grant flow

For machine-to-machine use cases where a backend service or a daemon has to call Okta APIs, use the Client Credentials grant flow with an OAuth 2.0 service app. The Client Credentials grant flow is the only grant flow supported with the OAuth 2.0 service app when you want to mint access tokens that contain Okta scopes.

The following are the high-level steps required to perform the Client Credentials grant flow with an OAuth service app:

1. Create the service app integration in Okta.
1. Generate a public/private JSON Web Key Set (JWKS) key pair and store the private key.
1. Grant the required OAuth 2.0 scopes to the app.
1. Create a JSON Web Token (JWT) and sign it using the private key for use as the client assertion when making the `/token` endpoint API call.

> **Note:** OAuth for Okta works only with the APIs listed on the [OAuth 2.0 Scopes](https://developer.okta.com/docs/api/oauth2/) page.

## Create a service app integration

Create an OAuth 2.0 service app integration using the Admin Console.

  > **Note:** You can also use the `/oauth2/v1/clients` endpoint to [create your service app using the API](/docs/reference/api/oauth-clients/#request-example-create-a-service-app-with-a-jwks). If you use the API, follow the [Generate the JWK using the API](#generate-the-jwk-using-the-api) section below first, as you need the `JWKS` parameter value when you create the client using the API.
  >
  >You can also add additional JWKS to the app later using the [Add a new JSON Web Key](https://developer.okta.com/docs/reference/api/apps/#add-new-json-web-key) API.

1. Sign in to your Okta organization as a user with administrative privileges. [Create an org for free](https://developer.okta.com/signup).

2. In the Admin Console, go to **Applications** > **Applications**, and then click **Create App Integration**.

3. On the Create a new app integration page, select **API Services** as the **Sign-in method** and click **Next**.

4. Enter a name for your app integration and click **Save**.

## Generate the JWK using the API

The `private_key_jwt` client authentication method is the only supported method for OAuth service apps that want to get access tokens with Okta scopes.

The private key that you use to sign the JWT must have the corresponding public key registered in the [JWKSet](/docs/reference/api/oauth-clients/#json-web-key-set) of the OAuth service app. We recommend generating the public/private key pair first before creating the OAuth service app.

1. Use a tool such as this [JSON Web Key Generator](https://mkjwk.org/) to generate a JWKS public/private key pair for testing. Okta supports both RSA and Elliptic Curve (EC) keys. In this example, we are selecting **RSA** as the encryption algorithm. Select the following values:

    * Key size: 2048
    * Key use: signature
    * Algorithm: RSA256
    * Key ID: This can be any random value.

> **Note:** Use the JSON Web Key Generator link to generate a JWKS public/private key pair for testing purposes only. For a production use case, use your own internal instance of the key pair generator. See this [key pair generator](https://github.com/mitreid-connect/mkjwk.org) for an example.

2. The JSON Web Key Generator tool extracts the public key from the key pair automatically. For testing purposes, copy the Public Key that is provided.

> **Note:** Some Okta SDKs require that keys be in Privacy Enhanced Mail (PEM) format. If you are working with an Okta SDK that requires that the key be in PEM format, after you have generated the key pair, copy the public/private key pair into a [JWK to PEM Convertor tool](https://8gwifi.org/jwkconvertfunctions.jsp) and copy the private key to use when signing the JWT.

The JWKS should look something like this:

```JSON
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
```

## Generate the JWK using the Admin Console

<ApiLifecycle access="ea" />

Generate a public/private key pair using the Admin Console. Since this is an Early Access feature, contact [Support](mailto:support@okta.com) to have it enabled for your org.

> **Note:** Use the Admin Console to generate a JWK public/private key pair for testing purposes only. For a production use case, use your own internal instance of the key pair generator. See this [key pair generator](https://github.com/mitreid-connect/mkjwk.org) for an example.

1. In the **Client Credentials** section of the **General** tab, click **Edit** to change the client authentication method.

2. Select **Public key/Private key** as the **Client authentication** method.

  > **Note:** When you switch the client authentication method to **Public key/Private key**, any existing client secrets are deleted.

3. Choose how you want to store the JWK and then use the next sections to complete the steps.
    * **Save keys in Okta**: Copy your public keys into Okta
    * **Use a URL to fetch keys dynamically**: Define the URI where you host your public keys

### Save keys in Okta

This option allows you to bring your own keys or use the Okta key generator. There is no limit to the number of JWKs that you can add for an app.

1. Leave the default of **Save keys in Okta**, and then click **Add key**.
1. Click **Add** and in the **Add a public key** dialog, either paste your own public key or click **Generate new key** to auto-generate a new 2048 bit RSA key:

    * Paste your own public key into the box. Be sure to include a `kid` as all keys in the JWKS must have a unique ID.<br><br>
    **OR**<br>
    * Click **Generate new key** and the public and private keys appear in JWK format.

        Some Okta SDKs require that keys be in Privacy Enhanced Mail (PEM) format. If you are working with an Okta SDK that requires this format, click **PEM**. The private key appears in PEM format.

        This is your only opportunity to save the private key. Click **Copy to clipboard** to copy the private key and store it somewhere safe.

1. Click **Done**. The new public key is now registered with the app and appears in a table in the **PUBLIC KEYS** section of the **General** tab.

1. Click **Save**. A message states that the client authentication method changes to **Public key/Private key**. Any existing client secrets for the app are deleted. Click **Save** to continue.

### Use a URL to fetch keys dynamically

This option allows you to host your public key in a URI and paste the link to the public key in the Admin Console. This URL contains public keys that clients can use to verify the signature of client-based access tokens and OpenID Connect ID tokens. By hosting the keys in a URL, you can conveniently rotate the keys without having to update the app configuration every time.

> **Note:** If you switch from saving keys in Okta to using a URL to fetch keys dynamically, any saved public keys are deleted.

1. After you select **Use a URL to fetch keys dynamically**, enter the URL in the **URL** box, for example: `https://${yourOktaDomian}/oauth2/v1/keys`.

1. Click **Save**.

1. Make note of the Client ID. You need this in the [Get an access token](#get-an-access-token) section.

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

## Grant allowed scopes

Now that you've created the service app and registered the public key with that service app, you need to [define the allowed scopes](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints). When a request is sent to the Okta Org Authorization Server's `/token` endpoint, it validates all of the requested scopes in the request against the service app's grants collection. The scope is granted if the scope exists in the service app's grants collection.

> **Note:** Only the Super Admin role has permissions to grant scopes to an app.

1. From the service app page, select the **Okta API Scopes** tab.
2. Click **Grant** for each of the scopes that you want to add to the application's grant collection.

    > **Note:** You can also use the `/grants` API to add a grant for an allowed scope to your service app. The POST example request below creates a grant for the `okta.users.read` scope.

    Provide values for these parameters in your request:

    * `scopeID`: `okta.users.read`
    * `issuer`: `https://${yourOktaDomain}`

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

## Create and sign the JWT

> **Note:** Okta SDKs support creating and signing the JWT and requesting an access token. If you are using an Okta SDK, you can skip this section and the [Get an access token](#get-an-access-token) section.

Create and sign the JWT with your private key for use as a JWT assertion in the request for a scoped access token. You can create this `client_credentials` JWT in several ways.

For testing purposes, use [this tool](https://www.jsonwebtoken.dev) to generate and sign a JWT. This tool supports both JWT and PEM formats. For a production use case, see [Build a JWT with a private key](/docs/guides/build-self-signed-jwt/java/main/#build-a-jwt-with-a-private-key) for both a Java and a JavaScript example of signing the JWT.

> **Note:** After the service app has Okta-scoped grants, only an admin with Super Admin role permissions can rotate the keys.

You can use the following [JWT claims](/docs/reference/api/oidc/#token-claims-for-client-authentication-with-client-secret-or-private-key-jwt) in the request for a scoped access token:

* `alg`: One of the supported algorithm values (RS256, RS384, RS512, ES256, ES384, or ES512). This is required for Okta to successfully verify the token by using the signing keys provided in the [previous step](#generate-the-jwk-using-the-admin-console). The `alg` parameter goes in the JWT header rather than a claim in the payload of the body.
* `aud`: The full URL of the resource that you're using the JWT to authenticate to
* `exp`: The expiration time of the token in seconds since January 1, 1970 UTC (current UNIX timestamp). This value must be a maximum of only an hour in the future.
* `jti`: (Optional) The token's unique identifier. This value is used to prevent the JWT from being replayed. The claim is a case-sensitive string.
* `iat`: (Optional) The issuing time of the token in seconds since January 1, 1970 UTC (current UNIX timestamp)
* `iss`: The issuer of the token. This value must be the same as the `client_id`.
* `sub`: The subject of the token. This value must be the same as the `client_id`.

1. For this example, include the following parameters in the payload of the JWT:

    * `aud`: `https://${yourOktaDomain}/oauth2/v1/token`
    * `iss`: `client_id`
    * `sub`: `client_id`
    * `exp`: `1614664267`

    **Payload example**

    ```json
    {
        "aud": "https://${yourOktaDomain}/oauth2/v1/token",
        "iss": "0oar95zt9zIpYuz6A0h7",
        "sub": "0oar95zt9zIpYuz6A0h7",
        "exp": "1614664267"
    }
    ```

2. In the **Signing Key** box, paste the public and private key that you generated in the [Generate the JWK using the Admin Console](#generate-the-jwk-using-the-admin-console) step.

3. For the key format, use either the default of **JWT** or switch to **PEM**, and then click **Generate JWT**.

4. The signed JWT appears. Copy the JWT for use in the [Get an access token](#get-an-access-token) step.

## Get an access token

To request an access token using the Client Credentials grant flow, your app makes a request to your Okta [Org Authorization Server's](/docs/concepts/auth-servers) `/token` endpoint.

Include the following parameters:

* `scope`: Include the scopes that allow you to perform the actions on the endpoint that you want to access. The scopes requested for the access token must already be in the [application's grants collection](#grant-allowed-scopes). See [Scopes and supported endpoints](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints).

    In this example, we only request access for one scope. When you request an access token for multiple scopes, the format for the scope value looks like this: `scope=okta.users.read okta.apps.read`

* `client_assertion_type`: Specifies the type of assertion, in this case a JWT token:  `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`

* `client_assertion`: The signed JWT. Paste the JWT that you signed in the [Create and sign the JWT](#create-and-sign-the-jwt) section.

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
