---
title: Tokens
beta: true
category: management
redirect_from: /docs/getting_started/tokens.html
---

# Overiew

> This endpoint is a <ApiLifecycle access="deprecated" /> feature. Please see [Getting an API Token](/docs/api/getting_started/getting_a_token/).

## Create tokens

### POST /tokens

Create a token.  This API does not require any token-based authentication to access.

#### Request Example

```bash
curl -v -X POST \
-H "Content-type:application/json" \
-H "Accept:application/json" \
-d '{
  "username": "user8u3VOJBREVQHBTAS@asdf.com",
  "password": "SecretPass",
  "clientAppId": "capalkhfadflkjh",
  "deviceName": "Sample Device Name"
}' "https://{yourOktaDomain}/api/v1/tokens"
```

#### Response Example

``` json
{
  "token": "00F-MBcxD2SC8tzXDCDZm2a04qtXLcFqtlrrPu6eVtxRs"
}
```


## Revoke tokens

### DELETE /tokens

Revokes the token that is being used to authenticate to the API.

#### Request Example

```bash
curl -v -X DELETE \
-H "Content-type:application/json" \
-H "Authorization:SSWS ${api_token}" \
-H "Accept:application/json" \
"https://{yourOktaDomain}/api/v1/tokens"
```
