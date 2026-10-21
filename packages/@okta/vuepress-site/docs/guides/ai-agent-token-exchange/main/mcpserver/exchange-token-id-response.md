#### Response

The response contains the requested ID-JAG token.

``` http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache

{
  "token_type": "N_A",
  "expires_in": 300,
  "access_token": "eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWV...",
  "issued_token_type": "urn:ietf:params:oauth:token-type:id-jag"
}
```

The ID-JAG contains the following claims:

```JSON
{
   "typ": "oauth-id-jag+jwt",
   "iss": "https://{yourOktaDomain}",
   "aud": "{AsIssuerUrl}", // Authorization server for the MCP server
   "sub": "{subjectFromSubjectToken}", // Typically, user email
   "client_id": "{clientIdAtResource}", // The client ID of the MCP server, not the Okta client ID
   "resource": "{mcpServerResourceUrl}",
   "scope": "{mcpServerScopes}",
   "act": { // The actor or delegate, which is the AI agent
     "sub": "wlpr5x8cWECycE4jhao5", // The ID of the AI agent in Okta
     "sub_profile": "ai_agent web_app"
     },
   "iat": "1780596934", // 12:15:34 PM
   "exp": "1780597234", // 12:20:34 PM
   "jti": "IDAAG.tAO20ExqeUlh6VcpyQxTJ42fn3vDp9E3xR5Iq3Y79pY"
}
```

> **Note:** If your authorization server protects multiple MCP servers and you included the `resource` parameter in the request, then the ID-JAG also contains a `resource` claim.

The `act` claim identifies the AI agent as the actor performing the exchange on behalf of the subject. The nesting of this claim depends on the authentication chain.
