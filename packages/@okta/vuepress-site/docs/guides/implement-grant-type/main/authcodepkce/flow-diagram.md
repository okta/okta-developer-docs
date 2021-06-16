![Auth Code flow with PKCE](/img/oauth_auth_code_flow_pkce.png "Flowchart that displays the back and forth between the resource owner, authorization server, and resource server for Auth Code flow with PKCE")

The Authorization Code flow with PKCE is the standard code flow with an extra step at the beginning and an extra verification at the end. At a high-level, the flow has the following steps:

- Your application generates a code verifier followed by a code challenge.
- Your application directs the browser to the Okta sign-in page, along with the generated code challenge, and the user authenticates.
- Okta redirects back to your native application with an authorization code.
- Your application sends this code, along with the code verifier, to Okta. Okta returns access and ID tokens, and optionally a refresh token.
- Your application can now use these tokens to call the resource server (for example, an API) on behalf of the user.
