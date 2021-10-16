---
title: Refresh the access and ID tokens
---
<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector class="cleaner-selector"/>

This guide covers the refresh tokens that are used when access tokens expire and also describes the options to refresh the tokens.

---
**Learning outcomes**
* Understand what refresh tokens are.
* Know how to use either of the options to refresh tokens.

**What you need**
* [Refresh token](/docs/guides/refresh-tokens/use-refresh-token/) from the SDK with `offline_access` as a scope
* [`/token`](/docs/reference/api/oidc/#token) endpoint

**Sample code**
* n/a
---

## Overview

Access tokens often have limited lifetimes. If you allow access
tokens to expire, their usefulness is limited in the event they are discovered
by an attacker. In order for your app to continue to use the
appropriate resources when an access token expires, the app can refresh
them without user intervention through the use of a refresh token.

All the SDKs expose functionality that allow you
to obtain access, ID, and refresh tokens. Depending on the SDK (Swift,
Javascript, and so on), you have varying degrees of convenience
methods and other functionality that provide you with built-in support
for token refresh, auto-renewal, and storage.  Minimally,
all the SDKs allow you to obtain the refresh token and call the authorization
server's token endpoint to renew the access token.

<StackSelector snippet="refreshusingthesdk" noSelector />

## Option 2: Refresh the token using the OAuth token endpoint

You can refresh access and ID tokens using the
[`/token`](/docs/reference/api/oidc/#token)
endpoint with the `grant_type` set to `refresh_token`. Before calling this endpoint,
obtain the refresh token from the SDK and ensure that you have included
`offline_access` as a scope in the SDK configurations. For further details on
access token refresh with this endpoint, see
[Use a refresh token](/docs/guides/refresh-tokens/use-refresh-token/).

<StackSelector snippet="refreshendpointrequest" noSelector />

### Native and SPA applications

Unlike web applications, native applications and single-page applications (SPAs)
don't use client secrets. As a result, token refresh requests for these
applications omit the `Authorization` header and instead include the
`client_id` query parameter.

Example

```http
POST /oauth2/default/v1/token HTTP/1.1
Accept: application/json
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token
redirect_uri=com.embeddedauth://callback
scope=offline_access openid profile
refresh_token=03_hBtVj-Hk0Mxo9TPSdl7TLkxQioKqQEzud3ldqHqs
client_id=0oa94el1z4nUDxx0z5d7
```

### Response

```json
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJoQkZNR...",
    "scope": "offline_access openid profile",
    "refresh_token": "HRzOBfj1A1g6akWqNHfCE-KX-9NASmnFqhRFOt_rEdc",
    "id_token": "eyJraWQiOiJoQkZN..."
}
```

## Get the token info using the introspect endpoint

To learn more information about tokens (access or Id) including whether
they have expired, use the
[`/introspect`](https://developer.okta.com/docs/reference/api/oidc/#introspect)
endpoint.

<StackSelector snippet="introspectendpointrequest" noSelector />

### Native and SPA applications

Unlike web applications, native applications and single-page applications (SPAs)
don't use client secrets. Refresh requests for these applications omit the
`Authorization` header and include the `client_id` query parameter.

Example

```http
POST /oauth2/default/v1/introspect HTTP/1.1
Accept: application/json
Content-Type: application/x-www-form-urlencoded

token=eyJraWQiOiJoQk...
client_id=0oa14dl1z4nUJxx0z5d7
token_type_hint=access_token
```

### Response

```json
{
    "active": true,
    "scope": "profile openid offline_access",
    "username": "foo@bar.com",
    "exp": 1626128470,
    "iat": 1626124870,
    "sub": "foo@bar.com",
    "aud": "api://default",
    "iss": "https://dev-12345678.okta.com/oauth2/default",
    "jti": "AT.4PAhL3RW5Yxn5leKbT3_xpiflVWYvcrKtzgkt9HHwDo.oar2str41LSUbsgXb5d6",
    "token_type": "Bearer",
    "client_id": "0oa14dl1z4nUJxx0z5d7",
    "uid": "00u128itb5sYrGii55d7"
}
```

</div>
