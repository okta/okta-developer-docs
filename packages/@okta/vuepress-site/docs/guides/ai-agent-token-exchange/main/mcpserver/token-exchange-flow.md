The token exchange flow for an AI agent involves the following steps:

<div class="full wireframe-border">

  ![Flow diagram illustrating the process of AI agent token exchange](/img/auth/ai-agent-token-exchange/token_exchange_flow_for_ID-JAG-1192893v2.svg)

</div>

<!-- Image source: https://oktainc.atlassian.net/browse/OKTA-1137019 -->
<!-- New image request: https://oktainc.atlassian.net/browse/OKTA-1303989 -->

2. The AI agent exchanges the ID or access token it received from the previous steps for an ID-JAG token from the org authorization server. The server validates the request based on the **Resource Connections** [configured](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-secure) (`IDENTITY_ASSERTION_MCP_SERVER`) and returns the requested ID-JAG.

    The ID-JAG token request contains the following:
    * A `resource` parameter that's set to the MCP server's resource URL
    * An `audience` parameter that's set to the issuer URL of the authorization server protecting the MCP server

    After a successful token exchange, an ID-JAG is returned to the AI agent with the following claims:
    * `aud` contains the MCP server's resource URL
    * `sub` contains the original subject, which is either a user or machine reference
    * `act` contains the AI agent reference, which is the actor or delegate operating on behalf of the subject.

3. The AI agent exchanges the ID-JAG for an access token from the authorization server protecting the MCP server.
   The authorization server responds with an access token (T1) for the MCP server.

4. The AI agent calls the MCP server and passes the access token (T1).

   The MCP server doesn't forward the access token (T1) to a downstream resource. It always requests a separate token that's issued for the downstream resource. See the [token exchange flow for the MCP server as a client] ( "/docs/guides/ai-mcp-server-token-exchange/main/#token-exchange-flow" ) for the downstream token exchange flow.
