---
title: Create a service app and grant scopes
---

Create an OAuth service app and register the public key with the service app using the dynamic client registration endpoint (`/oauth2/v1/clients`). Then grant the scopes that you want to allow for the service app.

## Create a service app

1. Use the following POST example to create your service app using the `/oauth2/v1/clients` endpoint and provide values for these parameters:

    * `client_name` &mdash; name of the service app
    * `grant_types` &mdash; `client_credentials`
    * `token_endpoint_auth_method` &mdash; `private_key_jwt`
    * `application_type` &mdash; `service`
    * `jwks` &mdash; add the JSON Web Key Set (JWKS) that you created in the <GuideLink link="../create-publicprivate-keypair">last step</GuideLink>.

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

<NextSectionLink/>
