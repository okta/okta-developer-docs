### Interaction Code

![Sequence diagram that displays the back and forth between the resource owner, authorization server, and resource server for Interaction Code flow](/img/authorization/interaction-code-grant-flow-guide.png "Interaction Code flow")

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true
actor "Resource Owner (User)" as user
participant "Client" as client
participant "Authorization Server (Okta)" as okta
participant "Resource Server (Your App)" as app

autonumber "<b>#."
user -> client: Start auth w/ user identifier
client -> client: Generate PKCE code verifier & challenge
client -> okta: Authorization request w/ code_challenge, client ID, scopes, and user info
okta -> okta: Remediation required
okta -> client: Send interaction_handle in response (for required interaction)
client <-> okta: Remediation steps w/ interation_handle
user <-> client: Remediation
note right: Possible multiple remediation steps required
client -> okta: Complete remediation steps w/ interaction_handle
okta -> client: Send interaction_code in response
client -> okta: Send interaction_code, client ID, code_verifier to /token
okta -> okta: Evaluates PKCE code
okta -> client: Access token (and optionally refresh token)
client -> app: Request with access token
app -> client: Response
@enduml

-->

The Interaction Code flow is similar to the [OAuth 2.0 Authorization Code flow with PKCE](/docs/concepts/oauth-openid/#authorization-code-flow-with-pkce). All clients are required to pass along a Client ID, as well as a Proof Key for Code Exchange (PKCE) to keep the flow secure. Confidential clients such as web apps must also pass a client secret in their authorization request.

1. The Interaction Code flow can start with minimal user information. For example, the user (resource owner) may only provide the client app with their username. Alternatively, the client can also begin the flow without any user information for a passwordless sign-in experience.

2. The client app generates the PKCE code verifier & code challenge.
