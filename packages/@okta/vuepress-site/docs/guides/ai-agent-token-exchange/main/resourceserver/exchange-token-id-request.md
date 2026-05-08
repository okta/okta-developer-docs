
In this step, the AI agent sends a `POST` request to the Okta org authorization server's `/token` endpoint to exchange the ID token for the resource token.

``` http
POST /oauth2/v1/token HTTP/1.1
Host: example.okta.com
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:token-exchange
&requested_token_type=urn:okta:params:oauth:token-type:oauth-sts
&subject_token=eyJraWQiOiJz...
&subject_token_type=urn:ietf:params:oauth:token-type:id_token
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion=eyJhbGci...
&resource=resource:indicator:from:resource:connection
```

| Parameter | Description and value |
| --- | --- |
| grant_type | Standard OAuth 2.0 token exchange grant. The value must be `urn:ietf:params:oauth:grant-type:token-exchange`. |
| client_assertion_type | The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| client_assertion | A signed JWT used for client authentication. You must sign the JWT using the key created during AI Agent registration. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). |
| subject_token_type | The value must be `urn:ietf:params:oauth:token-type:id_token`. |
| subject_token | A valid ID token issued to the resource app associated with the AI agent |
| requested_token_type | Standard OAuth 2.0 token exchange grant. The value must be `urn:okta:params:oauthtoken-type:oauth-sts`. |
| resource | A resource identifier for the target app. This must match the resource configured in the **Resource Connection** tab. |
