In this step, after the agent receives the access or ID token from the client, the agent sends a `POST` request to the Okta org authorization server's `/token` endpoint. This request is to exchange the token for an ID-JAG resource token.

```bash
  curl --location --request POST \
    --url 'https://{yourOktaDomain}/oauth2/v1/token' \
    --header "Content-Type: application/x-www-form-urlencoded" \
    --header "Accept: application/json" \
    --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:token-exchange" \
    --data-urlencode "subject_token=eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWVlsMHR0bl...." \
    --data-urlencode "subject_token_type=urn:ietf:params:oauth:token-type:id_token" \
    --data-urlencode "requested_token_type=urn:ietf:params:oauth:token-type:id-jag" \
    --data-urlencode "audience=https://{yourOktaDomain}/oauth2/default" \
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
| `scope`    | A list of scopes at the resource app that's being requested. This defines the permissions for the final access token. |
| `client_assertion_type` | The type of assertioin. The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| `client_assertion` | A signed JWT that's used for client authentication. You must sign the JWT using the key that you created when you registered the AI agent. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). |
