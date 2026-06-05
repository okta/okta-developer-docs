<div class="full wireframe-border">

  ![Flow diagram illustrating the process of AI agent to AI agent token exchange](/img/auth/ai-agent-token-exchange/name_of_file_here.png)

</div>

<!-- Image source: https://oktainc.atlassian.net/browse/OKTA-1192893 -->

> **Note:** This flow assumes that user authentication and authorization are complete and the authorization server issued an access token and ID token associated with the user successfully signing in to the linked OIDC app.

The token exchange flow for an AI agent involves the following steps:

1. The initiating client authenticates with an Okta [org](/docs/concepts/auth-servers/#org-authorization-server) or [custom](/docs/concepts/auth-servers/#custom-authorization-server) authorization server. The server returns an ID or access token (T1) to the OIDC client.
1. The OIDC client passes the ID or access token (`subject_token`) (T1) to the AI agent so that it can perform actions on the client or user's behalf.
1. AI agent 1 sends the `subject_token` (T1) to the org authorization server and requests an exchange for an ID-JAG token. The server performs validation based on the [Resource Connections](oie/en-us/content/topics/ai-agents/ai-agent-connected-resource.htmNNEEDALIAS??) configuration and returns the requested ID-JAG (T2).
1. Because the requested credential was an ID-JAG, AI agent 1 sends the ID-JAG (T2) to the custom authorization server to exchange it for a usable access token. The server performs validation and returns an access token (T3).
1. AI agent 1 sends that access token (T3) to AI agent 2 so that it can also perform actions on the client or user's behalf through AI agent 1.
1. AI agent 2 sends the `subject_token` (T3) to the org authorization server and requests an exchange for an ID-JAG token. The server performs validation [Resource Connections](oie/en-us/content/topics/ai-agents/ai-agent-connected-resource.htmNNEEDALIAS??) and returns the requested ID-JAG (T4).
1. Because the requested credential was an ID-JAG, AI agent 2 sends the ID-JAG to the custom authorization server to exchange it for a usable access token. The server performs validation and returns an access token (T5).
1. The AI agent uses the access token to request access to the resource.
