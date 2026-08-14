### User access

  ![Flow diagram illustrating the process of the initial authentication flow for user access](/img/auth/ai-agent-token-exchange/user-access-authentication-step-service-account-1192893v2.svg)

1. The AI agent authenticates with an Okta [org](/docs/concepts/auth-servers/#org-authorization-server) or [custom](/docs/concepts/auth-servers/#custom-authorization-server) authorization server and obtains a subject token (T1) that satisfies the access requirement for the AI agent.

Okta accepts only ID token subject tokens minted for the current requesting client, which is the AI agent. So, the inititating client and the AI agent are the same thing, using the same client credentials during authentication.

### Machine access

  ![Flow diagram illustrating the process of the initial authentication flow for machine access](/img/auth/ai-agent-token-exchange/machine-access-authentication-step-service account-1192893v2.svg)

1. The initiating client authenticates with a [custom](/docs/concepts/auth-servers/#custom-authorization-server) authorization server and obtains a subject token (access token) that satisfies a delegation link for the AI agent.

Okta accepts access tokens minted for a different client as subject tokens. This requires a delegation link authorizing that client to delegate to your AI agent, and the token must target your agent's resource URL.

The OIDC client passes the access token (`subject_token`) (T1) to the AI agent so that it can perform actions on the client's behalf.

## Token exchange flow

The token exchange flow for an AI agent involves the following steps:

<div class="full wireframe-border">

  ![Flow diagram illustrating the process of AI agent token exchange](/img/auth/ai-agent-token-exchange/token_exchange_flow_for_service_account-1192893v2.svg)

</div>

<!-- Image source: https://oktainc.atlassian.net/browse/OKTA-1137019 -->

2. The AI agent sends the token to the org authorization server and requests an exchange for the resource token. The server validates the request based on the **Resource Connections** [configuration](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-secure) and returns the requested service account that is vaulted in Okta Privileged Access.
3. The AI agent uses the service account credentials to request access to the resource.
