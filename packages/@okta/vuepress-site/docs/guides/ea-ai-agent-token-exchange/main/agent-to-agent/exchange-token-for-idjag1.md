In this step, after Agent 1 receives the access or ID token (T1) from the client, Agent 1 sends a `POST` request to the Okta org authorization server's `/token` endpoint. This request is to exchange the token for an ID-JAG resource token (T2). This exchange establishes Agent 1 as the immediate actor in the delegation chain while maintaining the original service client as the subject.

> **Note**: This request example uses the access token subject token type.

```bash
  curl --location --request POST \
    --url 'https://{yourOktaDomain}/oauth2/v1/token' \
    --header "Content-Type: application/x-www-form-urlencoded" \
    --header "Accept: application/json" \
    --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:token-exchange" \
    --data-urlencode "subject_token=eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWVlsMHR0bl...." \
    --data-urlencode "subject_token_type=urn:ietf:params:oauth:token-type:access_token" \
    --data-urlencode "requested_token_type=urn:ietf:params:oauth:token-type:id-jag" \
    --data-urlencode "audience=https://{yourOktaDomain}/oauth2/{authServerId}" \
    --data-urlencode "resource=https://agent2.example.com" \
    --data-urlencode "scope=chat.read+chat.history" \
    --data-urlencode "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
    --data-urlencode "client_assertion=eyJhbGciOiJSUzI1NiIsInR5…[jwt]"
```

| Parameter | Description and value |
| --- | --- |
| `grant_type` | Standard OAuth 2.0 token exchange grant. The value must be `urn:ietf:params:oauth:grant-type:token-exchange`. |
| `subject_token` | A valid ID or access token that satisfies a delegation link for the AI agent |
| `subject_token_type` | The type of subject token. The value is either `urn:ietf:params:oauth:token-type:id_token` or `urn:ietf:params:oauth:token-type:access_token`. |
| `requested_token_type` | The type of token being requested. The value must be `urn:ietf:params:oauth:token-type:id-jag`. |
| `audience` | The issuer URL of the resource app's authorization server |
| `resource` | The resource URL of Agent 2 |
| `scope`    | A list of scopes at the resource app that's being requested. This defines the permissions for the final access token. |
| `client_assertion_type` | The type of assertion for client authentication. The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| `client_assertion` | A signed JWT used for client authentication. You must sign the JWT using the key created during the AI agent registration. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). |
