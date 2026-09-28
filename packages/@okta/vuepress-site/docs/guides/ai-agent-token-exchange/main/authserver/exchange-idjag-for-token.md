### Exchange ID-JAG for access token

After receiving the ID-JAG, the agent sends a `POST` request to the resource authorization server's `/token` endpoint to exchange the ID-JAG for an access token.

```bash
  curl --location --request POST \
  --url 'https://{yourOktaDomain}/oauth2/{authServerId}/v1/token' \
  --header "Content-Type: application/x-www-form-urlencoded" \
  --header "Accept: application/json" \
  --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
  --data-urlencode "assertion=eyJraWQiOiJuc3MwV3UyblE4...[jwt-id-jag]" \
  --data-urlencode "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
  --data-urlencode "client_assertion=eyJhbGciOiJSUzI1NiIsInR5...[jwt]"
```

| Parameter | Description and value |
| --- | --- |
| `grant_type` | The value must be `urn:ietf:params:oauth:grant-type:jwt-bearer` |
| `assertion` | The ID-JAG that's received in the **Exchange subject token for resource token** response. |


#### Response

The response contains the access token that the AI agent uses to access the resource server.

```JSON
{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWVlsMHR0blJobUY4Q0xTaUdBenlwemJVIiwiYWxnIjoi...",
  "scope": "chat.read+chat.history"
}
```

If the ID-JAG doesn't contain a `resource` claim, then the access token's `aud` claim is the default audience configured on the custom authorization server.

```JSON
{
  "iss": "https://{yourOktaDomain}/oauth2/{authServerId}",
  "sub": "0oa9jh6hizeR7uMag0g7",
  "aud": "https://{yourOktaDomain}/oauth2/default",
  "iat": 1780596935,
  "exp": 1780600535,
  "scope": "chat.read chat.history",
  "sub_profile": "service"
}
```

If the ID-JAG does contain the `resource` claim, then the access token's `aud` claim matches that resource URL instead of the resource URL configured on the custom authorization server:

```JSON
{
  "iss": "https://{yourOktaDomain}/oauth2/{authServerId}",
  "sub": "0oa9jh6hizeR7uMag0g7",
  "aud": "https://mcpserver1.example.com",
  "iat": 1780596935,
  "exp": 1780600535,
  "scope": "chat.read chat.history",
  "sub_profile": "service",
  "act": {
     "sub": "{aiAgentPrincipalId}",
     "sub_profile": "ai_agent"
   }
}
```
