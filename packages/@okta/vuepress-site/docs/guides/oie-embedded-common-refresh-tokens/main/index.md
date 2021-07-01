---
title: Refresh access and id tokens
---
<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

<StackSelector class="cleaner-selector"/>

## Summary

Access tokens often have limited lifetimes. Allowing access
tokens to expire limits there usefulness in case they are discovered
by an attacker. In order for your app to continue to use the
appropriate resources with an expired access token, it can refresh
them without user intervention through the use of a refresh token.

All the SDK's expose functionality that allow you
to access these tokens. Depending on the SDK (Swift, Javascript,
 etc), you have varying degrees of convenience
methods and other functionality that provide you with built-in support
for token refresh, auto-renewal, and storage.  Minimally,
all the SDK's allow you to obtain the refresh token and call the authorization
server's token endpoint to renew the access token.

<StackSelector snippet="refreshusingthesdk" noSelector />

## Refresh using the OAuth token endpoint

Access and id tokens can be refreshed using OAuth token endpoint
described in the OAuth
[specification](https://datatracker.ietf.org/doc/html/rfc6749#section-5.1).

Before calling this endpoint, obtain the refresh token from the SDK. Once
retrieved, create an HTTP Post request to the authorization server's `token` endpoint.
See example below.

```http
POST /oauth2/default/v1/token HTTP/1.1
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Authorization: Basic MG9hMTJncG5qZnpvdllTbk41ZDc6UG9zWGpjNmw0WHF5ZDBhek03cjF0SnhyMS1LWHdWYmNFaDk0Q0FDNA==

grant_type: refresh_token
redirect_uri: http://localhost:8080
scope: offline_access openid profile
refresh_token: 03_hBtVj-Hk0Mxo9TPSdl7TLkxQioKqQEzud3ldqHqs
```

Note the use of the `refresh_token` `grant_type` value which indicates
the request is for refreshing the access token. For further details on access token refresh, see
[Use a refresh token](/docs/guides/refresh-tokens/use-refresh-token/).

</div>
