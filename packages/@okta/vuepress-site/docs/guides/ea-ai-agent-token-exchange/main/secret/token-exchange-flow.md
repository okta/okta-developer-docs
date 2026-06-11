<div class="full wireframe-border">

  ![Flow diagram illustrating the process of AI agent token exchange](/img/auth/ai-agent-token-exchange/token_exchange_flow_for_secretv2.png)

</div>

<!-- Image source: https://oktainc.atlassian.net/browse/OKTA-1137019 -->

The token exchange flow for an AI agent involves the following steps:

1. The initiating client authenticates with an Okta [org](/docs/concepts/auth-servers/#org-authorization-server) or [custom](/docs/concepts/auth-servers/#custom-authorization-server) authorization server and obtains a subject token that satisfies a delegation link for the AI agent.
1. The client passes the token to the AI agent so that it can perform actions on the user's behalf.
1. The AI agent sends the token to the org authorization server and requests an exchange for the resource token. The server validates the request based on the **Resource Connections** [configuration](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-secure) and returns the requested secret that's vaulted in Okta Privileged Access.
1. The AI agent uses the secret or service account credentials to request access to the resource.
