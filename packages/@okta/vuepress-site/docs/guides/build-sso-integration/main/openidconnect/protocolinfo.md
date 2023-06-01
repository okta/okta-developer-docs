##### OIDC customer org credentials

Okta uses a [multi-tenant](/docs/concepts/multi-tenancy) local credential system for OIDC integrations. When your customer adds your integration in their Okta org, they obtain a unique set of OIDC credentials. Each instance of your app integration inside a customer org has a separate set of OIDC client credentials that are used to access your application.

For example, consider a scenario where your app integration is added to 10 separate customer orgs. Seven of those customers create a single instance of your app integration. However, the other three customers each create two separate instances of your app integration so they can use different configuration options. This scenario creates a total of 13 sets of client credentials for your application that you need to track.

This multi-tenant approach differs from other IdPs that use a global credential system, where a given application has the same customer credentials across all orgs.

### Implement OIDC

For OIDC web apps, Okta recommends building an integration that securely stores a client secret and exchanges information with an authorization server through trusted back-channel connections. The [Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/) is best suited for SSO web apps in the OIN.

If you're building a single page application (SPA) integration, then Okta recommends using the [Authorization Code flow with a Proof Key for Code Exchange (PKCE)](/docs/concepts/oauth-openid/#authorization-code-flow-with-pkce).

You can follow these guides to implement the flows:

* [Implement Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/)
* [Implement Authorization Code flow with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/)

You can also use these guides which provide example app integrations in various languages:

* [Sign in to SPA](/docs/guides/sign-into-spa-redirect/)
* [Sign in to web application](/docs/guides/sign-into-web-app-redirect/)

When you follow these guides, one big caveat is the use of the authorization server. Most of the examples show how to make an `/authorize` request using a [custom authorization server](/docs/concepts/auth-servers/#custom-authorization-server). Some examples also set the issuer setting to a custom authorization server, but OIDC integrations in the OIN 

To support the potentially large numbers of Okta orgs accessing it through the OIN, an OIDC integration can't use a custom authorization server, including the `default` server. You can only use the [org authorization server](https://developer.okta.com/docs/concepts/auth-servers/#available-authorization-server-types).

  > **Note**: The `refresh_token` option isn't supported for apps published in OIN.


> **Note:** Your application needs to verify user identity through a user store. Otherwise, your app could be spoofed by fake applications in the Android or Apple app stores, or an end user could view and possibly modify your code. For this reason, native and mobile app integrations aren't acceptable for OIDC app integrations in the OIN. You must set up your application to use an authentication flow so that your client application talks to your SaaS back end, which then communicates with Okta.


### Authorization Code flow with PKCE

Just like with the regular Authorization Code flow, your app starts by redirecting the end user's browser to your [authorization server's](/docs/concepts/auth-servers/) `/authorize` endpoint. However, in this instance, you also have to pass along a code challenge.


  > **Note**: The `refresh_token` option isn't supported for apps published in OIN.

* The access token is then used by your application to retrieve the protected resources and information requested at the Resource Server for the end user.

### Scopes

Your OIDC client needs to use scope values to define the access privileges being requested with individual access tokens. The scopes associated with access tokens determine what resources are available when the tokens are used to access the protected endpoints. Scopes can be used to request that specific sets of values be available as claim information about the end user.

The only scope that must be declared is `openid`. When the authentication request is sent to Okta, the `openid` scope identifies the request as being an OIDC request.

Other optional scopes available (these are returned from the `/userinfo` endpoint):

* `profile`: The end user's default profile claims: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`
* `email`: Requests access to the `email` and `email_verified` claims

    >**Note:** ISVs shouldn't rely on the `email_verified` scope-dependent claim returned by an OIDC integration to evaluate whether a user has verified ownership of the email address associated with their profile.

* `address`: Requests access to the `address` claim
* `phone`: Requests access to the `phone_number` and `phone_number_verified` claims

