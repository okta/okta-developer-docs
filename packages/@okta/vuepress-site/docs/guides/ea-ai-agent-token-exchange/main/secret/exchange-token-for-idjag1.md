In this step, the AI agent sends a `POST` request to the Okta org authorization server's `/token` endpoint to exchange the ID token for the secret credentials.

```bash
  curl --request POST https://{yourOktaDomain}/oauth2/v1/token \
    --header "Content-Type: application/x-www-form-urlencoded" \
    --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:token-exchange" \
    --data-urlencode "requested_token_type=urn:okta:params:oauth:token-type:vaulted-secret" \
    --data-urlencode "subject_token=eyJraWQiOiJzMTZ0cVNtODhwREo4VGZCXzdrSEtQ..." \
    --data-urlencode "subject_token_type=urn:ietf:params:oauth:token-type:id_token" \
    --data-urlencode "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
    --data-urlencode "client_assertion=eyJhbGciOiJSUzI1NiIsImtpZCI6IjIyIn0..." \
    --data-urlencode "resource=orn:okta:pam:00osvp3k63Qlcc9wUS9a:secrets:3ad38bbd-c057-4a69-9d8d-06b8ca86f411"
```

| Parameter | Description and value |
| --- | --- |
| `grant_type` | Standard OAuth 2.0 token exchange grant. The value must be `urn:ietf:params:oauth:grant-type:token-exchange`. |
| `client_assertion_type` | The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| `client_assertion` | A signed JWT used for client authentication. You must sign the JWT using the key created during the AI Agent registration. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). |
| `subject_token_type` | The type of subject token. The value is either `urn:ietf:params:oauth:token-type:id_token` or `urn:ietf:params:oauth:token-type:access_token`. |
| `subject_token` | A valid ID or access token issued to the resource app associated with the AI agent |
| `requested_token_type` | The value must be `urn:okta:params:oauth:token-type:vaulted-secret`. |
| `resource` | A resource identifier for the secret. This value must match the identifier configured on the **Resource Connection** tab. |
