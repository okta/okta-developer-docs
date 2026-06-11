After receiving the ID-JAG, Agent 1 sends a `POST` request to the custom authorization server's `/token` endpoint to exchange the ID-JAG (T2) for an access token (T3) that can be used to invoke Agent 2.

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
| `assertion` | The ID-JAG received in the Exchange token for resource token [response](/docs/guides/ai-agent-token-exchange/a2a/main/#response). |

#### Response

The response contains an access token (T3) with the same delegation chain context, which Agent 1 passes to Agent 2.

```JSON
{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWVlsMHR0blJobUY4Q0xTaUdBenlwemJVIiwiYWxnIjoi...",
  "scope": "chat.read+chat.history"
}
```

The access token contains the following claims:

```JSON
{
  "iss": "https://{yourOktaDomain}/oauth2/{authServerId}",
  "sub": "0oa9jh6hizeR7uMag0g7",
  "aud": "https://agent2.{yourOktaDomain}",
  "iat": 1780596935,
  "exp": 1780600535,
  "scope": "chat.read+chat.history",
  "sub_profile": "service",
  "act": {
    "sub": "wlp9jebmx18qWtCeu0g7",
    "sub_profile": "ai_agent"
  }
}
```
