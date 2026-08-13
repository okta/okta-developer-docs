During the initial authentication request in a user access flow, the AI agent must obtain an ID token directly. For machine access, another client calls the AI agent and provides its access token for delegation. So, the initial step is different for these two types of access:

### User access

  ![Flow diagram illustrating the process of the initial authentication flow for user access](/img/auth/ai-agent-token-exchange/??.svg)

1. The AI agent authenticates with an Okta [org](/docs/concepts/auth-servers/#org-authorization-server) or [custom](/docs/concepts/auth-servers/#custom-authorization-server) authorization server and obtains a subject token (T1) that satisfies the access requirement for the AI agent.

Okta accepts only ID token subject tokens minted for the current requesting client, which is the AI agent. So, the inititating client and the AI agent are the same thing, using the same client credentials during authentication.

### Machine access

  ![Flow diagram illustrating the process of the initial authentication flow for machine access](/img/auth/ai-agent-token-exchange/??.svg)

1. The initiating client authenticates with a [custom](/docs/concepts/auth-servers/#custom-authorization-server) authorization server and obtains a subject token (access token) that satisfies a delegation link for the AI agent.

Okta accepts access tokens minted for a different client as subject tokens. This requires a delegation link authorizing that client to delegate to your AI agent, and the token must target your agent's resource URL.

The OIDC client passes the access token (`subject_token`) (T1) to the AI agent so that it can perform actions on the client's behalf.

## Token exchange flow

The token exchange flow for an AI agent involves the following steps:

<div class="full wireframe-border">

  ![Flow diagram illustrating the process of AI agent to AI agent token exchange](/img/auth/ai-agent-token-exchange/AI-Agent-to-AI-Agent-token-exchange.svg)

</div>

<!-- Image source: https://oktainc.atlassian.net/browse/OKTA-1192893 -->

1. AI agent 1 sends the `subject_token` (T1) to the org authorization server and requests an exchange for an ID-JAG token. The server performs validation based on the [Resource Connections](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-secure) configuration and returns the requested ID-JAG (T2).
1. Because the requested credential was an ID-JAG, AI agent 1 sends the ID-JAG (T2) to the custom authorization server to exchange it for a usable access token. The server performs validation and returns an access token (T3).
1. AI agent 1 sends that access token (T3) to AI agent 2 so that it can also perform actions on the client or user's behalf through AI agent 1.
1. AI agent 2 sends the `subject_token` (T3) to the org authorization server and requests an exchange for an ID-JAG token. The server performs validation [Resource Connections](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-secure) and returns the requested ID-JAG (T4).
1. Because the requested credential was an ID-JAG, AI agent 2 sends the ID-JAG to the custom authorization server to exchange it for a usable access token. The server performs validation and returns an access token (T5).
1. The AI agent uses the access token to request access to the resource.
