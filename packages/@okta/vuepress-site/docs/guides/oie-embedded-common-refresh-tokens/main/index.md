---
title: Refresh the access and ID tokens
---
<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

This guide shows you how to refresh access and ID tokens by using either the Identity Engine SDK or the OIDC & OAuth 2.0 API.

---

**Learning outcomes**

* Understand refresh tokens.
* Know how to refresh tokens by using the SDK or the OIDC & OAuth 2.0 API.

**What you need**

* An [Okta org that is already configured for your use case](/docs/guides/oie-embedded-common-org-setup/)
* An [Identity Engine SDK that is set up for your own app](/docs/guides/oie-embedded-common-download-setup-app/)
* An app that uses an Identity Engine SDK that is configured with an `offline_access` scope

---

## Overview

Access tokens often have limited lifetimes. If you allow access
tokens to expire, their usefulness is limited in the event they are discovered
by an attacker. In order for your app to continue to use the
appropriate resources when an access token expires, the app can refresh
them without user intervention through the use of a refresh token.

All the SDKs expose functionality that allow you
to obtain access, ID, and refresh tokens. Depending on the SDK (Swift,
JavaScript, and so on), you have varying degrees of convenience
methods and other functionality that provide you with built-in support
for token refresh, auto-renewal, and storage.  Minimally,
all the SDKs allow you to obtain the refresh token and call the authorization
server's token endpoint to renew the access token.

## Option 1: Refresh the tokens with the SDK

<StackSnippet snippet="refreshusingthesdk" />

## Option 2: Refresh the tokens with the OAuth token endpoint

You can refresh access and ID tokens using the
[`/token`](/docs/reference/api/oidc/#token)
endpoint with the `grant_type` set to `refresh_token`. Before calling this endpoint,
obtain the refresh token from the SDK and ensure that you have included
`offline_access` as a scope in the SDK configurations. For further details on
access token refresh with this endpoint, see
[Use a refresh token](/docs/guides/refresh-tokens/main/#use-a-refresh-token).

<StackSnippet snippet="refreshendpointrequest" />

### Native and SPA applications

OIDC and OAuth 2.0 requests for native and single-page applications (SPAs) don't include the `Authorization` header with the client ID and secret. Instead, these apps include the `client_id` query parameter in their requests.

#### Request example

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

#### Response example

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

To get information on a current token, such as if the token is active or has expired, use the [`/introspect`](/docs/reference/api/oidc/#introspect) endpoint.

<StackSnippet snippet="introspectendpointrequest" />

### Native and SPA applications

OIDC and OAuth 2.0 requests for native and single-page applications (SPAs) don't include the `Authorization` header with the client ID and secret. Instead, these apps include the `client_id` query parameter in their requests.

#### Request example

```http
POST /oauth2/default/v1/introspect HTTP/1.1
Accept: application/json
Content-Type: application/x-www-form-urlencoded

token=eyJraWQiOiJoQk...
client_id=0oa14dl1z4nUJxx0z5d7
token_type_hint=access_token
```

#### Response example

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
