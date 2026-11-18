The token exchange flow for an AI agent involves the following steps:

<div class="full wireframe-border">

  ![Flow diagram illustrating the process of AI agent token exchange](/img/auth/ai-agent-token-exchange/token_exchange_flow_for_service_account-1192893v2.svg)

</div>

<!-- Image source: https://oktainc.atlassian.net/browse/OKTA-1137019 -->

2. The AI agent sends the token to the org authorization server and requests an exchange for the resource token. The server validates the request based on the **Resource Connections** [configuration](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-secure) and returns the requested service account that is vaulted in Okta Privileged Access.
3. The AI agent uses the service account credentials to request access to the resource.
