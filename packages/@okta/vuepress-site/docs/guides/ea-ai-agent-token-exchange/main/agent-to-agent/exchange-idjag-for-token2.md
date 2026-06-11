### Agent 2 exchanges ID-JAG for token

Agent 2 exchanges the ID-JAG (T4) at the custom authorization server for a final access token (T5) that it can use to access the downstream resource.

```bash
  curl --request POST https://{yourOktaDomain}/oauth2/{authServerId}/v1/token \
    --header "Content-Type: application/x-www-form-urlencoded" \
    --header "Accept: application/json" \
    --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
    --data-urlencode "assertion=eyJraWQiOiJuc3MwV3UyblE4...[jwt-id-jag]" \
    --data-urlencode "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
    --data-urlencode "client_assertion=eyJhbGciOiJSUzI1NiIsInR5...[jwt]"
```

#### Response

The response contains a final access token (T5) with the complete delegation chain, which Agent 2 uses to access the downstream resource.

```JSON
{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWVlsMHR0blJobUY0Q0xTaUdBenlwemJVIiwiYWxnIjoi...",
  "scope": "chat.read+chat.history"
}
```

The access token contains the following claims:

```JSON
{
  "iss": "https://{yourOktaDomain}/oauth2/{authServerId}",
  "sub": "0oa9jh6hizeR7uMag0g7",
  "aud": "https://finance-api.example.com",
  "iat": 1780597035,
  "exp": 1780600635,
  "scope": "chat.read+chat.history",
  "sub_profile": "service",
  "act": {
    "sub": "wlp9jecfovIcujmca0g7",
    "sub_profile": "ai_agent"
  },
  "delegated_through": [
    {
      "sub": "wlp9jebmx18qWtCeu0g7",
      "sub_profile": "ai_agent"
    }
  ],
  "origin": {
    "sub": "0oa9jh6hizeR7uMag0g7",
    "sub_profile": "service"
  }
}
```

| Claim | Actor |
| --- | --- |
| `act.sub` | Agent 2, the immediate actor |
| `delegated_through.sub` | Agent 1 |
| `origin.sub` | The original service client that initiated the flow |


### Access the resource

Agent 2 uses the access token (T5) to request access to the downstream resource. The resource server can cryptographically verify the complete delegation chain without trusting any single agent:

* **Origin**: The original service client that initiated the flow.
* **Delegated through**: Agent 1 that received the initial token and passed it to Agent 2.
* **Immediate actor**: Agent 2 that's currently accessing the resource.
* **Subject**: The original service client identity that all actions are performed on behalf of.

This cryptographic audit trail provides complete visibility into the delegation chain and prevents token spoofing or unauthorized modifications.
