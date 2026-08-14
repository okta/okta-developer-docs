In this step, the AI agent sends a `POST` request to the Okta org authorization server's `/token` endpoint to exchange the ID token for the resource token.

This request supports multiple client authentication methods. The example below changes, depending on how the agent was configured to authenticate it's identity to Okta. See [Add client registration details](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-add-manually) on the Add AI agents manually page in the help docs.

> **Note**: This request example uses the access token subject token type and public/private key for client authentication. See [Client authentication methods](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth#client-authentication-methods) for more details on each type of authentication method.

```bash
  curl --request POST https://{yourOktaDomain}/oauth2/v1/token \
    --header "Content-Type: application/x-www-form-urlencoded" \
    --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:token-exchange" \
    --data-urlencode "requested_token_type=urn:okta:params:oauth:token-type:oauth-sts" \
    --data-urlencode "subject_token=eyJraWQiOiJz..." \
    --data-urlencode "subject_token_type=urn:ietf:params:oauth:token-type:id_token" \
    --data-urlencode "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
    --data-urlencode "client_assertion=eyJhbGci..." \
    --data-urlencode "resource=resource:indicator:from:resource:connection"
```

| Parameter | Description and value |
| --- | --- |
| `grant_type` | Standard OAuth 2.0 token exchange grant. The value must be `urn:ietf:params:oauth:grant-type:token-exchange`. |
| `client_assertion_type` | The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| `client_assertion` | A signed JWT that's used for client authentication. You must sign the JWT using the key that you created when you registered the AI agent. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). |
| `subject_token_type` | The value must be `urn:ietf:params:oauth:token-type:id_token`. |
| `subject_token` | A valid ID token issued to the resource app that's associated with the AI agent |
| `requested_token_type` | Standard OAuth 2.0 token exchange grant. The value must be `urn:okta:params:oauthtoken-type:oauth-sts`. |
| `resource` | A resource identifier for the target app. This must match the resource that's configured on the **Resource Connection** tab. |
