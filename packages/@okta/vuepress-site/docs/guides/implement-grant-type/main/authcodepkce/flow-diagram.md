#### Authorization code with PKCE

![Auth Code flow with PKCE](/img/oauth_auth_code_flow_pkce.png "Flowchart that displays the back and forth between the resource owner, authorization server, and resource server for Auth Code flow with PKCE")

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml

skinparam monochrome true

actor "Resource Owner (User)" as user
participant "Client" as client
participant "Authorization Server (Okta)" as okta
participant "Resource Server (Your App)" as app

client -> client: Generate PKCE code verifier & challenge
client -> okta: Authorization Code Request + code_challenge to /authorize
okta -> user: 302 redirect to authentication prompt
user -> okta: Authentication & consent
okta -> client: Authorization Code Response
client -> okta: Send authorization code + code_verifier to /token
okta -> okta: Evaluates PKCE code
okta -> client: Access token (and optionally Refresh Token)
client -> app: Request with access token
app -> client: Response

-->


The Authorization Code flow with PKCE is the standard code flow with an extra step at the beginning and an extra verification at the end. At a high-level, the flow has the following steps:

- Your application generates a code verifier followed by a code challenge.
- Your application directs the browser to the Okta sign-in page, along with the generated code challenge, and the user authenticates.
- Okta redirects back to your native application with an authorization code.
- Your application sends this code, along with the code verifier, to Okta. Okta returns access and ID tokens, and optionally a refresh token.
- Your application can now use these tokens to call the resource server (for example, an API) on behalf of the user.
