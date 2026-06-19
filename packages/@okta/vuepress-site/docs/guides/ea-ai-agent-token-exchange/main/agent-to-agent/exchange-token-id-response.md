#### Response

The response contains an ID-JAG token (T2) with Agent 1 identified in the `act` claim as the immediate actor and the service client identified in the delegated chain.

``` http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache

{
  "token_type": "Bearer",
  "expires_in": 300,
  "access_token": "eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWV...",
  "issued_token_type": "urn:ietf:params:oauth:token-type:id-jag"
}
```

The ID-JAG contains the following claims:

```JSON
{
   "scope": "chat.read chat.history",
   "iss": "https://{yourOktaDomain}",
   "sub": "{subjectFromSubjectToken}",
   "aud": "https://{yourOktaDomain}/oauth2/{authServerId}",
   "iat": "1780596934 // 12:15:34 PM",
   "exp": "1780597234 // 12:20:34 PM",
   "jti": "IDAAG.tAO20ExqeUlh6VcpyQxTJ42fn3vDp9E3xR5Iq3Y79pY",
   "sub_profile": "service",
   "resource": "https://agent2.example.com",
   "act": {
     "sub": "{agent1ClientId}",
     "sub_profile": "ai_agent",
     "act": {
        "sub": "{initiatingClientId}",
        "sub_profile": "service"
      }
    }
}
```

| Claim | Actor |
| --- | --- |
| `act.sub` | Agent 1, the immediate actor |
| `act.act.sub` | The original client that initiated the flow |
