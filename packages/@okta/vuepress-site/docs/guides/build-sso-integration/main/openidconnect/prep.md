If you haven't built the OIDC service in your app yet, review the [OAuth 2.0 and OpenID Connect Overview](/docs/concepts/oauth-openid/).

For OIDC integrations that you want to publish in the OIN catalog, review the following implementation topics:

1. [Determine a suitable OAuth 2.0 flow](#determine-the-oauth-2-0-flow-to-use) to use based on your app type.
1. [Determine the scopes](#scopes) that you require for your OIDC client (your app).
1. Consider how your app stores [customer client credentials](#oidc-customer-org-credentials).
1. Understand how to [validate tokens](#token-validation) in your OIDC client.

   > **Note:** You can't use the Okta SDKs to validate access tokens for apps in the OIN. This is due to the OIN restriction of using an org authorization server and the Authorization Code flow.

1. Implement credential rotation in your app.

   Your app must support automatic credential rotation. See [key rotation](#key-rotation).
1. Determine the sign-in redirect URIs for your app.

   A redirect URI is where Okta sends the authentication response and ID token during the sign-in flow. You can specify more than one URI if required.

1. [Consider rate limits](#rate-limit-considerations) when you build your integration.

After you've built the SSO integration in your app with the previous guidance list, test it with an Okta app integration instance. See [Create your integration in Okta](#create-your-integration-in-okta).

### OIDC customer org credentials

Okta uses a [multi-tenant](/docs/guides/oin-sso-overview/#okta-organization-and-multi-tenancy) local credential system for OIDC integrations. When your customer adds your integration in their Okta org, they obtain a unique set of OIDC credentials. Each instance of your app integration inside a customer org has a separate set of OIDC client credentials that are used to access your application.

This multi-tenant approach differs from other IdPs that use a global credential system, where a given application has the same customer credentials across all orgs.

See the [OIN multi-tenancy](/docs/guides/submit-app-prereq/main/#oin-multi-tenancy) requirement.

You must track client credentials for each app integration instance for your app. For example, consider a scenario where your app integration is added to 10 separate customer orgs. Seven of those customers create a single instance of your app integration. However, the other three customers each create two separate instances of your app integration so they can use different configuration options. This scenario creates a total of 13 sets of client credentials for your application that you need to track.

### Determine the OAuth 2.0 flow to use

> **Note:** Quickstarts and example links provided in this section may use features not supported in the OIN. For example, the use of a custom authorization server isn't supported.

Select the OAuth 2.0 flow to use based on your app:

* For web apps:

   Okta recommends the [Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/). This flow is used for apps with a dedicated server-side backend capable of securely storing a client secret. The app integration can also exchange information with an authorization server through trusted back-channel connections.

* For single-page apps (SPA):

   Okta recommends the [Authorization Code flow with a Proof Key for Code Exchange (PKCE)](/docs/concepts/oauth-openid/#authorization-code-flow-with-pkce) to control access between your SPA app and a resource server.

> **Note:** Native and mobile app integrations aren't accepted as OIDC app integrations in the OIN. Set up your app to use an authentication flow that allows your client app to talk to your SaaS backend. Your SaaS backend can then securely communicate with Okta through trusted back-channel connections.

Follow these guides to implement the OAuth 2.0 flows:

* [Implement Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/)
* [Implement Authorization Code flow with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/)

> **Note:** You can also review these sample integration quickstarts:
> * [Sign in to SPA](/docs/guides/sign-into-spa-redirect/)
> * [Sign in to web application](/docs/guides/sign-into-web-app-redirect/)

When you follow these guides, be aware of the authorization server used. Most of the examples show you how to make an `/authorize` or `/token` request using a [custom authorization server](/docs/concepts/auth-servers/#custom-authorization-server). To support the potentially large number of Okta orgs accessing it through the OIN, an OIDC integration can't use a custom authorization server (this includes the `default` server). Therefore, for OIN OIDC apps, you can only use the [org authorization server](/docs/concepts/auth-servers/#org-authorization-server).

For example, the following are the various `/authorize` request URLs for the different authorization servers:

**custom authorization server**: `https://{customerOktaDomain}/oauth2/{authorizationServerId}/v1/authorize?client_id={clientId}&response_type=code&scope=openid&redirect_uri={redirectURI}&state={state}`

**default custom authorization server**(`{authorizationServerId}=default`): `https://{customerOktaDomain}/oauth2/default/v1/authorize?client_id={clientId}&response_type=code&scope=openid&redirect_uri={redirectURI}&state={state}`

**org authorization server**:`https://{customerOktaDomain}/oauth2/v1/authorize?client_id={clientId}&response_type=code&scope=openid&redirect_uri={redirectURI}&state={state}`

Make sure you only use the **org authorization server** URL.

> **Notes:**
> * When you use the org authorization server, the issuer URL is `https://{yourOktaDomain}`.
> * The `refresh_token` option isn't supported for apps published in the OIN.

### Scopes

Your OIDC client needs to use scope values to define the access privileges being requested with individual access tokens. The scopes associated with access tokens determine what resources are available when the tokens are used to access the protected endpoints. You can use scopes to request that specific sets of values be available as claim information about the end user.

The only scope that you must declare is `openid`. When the authentication request is sent to Okta, the `openid` scope identifies the request as being an OIDC request.

Other optional scopes available (these are returned from the `/userinfo` endpoint):

* `profile`: The end user's default profile claims: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`
* `email`: Requests access to the `email` and `email_verified` claims

  > **Note:** Don't rely on the `email_verified` scope-dependent claim returned by an OIDC integration to evaluate whether a user has verified ownership of the email address associated with their profile.

* `address`: Requests access to the `address` claim
* `phone`: Requests access to the `phone_number` and `phone_number_verified` claims

> **Note**: The following scopes aren't supported for integrations published in the OIN:
>   * `offline_access` scope (since refresh tokens aren't supported)
>   * Custom scopes (such as the `groups` scope). You can only request the [OIDC scopes](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#scopes). You can't configure custom scopes.

Okta uses access policies to decide whether to grant scopes. If any of the requested scopes are rejected by the access policies, Okta rejects the request.

### Uniform Resource Identifier (URI)

There are three URIs that you need to consider when creating an OIDC app for the OIN:

1. **Sign-in redirect URIs**: After the user is successfully authorized by Okta, this is the callback location where the user is directed along with the authorization code. This URI must exactly match at least one of the redirect URI values that are pre-registered in the Okta app integration settings.
2. Optional. **Initiate login URI**: This URI is used if the app is launched from the Okta dashboard (known as an IdP-initiated flow), and you want your Okta integration to handle redirecting your users to your app to start the sign-in request. When end users click your app in their Okta dashboard, they are redirected to the `initiate_login_uri` of the client app, which constructs the authentication request and redirects the end user back to the authorization server. This URI must exactly match the Initiate URI value that is pre-registered in the Okta app integration settings.
3. Optional. **Sign-out redirect URIs**: A location to send the user after a sign-out operation is performed and their session is terminated. Otherwise, the user is redirected back to the sign-in page.

### Token validation

For checking access tokens, the `/introspect` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/introspectCustomAS) takes your token as a URL query parameter and then returns a simple JSON response with the boolean `active` property.

As OIN app integrations can't use custom authorization servers, you must use remote token validation (through the Introspection API endpoint) for access tokens and local validation for ID tokens.

This remote validation incurs a network cost, but you can use it when you want to guarantee that the access token hasn't been revoked.

> **Note:** You can't use the Okta SDKs for OIN app integration development if you need to validate access tokens with the org authorization server. This is due to the OIN restriction of using an org authorization server and the Authorization Code flow.

### Key rotation

The standard behavior in identity and access management is to rotate the keys used to sign tokens. Okta changes these keys typically four times a year (every 90 days), but that rotation schedule can change without notice. Okta automatically rotates the keys for your authorization server on a regular basis.

Your OIDC client should periodically query the `/keys` endpoint and retrieve the JSON Web Key Set. This key set contains the public keys used to verify the signatures of the tokens received from Okta. You can cache the keys to improve performance, but be aware that verification fails when Okta automatically rotates the keys.

See [key rotation](/docs/concepts/key-rotation/) or the `/keys` [API endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/oauthKeysCustomAS) for specific details on handling queries and responses.

### Rate limit considerations

When you construct your SSO application, be aware of the limits on requests to Okta APIs. For information on the rate-limit categories, see the [Rate limits overview](/docs/reference/rate-limits/). Okta provides three headers in each response to report on both concurrent and org-wide rate limits.

For org-wide rate limits, the following three headers are provided:

* `X-Rate-Limit-Limit`: The rate limit ceiling that applies to the current request
* `X-Rate-Limit-Remaining`: The amount of requests left for the current rate-limit window
* `X-Rate-Limit-Reset`: The time when the rate limit resets, specified in UTC epoch time

To monitor org-wide rate limits, include code in your app to check the relevant headers in the response.

For concurrent rate limits, the three headers behave a little differently:

* When the number of unfinished requests is below the concurrent rate limit, request headers only report org-wide rate limits.
* After you exceed a concurrent rate limit, the headers report that the limit has been exceeded.
* When you drop back down below the concurrent rate limit, the headers switch back to reporting the time-based rate limits.
* The first two header values are always `0` for concurrent rate limit errors. The third header reports an estimated time interval when the concurrent rate limit may be resolved.
* The `X-Rate-Limit-Reset` time for concurrent rate limits is only a suggested value. There's no guarantee that enough requests can complete for the requests to go below the concurrent rate limit at the time indicated.

The error condition resolves itself when there's another concurrent thread available. Normally no intervention is required. You may be exceeding the concurrent rate limit if you notice frequent bursts of HTTP 429 errors. Examine the activities in the log before the burst of HTTP 429 errors appeared. If you can't identify what is causing you to exceed the limit, contact [Okta Support](https://support.okta.com).

You can request a temporary rate limit increase if you anticipate a large number of requests over a specified time period. Contact [Okta Support](https://support.okta.com) to open a ticket to permit the exception. See [How to Request a Temporary Rate Limit Increase](https://support.okta.com/help/s/article/How-can-we-request-to-have-the-rate-limit-for-our-org-temporarily-increased?language=en_US).

> **Note:** The following public metadata endpoints aren't subjected to rate limits:
> * `/oauth2/v1/keys`
> * `/.well-known/openid-configuration`
> * `/.well-known/oauth-authorization-server`
