---
title: Get a Refresh Token
---

To get a refresh token, you send a request to your Okta Authorization Server.

The only flows that support Refresh tokens are the resource owner password flow, and the authorization code flow. This means that the following combinations of grant type and scope, when sent to `/token` endpoint, will return a refresh token:

| Grant Type           | Scope                       |
| -----------          | -----                       |
| `authorization_code` | `offline_access` (see Note) |
| `refresh_token`      | `offline_access`            |
| `password`           | `offline_access`            |

> **Note:** The authorization code flow is unique, in that the `offline_access` scope has to be requested as part of the code request to the `/authorize` endpoint, and not the request sent to the `/token` endpoint.

### Get a Refresh Token with the Code Flow

In the case of the Authorization Code flow, you use the Authorization Server's `/authorize` endpoint to get an authorization code, specifying an `offline_access` scope. You then send this code to the `/token` endpoint to get an access token and a refresh token.

> **Note:**  Authorization code with PKCE requests will not return refresh tokens if they are sent from SPAs or other browser-based apps.

For more information about this endpoint, see [Obtain an Authorization Grant from a User](/docs/reference/api/oidc/#authorize). For more information about the Authorization Code flow, see [Implementing the Authorization Code Flow](/docs/guides/implement-auth-code/).

### Get a Refresh Token with the Resource Owner Password Flow

For the Resource Owner Password flow, you use the Authorization Server's `/token` endpoint directly.

For more information about this endpoint, see [Request a Token](/docs/reference/api/oidc/#token). For more information about the Resource Owner Password flow, see [Implementing the Resource Owner Password Flow](/docs/guides/implement-password/).

For example, with the `password` grant type you can include an `openid` scope alongside the `offline_access` scope:

```
POST https://${yourOktaDomain}/oauth2/default/v1/token

grant_type=password
 &redirect_uri=http%3A%2F%2Flocalhost%3A8080
 &username=example%40mailinator.com
 &password=a.gReAt.pasSword
 &scope=openid%20offline_access
```

You would then get back an ID token alongside your access and refresh tokens.

For more information see the [Okta OAuth 2.0 reference page](/docs/reference/api/oidc/#response-properties).

## Get a Refresh Token Silently for Your SPA

In a normal Single-Page Application (SPA) it is usually undesirable to redirect the user to a login page during normal navigation. For example, a user could request access to a resource, prompting your SPA to send a request to the Okta `/authorize` endpoint. Normally, if a user does not have a valid session, this request will result in a redirection to a login page. To avoid this disruptive redirection, the endpoint allows for a request parameter called `prompt`. If the value of the `prompt` parameter is `none`, this guarantees that the user will not be prompted to login, regardless of whether they have an active session or not. Instead, your application will either silently obtain the requested tokens or an OAuth error response. How to act on the error is up to you.

For more information on the `/authorize` endpoint, see the [Authentication Request section of the OIDC Reference](/docs/reference/api/oidc/#authorize).


<NextSectionLink/>
