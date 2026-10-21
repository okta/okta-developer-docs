During the initial authentication request to Okta in a [user access configuration](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-add-manually), the AI agent obtains an ID token directly.

  ![Flow diagram illustrating the process of the initial authentication flow for user access](/img/auth/ai-agent-token-exchange/user-access-authentication-step-OAuth-STS-1192893v2.svg)

1. The AI agent authenticates with an Okta [org](/docs/concepts/auth-servers/#org-authorization-server) or [custom](/docs/concepts/auth-servers/#custom-authorization-server) authorization server and obtains a subject token (T1) that satisfies the access requirement for the AI agent.

    Okta accepts only ID token subject tokens minted for the current requesting client, which is the AI agent. The initiating client and the AI agent are the same entity, using the same client credentials during authentication.
