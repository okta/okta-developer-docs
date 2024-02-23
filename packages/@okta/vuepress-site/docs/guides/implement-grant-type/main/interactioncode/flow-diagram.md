### Interaction Code flow

<div class="full">

   ![Sequence diagram that displays the interaction between the resource owner, authorization server, and resource server for Interaction Code flow](/img/authorization/oauth-interaction-code-grant-flow.png)

   <!--
      Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4133%3A43899&mode=design&t=Me7qqw8odOmrLh6K-1
      oauth-interaction-code-grant-flow
   -->
</div>

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
client <-> okta: Remediation steps w/ interaction_handle
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

The Interaction Code flow is similar to the [OAuth 2.0 Authorization Code flow with PKCE](/docs/concepts/oauth-openid/#authorization-code-flow-with-pkce). All clients are required to pass a client ID and a Proof Key for Code Exchange (PKCE) in their authorization request to keep the flow secure. Confidential clients such as web apps must also pass a client secret in the authorization request.

1. The Interaction Code flow can start with minimal user information. For example, the user (resource owner) may only provide the client app with their username. Alternatively, the client can also begin the flow without any user information for a passwordless sign-in experience.
1. The client app generates the PKCE code verifier & code challenge.

   > **Note:** To use the Interaction Code flow, you must enable the Interaction Code grant type for your org, app integration, and authorization server. See [Verify that the interaction code grant type is enabled](#verify-that-the-interaction-code-grant-type-is-enabled).

1. The client app begins interaction with an [authorization server](/docs/concepts/auth-servers/), providing any context it may have, such as a sign-in hint, as well as sending the PKCE code challenge in a request for authorization of certain scopes to the authorization server.

   > **Note:** A confidential client authenticates with the authorization server while a public client (like the Sign-In Widget) identifies itself to the authorization server. Both must provide the PKCE code challenge.

1. Okta evaluates the sign-on policies for the app and authorization server and determines that remediation is required.
1. The Identity Engine component of the authorization server sends the `interaction_handle` parameter in a response body to the client app.

   > **Note:** The `interaction_handle` is used to continue the interaction directly with the Identity Engine. This is why you need to register the client, either confidential or public, with the Identity Engine to perform this direct interaction.

1. The client sends the `interaction_handle` to the Identity Engine and in return, the Identity Engine sends any required remediation steps back to the client.
1. The client begins an interactive flow with the Identity Engine and the resource owner, handling any type of interaction required by the Identity Engine (the remedial information is provided by the user to the client).
1. The client responds to all the remediation steps required by the Identity Engine.
1. When the remediation steps are complete, the Identity Engine sends back a success response&mdash;including the `interaction_code`&mdash;to the client.

   > **Note:** The `interaction_code` has a maximum lifetime of 60 seconds.

1. The client sends the code verifier and the `interaction_code` to the authorization server to exchange for tokens.

   > **Note:** The `interaction_code` indicates that the client (and user) went through all the necessary policy-driven remediation and received a successful response from the Identity Engine.

1. The authorization server authenticates the client, evaluates the PKCE code, and validates the `interaction_code`.
1. If the client ID, PKCE, and interaction codes are valid, the authorization server sends the tokens (access, ID, and/or refresh) that were initially requested.
1. The client makes a request with the access token to your app.
1. Your app sends a response to the client.
