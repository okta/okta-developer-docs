### Interaction Code flow

<div class="full">

![Sequence diagram that displays the back and forth between the resource owner, authorization server, and resource server for Interaction Code flow](/img/authorization/interaction-code-grant-flow-guide.png)

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

The Interaction Code flow is similar to the [OAuth 2.0 Authorization Code flow with PKCE](/docs/concepts/oauth-openid/#authorization-code-flow-with-pkce). All clients are required to pass along a Client ID, as well as a Proof Key for Code Exchange (PKCE) to keep the flow secure. Confidential clients such as web apps must also pass a client secret in their authorization request.

1. The Interaction Code flow can start with minimal user information. For example, the user (resource owner) may only provide the client app with their username. Alternatively, the client can also begin the flow without any user information for a passwordless sign-in experience.

2. The client app generates the PKCE code verifier & code challenge.

    > **Note:** To use the Interaction Code flow, both the client app and the authorization server must have the [Interaction Code grant type enabled](#set-up-your-authorization-server) in the Okta org.

3. The client app begins interaction with an [authorization server](/docs/concepts/auth-servers/) (Org or Custom), providing any context it may have, such as a sign-in hint, as well as sending the PKCE code challenge in a request for authorization of certain scopes to the authorization server.

    > **Note:** A confidential client authenticates with the authorization server while a public client (like the Sign-In Widget) identifies itself to the authorization server. Both must provide the PKCE code challenge.

4. Okta evaluates the sign-on policies for the app and Authentication Server and determines that remediation is required.

5. The Identity Engine component of the authorization server sends the `interaction_handle` parameter in a response body to the client app.

    > **Note:** The `interaction_handle` is used to continue the interaction directly with the Identity Engine. This is why the client, either confidential or public, needs to be registered with the Identity Engine to perform this direct interaction.

6. The client sends the `interaction_handle` to the Identity Engine and in return, the Identity Engine sends any required remediation steps back to the client.

7. The client begins an interactive flow with the Identity Engine and the resource owner, handling any type of interaction required by the Identity Engine (the remedial information is provided by the user to the client).

8. The client responds to all of the remediation steps required by the Identity Engine.

9. When the remediation steps are complete, the Identity Engine sends back a success response &mdash; including the `interaction_code` &mdash; to the client.

    > **Note:** The `interaction_code` has a maximum lifetime of 60 seconds.

10. The client sends the code verifier and the `interaction_code` to the authorization server to exchange for tokens.

    > **Note:** The `interaction_code` indicates that the client (and user) went through all of the necessary policy-driven remediation and received a successful response from the Identity Engine.

11. The authorization server authenticates the client, evaluates the PKCE code, and validates the `interaction_code`.

12. If the client ID, PKCE, and Interaction codes are valid, the authorization server sends the tokens (access, ID, and/or refresh) that were initially requested.

13. The client makes a request with the access token to your app.

14. Your app sends a response to the client.
