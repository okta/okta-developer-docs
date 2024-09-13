### Web apps

Web apps request token information by calling the [`/introspect`](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/introspectCustomAS) endpoint and passing in a required [`Authorization`](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#client-authentication-methods) header. This header is computed from the client ID and secret.

#### Request example

```http
POST /oauth2/default/v1/introspect HTTP/1.1
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Authorization: Basic MG9hMTJncG5qZnpvdllTbk41ZDc6UG9zWGpjNmw0WHF5ZDBhek03cjF0SnhyMS1LWHdWYmNFaDk0Q0FDNA==

token=eyJraWQiOiJoQk...
token_type_hint=access_token
```
