---
title: OpenID Connect & OAuth 2.0 API
category: authentication
excerpt: Control user access to your applications.
meta:
  - name: description
    content: Find information about the OAuth 2.0 and OpenID Connect endpoints that Okta exposes on its authorization servers.
---

# OpenID Connect & OAuth 2.0 API

Okta is a standards-compliant [OAuth 2.0](http://oauth.net/documentation) authorization server and a certified [OpenID Connect provider](http://openid.net/certification).

OpenID Connect extends OAuth 2.0. The OAuth 2.0 protocol provides API security via scoped access tokens, and OpenID Connect provides user authentication and single sign-on (SSO) functionality.

This page contains detailed information about the OAuth 2.0 and OpenID Connect endpoints that Okta exposes on its authorization servers. For higher-level information about how to use these endpoints, see [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid/).

## Get started

Explore the OpenID Connect & OAuth 2.0 API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9e7ad28ca1c26870a4b0)

## Endpoints

| Endpoint                                                                          | Use                                                                                     |
| --------------------------------------------------------------------------------  | -------------------------------------------------------------------------               |
| [/authorize](#authorize)                                                          | Interact with the resource owner and obtain an authorization grant.                     |
| [/token](#token)                                                                  | Obtain an access and/or ID token by presenting an authorization grant or refresh token. |
| [/introspect](#introspect)                                                        | Return information about a token.                                                      |
| [/revoke](#revoke)                                                                | Revoke an access or refresh token.                                                     |
| [/logout](#logout)                                                                | End the session associated with the given ID token.                                    |
| [/keys](#keys)                                                                    | Return public keys used to sign responses.                                             |
| [/userinfo](#userinfo)                                                            | Return claims about the authenticated end user.                                        |
| [/.well-known/oauth-authorization-server](#well-known-oauth-authorization-server) | Return OAuth 2.0 metadata related to the specified authorization server.               |
| [/.well-known/openid-configuration](#well-known-openid-configuration)             | Return OpenID Connect metadata related to the specified authorization server.          |

### Composing your base URL

All of the endpoints on this page start with an authorization server, however the URL for that server varies depending on the endpoint and the type of authorization server. You have two types of authorization servers to choose from depending on your use case:

#### 1. Single Sign-On to Okta

This is for the use case where your users are all part of your Okta organization, and you would just like to offer them single sign-on (for example, you want your employees to sign in to an application with their Okta accounts). In OAuth 2.0 terminology, Okta is both the authorization server and the resource server. When Okta is serving as the authorization server for itself, we refer to this as the "Okta Org Authorization Server" and your base URL looks like this:

`https://${yourOktaDomain}/oauth2`

The full URL to the `/authorize` endpoint looks like this:

`https://${yourOktaDomain}/oauth2/v1/authorize`

#### 2. Okta as the identity platform for your app or API

This is for use cases where Okta is the authorization server for your resource server (for example, you want Okta to act as the user store for your application, but Okta is invisible to your users). This kind of authorization server we call a "Custom Authorization Server", and your base URL looks like this:

`https://${yourOktaDomain}/oauth2/${authServerId}`

The full URL to the `/authorize` endpoint looks like this:

`https://${yourOktaDomain}/oauth2/${authServerId}/v1/authorize`

If you have a developer account, you can use the `default` authorization server that was created along with your account, in which case the base URL looks like this:

`https://${yourOktaDomain}/oauth2/default`

The full URL to the `/authorize` endpoint looks like this:

`https://${yourOktaDomain}/oauth2/default/v1/authorize`

See [Authorization Servers](/docs/concepts/auth-servers/) for an overview of Authorization Servers and what you can do with them. See [Create an Authorization Server](/docs/guides/customize-authz-server/) for information on how to create an Authorization Server.

### /authorize

<ApiOperation method="get" url="${baseUrl}/v1/authorize" />

> **Note:** This endpoint's base URL varies depending on whether you are using a custom authorization server. For more information, see [Composing your base URL](#composing-your-base-url).

This is a starting point for browser-based OpenID Connect flows such as the implicit and authorization code flows. This request authenticates the user and returns tokens along with an authorization grant to the client application as a part of the callback response.

> **Note:** When making requests to the `/authorize` endpoint, the browser (user agent) should be redirected to the endpoint. You can't use AJAX with this endpoint.

#### Request Parameters

| Parameter                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                        | Param Type  | DataType  | Required   |
| :---------------------           | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                           | :---------- | :-------- | :--------- |
| client_id                        | Obtained during either manual client registration or via the [Dynamic Client Registration API](/docs/reference/api/oauth-clients/). It identifies the client and must match the value preregistered in Okta.                                                                                                                                                                                                                                       | Query       | String    | TRUE       |
| code_challenge                   | A challenge for [PKCE](/docs/guides/implement-auth-code-pkce/). The challenge is verified in the access token request.                                                                                                                                                                                                                                                                                                   | Query       | String    | FALSE      |
| code_challenge_method            | Method used to derive the code challenge for [PKCE](/docs/guides/implement-auth-code-pkce/). Valid value: `S256`                                                                                                                                                                                                                                                                                                         | Query       | String    | FALSE      |
| display                          | The `display` parameter to be passed to the Social Identity Provider when performing Social Login.                                                                                                                                                                                                                                                                                                                                                 | Query       | String    | FALSE      |
| idp_scope                        | A space delimited list of scopes to be provided to the Social Identity Provider when performing [Social Login](/docs/concepts/social-login/). These scopes are used in addition to the scopes already configured on the Identity Provider.                                                                                                                                                                                                  | Query       | String    | FALSE      |
| [idp](/docs/reference/api/idps/) | Identity provider to use if there's no Okta Session.                                                                                                                                                                                                                                                                                                                  | Query       | String    | FALSE      |
| login_hint                       | A username to prepopulate if prompting for authentication.                                                                                                                                                                                                                                                                                                                                           | Query       | String    | FALSE      |
| max_age                          | Allowable elapsed time, in seconds, since the last time the end user was actively authenticated by Okta.                                                                                                                                                                                                                                                                                                                                           | Query       | String    | FALSE      |
| nonce                            | A value that is returned in the ID token. It is used to mitigate replay attacks.                                                                                                                                                                                                                                                                                                                                                              | Query       | String    | TRUE       |
| prompt                           | Valid values: `none`, `consent`, `login`, or `consent` and `login` in either order. See [Parameter details](#parameter-details) for more information.                                                                                                                                                                                                                                                                                              | Query       | String    | FALSE      |
| redirect_uri                     | Callback location where the authorization code or tokens should be sent. It must match the value preregistered in Okta during client registration.                                                                                                                                                                                                                                                                                                 | Query       | String    | TRUE       |
| response_type                    | Any combination of `code`, `token`, and `id_token`. The combination determines the [flow](/docs/concepts/oauth-openid/#recommended-flow-by-application-type).                                                                                                                                                                                                                                                                                                     | Query       | String    | TRUE       |
| response_mode                    | How the authorization response should be returned. [Valid values](#parameter-details): `fragment`, `form_post`, `query` or `okta_post_message`. If `id_token` or `token` is specified as the response type, then `query` isn't allowed as a response mode. Defaults to `fragment` in implicit and hybrid flows. | Query       | String    | FALSE      |
| request                          | A JWT created by the client that enables requests to be passed as a single, self-contained parameter. See [Parameter details](#parameter-details).                                                                                                                                                                                                                                                                                        | Query       | JWT       | FALSE      |
| scope                            | `openid` is required for authentication requests. Other [scopes](#access-token-scopes-and-claims) may also be included.                                                                                                                                                                                                                                                                                                                            | Query       | String    | TRUE       |
| sessionToken                     | Okta one-time session token. This allows an API-based user sign-in flow (rather than the Okta sign-in UI). Session tokens can be obtained via the [Authentication API](/docs/reference/api/authn/).                                                                                                                                                                                                                                                        | Query       | String    | FALSE      |
| state                            | A value to be returned in the token. The client application can use it to remember the state of its interaction with the end user at the time of the authentication call. It can contain alphanumeric, comma, period, underscore, and hyphen characters. See [Parameter details](#parameter-details).                                                                                                                                               | Query       | String    | TRUE       |

#### Parameter details

* `idp`, `sessionToken` and `idp_scope` are Okta extensions to [the OpenID specification](http://openid.net/specs/openid-connect-core-1_0.html#Authentication).
    All other parameters comply with the OpenID Connect specification and their behavior is consistent with the specification.
* `prompt`:

    If no `prompt` parameter is specified, the standard behavior occurs:
  * If an Okta session already exists, the user is silently authenticated. Otherwise, the user is prompted to authenticate.
  * If scopes are requested that require consent and consent isn't yet given by the authenticated user, the user is prompted to give consent.

  There are four possible values for this parameter:

  * `none`: Don't prompt for authentication or consent. If an Okta session already exists, the user is silently authenticated. Otherwise, an error is returned.
  * `login`: Always prompt the user for authentication, regardless of whether they have an Okta session.
  * `consent`: Depending on the [values set for `consent_method` in the app and `consent` on the scope](/docs/reference/api/apps/#add-oauth-20-client-application), display the Okta consent dialog, even if the user has already given consent. User consent is available for Custom Authorization Servers (requires the API Access Management feature and the User Consent feature enabled).
  * `login consent` or `consent login` (order doesn't matter): The user is always prompted for authentication, and the user consent dialog appears depending on the [values set for `consent_method` in the app and `consent` on the scope](/docs/reference/api/apps/#add-oauth-20-client-application), even if the user has already given consent.

* `request`:

  * You must sign the JWT using either the app's client secret or a private key whose public key is registered on the app's JWKSet.
  * The JWT can't be encrypted.
  >  **Note:** See [Build a JWT for client authentication](/docs/guides/build-self-signed-jwt/java/overview/) for information on how to build a JWT.
  * Okta supports the [HMAC](https://tools.ietf.org/html/rfc7518#section-3.2), [RSA](https://tools.ietf.org/html/rfc7518#section-3.3) and [ECDSA](https://tools.ietf.org/html/rfc7518#section-3.4) signature algorithms. HMAC signatures require that the client has a `token_endpoint_auth_method` that uses a `client_secret`. RSA and ECDSA signatures requires that the client registers a public key.
  * We recommend that you don't duplicate any request parameters in both the JWT and the query URI itself. However, you can do so with `state`, `nonce`, `code_challenge`, and `code_challenge_method`. In those cases, the values in the JWT overrides the query URI values.
  * Okta validates the `request` parameter in the following ways:
    1. `iss` is required and must be the `client_id`.
    2. `aud` is required and must be the same value as the Authorization Server issuer that mints the ID or access token. This value is published in the metadata for your Authorization Server.
    3. JWT lifetime is evaluated using the `iat` and `exp` claims, if present. If the JWT is expired or not yet valid, Okta returns an `invalid_request_object` error. Okta rejects JWTs that expire more than one hour in the future.
    4. Okta rejects the JWT if the `jti` claim is present and it has already been processed.

* `response_mode`:

  Each value for `response_mode` delivers different behavior:
  * `fragment` - Parameters are encoded in the URL fragment added to the `redirect_uri` when redirecting back to the client.
  * `query` - Parameters are encoded in the query string added to the `redirect_uri` when redirecting back to the client.
  * `form_post` - Parameters are encoded as HTML form values (`application/x-www-form-urlencoded` format) and are transmitted via the HTTP POST method to the client.
  * `okta_post_message` - Uses [HTML5 Web Messaging](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) (for example, `window.postMessage()`) instead of the redirect for the authorization response from the `/authorize` endpoint.

    `okta_post_message` is an adaptation of the [Web Message Response Mode](https://tools.ietf.org/html/draft-sakimura-oauth-wmrm-00#section-4.1).
    This value provides a secure way for a single-page application to perform a sign-in flow in a pop-up window or an iFrame and receive the ID token, access token, and/or authorization code back in the parent page without leaving the context of that page. The data object for the `postMessage` call is in the next section.

  The `Referrer-Policy` header is automatically included in the response when either the `fragment` or `query` parameter values are used. The header is set to `Referrer-Policy: no-referrer`.

* `state`:

  Okta requires the OAuth 2.0 `state` parameter on all requests to the `/authorize` endpoint to prevent cross-site request forgery (CSRF).
  The OAuth 2.0 specification [requires](https://tools.ietf.org/html/rfc6749#section-10.12) that clients protect their redirect URIs against CSRF by sending a value in the authorize request that binds the request to the user-agent's authenticated state.
  Using the `state` parameter is also a countermeasure to several other known attacks as outlined in [OAuth 2.0 Threat Model and Security Considerations](https://tools.ietf.org/html/rfc6819).

#### postMessage() data object

Use the `postMessage()` data object to help you when working with the `okta_post_message` value of the `response_mode` request parameter.

`message`:

| Parameter           | Description                                                                                   | DataType |
| :------------------ | :-------------------------------------------------------------------------------------------- | :------- |
| access_token        | An [access token](#access-token). This is returned if the `response_type` included `token`.   | String   |
| error               | The error code, if something went wrong.                                                      | String   |
| error_description   | Additional error information (if any).                                                        | String   |
| id_token            | An [ID token](#id-token). This is returned if the `response_type` included `id_token`.        | String   |
| state               | The unmodified `state` value from the request.                                                | String   |

> **Note:** The value of the `targetOrigin` parameter for `postMessage()` specifies what the origin of `parentWindow` must be for the event to be dispatched (this is enforced by the browser). The `okta-post-message` response mode always uses the origin from the `redirect_uri` specified by the client. This is crucial to prevent the sensitive token data from being exposed to a malicious site.

#### Response properties

Irrespective of the response type, the contents of the response are as described in the table.

| Property            | Description                                                                                                                                                                              | DataType |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| access_token        | An [access token](#access-token). This is returned if `response_type` included `token`.                                                                                                  | String   |
| code                | An opaque value that can be used to redeem tokens from the [token endpoint](#token). `code` is returned if the `response_type` includes `code`. The code has a lifetime of 300 seconds.   | String   |
| error               | The error code, if something went wrong.                                                                                                                                                 | String   |
| error_description   | Additional error information (if any).                                                                                                                                                   | String   |
| expires_in          | Number of seconds until the `access_token` expires. This is only returned if the response included an `access_token`.                                                                    | String   |
| id_token            | An [ID token](#id-token).  This is returned if the `response_type` included `id_token`.                                                                                                  | String   |
| scope               | Scopes specified in the `access_token`. Returned only if the response includes an `access_token`.                                                                                        | String   |
| state               | The unmodified `state` value from the request.                                                                                                                                           | String   |
| token_type          | The token type is always `Bearer` and is returned only when `token` is specified as a `response_type`.                                                                                   | String   |

##### Possible errors

These APIs are compliant with the OpenID Connect and OAuth 2.0 spec with some Okta specific extensions.

[OAuth 2.0 spec error codes](https://tools.ietf.org/html/rfc6749#section-4.1.2.1)

| Error Id                    | Details                                                                                                                                                                                                            |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access_denied               | The server denied the request.                                                                                                                                                                                     |
| invalid_client              | The specified client ID is invalid.                                                                                                                                                                                |
| invalid_grant               | The specified grant is invalid, expired, revoked, or doesn't match the redirect URI used in the authorization request.                                                                                            |
| invalid_request             | The request is missing a necessary parameter, the parameter has an invalid value, or the request contains duplicate parameters.                                                                                                                                |
| invalid_scope               | The scopes list contains an invalid or unsupported value.                                                                                                                                                          |
| invalid_token               | The provided access token is invalid.                                                                                                                                                                              |
| server_error                | The server encountered an internal error.                                                                                                                                                                          |
| temporarily_unavailable     | The server is temporarily unavailable, but should be able to process the request at a later time.                                                                                                                  |
| unsupported_response_type   | The specified response type is invalid or unsupported.                                                                                                                                                             |
| unsupported_response_mode   | The specified response mode is invalid or unsupported. This error is also thrown for disallowed response modes. For example, if the query response mode is specified for a response type that includes `id_token`. |

[OpenID Connect spec error codes](http://openid.net/specs/openid-connect-core-1_0.html#AuthError)

| Error Id             | Details                                                                                           |
| :------------------- | :------------------------------------------------------------------------------------------------ |
| insufficient_scope   | The access token provided doesn't contain the necessary scopes to access the resource.           |
| login_required       | The request specified that no prompt should be shown but the user is currently not authenticated. |

#### Request examples

This request initiates the authorization code flow as signaled by `response_type=code`. The request returns an authorization code that you can use as the `code` parameter in a token request.

```bash
https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id=0oabucvy
c38HLL1ef0h7&response_type=code&scope=openid&redirect_uri=http%3A%2F%2Flocal
host%3A8080&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601&nonce=g5ly497e8ps
```

This request does the same thing, but uses the `request` parameter to deliver a signed (HS256) JWT that contains all of the query parameters:

```bash
https://${yourOktaDomain}/oauth2/default/v1/authorize?
  request=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPa3RhIiwiaWF0IjoxNTEyNTE2MjIxLCJleHAiOjE1NDQwNTIyMjEsImF1ZCI6Ind3dy5leGFtcGxlLmNvbSIsInN1YiI6InNqYWNrc29uQGV4YW1wbGUuY29tIiwiRW1haWwiOiJzamFja3NvbkBleGFtcGxlLmNvbSIsInJlc3BvbnNlX3R5cGUiOiJjb2RlIiwicmVzcG9uc2VfbW9kZSI6ImZvcm1fcG9zdCIsInJlZGlyZWN0X3VyaSI6Im15UmVkaXJlY3RVUkkuY29tIiwic3RhdGUiOiJteVN0YXRlIiwibm9uY2UiOiJteU5vbmNlIiwic2NvcGUiOiJvcGVuaWQgb2ZmbGluZV9hY2Nlc3MifQ.TjPy2_nUerULClavBNHcpnO_Pd1DxNEjQCeSW45ALJg
```

This request initiates the implicit flow, which gets an ID token and access token from the Authorization Server without the code exchange step. We use the same request as the first example, but with `response_type=id_token token`:

```bash
https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id=0oabv6kx4qq6
h1U5l0h7&response_type=id_token token&scope=openid&redirect_uri=https%3A%2F%2Fwww.example.com&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601&nonce=foo
```

#### Response example (success)

In the authorization code flow, the endpoint sends a redirect header redirecting the user's browser back to the application that made the request.

Depending on the grant type, Okta returns a `code`:

```bash
https://www.example.com#code=QnowT-aeawtOJKp-MtkH&state=e97f03dd-d006-4e2d-8aa6-c221702a29ec
```

or Okta returns a `token`:

```bash
https://www.example.com#access_token=eyJhbGciOiJSUzI1NiJ9.eyJ2ZXIiOjEsImlzcyI6Imh0dHA6Ly9yYWluLm9rdGExLmNvbToxODAyIiwiaWF0IjoxNDQ5NjI0MDI2LCJleHAiOjE0NDk2Mjc2MjYsImp0aSI6IlVmU0lURzZCVVNfdHA3N21BTjJxIiwic2NvcGVzIjpbIm9wZW5pZCIsImVtYWlsIl0sImNsaWVudF9pZCI6InVBYXVub2ZXa2FESnh1a0NGZUJ4IiwidXNlcl9pZCI6IjAwdWlkNEJ4WHc2STZUVjRtMGczIn0.HaBu5oQxdVCIvea88HPgr2O5evqZlCT4UXH4UKhJnZ5px-ArNRqwhxXWhHJisslswjPpMkx1IgrudQIjzGYbtLFjrrg2ueiU5-YfmKuJuD6O2yPWGTsV7X6i7ABT6P-t8PRz_RNbk-U1GXWIEkNnEWbPqYDAm_Ofh7iW0Y8WDA5ez1jbtMvd-oXMvJLctRiACrTMLJQ2e5HkbUFxgXQ_rFPNHJbNSUBDLqdi2rg_ND64DLRlXRY7hupNsvWGo0gF4WEUk8IZeaLjKw8UoIs-ETEwJlAMcvkhoVVOsN5dPAaEKvbyvPC1hUGXb4uuThlwdD3ECJrtwgKqLqcWonNtiw&token_type=Bearer&expires_in=3600&scope=openid&state=e97f03dd-d006-4e2d-8aa6-c221702a29ec
```

#### Response example (error)

The requested scope is invalid:

```bash
https://www.example.com/#error=invalid_scope&error_description=The+requested+scope+is+invalid%2C+unknown%2C+or+malformed
```

### /token

<ApiOperation method="post" url="${baseUrl}/v1/token" />

This endpoint returns access tokens, ID tokens, and refresh tokens, depending on the request parameters. For [password](/docs/guides/implement-password/), [client credentials](/docs/guides/implement-client-creds/), and [refresh token](/docs/guides/refresh-tokens/) flows, calling `/token` is the only step of the flow. For the [authorization code](/docs/guides/implement-auth-code/) flow, calling `/token` is the second step of the flow.

>  **Note:** This endpoint's base URL varies depending on whether you are using a Custom Authorization Server. For more information, see [Composing your base URL](#composing-your-base-url).

#### Request parameters

The following parameters can be posted as a part of the URL-encoded form values to the API.

> **Note:** The `/token` endpoint requires client authentication. See the [Client authentication methods](#client-authentication-methods) section for more information on which method to choose and how to use the parameters in your request.

| Parameter               | Description                                                                                                                                                                                                                                                                                                                        | Type   |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----- |
| code                    | Required if `grant_type` is `authorization_code`. The value is what was returned from the [authorization endpoint](#authorize). The code has a lifetime of 300 seconds.                                                                                                                                                             | String |
| code_verifier           | Required if `grant_type` is `authorization_code`  and `code_challenge` was specified in the original `/authorize` request. This value is the code verifier for [PKCE](#parameter-details). Okta uses it to recompute the `code_challenge` and verify if it matches the original `code_challenge` in the authorization request.     | String |
| grant_type              | Can be one of the following: `authorization_code`, `password`, `client_credentials`, `refresh_token`, or `urn:ietf:params:oauth:grant-type:saml2-bearer`<ApiLifecycle access="ea" />. Determines the mechanism Okta uses to authorize the creation of the tokens.                                                                                                                                               | String |
| password                | Required if the grant_type is `password`.                                                                                                                                                                                                                                                                                          | String |
| redirect_uri            | Required if `grant_type` is `authorization_code`. Specifies the callback location where the authorization was sent. This value must match the `redirect_uri` used to generate the original `authorization_code`.                                                                                                                   | String |
| refresh_token           | Required if `grant_type` is `refresh_token`. The value is a valid refresh token that was returned from this endpoint previously.                                                                                                                                                                                                   | String |
| scope                   | Required if `password` is the `grant_type`. This is a list of scopes that the client wants to be included in the access token. For the `refresh_token` grant type, these scopes have to be a subset of the scopes used to generate the refresh token in the first place.                                                             | String |
| username                | Required if the grant_type is `password`.                                                                                                                                                                                                                                                                                          | String |
| assertion               | Required if the grant_type is `urn:ietf:params:oauth:grant-type:saml2-bearer`<ApiLifecycle access="ea" />. | String |

#### Response properties

Based on the scopes requested. Generally speaking, the scopes specified in a request are included in the access token in the response.

| Property        | Description                                                                             | Type    |
| :-------------- | :-------------------------------------------------------------------------------------- | :------ |
| access_token    | An [access token](#access-token).                                                       | String  |
| token_type      | The audience of the token.                                                              | String  |
| expires_in      | The expiration time of the access token in seconds.                                     | Integer |
| scope           | The scopes contained in the access token.                                               | String  |
| refresh_token   | An opaque refresh token. This is returned if the `offline_access` scope is granted.     | String  |
| id_token        | An [ID token](#id-token). This is returned if the `openid` scope is granted.            | String  |

#### List of errors

| Error Id                 | Details                                                                                                                                                                                                    |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| invalid_client           | The specified `client_id` isn't found.                                                                                                                                                                      |
| invalid_grant            | The `code`, `refresh_token`, or `username` and `password` combination is invalid, or the `redirect_uri` doesn't match the one used in the authorization request.                                          |
| invalid_request          | The request structure is invalid. For example, the basic authentication header is malformed, both header and form parameters are used for authentication, no authentication information is provided, or the request contains duplicate parameters. |
| invalid_scope            | The scopes list contains an invalid or unsupported value.                                                                                                                                                  |
| unsupported_grant_type   | The `grant_type` isn't `authorization_code`, `refresh_token`, or `password`.                                                                                                                               |

#### Request example

```bash
curl -v -X POST \
-H "Content-type:application/x-www-form-urlencoded" \
"https://${yourOktaDomain}/oauth2/default/v1/token" \
-d "client_id={client_id}&client_secret={client_secret}&grant_type=authorization_code&redirect_uri={redirect_uri}&code={code}"
```

#### Response example (success)

```json
{
    "access_token" : "eyJhbGciOiJSUzI1NiJ9.eyJ2ZXIiOjEsImlzcyI6Imh0dHA6Ly9yYWluLm9rdGExLmNvbToxODAyIiwiaWF0IjoxNDQ5Nj
                      I0MDI2LCJleHAiOjE0NDk2Mjc2MjYsImp0aSI6IlVmU0lURzZCVVNfdHA3N21BTjJxIiwic2NvcGVzIjpbIm9wZW5pZCIsI
                      mVtYWlsIl0sImNsaWVudF9pZCI6InVBYXVub2ZXa2FESnh1a0NGZUJ4IiwidXNlcl9pZCI6IjAwdWlkNEJ4WHc2STZUVjRt
                      MGczIn0.HaBu5oQxdVCIvea88HPgr2O5evqZlCT4UXH4UKhJnZ5px-ArNRqwhxXWhHJisslswjPpMkx1IgrudQIjzGYbtLF
                      jrrg2ueiU5-YfmKuJuD6O2yPWGTsV7X6i7ABT6P-t8PRz_RNbk-U1GXWIEkNnEWbPqYDAm_Ofh7iW0Y8WDA5ez1jbtMvd-o
                      XMvJLctRiACrTMLJQ2e5HkbUFxgXQ_rFPNHJbNSUBDLqdi2rg_ND64DLRlXRY7hupNsvWGo0gF4WEUk8IZeaLjKw8UoIs-E
                      TEwJlAMcvkhoVVOsN5dPAaEKvbyvPC1hUGXb4uuThlwdD3ECJrtwgKqLqcWonNtiw",
    "token_type" : "Bearer",
    "expires_in" : 3600,
    "scope"      : "openid email",
    "refresh_token" : "a9VpZDRCeFh3Nkk2VdY",
    "id_token" : "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwMHVpZDRCeFh3Nkk2VFY0bTBnMyIsImVtYWlsIjoid2VibWFzdGVyQGNsb3VkaXR1ZG
                  UubmV0IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInZlciI6MSwiaXNzIjoiaHR0cDovL3JhaW4ub2t0YTEuY29tOjE4MDIiLCJsb
                  2dpbiI6ImFkbWluaXN0cmF0b3IxQGNsb3VkaXR1ZGUubmV0IiwiYXVkIjoidUFhdW5vZldrYURKeHVrQ0ZlQngiLCJpYXQiOjE0
                  NDk2MjQwMjYsImV4cCI6MTQ0OTYyNzYyNiwiYW1yIjpbInB3ZCJdLCJqdGkiOiI0ZUFXSk9DTUIzU1g4WGV3RGZWUiIsImF1dGh
                  fdGltZSI6MTQ0OTYyNDAyNiwiYXRfaGFzaCI6ImNwcUtmZFFBNWVIODkxRmY1b0pyX1EifQ.Btw6bUbZhRa89DsBb8KmL9rfhku
                  --_mbNC2pgC8yu8obJnwO12nFBepui9KzbpJhGM91PqJwi_AylE6rp-ehamfnUAO4JL14PkemF45Pn3u_6KKwxJnxcWxLvMuuis
                  nvIs7NScKpOAab6ayZU0VL8W6XAijQmnYTtMWQfSuaaR8rYOaWHrffh3OypvDdrQuYacbkT0csxdrayXfBG3UF5-ZAlhfch1fhF
                  T3yZFdWwzkSDc0BGygfiFyNhCezfyT454wbciSZgrA9ROeHkfPCaX7KCFO8GgQEkGRoQntFBNjluFhNLJIUkEFovEDlfuB4tv_M
                  8BM75celdy3jkpOurg"
}
```

#### Response example (error)

```http
HTTP 401 Unauthorized
Content-Type: application/json;charset=UTF-8
{
    "error" : "invalid_client",
    "error_description" : "No client credentials found."
}
```

### /introspect

<ApiOperation method="post" url="${baseUrl}/v1/introspect" />

> **Note:** This endpoint's base URL varies depending on whether you are using a Custom Authorization Server. For more information, see [Composing your base URL](#composing-your-base-url).

This endpoint takes an access, ID, or refresh token, and returns a boolean that indicates whether it is active or not.
If the token is active, additional data about the token is also returned. If the token is invalid, expired, or revoked, it is considered inactive.

Be sure that you are using the `/introspect` endpoint of the same authorization server that you used to create the token.

> **Note:** Although [ID tokens](#id-token) can be sent to this endpoint, they are usually validated on the service provider or app side of a flow.

#### Request parameters

The following parameters can be posted as a part of the URL-encoded form values to the API.

> **Note:** The `/introspect` endpoint requires client authentication. Most client authentication methods require the `client_id` and `client_secret` to be included in the Authorization header as a Basic auth base64-encoded string with the request. See the [Client authentication methods](#client-authentication-methods) section for more information on which method to choose and how to use the parameters in your request.
<br><br>For public clients (such as single-page and mobile apps) that don't have a `client_secret`, you must include the `client_id` as a query parameter when calling the `/introspect` endpoint. Make sure that you aren't passing the Authorization header in the request.

| Parameter               | Description                                                                                                    | Type          |
| :---------------------- | :------------------------------------------------------------------------------------------------------------- | :-----        |
| token                   | An access token, ID token, or refresh token.                                                                   | String        |
| token_type_hint         | Indicates the type of `token` being passed. Valid values are `access_token`, `id_token` and `refresh_token`.   | String (Enum) |

#### Response properties

Based on the type of token and whether it is active, the returned JSON contains a different set of information. Besides the claims in the token, the possible top-level members include:

| Property     | Description                                                                                                    | Type    |
| :----------- | :------------------------------------------------------------------------------------------------------------- | :------ |
| active       | Indicates whether the token is active or not.                                                                  | Boolean |
| aud          | The audience of the token.                                                                                     | String  |
| client_id    | The ID of the client associated with the token.                                                                | String  |
| device_id    | The ID of the device associated with the token                                                                 | String  |
| exp          | The expiration time of the token in seconds since January 1, 1970 UTC.                                         | Integer |
| iat          | The issuing time of the token in seconds since January 1, 1970 UTC.                                            | Integer |
| iss          | The issuer of the token.                                                                                       | String  |
| jti          | The identifier of the token.                                                                                   | String  |
| nbf          | Identifies the time (a timestamp in seconds since January 1, 1970 UTC) before which the token must not be accepted for processing.  | Integer |
| scope        | A space-delimited list of scopes.                                                                              | String  |
| sub          | The subject of the token.                                                                                      | String  |
| token_type   | The type of token. The value is always `Bearer`.                                                               | String  |
| uid          | The user ID. This parameter is returned only if the token is an access token and the subject is an end user.   | String  |
| username     | The username associated with the token.                                                                        | String  |

#### List of errors

| Error Id          | Details                                                                                                  |
| :---------------- | :------------------------------------------------------------------------------------------------------- |
| invalid_client    | The specified `client_id` isn't found.                                                                  |
| invalid_request   | The request structure is invalid. For example, the basic authentication header is malformed, both header and form parameters are used for authentication, no authentication information is provided, or the request contains duplicate parameters. |

#### Response example (success, access token)

```json
{
    "active" : true,
    "token_type" : "Bearer",
    "scope" : "openid profile",
    "client_id" : "a9VpZDRCeFh3Nkk2VdYa",
    "username" : "john.doe@example.com",
    "exp" : 1451606400,
    "iat" : 1451602800,
    "sub" : "john.doe@example.com",
    "aud" : "https://${yourOktaDomain}",
    "iss" : "https://${yourOktaDomain}/oauth2/orsmsg0aWLdnF3spV0g3",
    "jti" : "AT.7P4KlczBYVcWLkxduEuKeZfeiNYkZIC9uGJ28Cc-YaI",
    "uid" : "00uid4BxXw6I6TV4m0g3"
}
```

#### Response example (success, refresh token)

```json
{
    "active" : true,
    "token_type" : "Bearer",
    "scope" : "openid profile email",
    "client_id" : "a9VpZDRCeFh3Nkk2VdYa",
    "username" : "john.doe@example.com",
    "exp" : 1451606400,
    "sub" : "john.doe@example.com",
    "device_id" : "q4SZgrA9sOeHkfst5uaa"
}
```

#### Response example (success, inactive token)

```json
{
    "active" : false
}
```

#### Response example (error)

```http
HTTP 401 Unauthorized
Content-Type: application/json;charset=UTF-8
{
    "error" : "invalid_client",
    "error_description" : "No client credentials found."
}
```

### /revoke

<ApiOperation method="post" url="${baseUrl}/v1/revoke" />

> **Note:** This endpoint's base URL varies depending on whether you are using a Custom Authorization Server. For more information, see [Composing your base URL](#composing-your-base-url).

The API takes an access or refresh token and revokes it. Revoked tokens are considered inactive at the introspection endpoint. A client may only revoke its own tokens. See [Revoke tokens](/docs/guides/revoke-tokens/) for more information.

#### Request parameters

The following parameters can be posted as a part of the URL-encoded form values to the API.

> **Note:** The `/revoke` endpoint requires client authentication. See the [Client authentication methods](#client-authentication-methods) section for more information on which method to choose and how to use the parameters in your request.

| Parameter               | Description                                                                                       | Type          |
| :---------------------- | :------------------------------------------------------------------------------------------------ | :-----        |
| token                   | An access or refresh token.                                                                       | String        |
| token_type_hint         | A hint of the type of `token`. Valid values are `access_token` and `refresh_token`.               | String (Enum) |

#### Response properties

A successful revocation is denoted by an HTTP 200 OK response. Note that revoking an invalid, expired, or revoked token is still considered a success so as to not leak information.

#### List of errors

| Error Id          | Details                                                                                                                                                       |
| :---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| invalid_client    | The specified `client_id` wasn't found.                                                                                                                       |
| invalid_request   | The request structure is invalid. For example, the basic authentication header is malformed, both header and form parameters are used for authentication, no authentication information is provided, or the request contains duplicate parameters. |

#### Response example (success)

```http
HTTP 200 OK
```

#### Response example (error)

```http
HTTP 401 Unauthorized
Content-Type: application/json;charset=UTF-8
{
    "error": "invalid_client",
    "error_description": "No client credentials found."
}
```

### /logout

<ApiOperation method="get" url="${baseUrl}/v1/logout" />

> **Note:** This endpoint's base URL varies depending on whether you are using a Custom Authorization Server. For more information, see [Composing your base URL](#composing-your-base-url).

Use this operation to log a user out by removing their Okta browser session.

This endpoint takes an ID token and logs the user out of Okta if the subject matches the current Okta session. A `post_logout_redirect_uri` may be specified to redirect the browser after the logout is performed. Otherwise, the browser is redirected to the Okta sign-in page. See [Sign users out](/docs/guides/sign-users-out/) for more information.

If no Okta session exists, this endpoint has no effect and the browser is redirected immediately to the Okta sign-in page or the `post_logout_redirect_uri` (if specified).

> **Note:** When making requests to the `/logout` endpoint, the browser (user agent) should be redirected to the endpoint. You can't use AJAX with this endpoint.

#### Request parameters

The following parameters can be included in the query string of the request:

| Parameter                  | Description                                                                                                                                | Type     | Required  |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :------- | :-------- |
| id_token_hint              | A valid ID token with a subject that matches the current session.                                                                          | String   | TRUE      |
| post_logout_redirect_uri   | Location to redirect to after the logout is performed. It must match the value preregistered in Okta during client registration.           | String   | FALSE     |
| state                      | An optional value that is returned as a query parameter during the redirect to the `post_logout_redirect_uri`.                             | String   | FALSE     |

#### Request examples

This request initiates a logout and redirects to the Okta login page.

```bash
GET https://{baseUrl}/logout?id_token_hint=${id_token}
```

This request initiates a logout and redirects to the `post_logout_redirect_uri`.

```bash
GET https://{baseUrl}/logout?
  id_token_hint=${id_token}&
  post_logout_redirect_uri=${post_logout_redirect_uri}&
  state=${state}
```

#### Response example (success)

```http
HTTP 302 Found
Location: https://example.com/post_logout/redirect&state=${state}
```

This redirects the browser to either the Okta sign-in page or the specified logout redirect URI.

#### Error conditions

* If the Okta session has expired (or doesn't exist), a logout request simply redirects to the Okta sign-in page or the `post_logout_redirect_uri` (if specified).

* If the ID token passed via `id_token_hint` is invalid, the browser is redirected to an error page.

* If the ID token is valid, but expired, and the subject matches the current Okta session, a logout request logs the user out and redirects the browser to the `post_logout_redirect_uri`.

### /keys

<ApiOperation method="get" url="${baseUrl}/v1/keys" />

> **Note:** This endpoint's base URL varies depending on whether you are using a Custom Authorization Server. For more information, see [Composing your base URL](#composing-your-base-url).

Returns a JSON Web Key Set (JWKS) that contains the public keys that can be used to verify the signatures of tokens that you receive from your authorization server.

Any of the two or three keys listed are used to sign tokens. The order of keys in the result doesn't indicate which keys are used.

These keys can be used to locally validate JWTs returned by Okta. Standard open-source libraries are available for every major language to perform [JWS](https://tools.ietf.org/html/rfc7515) signature validation.

> **Note:** Okta strongly recommends retrieving keys dynamically with the JWKS published in the discovery document.<p>
Okta also recommends caching or persisting these keys to improve performance. If you cache signing keys and automatic key rotation is enabled, be aware that verification fails when Okta rotates the keys automatically. Clients that cache keys should periodically check the JWKS for updated signing keys.

> **Note:** The information returned from this endpoint could lag slightly, but will eventually be up-to-date.

#### Request parameters

| Parameter   | Description                   | Param Type   | DataType   | Required   | Default |
| :---------- | :---------------------------- | :----------- | :--------- | :--------- | :------ |
| client_id   | Your app's client ID.         | Query        | String     | FALSE      | null    |

> **Note:** The request parameter `client_id` is only applicable for the Okta Org Authorization Server. See [Composing your base URL](/docs/reference/api/oidc/#composing-your-base-url) for more information.

#### Response properties

JWKS properties can be found [here](/docs/reference/api/authorization-servers/#key-properties).

> **Note:** Okta returns [standard HTTP Cache-Control headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) for applicable JWKS endpoints. Ensure that you respect the cache header directives, as they are updated based on the time of the request.

#### Response example

```http
HTTP 200 OK
Cache-Control → max-age=3832304, must-revalidate
Content-Type: application/json;charset=UTF-8
```

```json
{
  "keys": [
    {
      "alg": "RS256",
      "e": "AQAB",
      "n": "iKqiD4cr7FZKm6f05K4r-GQOvjRqjOeFmOho9V7SAXYwCyJluaGBLVvDWO1XlduPLOrsG_Wgs67SOG5qeLPR8T1zDK4bfJAo1Tvbw
            YeTwVSfd_0mzRq8WaVc_2JtEK7J-4Z0MdVm_dJmcMHVfDziCRohSZthN__WM2NwGnbewWnla0wpEsU3QMZ05_OxvbBdQZaDUsNSx4
            6is29eCdYwhkAfFd_cFRq3DixLEYUsRwmOqwABwwDjBTNvgZOomrtD8BRFWSTlwsbrNZtJMYU33wuLO9ynFkZnY6qRKVHr3YToIrq
            NBXw0RWCheTouQ-snfAB6wcE2WDN3N5z760ejqQ",
      "kid": "U5R8cHbGw445Qbq8zVO1PcCpXL8yG6IcovVa3laCoxM",
      "kty": "RSA",
      "use": "sig"
    },
    {
      "alg": "RS256",
      "e": "AQAB",
      "n": "l1hZ_g2sgBE3oHvu34T-5XP18FYJWgtul_nRNg-5xra5ySkaXEOJUDRERUG0HrR42uqf9jYrUTwg9fp-SqqNIdHRaN8EwRSDRsKAwK
            3HIJ2NJfgmrrO2ABkeyUq6rzHxAumiKv1iLFpSawSIiTEBJERtUCDcjbbqyHVFuivIFgH8L37-XDIDb0XG-R8DOoOHLJPTpsgH-rJe
            M5w96VIRZInsGC5OGWkFdtgk6OkbvVd7_TXcxLCpWeg1vlbmX-0TmG5yjSj7ek05txcpxIqYu-7FIGT0KKvXge_BOSEUlJpBhLKU28
            OtsOnmc3NLIGXB-GeDiUZiBYQdPR-myB4ZoQ",
      "kid": "Y3vBOdYT-l-I0j-gRQ26XjutSX00TeWiSguuDhW3ngo",
      "kty": "RSA",
      "use": "sig"
    },
    {
      "alg": "RS256",
      "e": "AQAB",
      "n": "lC4ehVB6W0OCtNPnz8udYH9Ao83B6EKnHA5eTcMOap_lQZ-nKtS1lZwBj4wXRVc1XmS0d2OQFA1VMQ-dHLDE3CiGfsGqWbaiZFdW7U
            GLO1nAwfDdH6xp3xwpKOMewDXbAHJlXdYYAe2ap-CE9c5WLTUBU6JROuWcorHCNJisj1aExyiY5t3JQQVGpBz2oUIHo7NRzQoKimvp
            dMvMzcYnTlk1dhlG11b1GTkBclprm1BmOP7Ltjd7aEumOJWS67nKcAZzl48Zyg5KtV11V9F9dkGt25qHauqFKL7w3wu-DYhT0hmyFc
            wn-tXS6e6HQbfHhR_MQxysLtDGOk2ViWv8AQ",
      "kid": "h5Sr3LXcpQiQlAUVPdhrdLFoIvkhRTAVs_h39bQnxlU",
      "kty": "RSA",
      "use": "sig"
    }
  ]
}
```

#### Key rotation

The keys that are used to sign tokens are periodically changed. Okta automatically rotates your authorization server's keys on a regular basis.

Clients can opt-out of automatic key rotation by changing the client sign-in mode for the Okta Org Authorization Server. In this case, passing the `client_id` with your request retrieves the keys for that specific client.

Key rotation behaves differently with Custom Authorization Servers. For more information about key rotation with Custom Authorization Servers, see the [Authorization Servers API page](/docs/reference/api/authorization-servers/#rotate-authorization-server-keys).

#### Alternative validation

You can use an [introspection request](#introspect) for validation.

### /userinfo

<ApiOperation method="get" url="${baseUrl}/v1/userinfo" />

> **Note:** This endpoint's base URL varies depending on whether you are using a Custom Authorization Server. For more information, see [Composing your base URL](#composing-your-base-url).

Returns information about the currently signed-in user.

You must include an access token (returned from the [authorization endpoint](#authorize)) in the HTTP Authorization header.

#### Request example

```bash
curl -v -X POST \
-H "Authorization: Bearer ${access_token}" \
"https://{baseUrl}/userinfo"
```

#### Response properties

Returns a JSON document with claims about the currently authenticated end user.

#### Response example (success)

```json
{
  "sub": "00uid4BxXw6I6TV4m0g3",
  "name" :"John Doe",
  "nickname":"Jimmy",
  "given_name":"John",
  "middle_name":"James",
  "family_name":"Doe",
  "profile":"https://example.com/john.doe",
  "zoneinfo":"America/Los_Angeles",
  "locale":"en-US",
  "updated_at":1311280970,
  "email":"john.doe@example.com",
  "email_verified":true,
  "address" : { "street_address":"123 Hollywood Blvd.", "locality":"Los Angeles", "region":"CA", "postal_code":"90210", "country":"US" },
  "phone_number":"+1 (425) 555-1212"
}
```

Many of these claims are also included in the [ID token](/docs/reference/api/oidc/#id-token), but calling this endpoint always returns all of the user's claims. The ID token can be configured to include a subset of the user's claims. See [Scope-dependent claims](#scope-dependent-claims-not-always-returned) for more information.

#### Response example (error)

```http
HTTP 401 Unauthorized
WWW-Authenticate: Bearer error="invalid_token", error_description="The access token is invalid"
```

#### Response example (error)

```http
HTTP 403 Forbidden
Expires: 0
WWW-Authenticate: Bearer error="insufficient_scope", error_description="The access token must provide access to at least one of these scopes - profile, email, address or phone"
```

### /.well-known/oauth-authorization-server

<ApiOperation method="get" url="/oauth2/${authServerId}/.well-known/oauth-authorization-server" />

> **Note:** This endpoint is only available on Custom Authorization Servers, so there are no distinct [base URLs](#composing-your-base-url).

Returns OAuth 2.0 metadata related to your Custom Authorization Server. This information can be used by clients to programmatically configure their interactions with Okta. Custom scopes are returned only when they are [configured to be publicly discoverable](/docs/guides/customize-authz-server/create-scopes/). Custom claims are never returned.

This API doesn't require any authentication.

> **Note:** The information returned from this endpoint could lag slightly, but will eventually be up-to-date.

#### Request example

```bash
curl -X GET \
"https://${yourOktaDomain}/oauth2/${authServerId}/.well-known/oauth-authorization-server?client_id=0oabzljih3rnr6aGt0h7"
```

#### Response properties

| Property                                      | Description                                                                                                                               | Type    |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| issuer                                        | The complete URL for a Custom Authorization Server. This becomes the `iss` claim in an access token. In the context of this document, this is your authorization server's [base URL](#composing-your-base-url).                                                                                                                                              | String  |
| authorization endpoint                        | URL of the authorization server's [authorization endpoint](#authorize).                                                                   | String  |
| token_endpoint                                | URL of the authorization server's [token endpoint](#token).                                                                               | String  |
| registration_endpoint                         | URL of the authorization server's [Dynamic Client Registration endpoint](/docs/reference/api/oauth-clients/#register-new-client).         | String  |
| jwks_uri                                      | URL of the authorization server's [JSON Web Key Set](/docs/reference/api/authorization-servers/#certificate-json-web-key-object) document. | String  |
| response_types_supported                      | JSON array that contains a list of the `response_type` values that this authorization server supports. Can be a combination of `code`, `token`, and `id_token`.                                                                                                                                                                                                     | Array   |
| response_modes_supported                      | JSON array that containis a list of the `response_mode` values that this authorization server supports. More information [here](#parameter-details). | Array   |
| grant_types_supported                         | JSON array that contains a list of the `grant_type` values that this authorization server supports.                                       | Array   |
| subject_types_supported                       | JSON array that contains a list of the Subject Identifier types that this OP supports. Valid values are `pairwise` and `public`, but only `public` is currently supported. See the [Subject Identifier Types] (https://openid.net/specs/openid-connect-core-1_0.html#SubjectIDTypes) section in the OpenID Connect specification.                                                                                                                                         | Array   |
| scopes_supported                              | JSON array that contains a list of the `scope` values that this authorization server supports.                                            | Array   |
| token_endpoint_auth_methods_supported         | JSON array that contains a list of [client authentication methods](/docs/reference/api/oidc/#client-authentication-methods/) supported by this token endpoint.                                        | Array   |
| claims_supported                              | A list of the claims supported by this authorization server.                                                                              | Array   |
| code_challenge_methods_supported              | JSON array that contains a list of [PKCE code challenge](/docs/guides/implement-auth-code-pkce/) methods supported by this authorization server.                                                                                                                                                                                     | Array   |
| introspection_endpoint                        | URL of the authorization server's [introspection endpoint](#introspect).                                                                  | String  |
| introspection_endpoint_auth_methods_supported | JSON array that contains a list of [client authentication methods](/docs/reference/api/oidc/#client-authentication-methods/) supported by this introspection endpoint. More info [here](https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#token-introspection-response).                                                                                                                      | Array   |
| revocation_endpoint                           | URL of the authorization server's [revocation endpoint](#revoke).                                                                         | String  |
| revocation_endpoint_auth_methods_supported    | JSON array that contains a list of [client authentication methods](/docs/reference/api/oidc/#client-authentication-methods/) supported by this revocation endpoint. More info [here](https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#token-introspection-response).                                                                                                                      | Array   |
| end_session_endpoint                          | URL of the authorization server's [logout endpoint](#logout).                                                                             | String  |
| request_parameter_supported                   | Indicates if [request parameters](#parameter-details) are supported by this authorization server.                                         | Boolean |
| request_object_signing_alg_values_supported   | The signing algorithms that this authorization server supports for signed requests.                                                       | Array   |

#### Response example (success)

```json
{
    "issuer": "https://${yourOktaDomain}/oauth2/${authServerId}",
    "authorization_endpoint": "https://${yourOktaDomain}/oauth2/${authServerId}/v1/authorize",
    "token_endpoint": "https://${yourOktaDomain}/oauth2/${authServerId}/v1/token",
    "registration_endpoint": "https://${yourOktaDomain}/oauth2/v1/clients",
    "jwks_uri": "https://${yourOktaDomain}/oauth2/${authServerId}/v1/keys",
    "response_types_supported": [
        "code",
        "token",
        "id_token",
        "code id_token",
        "code token",
        "id_token token",
        "code id_token token"
    ],
    "response_modes_supported": [
        "query",
        "fragment",
        "form_post",
        "okta_post_message"
    ],
    "grant_types_supported": [
        "authorization_code",
        "implicit",
        "refresh_token",
        "password",
        "client_credentials"
    ],
    "subject_types_supported": [
        "public"
    ],
    "scopes_supported": [
        "openid",
        "profile",
        "email",
        "address",
        "phone",
        "offline_access"
    ],
    "token_endpoint_auth_methods_supported": [
        "client_secret_basic",
        "client_secret_post",
        "client_secret_jwt",
        "private_key_jwt",
        "none"
    ],
    "claims_supported": [
        "ver",
        "jti",
        "iss",
        "aud",
        "iat",
        "exp",
        "cid",
        "uid",
        "scp",
        "sub"
    ],
    "code_challenge_methods_supported": [
        "S256"
    ],
    "introspection_endpoint": "https://${yourOktaDomain}/oauth2/${authServerId}/v1/introspect",
    "introspection_endpoint_auth_methods_supported": [
        "client_secret_basic",
        "client_secret_post",
        "client_secret_jwt",
        "private_key_jwt",
        "none"
    ],
    "revocation_endpoint": "https://${yourOktaDomain}/oauth2/${authServerId}/v1/revoke",
    "revocation_endpoint_auth_methods_supported": [
        "client_secret_basic",
        "client_secret_post",
        "client_secret_jwt",
        "private_key_jwt",
        "none"
    ],
    "end_session_endpoint": "https://${yourOktaDomain}/oauth2/${authServerId}/v1/logout",
    "request_parameter_supported": true,
    "request_object_signing_alg_values_supported": [
        "HS256",
        "HS384",
        "HS512",
        "RS256",
        "RS384",
        "RS512",
        "ES256",
        "ES384",
        "ES512"
    ]
}
```

#### Response example (error)

```http
HTTP 404 Not Found
{
    "errorCode": "E0000007",
    "errorSummary": "Not found: Resource not found: ${authServerId} (AuthorizationServer)",
    "errorLink": "E0000007",
    "errorId": "oaeQdc5IvrlSGGnewf-cqqDqA",
    "errorCauses": []
}
```

### /.well-known/openid-configuration

<ApiOperation method="get" url="https://${yourOktaDomain}/.well-known/openid-configuration" />

<ApiOperation method="get" url="https://${yourOktaDomain}/oauth2/${authServerId}/.well-known/openid-configuration" />

> **Note:** This endpoint's base URL varies depending on whether you are using a Custom Authorization Server. The Custom Authorization Server URL specifies an `authServerId`. For example, the Custom Authorization Server automatically created for you by Okta has an `authServerId` value of `default`.

Returns OpenID Connect metadata about your authorization server. This information can be used by clients to programmatically configure their interactions with Okta. Custom scopes are returned only when they are [configured to be publicly discoverable](/docs/guides/customize-authz-server/create-scopes/). Custom claims are never returned.

This API doesn't require any authentication.

> **Note:** The information returned from this endpoint could lag slightly, but will eventually be up-to-date.

#### Request example

```bash
curl -X GET \
"https://${yourOktaDomain}/oauth2/${authServerId}/.well-known/openid-configuration?client_id=0oabzljih3rnr6aGt0h7"
```

#### Response properties

| Property                                      | Description                                                                                                                                                                                                                                | Type    |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| authorization_endpoint                        | URL of the authorization server's [authorization endpoint](#authorize).                                                                                                                                                                    | String  |
| claims_supported                              | A list of the claims supported by this authorization server.                                                                                                                                                                               | Array   |
| code_challenge_methods_supported              | JSON array that contains a list of [PKCE code challenge](/docs/guides/implement-auth-code-pkce/) methods supported by this authorization server.                                                                    | Array   |
| end_session_endpoint                          | URL of the authorization server's [logout endpoint](#logout).                                                                                                                                                                              | String  |
| grant_types_supported                         | JSON array that contains a list of the grant type values that this authorization server supports.                                                                                                                                             | Array   |
| introspection_endpoint                        | URL of the authorization server's [introspection endpoint](#introspect).                                                                                                                                                                   | String  |
| introspection_endpoint_auth_methods_supported | JSON array that contains a list of [client authentication methods](/docs/reference/api/oidc/#client-authentication-methods/) supported by this introspection endpoint.                                                                                                                                    | Array   |
| issuer                                        | The authorization server's issuer identifier. In the context of this document, this is your authorization server's [base URL](#composing-your-base-uRL).                                                                                   | String  |
| jwks_uri                                      | URL of the authorization server's JSON Web Key Set document.                                                                                                                                                                               | String  |
| registration_endpoint                         | URL of the authorization server's [Dynamic Client Registration endpoint](/docs/reference/api/oauth-clients/#register-new-client)                                                                                                           | String  |
| request_object_signing_alg_values_supported   | The signing algorithms that this authorization server supports for signed requests.                                                                                                                                                        | Array   |
| request_parameter_supported                   | Indicates if [Request Parameters](#parameter-details) are supported by this authorization server.                                                                                                                                          | Boolean |
| response_modes_supported                      | JSON array that contains a list of the `response_mode` values that this authorization server supports. More information [here](#parameter-details).                                                                                           | Array   |
| response_types_supported                      | JSON array that contains a list of the `response_type` values that this authorization server supports. Can be a combination of `code`, `token`, and `id_token`.                                                                               | Array   |
| revocation_endpoint                           | URL of the authorization server's [revocation endpoint](#revoke).                                                                                                                                                                          | String  |
| revocation_endpoint_auth_methods_supported    | JSON array that contains a list of [client authentication methods](/docs/reference/api/oidc/#client-authentication-methods/) supported by this revocation endpoint.                                                                                                                                       | Array   |
| scopes_supported                              | JSON array that contains a list of the `scope` values that this authorization server supports.                                                                                                                                                | Array   |
| subject_types_supported                       | JSON array that contains a list of the Subject Identifier types that this authorization server supports. Valid types include `pairwise` and `public`, but only `public` is currently supported. See the [Subject Identifier Types] (https://openid.net/specs/openid-connect-core-1_0.html#SubjectIDTypes) section in the OpenID Connect specification. | Array   |
| token_endpoint                                | URL of the authorization server's [token endpoint](#token).                                                                                                                                                                                | String  |
| token_endpoint_auth_methods_supported         | JSON array that contains a list of [client authentication methods](/docs/reference/api/oidc/#client-authentication-methods/) supported by this token endpoint.                                                                                                                                            | Array   |

#### Response example (success)

```json
{
    "issuer": "https://${yourOktaDomain}",
    "authorization_endpoint": "https://{baseUrl}/authorize",
    "token_endpoint": "https://{baseUrl}/token",
    "userinfo_endpoint": "https://{baseUrl}/userinfo",
    "registration_endpoint": "https://{baseUrl}/clients",
    "jwks_uri": "https://{baseUrl}/keys",
    "response_types_supported": [
        "code",
        "code id_token",
        "code token",
        "code id_token token",
        "id_token",
        "id_token token"
    ],
    "response_modes_supported": [
        "query",
        "fragment",
        "form_post",
        "okta_post_message"
    ],
    "grant_types_supported": [
        "authorization_code",
        "implicit",
        "refresh_token",
        "password"
    ],
    "subject_types_supported": [
        "public"
    ],
    "id_token_signing_alg_values_supported": [
        "RS256"
    ],
    "scopes_supported": [
        "openid",
        "email",
        "profile",
        "address",
        "phone",
        "offline_access",
        "groups"
    ],
    "token_endpoint_auth_methods_supported": [
        "client_secret_basic",
        "client_secret_post",
        "client_secret_jwt",
        "none"
    ],
    "claims_supported": [
        "iss",
        "ver",
        "sub",
        "aud",
        "iat",
        "exp",
        "jti",
        "auth_time",
        "amr",
        "idp",
        "nonce",
        "name",
        "nickname",
        "preferred_username",
        "given_name",
        "middle_name",
        "family_name",
        "email",
        "email_verified",
        "profile",
        "zoneinfo",
        "locale",
        "address",
        "phone_number",
        "picture",
        "website",
        "gender",
        "birthdate",
        "updated_at",
        "at_hash",
        "c_hash"
    ],
    "introspection_endpoint": "https://{baseUrl}/introspect",
    "introspection_endpoint_auth_methods_supported": [
        "client_secret_basic",
        "client_secret_post",
        "client_secret_jwt",
        "none"
    ],
    "revocation_endpoint": "https://{baseUrl}/revoke",
    "revocation_endpoint_auth_methods_supported": [
        "client_secret_basic",
        "client_secret_post",
        "client_secret_jwt",
        "none"
    ],
    "end_session_endpoint": "https://{baseUrl}/logout",
    "request_parameter_supported": true,
    "request_object_signing_alg_values_supported": [
        "HS256",
        "HS384",
        "HS512"
    ]
}
```

#### Response example (error)

```http
HTTP 404 Not Found
{
    "errorCode": "E0000007",
    "errorSummary": "Not found: Resource not found: ${authServerId} (AuthorizationServer)",
    "errorLink": "E0000007",
    "errorId": "oaeQdc5IvrlSGGnewf-cqqDqA",
    "errorCauses": []
}
```

## Scopes

OpenID Connect uses scope values to specify which access privileges are being requested for access tokens.

The scopes associated with access tokens determine which claims are available when they are used
to access the OIDC `/userinfo` [endpoint](/docs/reference/api/oidc/#userinfo). The following scopes are supported:

| Property         | Description                                                                                                     | Required       |
| :--------------- | :-------------------------------------------------------------------------------------------------------------- | :------------- |
| openid           | Identifies the request as an OpenID Connect request.                                                            | Yes            |
| profile          | Requests access to the end user's default profile claims.                                                       | No             |
| email            | Requests access to the `email` and `email_verified` claims.                                                     | No             |
| phone            | Requests access to the `phone_number` and `phone_number_verified` claims.                                       | No             |
| address          | Requests access to the `address` claim.                                                                         | No             |
| groups           | Requests access to the `groups` claim.                                                                          | No             |
| offline_access   | Requests a refresh token used to obtain more access tokens without re-prompting the user for authentication.   | No             |

### Scope values

* `openid` is required for any OpenID request connect flow. If the `openid` scope value isn't present, the request may be a valid OAuth 2.0 request, but it's not an OpenID Connect request.
* `profile` requests access to these default profile claims: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`,`locale`, and `updated_at`.
* `offline_access` can only be requested in combination with a `response_type` that contains `code`. If the `response_type` doesn't contain `code`, `offline_access` is ignored.
* For more information about `offline_access`, see the [OIDC spec](http://openid.net/specs/openid-connect-core-1_0.html#OfflineAccess).

### Scope properties

| Property                                 | Description                                                                                             | Type      | Default        | Required for create or update              |
| :-------------------------------------   | :------------------------------------------------------------------------------------------------------ | :-------- | :------------- | :----------------------------              |
| consent                                  | Indicates whether a consent dialog is needed for the scope. Valid values: `REQUIRED`, `IMPLICIT`.       | Enum      | `IMPLICIT`     | True                                       |
| default                                  | Whether the scope is a default scope                                                               | Boolean   |                | False                                      |
| description                              | Description of the scope                                                                                | String    |                | False                                      |
| displayName                              | Name of the end user displayed in a consent dialog window                                                      | String    |                | False                                      |
| id                                       | ID of the scope                                                                                         | String    |                | False                                      |
| metadataPublish                          | Whether the scope should be included in the metadata. Valid values: `NO_CLIENTS`, `ALL_CLIENTS`  | Enum      | `NO_CLIENTS`   | True except for create                     |
| name                                     | Name of the scope                                                                                       | String    |                | True                                       |
| system                                   | Whether Okta created the scope                                                                          | Boolean   |                | False                                      |

A consent dialog appears depending on the values of three elements:

* `prompt` - a query parameter that is used in requests to [`/authorize`](/docs/reference/api/oidc/#authorize)
* `consent_method` - an [application](/docs/reference/api/apps/#settings-7) property. Allows you to determine whether a client is fully trusted (for example: a first-party application) or requires consent (for example: a third-party application).
* `consent` - a property on Scopes as listed in the table above. Allows you to individually enable and disable user consent for a scope.

| `prompt` Value   | `consent_method`        | `consent`                            | Result       |
| :--------------- | :---------------------- | :----------------------------------- | :----------- |
| `CONSENT`        | `TRUSTED` or `REQUIRED` | `REQUIRED`                           | Prompted     |
| `CONSENT`        | `TRUSTED` or `REQUIRED` | `FLEXIBLE`                           | Prompted     |
| `CONSENT`        | `TRUSTED`               | `IMPLICIT`                           | Not prompted |
| `NONE`           | `TRUSTED`               | `FLEXIBLE`, `IMPLICIT`, or `REQUIRED`| Not prompted |
| `NONE`           | `REQUIRED`              | `FLEXIBLE` or `REQUIRED`             | Prompted     |
| `NONE`           | `REQUIRED`              | `IMPLICIT`                           | Not prompted |

> **Note:** If `CONSENT` is set to `FLEXIBLE`, and the scope is requested when using the Client Credentials grant flow, the scope is granted in the access token with no consent prompt. This is because there is no user involved in a 2-legged OAuth [Client Credentials](/docs/guides/implement-client-creds/overview/) grant flow.
<!-- If you change this section, change it in apps.md (/docs/reference/api/apps/#credentials-settings-details) and authorization-servers.md (/docs/reference/api/authorization-servers/#scope-properties) as well. Add 'LOGIN' to the first three rows when supported --> |

**Notes:**

* Apps created on `/api/v1/apps` default to `consent_method=TRUSTED`, while those created on `/api/v1/clients` default to `consent_method=REQUIRED`.
* If you request a scope that requires consent while using the `client_credentials` flow, an error is returned. Because there is no user, no consent can be given.
* If the `prompt` value is set to `NONE`, but the `consent_method` and the `consent` values are `REQUIRED`, then an error occurs.
* The scope name must only contain printable ASCII except for spaces, double quotes, and backslashes. It also must not start with `okta.` or `okta:` and must not be only `okta` or `*`.

## Tokens and claims

This section contains some general information about claims, as well as detailed information about access and ID tokens.

* [Access Token](#access-token)
* [ID Token](#id-token)
* [Refresh Token](#refresh-token)

### Token lifetime

When you are using the [Okta Authorization Server](/docs/concepts/auth-servers/#org-authorization-server), the lifetime of the JWT tokens is hard-coded to the following values:

* **ID token:** 60 minutes
* **Access token:** 60 minutes
* **Refresh token:** 90 days

When you are using a [Custom Authorization Server](/docs/concepts/auth-servers/#custom-authorization-server), you can configure the lifetime of the JWT tokens:

* **Access tokens:** The minimum is five minutes, and the maximum is 24 hours (configurable using an [Access Policy](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-create-access-policies)).
* **Refresh tokens:** The minimum access token lifetime. The idle time window is at least 10 minutes, with a maximum of five years (configurable using an [Access Policy](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-create-access-policies)).
* **ID tokens:** Not configurable. Token lifetime is 60 minutes.

### Claims

Tokens issued by Okta contain claims that are statements about a subject (user). For example, the claim can be about a name, identity, key, group, or privilege. The claims in a security token are dependent upon the type of token, the type of credential used to authenticate the user, and the application configuration.

The claims requested by the `profile`, `email`, `address`, and `phone` scope values are returned from the `/userinfo` [endpoint](#userinfo) when a `response_type` value is used that results in an access token being issued. However, when no access token is issued (which is the case for the `response_type` value `id_token`), the resulting claims are returned in the ID token.

### Access token

> **Note:** Use of the access token differs depending on whether you are using the Okta Org Authorization Server or a Custom Authorization Server. While the structure of an access token retrieved from a Custom Authorization Server is guaranteed to not change, the structure of the access token issued by the Okta Org Authorization Server is subject to change.

An access token is a JSON web token (JWT) encoded in Base64 URL-encoded format that contains [a header](#access-token-header), [payload](#access-token-payload), and [signature](#access-token-signature). A resource server can authorize the client to access particular resources based on the [scopes and claims](#access-token-scopes-and-claims) in the access token.

The lifetime of an access token can be configured in [access policies](/docs/reference/api/authorization-servers/#policy-object). If the client that issued the token is deactivated, the token is immediately and permanently invalidated. Reactivating the client doesn't make the token valid again.

#### Access token header

```json
{
  "alg": "RS256",
  "kid": "45js03w0djwedsw"
}
```

#### Access token payload

```json
{
  "ver": 1,
  "jti": "AT.0mP4JKAZX1iACIT4vbEDF7LpvDVjxypPMf0D7uX39RE",
  "iss": "https://${yourOktaDomain}/oauth2/0oacqf8qaJw56czJi0g4",
  "aud": "https://api.example.com",
  "sub": "00ujmkLgagxeRrAg20g3",
  "iat": 1467145094,
  "exp": 1467148694,
  "cid": "nmdP1fcyvdVO11AL7ECm",
  "uid": "00ujmkLgagxeRrAg20g3",
  "scp": [
    "openid",
    "email",
    "flights",
    "custom"
  ],
  "custom_claim": "CustomValue"
}
```

#### Access token signature

This is a digital signature that Okta generates using the public key identified by the `kid` property in the header section.

#### Access token scopes and claims

Access tokens include reserved scopes and claims and can optionally include custom scopes and claims.

Scopes are requested in the initial [authorization request](#authorize), and the Authorization Server uses the [access policies](/docs/reference/api/authorization-servers/#policy-object) to decide whether they can be granted. If any of the requested scopes are rejected by the Access Policies, the request is rejected.

Based on the granted scopes, claims are added into the access token returned from the request.

##### Reserved scopes and claims

Okta defines a number of reserved scopes and claims that can't be overridden.

* [Reserved scopes](#reserved-scopes)
* [Reserved claims in the header section](#reserved-claims-in-the-header-section)
* [Reserved claims in the payload section](#reserved-claims-in-the-payload-section)

###### Reserved scopes

`openid`, `profile`, `email`, `address`, `phone`, `offline_access`, and `groups` are available to ID tokens and access tokens, using either the Okta Org Authorization Server or a Custom Authorization Server. For details, see [Scopes](#access-token-scopes-and-claims). All of these scopes except `groups` are defined in the OpenID Connect specification.

###### Reserved claims in the header section

The header only includes the following reserved claims:

| Property | Description                                                                                                                                                                               | DataType |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| alg      | Identifies the digital signature algorithm used. This is always `RS256`.                                                                                                                  | String   |
| kid      | Identifies the `public-key` used to sign the `access_token`. The corresponding `public-key` can be found via the JWKS in the [discovery document](#well-knownoauth-authorization-server). | String   |

###### Reserved claims in the payload section

The payload includes the following reserved claims:

| Property | Description                                                                                                            | DataType |
| -------- | ---------------------------------------------------------------------------------------------------------------------- | -------- |
| aud      | Identifies the audience (resource URI or server) that this access token is intended for.                               | String   |
| cid      | Client ID of the client that requested the access token.                                                               | String   |
| exp      | The time the access token expires, represented in Unix time (seconds).                                                 | Integer  |
| iat      | The time the access token was issued, represented in Unix time (seconds).                                              | Integer  |
| iss      | The Issuer Identifier of the response. This value is the unique identifier for the Authorization Server instance.      | String   |
| jti      | A unique identifier for this access token for debugging and revocation purposes.                                       | String   |
| scp      | Array of scopes that are granted to this access token.                                                                 | Array    |
| sub      | The subject. A name for the user or a unique identifier for the client.                                                | String   |
| uid      | A unique identifier for the user. It isn't included in the access token if there is no user bound to it.               | String   |
| ver      | The semantic version of the access token.                                                                              | Integer  |

##### Custom scopes and claims

You can configure custom scopes and claims for your access tokens, depending on the authorization server that you are using (see [Composing your base URL](#composing-your-base-url)):

* For the Okta Org Authorization Server, you can configure a custom `groups` claim.
* For a Custom Authorization Server, you can configure a custom `groups` claim or any other custom scopes and claims you want.

###### Custom scopes

If the request that generates the access token contains any custom scopes, those scopes are a part of the `scp` claim together with the reserved scopes provided from the [OIDC specification](http://openid.net/specs/openid-connect-core-1_0.html). The names of your custom scopes must conform to the [OAuth 2.0 specification](https://tools.ietf.org/html/rfc6749#section-3.3).

> **Note:** Scope names can contain the characters `<` (less than) or `>` (greater than), but not both characters.

###### Custom claims

Custom claims are associated with scopes. In general, granting a custom scope means a custom claim is added to the token. However, the specifics depend on which claims are requested, whether the request is to the Okta Org Authorization Server or a Custom Authorization Server, and some configuration choices.

**Quick Reference: Which token has which claims?**

Custom claims are configured in the Custom Authorization Server, and returned depending on whether it matches a scope in the request, and also depending on the token type, authorization server type, and the token and claim configuration set in the authorization server:

* Base claims are always returned in ID tokens and access tokens for both authorization server types (Okta Org Authorization Server or Custom Authorization Server).
* Scope-dependent claims are returned in tokens depending on the response type for either authorization server type. See [the second table in the Scope-dependent claims topic](#scope-dependent-claims-not-always-returned) for details.
* Custom claims require configuration in the Custom Authorization Server. You can specify that claims be returned in each token (ID or access) always or only when requested. Assuming a claim matches a requested scope, it is returned to the ID token if there is no access token requested.

The ID token or access token may not include all claims associated with the requested scopes. The [UserInfo endpoint](#userinfo) always contains a full set of claims for the requested scopes.

### ID token

OpenID Connect introduces an ID token that is a JSON Web Token (JWT) that contains information about an authentication event and claims about the authenticated user.

Clients can use any of the following sequences of operations to obtain an ID token:

* [Authorization code flow](/docs/guides/implement-auth-code/) or [Authorization code with PKCE flow](/docs/guides/implement-auth-code-pkce/) -- the client obtains an authorization code from the authorization server's [/authorize endpoint](#authorize) and uses it to obtain an ID token and an access token from the authorization server's [/token endpoint](#token).
* [Implicit flow](/docs/guides/implement-implicit/) -- the client obtains an ID token and optionally an access token directly from the authorization server's `/authorize` endpoint.

Clients should always [validate ID tokens](/docs/guides/validate-id-tokens/) to ensure their integrity.

The ID tokens returned by the `/authorize` endpoint (implicit flow) or the `/token` endpoint (authorization code flow) are identical, except if:

* You are using the implicit flow. If so, the `nonce` parameter is required in the initial `/authorize` request, and the ID token includes a `nonce` claim that should be validated to make sure it matches the `nonce` value passed to `/authorize.`
* Both an ID and an access token were requested. If so, the ID token includes the `at_hash` [parameter](http://openid.net/specs/openid-connect-core-1_0.html#CodeIDToken) that can be validated against the hash of the access token to guarantee that the access token is genuine.

The ID token consists of three period-separated, Base64 URL-encoded JSON segments: [a header](#id-token-header), [the payload](#id-token-payload), and [the signature](#id-token-signature).

#### ID token header

```json
{
  "alg": "RS256",
  "kid": "45js03w0djwedsw"
}
```

#### ID token payload

```json
{
  "ver": 1,
  "sub": "00uid4BxXw6I6TV4m0g3",
  "iss": "https://{yourOktaDomain.com}",
  "aud": "uAaunofWkaDJxukCFeBx",
  "iat": 1449624026,
  "exp": 1449627626,
  "amr": [
    "pwd"
  ],
  "jti": "ID.4eAWJOCMB3SX8XewDfVR",
  "auth_time": 1449624026,
  "at_hash": "cpqKfdQA5eH891Ff5oJr_Q",
  "name" :"John Doe",
  "nickname":"Jimmy",
  "preferred_username": "john.doe@example.com",
  "given_name":"John",
  "middle_name":"James",
  "family_name":"Doe",
  "profile":"https://example.com/john.doe",
  "zoneinfo":"America/Los_Angeles",
  "locale":"en-US",
  "updated_at":1311280970,
  "email":"john.doe@example.com",
  "email_verified":true,
  "address" : { "street_address": "123 Hollywood Blvd.",
      "locality": "Los Angeles",
      "region": "CA",
      "postal_code": "90210",
      "country": "US"
    },
  "phone_number":"+1 (425) 555-1212"
}
```

#### ID token signature

This is the digital signature that Okta signs using the public key identified by the `kid` property in the Header section.

#### ID token claims

The Header and Payload sections contain claims.

##### Claims in the Header section

Claims in the Header are always returned.

| Property        | Description                                                                                                                                                                                                    | DataType      |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| alg             | Identifies the digital signature algorithm used. This is always `RS256`.                                                                                                                                      | String        |
| kid             | Identifies the public key used to verify the ID token. The corresponding public key can be found via the JWKS in the [discovery document](#well-knownopenid-configuration).                                    | String        |

##### Claims in the Payload section

Claims in the payload are either base claims, independent of scope (always returned), or dependent on scope (not always returned).

###### Base claims (always present)

| Property        | Description                                                                                                                                                                  | DataType    | Example                                             |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- | :-------------------------------------------------- |
| amr             | JSON array of strings that are identifiers for [authentication methods](http://self-issued.info/docs/draft-jones-oauth-amr-values-00.html) used in the authentication.       | Array       | [ "pwd", "mfa", "otp", "kba", "sms", "swk", "hwk" ] |
| aud             | Identifies the audience that this ID token is intended for. It is one of your application's OAuth 2.0 client IDs.                                                       | String      | 6joRGIzNCaJfdCPzRjlh                                |
| auth_time       | The time the end user was authenticated, represented in Unix time (seconds).                                                                                                 | Integer     | 1311280970                                          |
| exp             | The time the ID token expires, represented in Unix time (seconds).                                                                                                           | Integer     | 1311280970                                          |
| iat             | The time the ID token was issued, represented in Unix time (seconds).                                                                                                        | Integer     | 1311280970                                          |
| idp             | The Okta org ID or the ID of an [Identity Provider](/docs/reference/api/idps/) if this authentication used Social Authentication or Inbound SAML.                           | String      | 00ok1u7AsAkrwdZL3z0g3                               |
| iss             | The URL of the authorization server that issued this ID token.                                                                                                                | String      | https://${yourOktaDomain}                            |
| jti             | A unique identifier for this ID token for debugging and revocation purposes.                                                                                                 | String      | Tlenfse93dgkaksginv                                 |
| sub             | The subject. A unique identifier for the user.                                                                                                                               | String      | 00uk1u7AsAk6dZL3z0g3                                |
| ver             | The semantic version of the ID token.                                                                                                                                        | Integer     | 1                                                   |

###### Scope-dependent claims (not always returned)

| Property            | Required Scope     | Description                                                                                                                                                                                                                         | DataType        | Example                                                                                                                           |
| :------------------ | :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- | :-------------------------------------------------------------------------------------------------------------------------------  |
| name                | profile            | User's full name in displayable form including all name parts, possibly including titles and suffixes, ordered according to the user's locale and preferences.                                                                      | String          | John Doe                                                                                                                          |
| preferred_username  | profile            | The Okta login (username) for the end user.                                                                                                                                                                                         | String          | john.doe@example.com                                                                                                              |
| nickname            | profile            | Casual name of the user that may or may not be the same as the `given_name`.                                                                                                                                                          | String          | Jimmy                                                                                                                             |
| preferred_username  | profile            | The chosen login (username) for the end user. By default this is the Okta username.                                                                                                                                                 | String          | john.doe@example.com                                                                                                              |
| given_name          | profile            | Given name(s) or first name(s) of the user. Note that in some cultures, people can have multiple given names; all can be present, with the names being separated by space characters.                                               | String          | John                                                                                                                              |
| middle_name         | profile            | Middle name(s) of the user. Note that in some cultures, people can have multiple middle names; all can be present, with the names being separated by space characters. Also note that in some cultures, middle names aren't used.  | String          | James                                                                                                                             |
| family_name         | profile            | Surname(s) or last name(s) of the user. Note that in some cultures, people can have multiple family names or no family name; all can be present, with the names being separated by space characters.                                | String          | Doe                                                                                                                               |
| profile             | profile            | URL of the user's profile page.                                                                                                                                                                                                     | String          | https://profile.wordpress.com/john.doe                                                                                            |
| zoneinfo            | profile            | String that represents the user's time zone.                                                                                                                                                                                           | String          | America/Los_Angeles                                                                                                               |
| locale              | profile            | Language and [ISO3166‑1](http://www.iso.org/iso/country_codes) country code in uppercase, separated by a dash.                                                                                                                      | String          | en-US                                                                                                                             |
| updated_at          | profile            | Time the user's information was last updated, represented in Unix time (seconds).                                                                                                                                                   | Integer         | 1311280970                                                                                                                        |
| email               | email              | User's preferred email address. The resource provider must not rely on this value being unique.                                                                                                                                   | String          | john.doe@example.com                                                                                                              |
| email_verified      | email              | True if the user's email address (Okta primary email) has been verified; otherwise false.                                                                                                                                           | boolean         | true                                                                                                                              |
| address             | address            | User's preferred postal address. The value of the address member is a JSON structure that contains *street_address*, *locality*, *region*, *postal_code*, and *country*.                                                               | JSON structure  | `{ "street_address": "123 Hollywood Blvd.", "locality": "Los Angeles", "region": "CA", "postal_code": "90210", "country": "US" }` |
| phone_number        | phone              | User's preferred telephone number in E.164 format.                                                                                                                                                                                  | String          | +1 (425) 555-1212                                                                                                                 |
| groups              | groups             | The groups that the user is a member of that also match the ID token group filter of the client app.                                                                                                                                | List            | ["MyGroup1", "MyGroup2", "MyGroup3"]                                                                                              |

Be aware of the following before you work with scope-dependent claims:

* To protect against arbitrarily large numbers of groups matching the group filter, the groups claim has a limit of 100.
If more than 100 groups match the filter, then the request fails. Expect that this limit may change in the future.
For more information about configuring an app for OpenID Connect, including group claims, see [Create a client application](/docs/guides/add-an-external-idp/openidconnect/create-an-app-at-idp/).

> **Important:** Scope-dependent claims are returned differently depending on the values in `response_type` and the scopes requested:

  | Response Type             | Claims Returned in ID Token from Org     AS                                                        | Claims Returned in ID Token from Custom AS | Claims Returned from Userinfo Endpoint     |
  | :-------------------------| :------------------------------------------------------------------------------------------------- | :----------------------------------------- | :----------------------------------------- |
  | `code `                   | N/A                                                                                                | N/A                                        | N/A                                        |
  | `token`                   | N/A                                                                                                | N/A                                        | N/A                                        |
  | `id_token`                | Claims associated with requested scopes.                                                           | Claims associated with requested scopes.   | N/A                                        |
  | `id_token` `code `        | Claims associated with requested scopes.                                                           | Claims associated with requested scopes.   | N/A
  | `id_token` `token`        | `email` if email scope is requested; `name` and `preferred_username` if profile scope is requested | Claims associated with the requested scopes and the [`alwaysIncludeinToken` property](/docs/reference/api/authorization-servers/#details-for-alwaysincludeintoken) set to `true`. | Claims associated with the requested scopes|
  | `code` `id_token` `token` | `email` if email scope is requested; `name` and `preferred_username` if profile scope is requested | Claims associated with the requested scopes and the `alwaysIncludeinToken` property set to `true`. | Claims associated with the requested scopes|

* The full set of claims for the requested scopes is available via the [/oauth2/v1/userinfo](#userinfo) endpoint. Call this endpoint using the access token.

### Refresh token

Refresh tokens are opaque. More information about using them can be found in the [Refresh access tokens](/docs/guides/refresh-tokens/) guide.

## Client authentication methods

Some endpoints require client authentication. To make requests to these endpoints, you must include a header or parameter in the request depending on the authentication method that the application is configured with.

When registering an OAuth 2.0 client application, specify an authentication method by including the [token_endpoint_auth_method](/docs/reference/api/apps/#add-oauth-2-0-client-application) parameter.

> **Note:** If you don't specify a method when registering your client, the default method is `client_secret_basic`.<p>
To create a client application and specify the authentication method, see the [Add OAuth 2.0 client application](/docs/reference/api/apps/#add-oauth-2-0-client-application) API Reference section. To change the client authentication method of an existing app, see the [Update the client authentication method](/docs/reference/api/apps/#update-the-client-authentication-method) API Reference section.

Okta supports the following authentication methods, detailed in the sections below:

* `client_secret_basic`, `client_secret_post`, `client_secret_jwt`: Use one of these methods when the client has a client secret. Public clients (such as single-page and mobile apps) that can't protect a client secret must use `none` below.

* `private_key_jwt`: Use this when you want maximum security. This method is more complex and requires a server, so it can't be used with public clients.

* `none` - Use this with clients that don't have a client secret (such as applications that use the [authorization code flow with PKCE](/docs/guides/implement-auth-code-pkce/) or the [implicit flow](/docs/guides/implement-implicit/)).

### Client secret

If your client's `token_endpoint_auth_method` is either `client_secret_basic` or `client_secret_post`, include the client secret in outgoing requests.

* `client_secret_basic`: Provide the `client_id` and `client_secret` values in the Authorization header as a Basic auth base64-encoded string with the POST request:

  ```bash
    Authorization: Basic ${Base64(<client_id>:<client_secret>)}
  ```

* `client_secret_post`: Provide the `client_id` and `client_secret` as additional parameters in the POST request body.

### JWT with shared key

If you configured your client to use the `client_secret_jwt` client authentication method:

Provide the `client_id` in a JWT that you sign with the `client_secret` using an HMAC SHA algorithm (HS256, HS384, or HS512). The JWT must also contain other values, such as issuer and subject. See [Token claims for client authentication with client secret or private key JWT](/docs/reference/api/oidc/#token-claims-for-client-authentication-with-client-secret-or-private-key-jwt).

> **Note:** JWTs with a shared key require a secret that is at least 32 characters in length to satisfy HS256 cryptographic minimums. Clients that attempt to set `token_endpoint_auth_method` to `client_secret_jwt` with an imported secret less than 32 characters will receive a validation error. Clients that send Okta a JWT for verification signed with HS256, HS384, or HS512 with a secret less than 32 characters will receive an error: `The client secret is too short to verify a JWT HMAC.`.

  After you create the JWT, in the request you need to specify the `client_assertion_type` as `urn:ietf:params:oauth:client-assertion-type:jwt-bearer` and specify the JWT as the value for the `client_assertion` parameter.

  For example:

  ```http
  POST /token HTTP/1.1
  Host: server.example.com
  Content-Type: application/x-www-form-urlencoded
  grant_type=authorization_code&
    code=i1WsRn1uB1&
    client_id=0oajncakofQmjxlSw0h3
    client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&
    client_assertion=PHNhbWxwOl ... ZT
  ```

### JWT with private key

This method is similar to JWT with shared key, but uses a public/private key pair for more security. The main benefit of this method is you can generate the private key on your own servers and never have it leave there for any reason, since you only need to provide the public key to Okta. This is better than `client_secret_jwt` since Okta must know what the `client_secret` string is beforehand, so there are more places that it could in theory be compromised.

If you configured your client to use the `private_key_jwt` client authentication method:

Provide the `client_id` in a JWT that you sign with your private key using an RSA or ECDSA algorithm (RS256, RS384, RS512, ES256, ES384, ES512). See [Build a JWT for client authentication](/docs/guides/build-self-signed-jwt/). The JWT must also contain other values, such as issuer and subject. See [Token claims for client authentication with client secret or private key JWT](/docs/reference/api/oidc/#token-claims-for-client-authentication-with-client-secret-or-private-key-jwt).

> **Note:** The private key that you use to sign the JWT must have the corresponding public key registered in the client's [JWKSet](/docs/reference/api/oauth-clients/#json-web-key-set).

After you create the JWT, in the request you need to specify the `client_assertion_type` as `urn:ietf:params:oauth:client-assertion-type:jwt-bearer` and specify the JWT as the value for the `client_assertion` parameter.

For example:

```http
POST /token HTTP/1.1
Host: server.example.com
Content-Type: application/x-www-form-urlencoded
grant_type=authorization_code&
  code=i1WsRn1uB1&
  client_id=0oajncakofQmjxlSw0h3
  client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&
  client_assertion=PHNhbWxwOl ... ZT
```

### None

Specify `none` when the client is a public client and doesn't have a client secret. Only the `client_id` is sent in the request body.

### Token claims for client authentication with client secret or private key JWT

If you use a JWT for client authentication (`client_secret_jwt` or `private_key_jwt`), use the following token claims:

| Token Claims   | Description                                                                             | Type    |
| :------------- | :-------------------------------------------------------------------------------------- | :-----  |
| aud            | Required. The full URL of the resource you're using the JWT to authenticate to.         | String  |
| exp            | Required. The expiration time of the token in seconds since January 1, 1970 UTC.        | Integer |
| jti            | Optional. The identifier of the token.                                                  | String  |
| iat            | Optional. The issuing time of the token in seconds since January 1, 1970 UTC.           | Integer |
| iss            | Required. The issuer of the token. This value must be the same as the `client_id`.      | String  |
| sub            | Required. The subject of the token. This value must be the same as the `client_id`.     | String  |

**Parameter details**

* If `jti` is specified, the token can only be used once. So, for example, subsequent token requests won't succeed.
* The `exp` claim fails the request if the expiration time is more than one hour in the future or has already expired.
* If `iat` is specified, then it must be a time before the request is received.

## Troubleshooting

If you run into trouble setting up an authorization server or performing other tasks for OAuth 2.0/OIDC, use the following suggestions to resolve your issues.

### Start with the System Log

The system log contains detailed information about why a request was denied and other useful information.

### Limits

* Scopes are unique per authorization server.

* The `audiences` value you specify is an array of String. If the string contains ":" it must be a valid URI.

* Tokens can expire, be explicitly revoked at the endpoint, or implicitly revoked by a change in configuration.

* Token revocation can be implicit in two ways: token expiration or a change to the source.
    * Expiration happens at different times:
        * ID token expires after one hour.
        * Access token expiration is configured in a policy, but is always between five minutes and one day.
        * Refresh token expiration depends on two factors:
            1) Expiration is configured in an access policy, no limits, but must be greater than or equal to the access token lifetime
            2) Revocation if the refresh token isn't exercised within a specified time. Configure the specified time in an access policy, with a minimum of ten minutes.

    * Revocation happens when a configuration is changed or deleted:
        * User deactivation or deletion.
        * Configuration in the authorization server is changed or deleted.
        * The [client app](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard-oidc) is deactivated, changed, unassigned, or deleted.

### Subtle behavior

Some behaviors aren't obvious:

* A user must be assigned to the client in Okta for the client to get access tokens from that client. You can assign the client directly (direct user assignment) or indirectly (group assignment).

* If you haven't created a rule in a policy on the authorization server to allow the client, user, and scope combination that you want, the request fails. To resolve, create at least one rule in a policy on the authorization server for the relevant resource that specifies client, user, and scope.

* OpenID Connect scopes are granted by default, so if you are requesting only those scopes (`openid`, `profile`, `email`, `address`, `phone`, or `offline_access`), you don't need to define any scopes for them, but you need a policy and rule on a Custom Authorization Server. The rule grants the OpenID Connect scopes by default, so they don't need to be configured in the rule. Token expiration times depend on how they are defined in the rules and which policies and rules match the request.

* OpenID scopes can be requested with custom scopes. For example, a request can include `openid` and a custom scope.

* The evaluation of a policy always takes place during the initial authentication of the user (or of the client in case of the client credentials flow). If the flow isn't immediately finished, such as when a token is requested using the `authorization_code` grant type, the policy isn't evaluated again, and a change in the policy after the user or client is initially authenticated won't affect the continued flow.
