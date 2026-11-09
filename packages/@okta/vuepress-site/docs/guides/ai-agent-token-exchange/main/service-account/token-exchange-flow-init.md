The initial authentication step is different for the two types of access configurations supported by Okta:

- **User access**: During the initial authentication request to Okta in a [user access configuration](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-add-manually), the AI agent obtains an ID token directly from the authorization server (the IdP).
- **Machine access**: For [machine access](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-add-manually), another client calls the AI agent and provides its access token for delegation.

> **Note**: Okta also accepts the CIMD URL as the `client_id` in an OAuth request, just as it would a static client ID. See [Use the CIMD client ID in a token request](/docs/guides/ai-agent-cimd-registration/main/#use-the-cimd-client-id-in-a-token-request) for more detailed information.

### User access

  ![Flow diagram illustrating the process of the initial authentication flow for user access](/img/auth/ai-agent-token-exchange/user-access-authentication-step-service-account-1192893v2.svg)

1. The AI agent authenticates with an Okta [org](/docs/concepts/auth-servers/#org-authorization-server) or [custom](/docs/concepts/auth-servers/#custom-authorization-server) authorization server and obtains a subject token (T1) that satisfies the access requirement for the AI agent.

   Okta accepts only ID token subject tokens minted for the current requesting client, which is the AI agent. So, the initiating client and the AI agent are the same thing, using the same client credentials during authentication.

### Machine access

  ![Flow diagram illustrating the process of the initial authentication flow for machine access](/img/auth/ai-agent-token-exchange/machine-access-authentication-step-service-account-1192893v2.svg)

1. The initiating client authenticates with a [custom](/docs/concepts/auth-servers/#custom-authorization-server) authorization server and obtains a subject token (access token) that satisfies a delegation link for the AI agent.

   Okta accepts access tokens minted for a different client as subject tokens. This requires a delegation link authorizing that client to delegate to your AI agent, and the token must target your agent's resource URL.

   The OIDC client passes the access token (`subject_token`) (T1) to the AI agent so that it can perform actions on the client's behalf.
