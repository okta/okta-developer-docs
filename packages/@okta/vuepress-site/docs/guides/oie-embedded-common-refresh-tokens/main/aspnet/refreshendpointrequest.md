### Web applications

Web applications refresh access tokens by calling the `/token` endpoint and passing
in a required `Authorization` header. This header is computed from the client ID and
client secret.

Example

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
