#### Response

The response contains the requested resource token.

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
   "scope": "chat.read chat.history",
   "iss": "https://{yourOktaDomain}",
   "sub": "{subjectFromSubjectToken}",
   "aud": "https://{yourOktaDomain}/oauth2/default",
   "iat": "1780596934 // 12:15:34 PM",
   "exp": "1780597234 // 12:20:34 PM",
   "jti": "IDAAG.tAO20ExqeUlh6VcpyQxTJ42fn3vDp9E3xR5Iq3Y79pY",
   "sub_profile": "service"
}
```

If you included the `resource` parameter in the request because your custom authorization server protects multiple resources, the ID-JAG also contains a `resource` claim:

```JSON
{
   "scope": "chat.read chat.history",
   "iss": "https://{yourOktaDomain}",
   "sub": "{subjectFromSubjectToken}",
   "aud": "https://{yourOktaDomain}/oauth2/default",
   "iat": "1780596934 // 12:15:34 PM",
   "exp": "1780597234 // 12:20:34 PM",
   "jti": "IDAAG.tAO20ExqeUlh6VcpyQxTJ42fn3vDp9E3xR5Iq3Y79pY",
   "sub_profile": "service",
   "resource": "https://mcpserver1.example.com"
}
```

> **Note**: See [Add an MCP Server manually](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-mcp-server) for details on MCP servers as resource servers.
