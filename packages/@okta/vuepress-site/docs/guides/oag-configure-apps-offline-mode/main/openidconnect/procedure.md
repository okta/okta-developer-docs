In this example, create a web app that supports the authorization code with PKCE flow and refresh tokens.

Before you begin, have a secure value ready to use as the `clientSecret`. The `clientId` and `clientSecret` are generated when you create your OIDC client app. You define this value yourself - Access Gateway doesn't generate it and doesn't return it in the response. Store it securely before you make the request.

1. Create the OIDC app in Access Gateway by sending a `POST` request to the Create an application [endpoint](https://developer.okta.com/docs/api/openapi/oag/oag/tags/applications/other/createapplication). Use the following request example as a template.
1. In the request body, set the following values for your app:
    * Set `label` as the display name for the app.
    * Set `clientId` as a unique identifier for your client app.
    * Set `clientSecret` to the value you defined before making this request.
    * Set `redirectUris` as your client app's callback URL.
1. For `allowedScopes`, include any combination of `openid`, `profile`, and `email`. This allows the app to request these scopes in the authorization request.
1. For `accessTokenLifetime` and `refreshTokenLifetime`, set the desired values. These values determine how long tokens issued for this app are valid.
1. Send the POST request.
1. Copy the `clientId` from the response.

### Request example

```bash
curl -i -X POST \
  'https://{oaghostname}/api/v2/apps' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "OAG_OIDC",
    "label": "Test OIDC App - Auth Code",
    "description": "OIDC application using authorization code flow with PKCE",
    "applicationType": "web",
    "clientId": "<client-id>",
    "clientSecret": "<client-secret>",
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
    "tokenEndpointAuthMethod": "client_secret_post",
    "pkceRequired": true,
    "allowedScopes": [
      "openid",
      "profile",
      "email"
    ],
    "accessTokenLifetime": 3600,
    "refreshTokenLifetime": 86400
  }'
```

### Response example

```json
{
  "id": "app-oidc-123",
  "type": "OAG_OIDC",
  "label": "Test OIDC App - Auth Code",
  "description": "OIDC application using authorization code flow with PKCE",
  "applicationType": "web",
  "status": "ACTIVE",
  "clientId": "<client-id>",
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
  "tokenEndpointAuthMethod": "client_secret_post",
  "pkceRequired": true,
  "allowedScopes": [
    "openid",
    "profile",
    "email"
  ],
  "accessTokenLifetime": 3600,
  "refreshTokenLifetime": 86400,
  "deviceFlowEnabled": false,
  "clientCredentialsEnabled": false,
  "_embedded": {
    "session": {
      "maxIdleTimeMinutes": 60
    },
    "behavior": {
      "reAuthenticateOnAccessDenied": false
    },
    "healthCheck": {
      "enabled": true
    }
  }
}
```

## Configure your client application

After you create the app in Access Gateway, configure your client to use Access Gateway as its OIDC provider.

Your client app must be pointed at Access Gateway, not your Okta tenant, for authentication to work. Use the OIDC discovery document to configure your client's OIDC settings. It's a JSON file that's served at `/.well-known/openid-configuration` on your Access Gateway authorization server. It contains all the endpoint URLs that your client needs.

1. Retrieve the OIDC discovery document by using the Retrieve the OpenID Connect discovery document [endpoint](https://developer.okta.com/docs/api/openapi/oag/oag/tags/oidc/other/getopenidconnectdiscovery). See the following [response example](#response-example).
1. Use the endpoint URLs from the discovery document to configure your client's OIDC settings. The document includes the following endpoints:

   * `authorization_endpoint`: where the client sends the user to sign in
   * `token_endpoint`: where the client exchanges an authorization code for tokens
   * `userinfo_endpoint`: where the client retrieves claims about the signed-in user
   * `introspection_endpoint`: where the client checks whether a token is still valid
   * `revocation_endpoint`: where the client invalidates a token on sign-out

1. Copy the `issuer` value from the discovery document response.
1. Set your client's issuer configuration to this value. Your client uses the issuer to validate the `iss` claim in tokens it receives.

> **Note:** Access Gateway sets the `iss` claim to its own authorization server domain, not your Okta tenant domain. If your client is currently configured to validate tokens from Okta, update the issuer to the Access Gateway domain.

### Response example

```json
{
  "issuer": "https://oag.example.com/realms/example-realm",
  "authorization_endpoint": "https://oag.example.com/realms/example-realm/protocol/openid-connect/auth",
  "token_endpoint": "https://oag.example.com/realms/example-realm/protocol/openid-connect/token",
  "userinfo_endpoint": "https://oag.example.com/realms/example-realm/protocol/openid-connect/userinfo",
  "jwks_uri": "https://oag.example.com/realms/example-realm/protocol/openid-connect/certs",
  "introspection_endpoint": "https://oag.example.com/realms/example-realm/protocol/openid-connect/token/introspect",
  "revocation_endpoint": "https://oag.example.com/realms/example-realm/protocol/openid-connect/revoke",
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
    "client_secret_post",
    "client_secret_basic"
  ]
}
```

