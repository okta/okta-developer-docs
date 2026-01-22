
In this step, the AI agent sends a `POST` request to the Okta org authorization server's `/token` endpoint to exchange the ID token for the ID-JAG resource token.

``` http

POST /oauth2/v1/token HTTP/1.1
Host: example.okta.com
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:token-exchange
&requested_token_type=urn:ietf:params:oauth:token-type:id-jag
&subject_token=eyJraWQiOiJzMTZ0cVNtODhwREo4VGZCXzdrSEtQ...
&subject_token_type=urn:ietf:params:oauth:token-type:id_token
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion=eyJhbGciOiJSUzI1NiIsImtpZCI6IjIyIn0...

&audience=https://example.okta.com/oauth2/default
&scope=chat.read+chat.history

```

| Parameter | Description and value |
| --- | --- |
| grant_type | Standard OAuth 2.0 token exchange grant. The value must be `urn:ietf:params:oauth:grant-type:token-exchange` |
| client_assertion_type | The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer` |
| client_assertion | A signed JWT used for client authentication. You must sign the JWT using the key created during the AI Agent registration. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). |
| subject_token_type | The value must be `urn:ietf:params:oauth:token-type:id_token` |
| subject_token | A valid ID token issued to the resource app associated with the AI agent. |
| requested_token_type | The value must be `urn:ietf:params:oauth:token-type:id-jag` |
| scope | A list of scopes at the resource app being requested. This defines the permissions for the final access token. |
| audience | The issuer URL of the resource app’s authorization server. |

