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

  ![Flow diagram illustrating the process of AI agent token exchange](/img/auth/ai-agent-token-exchange/token_exchange_flow_for_OAuth_STSv2.svg)

</div>

<!-- Image source: https://oktainc.atlassian.net/browse/OKTA-1137019 -->

1. The AI agent sends a `POST /token` request to Okta, asking for an access token for a protected resource in the target app. Okta checks to see if it already possesses a valid token for the user and the requested app.
1. If no valid token is found, Okta returns an `HTTP 400 Bad Request` response to the AI agent. This response contains an error code of `interaction_required` and a unique `interaction_uri`.
1. The AI agent receives the `interaction_required` error and redirects the user's browser to the `interaction_uri` that's provided by Okta.
1. The user is directed to the app's website, where they're prompted to authorize the connection and grant consent for the AI agent to access their data.
1. After the user grants consent, the app redirects the user's browser back to an Okta endpoint, including a temporary, single-use `auth_code` in the URL.
1. Okta exchanges the `auth_code` with the app.
1. Okta receives a new access token and a long-lived refresh token. Okta securely saves these tokens, linking them to the user.
1. After Okta successfully stores the tokens, the user asks the agent to retry the connection. This signals that the consent part of the flow is complete.
1. The AI agent's code retries the original `POST /token` request from step 3. Because Okta now has the necessary tokens stored, this retry attempt succeeds. Okta responds with an `HTTP 200 OK` and provides the short-lived access token that the AI agent can use to make its API calls.
1. The AI agent uses the access token to request access to the resource.
