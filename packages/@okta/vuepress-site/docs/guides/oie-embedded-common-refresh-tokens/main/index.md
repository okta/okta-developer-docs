---
title: Token refresh best practices
---
<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

<StackSelector class="cleaner-selector"/>



## Summary




## Getting the tokens


## Refresh the tokens

### Using the SDK

<StackSelector snippet="refreshusingthesdk" noSelector />

### Direct using HTTP POST

#### Post request

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

#### Post request through code

<StackSelector snippet="postrequestincode" noSelector />


## Reasons why token expire matters

## Determining token expiry


## Refresh token usage scenarios

### Scenario 1: Tie the access






## When to refresh

### Returned error

### Proactive refresh process

### On demand automatic

### On demand manual

## How to refresh

### Manual



## See also

### Token storage recommendations

###



## Open questions

* Can you update any of the SDKs with the updated token?  Would you need to?
* Need for both the widget and SDK
* SDK purpose is to login and give you a token, what else?






</div>
