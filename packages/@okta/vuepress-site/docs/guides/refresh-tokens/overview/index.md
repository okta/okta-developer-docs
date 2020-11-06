---
title: Overview
---

Access and ID [tokens](/docs/reference/api/oidc/#tokens-and-claims) are JSON web tokens that are valid for a specific number of seconds. Typically, a user needs a new access token when they attempt to access a resource for the first time or after the previous access token that was granted to them expires.

A refresh token is a special token that is used to obtain additional access tokens. This allows you to have short-lived access tokens without having to collect credentials every time one expires. You request a refresh token alongside the access and/or ID tokens as part of a user's initial authentication flow. Applications must then securely store refresh tokens since they allow users to remain authenticated.

For clients such as native apps, persistent refresh tokens help improve a user's authentication experience. For example, persistent refresh tokens allow a user to access streaming video services on their smart TV without signing in after they complete the initial device authorization. With persistent refresh token behavior, the same refresh token is returned each time the client makes a request to exchange a refresh token for a new access token until the [refresh token lifetime](/docs/reference/api/authorization-servers/#actions-object) expires.

However, public clients such as browser-based applications have a much higher risk of a refresh token being compromised when a persistent refresh token is used. With clients such as single-page applications (SPAs), long-lived refresh tokens aren't suitable, because there isn't a way to safely store a persistent refresh token in a browser and assure access by only the intended app. These threats are greatly reduced by rotating refresh tokens. [Refresh token rotation](/docs/guides/refresh-tokens/refresh-token-rotation) helps a public client to securely rotate refresh tokens after each use. With refresh token rotation behavior, a new refresh token is returned each time the client makes a request to exchange a refresh token for a new access token. Refresh token rotation works with SPAs, native apps, and web apps in Okta.

Refresh token rotation is an <ApiLifecycle access="ea" /> feature.

## Set up your application

Refresh tokens are available for a subset of Okta OAuth 2.0 client applications, specifically web, single-page, or native applications. See our [OAuth 2.0 and OIDC overview](/docs/concepts/oauth-openid/#recommended-flow-by-application-type) for more about creating an OpenID Connect application.

Be sure to specify `refresh_token` as a `data_type` value for the `grant_type` parameter when adding an [OAuth client app](/docs/reference/api/apps/#add-oauth-2-0-client-application) using the `/apps` API. Alternatively, after you set up an application, you can select the **Refresh Token** option for **Allowed grant types** on the **General Settings** tab in the Developer Console.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
