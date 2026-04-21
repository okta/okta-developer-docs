<div class="full wireframe-border">

  ![Flow diagram illustrating the process of AI agent token exchange](/img/auth/ai-agent-token-exchange/token_exchange_flow_for_ID-JAG.png)

</div>

<!-- Image source: https://oktainc.atlassian.net/browse/OKTA-1137019 -->

> **Note:** This flow assumes that user authentication and authorization are complete and the authorization server issued an access token and ID token associated with the user successfully signing in to the linked OIDC app.

The token exchange flow for an AI agent involves the following steps:

1. The user authenticates with the [Okta org authorization server](/docs/concepts/auth-servers/#org-authorization-server) using a web app. The server returns an ID token to the web app.
1. The web app passes the ID token to the AI agent so that it can perform actions on the user's behalf.
1. The AI agent sends the ID token to the org authorization server and requests an exchange for an ID-JAG token. The server validates the request based on the configuration in the **Managed Connections** tab and returns the requested ID-JAG.
1. Because the requested credential was an ID-JAG, the AI agent sends the ID-JAG to the [custom authorization server](/docs/concepts/auth-servers/#custom-authorization-server) to exchange it for a usable access token.
1. The AI agent uses the access token to request access to the resource.
