---
title: Get a refresh token
---

To get a refresh token, you send a request to your Okta Authorization Server.

The only flows that support refresh tokens are the authorization code flow and the resource owner password flow. This means that the following combinations of grant type and scope, when sent to the `/token` endpoint, return a refresh token:

| Grant Type           | Scope                       |
| -----------          | -----                       |
| `authorization_code` | `offline_access` (see Note) |
| `refresh_token`      | `offline_access`            |
| `password`           | `offline_access`            |

> **Note:** The authorization code flow is unique in that the `offline_access` scope must be requested as part of the code request to the `/authorize` endpoint and not the request sent to the `/token` endpoint.

> **Note:** Whether persistent refresh token or rotating refresh token behavior is enabled depends on what type of application that you are using. When you select **Refresh Token** as an allowed grant type, [SPAs use refresh token rotation](#renew-access-and-id-tokens-with-spas) as the default behavior. Native apps and web apps use persistent refresh token behavior as the default. See [Refresh token rotation](/docs/guides/refresh-tokens/refresh-token-rotation).

## Get a refresh token with the code flow

In the case of the authorization code flow, you use the Authorization Server's `/authorize` endpoint to get an authorization code, specifying an `offline_access` scope. You then use the `authorization_code` grant with this code in a request to the `/token` endpoint to get an access token and a refresh token.

See [Obtain an authorization grant from a User](/docs/reference/api/oidc/#authorize) and [Implementing the authorization code flow](/docs/guides/implement-auth-code/) for more information on the `/authorize` endpoint and the authorization code flow.

### Example request for an authorization code and refresh token

The following is an example request to the `/authorize` endpoint for an [authorization code](/docs/guides/implement-auth-code/overview/) and includes the `offline_access` scope.

```bash
GET https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id={clientId}
 &response_type=code
 &scope=openid%20offline_access
 &redirect_uri=http%3A%2F%2Flocalhost%3A8080
 &state=1
```

The following is an example request to the `/authorize` endpoint for an [authorization code with PKCE](/docs/guides/implement-auth-code-pkce/overview/) and includes the `offline_access` scope.

```bash
https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id={clientId}
&response_type=code
&scope=openid%20offline_access
&redirect_uri=yourApp%3A%2Fcallback
&state=8600b31f-52d1-4dca-987c-386e3d8967e9
&code_challenge_method=S256
&code_challenge=qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es
```

### Example request for an access token, ID token, and refresh token

The following is an example request to the `/token` endpoint to obtain an access token, an ID token (by including the `openid` scope), and a refresh token for the [Authorization Code flow](/docs/guides/implement-auth-code/overview/). The value for `code` is the authorization code that you receive in the response from the request to the `/authorize` endpoint.

```bash
POST https://${yourOktaDomain}/oauth2/default/v1/token?grant_type=authorization_code
 &redirect_uri=http%3A%2F%2Flocalhost%3A8080
 &code=DPA9Utz2LkWlsronqehy
 &state=9606b31k-51d1-4dca-987c-346e3d8767n9
 &scope=openid%20offline_access
```

The following is an example request to the `/token` endpoint to obtain an access token, an ID token (by including the `openid` scope), and a refresh token for the [Authorization Code with PKCE flow](/docs/guides/implement-auth-code-pkce/overview/). The value for `code` is the code that you receive in the response from the request to the `/authorize` endpoint.

```bash
POST https://${yourOktaDomain}/oauth2/default/v1/token?grant_type=authorization_code
 &redirect_uri=http%3A%2F%2Flocalhost%3A8080
 &code=CKA9Utz2GkWlsrmnqehz
 &state=3606p31k-52d1-4dca-987c-546e3d0767n2
 &scope=openid%20offline_access
 &code_verifier=M25iVXpKU3puUjFjYWg3T1NDTDQtcW1rOUY5YXlwalNoc0hhaoxifmZHag
```

### Example response

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

## Get a refresh token with the resource owner password flow

For the resource owner password flow, you use the authorization server's `/token` endpoint directly.

See [Request a token](/docs/reference/api/oidc/#token) and [Implementing the resource owner password flow](/docs/guides/implement-password/) for more information on the `/token` endpoint and the resource owner password flow.

### Example request

With the `password` grant type, you can include an `openid` scope alongside the `offline_access` scope to also get back an ID token.

```bash
POST https://${yourOktaDomain}/oauth2/default/v1/token?grant_type=password
 &redirect_uri=http%3A%2F%2Flocalhost%3A8080
 &username=example%40mailinator.com
 &password=a.gReAt.pasSword
 &scope=openid%20offline_access
```

### Example response

You would then get back an ID token as well as your access and refresh tokens. See the [Okta OAuth 2.0 reference page](/docs/reference/api/oidc/#response-properties).

> **Note:** The access and ID tokens are truncated for brevity.

```json
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQi.....T2aA5ottg",
    "scope": "offline_access openid",
    "refresh_token": "cBMrwDsXRwPqVmCQx7I5IX0jQ9-Lc_zHOgYeab1xZm4",
    "id_token": "eyJra.....ezAriw"
}
```

## Renew access and ID tokens with SPAs

With a SPA, it is usually undesirable to redirect the user to a sign-in page during normal navigation. To avoid this disruptive redirection, the `/authorize` endpoint allows the use of a request parameter called `prompt`. If the value of the `prompt` parameter is `none`, this guarantees that the user won't be prompted to sign in, regardless of whether they have an active session. Instead, your application either silently obtains the requested tokens or an OAuth error response occurs. Before [refresh token rotation](/docs/guides/refresh-tokens/refresh-token-rotation/) was available, the `prompt` parameter was the only way for a SPA to maintain user sessions without prompting the user to sign in multiple times.

The introduction of browser privacy controls such as Intelligent Tracking Prevention (ITP) and Enhanced Tracking Prevention (ETP) affect how browsers handle third-party cookies. These browser privacy controls prevent the use of an Okta session cookie to silently renew user sessions, which forces the user to reauthenticate and takes away the seamless user experience. Refresh token rotation provides a solution for SPAs to maintain user sessions in an ITP browser world. Since refresh tokens are independent of any cookies, you don't have to rely on an Okta session cookie to renew access and ID tokens.

> **Note:** You can still use the Okta session cookie and silently renew the tokens as long as the application and Okta are in the same domain.

<NextSectionLink/>
