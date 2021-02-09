---
title: Refresh token rotation
---
Refresh token rotation is an <ApiLifecycle access="ea"/> feature.

Refresh token rotation helps a public client to securely rotate refresh tokens after each use. When refresh token rotation behavior is enabled in Okta, a new refresh token is returned each time the client makes a request to exchange a refresh token for a new access token.

## Refresh token reuse detection

When a client wants to renew an access token, it sends the refresh token with the access token request to the `/token` endpoint. Okta validates the incoming refresh token and issues a new set of tokens. As soon as the new tokens are issued, Okta invalidates the refresh token that was passed with the initial request to the `/token` endpoint.

If a previously used refresh token is used again with the token request, the Authorization Server automatically detects the attempted reuse of the refresh token. As a result, Okta immediately invalidates the most recently issued refresh token and all access tokens issued since the user authenticated. This protects your application from token compromise and replay attacks.

### System Log events

Okta fires the following System Log [events](/docs/reference/api/event-types/) when token reuse is detected:

* `app.oauth2.as.token.detect_reuse` for [Custom Authorization Servers](/docs/concepts/auth-servers/#custom-authorization-server)
* `app.oauth2.token.detect_reuse` for the [Org Authorization Server](/docs/concepts/auth-servers/#org-authorization-server)

## Grace period for token rotation

Token reuse detection can sometimes impact the user experience. For example, when apps are accessed by users with a poor network connection, new tokens issued by Okta might not reach the client app. As a result, the client might want to reuse the refresh token to get new tokens from Okta. So, Okta offers a grace period when you [configure refresh token rotation](#enable-refresh-token-rotation). After the refresh token is rotated, the previous token remains valid for the configured amount of time to allow clients to get the new token.

## Enable refresh token rotation

Rotating refresh token behavior is the default for SPAs. When you create a new SPA, or when you update an existing SPA, and select **Refresh Token** as the allowed grant type, rotating the refresh token is set as the default.

To update existing OpenID Connect applications to use refresh token rotation:

1. From the Admin Console, click **Applications** and then **Applications**.
1. Select the application that you want to configure.
1. Select the **General** tab and click **Edit**.
1. In the **Allowed grant type** section, select **Refresh Token**.
1. In the **REFRESH TOKEN** section that appears, select **Rotate token after every use**.
1. Make any adjustments to the number of seconds for the **Grace period for token rotation**. You can change the value to any number between 0 and 60 seconds. After the refresh token is rotated, the previous token remains valid for this amount of time to allow clients to get the new token.

When you create a new native or web app and want to use refresh token rotation:

1. From the Admin Console, click **Applications** and then **Applications**.
1. Click **Add Application**.
1. While walking through the app creation wizard, select **Refresh Token** in the **Allowed grant type** section.
1. After you click **Done**, select the **General** tab and click **Edit**.
1. In the **REFRESH TOKEN** section, select **Rotate token after every use**.
1. Make any adjustments to the number of seconds for the **Grace period for token rotation**. The default is set to 30 seconds. You can change the value to any number between 0 and 60 seconds. After the refresh token is rotated, the previous token remains valid for this amount of time to allow clients to get the new token.

### Refresh token rotation properties

After you enable refresh token rotation, the `refresh_token` property appears within `settings.oauthClient` for your app. The `refresh_token` property is an object that contains the `rotation_type` and `leeway` properties. Accepted values for `rotation_type` are `ROTATE` or `STATIC`. The accepted value for `leeway` is any number between 0 and 60.

```json
"refresh_token": {
    "rotation_type": "ROTATE",
    "leeway": 30
}
```

See [Refresh token object](/docs/reference/api/apps/#refresh-token-object).

## Refresh token lifetime

Refresh token lifetimes are managed through the [Authorization Server access policy](/docs/guides/configure-access-policy/overview/). The default value for the refresh token lifetime (`refreshTokenLifetimeMinutes`) for an [Authorization Server access policy](/docs/reference/api/authorization-servers/#actions-object) is **Unlimited**, but expires every seven days if hasn't been used. When you use a refresh token with a SPA, make sure that you keep a short refresh token lifetime for better security.

<NextSectionLink/>