> **Note**: The following scopes aren't supported for integrations published in the OIN:
> * `offline_access` scope (since refresh tokens aren't supported)
> * Custom scopes (such as the `groups` scope)

You can only request the [OIDC scopes](/docs/reference/api/oidc/#scopes). However, custom scopes can't be configured.

Okta utilizes access policies to decide whether the scopes can be granted. If any of the requested scopes are rejected by the access policies, the request is rejected.

## Uniform Resource Identifier (URI)

There are three URIs that you need to consider when creating an OIDC app for the OIN:

1. **Sign-in redirect URIs**: After the user is successfully authorized by Okta, this is the callback location is where the user is directed to along with the authorization code. This URI must exactly match at least one of the redirect URI values that are pre-registered in the Okta app integration settings.
2. Optional. **Initiate login URI**: This URI is used if the application is launched from the Okta dashboard (known as an IdP-initiated flow) and you want your Okta integration to handle redirecting your users to your application to start the sign-in request. When end users click your app in their Okta dashboard, they are redirected to the `initiate_login_uri` of the client application, which constructs the authentication request and redirects the end user back to the authorization server. This URI must exactly match the Initiate URI value that is pre-registered in the Okta app integration settings.
3. Optional. **Sign-out redirect URIs**: A location to send the user after a sign-off operation is performed and their session is terminated. Otherwise, the user is redirected back to the sign-in page.

### Token validation

For checking access tokens, the `/introspect` [endpoint](/docs/reference/api/oidc/#introspect) takes your token as a URL query parameter and then returns a simple JSON response with the boolean `active` property.

As OIN app integrations can't use custom authorization servers, you must use remote token validation (through the Introspection API endpoint) for access tokens and local validation for ID tokens.

This remote validation incurs a network cost, but you can use it when you want to guarantee that the access token hasn't been revoked.

### Key rotation

The standard behavior in identity and access management is to rotate the keys used to sign tokens. Okta changes these keys typically four times a year (every 90 days), but that rotation schedule can change without notice. Okta automatically rotates the keys for your authorization server on a regular basis.

Your OIDC client should periodically query the `/keys` endpoint and retrieve the JSON Web Key Set. This key set contains the public keys used to verify the signatures of the tokens received from Okta. You can cache the keys to improve performance, but be aware that verification fails when Okta automatically rotates the keys.

For more information, see [key rotation](/docs/concepts/key-rotation/) or the `/keys` [API endpoint](/docs/reference/api/oidc/#keys) for specific details on handling queries and responses.

### Rate limit considerations

When constructing your SSO application, you want to be aware of the limits on requests to Okta APIs. For reference on the categories and cumulative rate limits, see [Rate limits overview](/docs/reference/rate-limits/). Okta provides three headers in each response to report on both concurrent and org-wide rate limits.

For org-wide rate limits, the following three headers are provided:

* `X-Rate-Limit-Limit`: The rate limit ceiling that applies to the current request
* `X-Rate-Limit-Remaining`: The amount of requests left for the current rate-limit window
* `X-Rate-Limit-Reset`: The time when the rate limit resets, specified in UTC epoch time

To monitor org-wide rate limits, include code in your application to check the relevant headers in the response.

For concurrent rate limits, the three headers behave a little differently:

* When the number of unfinished requests is below the concurrent rate limit, request headers only report org-wide rate limits.
* After you exceed a concurrent rate limit, the headers report that the limit has been exceeded.
* When you drop back down below the concurrent rate limit, the headers switch back to reporting the time-based rate limits.
* The first two header values are always `0` for concurrent rate limit errors. The third header reports an estimated time interval when the concurrent rate limit may be resolved.
* The `X-Rate-Limit-Reset` time for concurrent rate limits is only a suggested value. There's no guarantee that enough requests can complete for the requests to go below the concurrent rate limit at the time indicated.

The error condition resolves itself when there's another concurrent thread available. Normally no intervention is required. You may be exceeding the concurrent rate limit if you notice frequent bursts of HTTP 429 errors. Examine the activities in the log before the burst of HTTP 429 errors appeared. If you can't identify what is causing you to exceed the limit, contact [Okta Support](mailto:support@okta.com).

You can request a temporary rate limit increase if you anticipate a large number of requests over a specified time period. Contact [Okta Support](mailto:support@okta.com) to open a ticket to permit the exception.

> **Note:** The following public metadata endpoints aren't subjected to rate limits:
> * `/oauth2/v1/keys`
> * `/.well-known/openid-configuration`
> * `/.well-known/oauth-authorization-server`
