---
title: Resource Owner Password Flow
excerpt: How to implement the resource owner password flow with Okta
---

# Implementing the Resource Owner Password Flow

The Resource Owner Password Flow is intended for use cases where you control both the client application and the resource that it is interacting with. At a high-level, this flow has the following steps:

- Your client application collects a user's credentials.
- Your application sends these credentials to your Okta authorization server.
- If the credentials are accurate, Okta responds with the requested tokens.

For more information on the resource owner password flow, including why to use it, see [our OAuth 2.0 overview](/authentication-guide/auth-overview/#resource-owner-password-flow).

### 1. Setting up your Application

You set up your OpenID Connect application inside the Okta Developer Console:

1. From the Applications page, choose **Add Application**.
2. On the Create New Application page, select **Native**.
3. Fill-in the Application Settings, being sure to select "Resource Owner Password" as one of the allowed grant types, then click **Done**.
4. On the next screen, in the "Client Credentials section", click **Edit**.
5. Select "Use Client Authentication", then click **Save**.

### 2. Using the Resource Owner Password Flow

Before you can begin this flow, you will have to collect the user's password in a manner of your choosing.

Once you have collected the credentials, all that is required is a single API call to the `/token` endpoint:

```
curl --request POST \
  --url https://{yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'authorization: Basic MG9hYn...' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=password&username=testuser1%40example.com&password=%7CmCov
  rlnU9oZU4qWGrhQSM%3Dyd&scope=openid'
```

> Important: The call to the `/token` endpoint requires authentication. In this case, it is a Basic Auth digest of the Client ID and Secret. You can find the client ID and secret in your application's General tab. For more on Basic Auth, please see [Token Authentication Methods](/docs/api/resources/oidc/#token-authentication-methods).

Note the parameters that are being passed:

- `grant_type` is `password`, indicating that we are using the Resource Owner Password grant type.
- `username` is the username of a user registered with Okta.
- `password` is the password of a user registered with Okta.
- `scope` must be at least `openid`. For more information about this, see the [Custom Authorization Server chapter](/authentication-guide/implementing-authentication/set-up-authz-server#create-scopes-optional).

For more information on these parameters, see the [OAuth 2.0 API reference](/docs/api/resources/oidc/#token).

If the credentials are valid, your application will receive back access and ID tokens:

```
{
    "access_token": "eyJhb[...]56Rg",
    "expires_in": 3600,
    "id_token": "eyJhb[...]yosFQ",
    "scope": "openid",
    "token_type": "Bearer"
}
```

### 3. Next Steps

When your application passes a request with an access token, the resource server will need to validate it. For more on this, see [Validating Access Tokens](/authentication-guide/tokens/validating-access-tokens).
