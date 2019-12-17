---
title: Use the Client Credentials grant flow
---
For machine-to-machine use cases where a backend service or a daemon has to call Okta APIs, use the [Client Credentials grant flow](/docs/guides/implement-client-creds/) with an OAuth Service app. The Client Credentials grant flow is the only valid grant type for an OAuth Service app.

> **Note:** Move on to the <GuideLink link="../define-allowed-scopes">next section</GuideLink> if you don't need to use the Client Credentials grant flow.

The following steps are required to configure the Client Credentials grant flow with an OAuth Service app:

1. Create the private key and then extract the public key from the private key to create a JSON Web Key Set (JWKS).
2. Create the app and register the public key with the app.
3. Sign the JWT with the private key.

## Create a public/private key pair

The [`private_key_jwt`](/docs/reference/api/oidc/#jwt-with-private-key) client authentication method is the only supported method for OAuth Service apps that want to get access tokens with Okta scopes. The private key that you use to sign the JWT must have the corresponding public key registered in the [JWKSet](/docs/reference/api/oauth-clients/#json-web-key-set) of the OAuth Service app. So, we recommend generating the public/private key pair first before creating the OAuth Service app.

You can use a tool such as this [JSON Web Key Generator](https://mkjwk.org/) to generate an RSA 2048 JWKS key pair for testing.

> **Note:** Use the JSON Web Key Generator link to generate JWKS key pairs for testing purposes only. For a production use case, use your own [internal instance](https://github.com/mitreid-connect/mkjwk.org) of the key pair generator.

The JWKS should look something like this (the key is truncated for brevity):

```json
{
    "keys": [
        {
             "kty": "RSA",
             "e":"AQAB",
             "kid": "jwks1",
             "n":"AJncrKuine49_CE.....RL0HU="
        }
    ]
}
```

## Create a Service app

You can create an OAuth Service client app and register the public key with the Service app using the `/apps` endpoint or the dynamic `/oauth/v1/clients` registration endpoint.

* `/apps`: See the request example that shows how to create an OAuth 2.0 client application with `private_key_jwt` in the [Add an OAuth 2.0 Client Application](/docs/reference/api/apps/#add-oauth-2-0-client-application) API reference section.

* `/oauth/v1/clients`: See the **Create a Service app with a JWKS** example in the [Register New Client](/docs/reference/api/oauth-clients/#register-new-client) API reference section.

## Sign the JWT

You now need to sign the JWT with your private key for use in the request for a scoped access token. You can craft this `client_credentials` JWT in several ways. See [Build a JWT with a private key](/docs/guides/build-self-signed-jwt/java/jwt-with-private-key/) for both a Java and a JavaScript example.

> **Note:** After the Service app has Okta-scoped grants, only an admin with Super Admin permissions can rotate the keys.

<NextSectionLink/>
