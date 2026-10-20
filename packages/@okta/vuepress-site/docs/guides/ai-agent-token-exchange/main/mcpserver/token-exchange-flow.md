### User access

  ![Flow diagram illustrating the process of the initial authentication flow for user access](/img/auth/ai-agent-token-exchange/user-access-authentication-step-ID-JAG-1192893v2.svg)

1. The AI agent authenticates with an Okta [org](/docs/concepts/auth-servers/#org-authorization-server) or [custom](/docs/concepts/auth-servers/#custom-authorization-server) authorization server and obtains a subject token (T1) that satisfies the access requirement for the AI agent.

   Okta accepts only ID token subject tokens minted for the current requesting client, which is the AI agent. The initiating client and the AI agent are the same thing, using the same client credentials during authentication.

### Machine access

> **Note**: If your custom authorization server protects multiple resources, such as multiple MCP servers, then only the [user access](#user-access) authentication flow is supported. See [Add an MCP Server manually](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-mcp-server) for details on MCP servers as resource servers.

  ![Flow diagram illustrating the process of the initial authentication flow for machine access](/img/auth/ai-agent-token-exchange/machine-access-authentication-step-ID-JAG-1192893v2.svg)

1. The initiating client authenticates with a [custom](/docs/concepts/auth-servers/#custom-authorization-server) authorization server and obtains a subject token (access token) that satisfies a delegation link for the AI agent.

   Okta accepts access tokens minted for a different client as subject tokens. This requires a delegation link authorizing that client to delegate to your AI agent, and the token must target your agent's resource URL.

   The OIDC client then passes the access token (`subject_token`) (T1) to the AI agent so that it can perform actions on the client's behalf.

## The exchange flow

The token exchange flow for an AI agent involves the following steps:

<div class="full wireframe-border">

  ![Flow diagram illustrating the process of AI agent token exchange](/img/auth/ai-agent-token-exchange/MCPServertokenexchange.png)

</div>

<!-- Image source: https://oktainc.atlassian.net/browse/OKTA-1137019 -->

2. An AI agent or client requests an access token for the MCP server from the MCP server's custom authorization server. The `resource` parameter is the MCP server's resource URL. A delegation link must authorize the caller to delegate to the MCP server.

   > **Note**: With user access, the agent first exchanges the user's ID token for an ID-JAG at the org authorization server. It then sends the ID-JAG to the custom authorization server. With machine access, the agent sends a client credentials request instead. See [Initial authentication](#initial-authentication).

3. The custom authorization server responds with an access token (T1) with the MCP server's resource URL as the `aud` value. T1 keeps the original subject, which is either a user or a machine. With user access, T1 also has an `act` claim that identifies the AI agent.

4. The AI agent calls the MCP server and passes the access token (T1).

   > **Note**: The MCP server doesn't forward T1 to the downstream resource. It always requests a separate token that's issued for the downstream resource.

See the [token exchange flow for the MCP server as a client] ( "/docs/guides/ai-mcp-server-token-exchange/main/#token-exchange-flow" ) for the downstream token exchange flow.
