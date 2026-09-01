In this example, create a web app that supports the authorization code with PKCE flow and refresh tokens.

Access Gateway generates the `clientId` and `clientSecret` for your app. You don't set these values yourself. Retrieve them after you create the app. See [Retrieve the client secret](#retrieve-the-client-secret).

1. Retrieve your `idpId` by using the List all IdPs [endpoint](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps/other/listidps). Select the IdP that has failover mode set to `AUTOMATIC`. You need this value to create the app.
1. Create the OIDC app in Access Gateway by sending a `POST` request to the Create an application [endpoint](https://developer.okta.com/docs/api/openapi/oag/oag/tags/applications/other/createapplication). Use the following [request example](#request-example) as a template.
1. In the request body, set the following values for your app:
    1. Set `label` as the display name for the app.
    1. Set `idpId` to the value that you retrieved in the first step.
    1. In the `oidc` object, set `applicationType` to `web`, `native`, or `spa`.
    1. In the `oidc` object, set `redirectUris` as your client app's callback URL.
    1. In the `oidc` object, for `allowedScopes`, include any combination of `openid`, `profile`, `email`, and `offline_access`. This determines which scopes the app can request.
    1. In the `oidc` object, for `accessTokenLifetime` and `refreshTokenLifetime`, set the desired values in seconds. These determine how long tokens issued for this app are valid.
    [[style="list-style-type:lower-alpha"]]
1. Send the POST request.

### Request example

```bash
curl -i -X POST \
  'https://{oaghostname}/api/v2/apps' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "OAG_OIDC",
    "label": "Test OIDC App - Auth Code",
    "description": "OIDC app using authorization code flow with PKCE",
    "idpId": "<idp-id>",
    "oidc": {
      "applicationType": "web",
      "redirectUris": [
        "https://example.com/callback"
      ],
      "responseTypes": [
        "code"
      ],
      "grantTypes": [
        "authorization_code",
        "refresh_token"
      ],
      "tokenEndpointAuthMethod": "client_secret",
      "pkceRequired": true,
      "allowedScopes": [
        "openid",
        "profile",
        "email",
        "offline_access"
      ],
      "accessTokenLifetime": 3600,
      "refreshTokenLifetime": 86400
    }
  }'
```

### Response example

```json
{
  "id": "app-oidc-123",
  "type": "OAG_OIDC",
  "label": "Test OIDC App - Auth Code",
  "description": "OIDC app using authorization code flow with PKCE",
  "status": "ACTIVE",
  "idpId": "<idp-id>",
  "oidc": {
    "applicationType": "web",
    "clientId": "<generated-client-id>",
    "redirectUris": [
      "https://example.com/callback"
    ],
    "responseTypes": [
      "code"
    ],
    "grantTypes": [
      "authorization_code",
      "refresh_token"
    ],
    "tokenEndpointAuthMethod": "client_secret",
    "pkceRequired": true,
    "allowedScopes": [
      "openid",
      "profile",
      "email",
      "offline_access"
    ],
    "accessTokenLifetime": 3600,
    "refreshTokenLifetime": 86400,
    "clientCredentialsEnabled": false
  },
  "_embedded": {
    "behavior": {
      "singleLogout": false,
      "universalLogout": false,
      "globalTokenRevocation": false
    }
  }
}
```

Note the `clientId` in the response. You need it, along with the app's `id`, to retrieve the client secret in the next step.

## Retrieve the client secret

Access Gateway generates the `clientSecret` for your app when you create it, but doesn't return it in the create response. Retrieve it separately, then store it securely. Your client app needs both `clientId` and `clientSecret` to authenticate.

> **Note:** Retrieving the client secret requires the `okta.oag.app.secrets.read` scope. Rotating it requires the `okta.oag.app.secrets.manage` scope. The `okta.oag.app.secrets.manage` scope also grants read access. Add the required scope to your access token when you enable the Access Gateway API. See [Scopes required for offline mode](/docs/guides/oag-offline-mode/main/#scopes-required-for-offline-mode).

1. Send a `GET` request to the Retrieve the client secret [endpoint](https://developer.okta.com/docs/api/openapi/oag/oag/tags/applications/other/getclientsecret), using the app's `id` as the path parameter.
1. Store the returned `clientSecret` securely. You can't retrieve the same secret value again after you rotate it.

> **Note:** If you need to invalidate the current secret, for example, after a suspected compromise, generate a new one using the Generate a client secret [endpoint](https://developer.okta.com/docs/api/openapi/oag/oag/tags/applications/other/generateclientsecret). This immediately invalidates the previous secret.

### Client secret request example

```bash
curl -i -X GET \
  'https://{oaghostname}/api/v2/apps/{applicationId}/credentials/secret' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>'
```

### Client secret response example

```json
{
  "clientSecret": "<generated-client-secret>"
}
```

## Configure your client app

After you create the app in Access Gateway and retrieve its client secret, configure your client to use Access Gateway as its OIDC provider.

You must point your client app at Access Gateway, not your Okta tenant, for authentication to work. Use the OIDC discovery document to configure your client's OIDC settings. It's a JSON file that's served at `/.well-known/openid-configuration` on your Access Gateway authorization server. It contains all the endpoint URLs that your client needs.

1. Use the Retrieve the OpenID Connect discovery document [endpoint](https://developer.okta.com/docs/api/openapi/oag/oag/tags/oidc/other/getopenidconnectdiscovery) with your `idpId` as the path parameter.
1. In the response from the discovery document endpoint, note the endpoint URLs that are returned. See the following [response example](#oidc-discovery-document-response-example).
1. Use the endpoint URLs to configure your client's OIDC settings. The document includes the following endpoints:
    1. `authorization_endpoint`: Where the client sends the user to sign in
    1. `token_endpoint`: Where the client exchanges an authorization code for tokens
    1. `userinfo_endpoint`: Where the client retrieves claims about the signed-in user
    1. `jwks_uri`: Where the client retrieves Access Gateway's public keys to validate token signatures
    1. `introspection_endpoint`: Where the client checks whether a token is still valid
    1. `revocation_endpoint`: Where the client invalidates a token when the user signs out
    [[style="list-style-type:lower-alpha"]]
1. Set your client's issuer to the `issuer` value from the discovery document. Your client uses this value to validate the `iss` claim in tokens that it receives.

> **Note:** Access Gateway sets the `iss` claim to its own authorization server domain, not your Okta tenant domain. If your client is configured to validate tokens from Okta, update the issuer to the Access Gateway domain.

### OIDC discovery document response example

```json
{
  "issuer": "https://oag.example.com/realms/3f63f461-c7fc-483b-b2ae-961633d251ac",
  "authorization_endpoint": "https://oag.example.com/realms/3f63f461-c7fc-483b-b2ae-961633d251ac/protocol/openid-connect/auth",
  "token_endpoint": "https://oag.example.com/realms/3f63f461-c7fc-483b-b2ae-961633d251ac/protocol/openid-connect/token",
  "userinfo_endpoint": "https://oag.example.com/realms/3f63f461-c7fc-483b-b2ae-961633d251ac/protocol/openid-connect/userinfo",
  "jwks_uri": "https://oag.example.com/realms/3f63f461-c7fc-483b-b2ae-961633d251ac/protocol/openid-connect/certs",
  "introspection_endpoint": "https://oag.example.com/realms/3f63f461-c7fc-483b-b2ae-961633d251ac/protocol/openid-connect/token/introspect",
  "revocation_endpoint": "https://oag.example.com/realms/3f63f461-c7fc-483b-b2ae-961633d251ac/protocol/openid-connect/revoke",
  "scopes_supported": [
    "openid",
    "profile",
    "email",
    "offline_access"
  ],
  "response_types_supported": [
    "code"
  ],
  "grant_types_supported": [
    "authorization_code",
    "refresh_token",
    "client_credentials"
  ],
  "token_endpoint_auth_methods_supported": [
    "client_secret"
  ]
}
```
