
In this step, AI agent 1 sends a `POST` request to the Okta org authorization server's `/token` endpoint to exchange the `subject_token` for the ID-JAG resource token.

> **Note**: This request example uses the access token subject token type.

``` http

POST /oauth2/v1/token HTTP/1.1
Host: example.okta.com
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:token-exchange
&subject_token=eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWVlsMHR0bl....
&subject_token_type=urn:ietf:params:oauth:token-type:access_token
&requested_token_type=urn:ietf:params:oauth:token-type:id-jag
&audience=https://{yourOktaDomain}/oauth2/{authServerId}
&resource=https://agent2.example.com
&scope=agent.invoke
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion=eyJhbGciOiJSUzI1NiIsInR5…[jwt]

```

| Parameter | Description and value |
| --- | --- |
| grant_type | Standard OAuth 2.0 token exchange grant. The value must be `urn:ietf:params:oauth:grant-type:token-exchange`. |
| subject_token | A valid ID or access token that satisfies a delegation link for the AI agent. |
| subject_token_type | The value is either `urn:ietf:params:oauth:token-type:id_token` or `urn:ietf:params:oauth:token-type:access_token`. |
| requested_token_type | The value must be `urn:ietf:params:oauth:token-type:id-jag`. |
| audience | The issuer URL of the resource app's authorization server. |
| resource | The resource URL of the agent that receives and validates the incoming request.|
| scope    | `agent.invoke` |
| client_assertion_type | The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| client_assertion | A signed JWT used for client authentication. You must sign the JWT using the key created during the AI Agent registration. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). |
