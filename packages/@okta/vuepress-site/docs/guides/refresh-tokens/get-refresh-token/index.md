---
title: Get a refresh token
---

To get a refresh token, you send a request to your Okta Authorization Server.

The only flows that support refresh tokens are the resource owner password flow and the authorization code flow. This means that the following combinations of grant type and scope, when sent to the `/token` endpoint, return a refresh token:

| Grant Type           | Scope                       |
| -----------          | -----                       |
| `authorization_code` | `offline_access` (see Note) |
| `refresh_token`      | `offline_access`            |
| `password`           | `offline_access`            |

> **Note:** The authorization code flow is unique in that the `offline_access` scope must be requested as part of the code request to the `/authorize` endpoint and not the request sent to the `/token` endpoint.

### Get a refresh token with the code flow

In the case of the authorization code flow, you use the authorization server's `/authorize` endpoint to get an authorization code, specifying an `offline_access` scope. You then send this code to the `/token` endpoint to get an access token and a refresh token.

> **Note:**  Authorization code with PKCE requests don't return refresh tokens if they are sent from SPAs or other browser-based apps. Instead, you can [silently refresh tokens](#get-a-new-access-token-id-token-silently-for-your-spa) by making a call to the `/authorize` endpoint.

See [Obtain an authorization grant from a User](/docs/reference/api/oidc/#authorize) and [Implementing the authorization code flow](/docs/guides/implement-auth-code/) for more information on the `/authorize` endpoint and the authorization code flow.

#### Example request for an authorization code and refresh token

The following is an example request to the `/authorize` endpoint for an authorization code and includes the `offline_access` scope.

```BASH
GET https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id={clientId}
 &response_type=code
 &scope=openid%20offline_access
 &redirect_uri=http%3A%2F%2Flocalhost%3A8080
 &state=1
```

#### Example request for an access token, ID token, and refresh token

The following is an example request to the `/token` endpoint to obtain an access token, an ID token (by including the `openid` scope), and a refresh token. The value for `code` is the code that you receive in the response from the request to the `/authorize` endpoint.

```BASH
POST https://${yourOktaDomain}/oauth2/default/v1/token?grant_type=authorization_code
 &redirect_uri=http%3A%2F%2Flocalhost%3A8080
 &code=code
 &state=1
 &scope=openid
```

#### Example response

> **Note:** The access and ID tokens are truncated for brevity.

```json
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQ.....rm8EA4osYg",
    "scope": "offline_access openid",
    "refresh_token": "i6mapTIAVSp2oJkgUnCACKKfZxt_H5MBLiqcybBBd04",
    "id_token": "eyJraWQiOiJ.....XAn3ty6o-yeA"
}
```

### Get a refresh token with the resource owner password flow

For the resource owner password flow, you use the authorization server's `/token` endpoint directly.

See [Request a token](/docs/reference/api/oidc/#token) and [Implementing the resource owner password flow](/docs/guides/implement-password/) for more information on the `/token` endpoint and the resource owner password flow. 

#### Example request

With the `password` grant type, you can include an `openid` scope alongside the `offline_access` scope to also get back an ID token.

```BASH
POST https://${yourOktaDomain}/oauth2/default/v1/token?grant_type=password
 &redirect_uri=http%3A%2F%2Flocalhost%3A8080
 &username=example%40mailinator.com
 &password=a.gReAt.pasSword
 &scope=openid%20offline_access
```

#### Example response

You would then get back an ID token as well as your access and refresh tokens. See the [Okta OAuth 2.0 reference page](/docs/reference/api/oidc/#response-properties).

> **Note:** The access and ID tokens are truncated for brevity.

```JSON
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQi.....T2aA5ottg",
    "scope": "offline_access openid",
    "refresh_token": "cBMrwDsXRwPqVmCQx7I5IX0jQ9-Lc_zHOgYeab1xZm4",
    "id_token": "eyJra.....ezAriw"
}
```

### Get a new access token/ID token silently for your SPA

With a normal Single-Page Application (SPA), it is usually undesirable to redirect the user to a sign-in page during normal navigation. For example, a user could request access to a resource, prompting your SPA to send a request to the Okta `/authorize` endpoint. Normally, if a user doesn't have a valid session, this request results in a redirection to a sign-in page. To avoid this disruptive redirection, the endpoint allows for a request parameter called `prompt`. If the value of the `prompt` parameter is `none`, this guarantees that the user won't be prompted to sign in, regardless of whether they have an active session. Instead, your application either silently obtains the requested tokens or an OAuth error response occurs.

See the [Authentication Request section of the OIDC Reference](/docs/reference/api/oidc/#authorize).

<NextSectionLink/>
