---
title: Client Credentials Flow
excerpt: How to implement the client credentials flow with Okta
---

# Implementing the Client Credentials Flow

The Client Credentials flow is recommended for use in machine-to-machine authentication. Your application will need to securely store it's Client ID and Secret and pass those to Okta in exchange for an access token. At a high-level, the flow only has two steps:

- Your application passes its client credentials to your Okta authorization server.
- If the credentials are accurate, Okta responds with an access token.

### 1. Setting up your Application

You set up your OpenID Connect application inside the Okta Developer Console:

1. From the Applications page, choose **Add Application**.
2. On the Create New Application page, select **Service**.
3. Fill-in the Application Name, then click **Done**.

### 2. Creating Custom Scopes

The Client Credentials flow never has a user context, so you can't request OpenID scopes. Instead, you must create a custom scope. For more information on creating custom scopes, see [our OAuth 2.0 overview](/authentication-guide/auth-overview/#client-credentials-flow).

### 3. Using the Client Credentials Flow

Your Client Application will need to have its client ID and secret stored in a secure manner. You can find the client ID and secret in your application's General tab. These are then passed via Basic Auth in the request to your Okta Authorization Server's `/token` endpoint:

```
curl --request POST \
  --url https://{yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'authorization: Basic MG9hY...' \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=client_credentials&redirect_uri=http%3A%2F%2Flocalhost%3A8080&
  scope=customScope'
```

> NOTE: The Client ID and Secret aren't included in the POST body, but rather are placed in the HTTP Authorization header following the rules of HTTP Basic Auth.

Note the parameters that are being passed:

- `grant_type` is `client_credentials`, indicating that we are using the Client Credentials grant type.
- `redirectUri` must match one of the "Login redirect URIs" you specified when you were creating your Okta application in Step 1.
- `scope` must be at least one custom scope that you have created. For more information about this, see the [Custom Authorization Server chapter](/authentication-guide/implementing-authentication/set-up-authz-server#create-scopes-optional).

If the credentials are valid, the application will receive back an access token:

```
{
    "access_token": "eyJhbG[...]1LQ",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "customScope"
}
```

### 4. Next Steps

When your application sends a request with an access_token, the resource server will need to validate it. For more on this, see [Validating Access Tokens](/authentication-guide/tokens/validating-access-tokens).
