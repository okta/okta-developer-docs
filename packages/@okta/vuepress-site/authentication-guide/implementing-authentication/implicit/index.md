---
title: Implicit Flow
excerpt: How to implement the implicit code flow with Okta
---

# Implementing the Implicit Flow

If you are building a Single-Page Application (SPA), then the implicit flow is the recommended method for controlling access between your SPA and a resource server.

At a high-level, this flow has the following steps:

- Your application directs the browser to the Okta sign-in page, where the user authenticates.
- Okta redirects the browser back to the specified redirect URI, along with access and ID tokens as a hash fragment in the URI.
- Your application extracts the tokens from the URI.
- Your application can now use these tokens to call the resource server (for example an API) on behalf of the user.

For more information on the implicit flow, including why to use it, see [our OAuth 2.0 overview](/authentication-guide/auth-overview/#implicit-flow).

### 1. Setting up your Application

You set up your OpenID Connect application inside the Okta Developer Console:

1. From the Applications page, choose **Add Application**.
2. On the Create New Application page, select **SPA**.
3. Fill-in the Application Settings, then click **Done**.

### 2. Using the Implicit Flow

Kicking off this flow is very similar to the [authorization code flow](/authentication-guide/implementing-authentication/auth-code) except that the `response_type` is `token` and/or `id_token` instead of `code`.

Your browser makes a request to your authorization server's `/authorize` endpoint. If you are using the default Okta authorization server, then your request URL would look something like this:

```
https://{yourOktaDomain}/oauth2/default/v1/authorize?client_id=0oabv6kx4qq6
h1U5l0h7&response_type=token&scope=openid&redirect_uri=http%3A%2F%2Flocalhost%3
A8080&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601&nonce=foo'
```

Note the parameters that are being passed:

- `client_id` matches the Client ID of your Okta OAuth application that you created above. You can find it at the bottom of your application's General tab.
- `response_type` is `token`. It could also be `id_token` or both.
- `scope` is `openid` which is required, though additional scopes can be requested. For more information about scopes, see [here](/docs/api/resources/oidc#scopes).
- `redirect_uri` is the callback location where the user-agent will be directed to along with the `access_token`. This must match one of the "Login redirect URIs" you specified when you were creating your Okta application in Step 1.
- `state` is an arbitrary alphanumeric string that the authorization server will reproduce when redirecting the user-agent back to the client. This is used to help prevent cross-site request forgery.

For more information on these parameters, see [the OAuth 2.0 API reference](/docs/api/resources/oidc#authorize).

If the user does not have an existing session, this will open the Okta Sign-in Page. If they have an existing session, or after they authenticate, they will arrive at the specified `redirect_uri` along with a `token` as a hash fragment:

```
http://localhost:8080/#access_token=eyJhb[...]erw&token_type=Bearer&expires_in=
3600&scope=openid&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601
```

Your application must now extract the token(s) from the URI and store them.

### 3. Next Steps

When your application passes a request with an `access_token`, the resource server will need to validate it. For more on this, see [Validating Access Tokens](/authentication-guide/tokens/validating-access-tokens).

### Examples

The following quickstart guides will show you how to integrate the implicit flow into your front-end application.

|                                         | Framework         | Quickstart Link                                   |
|:---------------------------------------:| ----------------- | ------------------------------------------------- |
| <i class="icon code-angular-32"></i>    | Angular           | <https://developer.okta.com/quickstart/#/angular> |
| <i class="icon code-react-32"></i>      | React             | <https://developer.okta.com/quickstart/#/react>   |
| <i class="icon code-javascript-32"></i> | Vanilla JS | <https://developer.okta.com/quickstart/#/widget>  |
