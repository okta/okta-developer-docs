In this step, Agent 2 receives the access token (T3) from Agent 1. Agent 2 validates the request by performing another token exchange, exchanging T3 at the org authorization server for an ID-JAG token (T4). Agent 2 also adds itself to the actor chain. The ID-JAG now reflects Agent 2 as the immediate actor, with Agent 1 in the delegated chain, and the original service client as the origin.


```bash
  curl --request POST https://{yourOktaDomain}/oauth2/v1/token \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:token-exchange" \
    --data-urlencode "subject_token=eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWVlsMHR0blJobUY4Q0xTaU..." \
    --data-urlencode "subject_token_type=urn:ietf:params:oauth:token-type:access_token" \
    --data-urlencode "requested_token_type=urn:ietf:params:oauth:token-type:id-jag" \
    --data-urlencode "audience=https://{yourOktaDomain}/oauth2/{authServerId}" \
    --data-urlencode "resource=https://agent2.{yourOktaDomain}" \
    --data-urlencode "scope=chat.read+chat.history" \
    --data-urlencode "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
    --data-urlencode "client_assertion=eyJhbGciOiJSUzI1NiIsInR5...[jwt]"
```

#### Response

The response contains an ID-JAG token (T4) with the expanded delegation chain showing Agent 2 as the immediate actor.

```JSON
{
  "token_type": "Bearer",
  "expires_in": 300,
  "access_token": "eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWVlsMHR0blJobUY4Q0xTaUdBenlwemJVIiwiYWxnIjoi…",
  "issued_token_type": "urn:ietf:params:oauth:token-type:id-jag"
}
```

The ID-JAG contains the following claims:

```JSON
{
  "iss": "https://{yourOktaDomain}",
  "sub": "0oa9jh6hizeR7uMag0g7",
  "aud": "https://{yourOktaDomain}/oauth2/{authServerId}",
  "iat": 1780597035,
  "exp": 1780597335,
  "jti": "IDAAG.FhYRSbhaXljvZIn71hCBN6FKreFgeYgDgm62TkidWqo",
  "scope": "achat.read+chat.history",
  "sub_profile": "service",
  "act": {
    "sub": "wlp9jecfovIcujmca0g7", (Agent 2 immediate actor)
    "sub_profile": "ai_agent"
  },
  "delegated_through": [
    {
      "sub": "wlp9jebmx18qWtCeu0g7", (Agent 1)
      "sub_profile": "ai_agent"
    }
  ],
  "origin": {
    "sub": "0oa9jh6hizeR7uMag0g7", (service client)
    "sub_profile": "service"
  }
}
```
