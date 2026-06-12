In this example, create a web app that supports the authorization code with PKCE flow and refresh tokens.

Before you begin, have a secure value ready to use as the `clientSecret`. You define this value yourself - Access Gateway doesn't generate it and doesn't return it in the response. Store it securely before you make the request.

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

Configure your client application using the `clientId` and, for confidential clients, the `clientSecret` from the response.

Retrieve the OIDC discovery document by using the Retrieve the OpenID Connect discovery document [endpoint](https://developer.okta.com/docs/api/openapi/oag/oag/tags/oidc/other/getopenidconnectdiscovery). The discovery document includes the authorization, token, userinfo, introspection, and revocation endpoint URLs. Use these to configure your client's OIDC settings.
