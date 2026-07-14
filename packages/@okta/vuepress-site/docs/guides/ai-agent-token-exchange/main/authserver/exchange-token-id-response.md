
``` http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache

{
 "issued_token_type": "urn:ietf:params:oauth:token-type:id-jag",
 "access_token": "eyJhbGciOiJIUzI1NiIsI...",
 "token_type": "N_A",
 "scope": "chat.read chat.history",
 "expires_in": 300

}
```

### Exchange ID-JAG for Access Token

After receiving the ID-JAG, the AI agent sends a `POST` request to the resource authorization server's `/token` endpoint to exchange the ID-JAG for an access token.

``` http

POST /oauth2/default/v1/token HTTP/1.1
Host: example.okta.com
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer
assertion=eyJhbGciOiJIUzI1NiIsI...
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion=eyJhbGciOiJSUzI1NiIsImtpZCI6IjIyIn0...
```

| Parameter | Description and value |
| --- | --- |
| grant_type | The value must be `urn:ietf:params:oauth:grant-type:jwt-bearer` |
| assertion | The ID-JAG received in the Exchange token ID for resource token [response](/docs/guides/ai-agent-token-exchange/authserver/main/#response). |
| client_assertion_type | The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| client_assertion | A signed JWT used for client authentication. You must sign the JWT using the key created during the AI Agent registration. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). |

#### Response

The response contains the access token that the AI agent uses to access the resource server.

``` http
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJoZnpMS3...tdBbjhHcIXF_OQCsUdkuPXQTaAeq8fQ",
    "scope": "chat.read chat.history"
}
```
