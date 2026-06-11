<div class="full wireframe-border">

  ![Flow diagram illustrating the process of AI agent token exchange](/img/auth/ai-agent-token-exchange/token_exchange_flow_for_OAuth_STSv2.png)

</div>

<!-- Image source: https://oktainc.atlassian.net/browse/OKTA-1137019 -->

The token exchange flow for an AI agent involves the following steps:

1. The initiating client authenticates with an Okta [org](/docs/concepts/auth-servers/#org-authorization-server) or [custom](/docs/concepts/auth-servers/#custom-authorization-server) authorization server and obtains a subject token that satisfies a delegation link for the AI agent.
1. The client passes the token to the AI agent so that it can perform actions on the user's behalf.
1. The AI agent sends a `POST /token` request to Okta, asking for an access token for a protected resource in the target app. Okta checks to see if it already possesses a valid token for the user and the requested app.
1. If no valid token is found, Okta returns an `HTTP 400 Bad Request` response to the AI agent. This response contains an error code of `interaction_required` and a unique `interaction_uri`.
1. The AI agent receives the `interaction_required` error and redirects the user's browser to the `interaction_uri` provided by Okta.
1. The user is directed to the app's website, where they're prompted to authorize the connection and grant consent for the AI agent to access their data.
1. After the user grants consent, the app redirects the user's browser back to an Okta endpoint, including a temporary, single-use `auth_code` in the URL.
1. Okta exchanges the `auth_code` with the app.
1. Okta receives a new access token and a long-lived refresh token. Okta securely saves these tokens, linking them to the user.
1. After Okta successfully stores the tokens, the user asks the agent to retry the connection. This signals that the consent part of the flow is complete.
1. The AI agent's code must now retry the original `POST /token` request from step 3. Because Okta now has the necessary tokens stored, this retry attempt succeeds. Okta responds with an `HTTP 200 OK` and provides the short-lived access token that the AI agent can use to make its API calls.
1. The AI agent uses the access token to request access to the resource.
