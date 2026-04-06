<div class="full wireframe-border">

  ![Flow diagram illustrating the process of AI agent token exchange](/img/auth/ai-agent-token-exchange-brokered-consent.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/

@startuml
skinparam defaultFontName Arial
skinparam defaultFontSize 12

skinparam ArrowColor #005CB9
skinparam ArrowThickness 1.5

skinparam ParticipantBackgroundColor ##ececff
skinparam ParticipantBorderColor ##e0d7f5
skinparam ParticipantBorderThickness 1

' -> Declare the participants in the desired order
participant "User" as User
participant "Web app" as WebApp
participant "AI Agent" as Agent
participant "Okta org authorization server" as OAS
participant "Resource authorization server" as RAS
participant "Resource Server" as App


WebApp -> OAS: 1 User SSO
OAS -/-> WebApp: ID token

WebApp -> Agent: 2 Pass token to AI agent

Agent -> OAS: 3 POST /token request
note over OAS: Checks Token Store, no valid token found

OAS -/-> Agent: 4 HTTP 400 (interaction_required, interaction_uri)

Agent -> User: 5 Redirect user to interaction_uri

User -> RAS: 6 Grant Consent

RAS -> OAS: 7 Redirect user with temporary auth_code

OAS -> RAS: 8 Exchange auth_code for tokens

RAS -/-> OAS: 9 Return access_token & refresh_token
note over OAS: Securely store new tokens in Token Store

User -> Agent: 10 User asks agent to retry connection

Agent -> OAS: 11 POST /token (Retry request)

OAS -/-> Agent: HTTP 200 OK (Returns new access token)

Agent -> App: 12 Resource request with access token
App -/-> Agent: Returns Resource Data

@enduml
-->

> **Note:** This flow assumes that you've registered a resource server as an OIN app instance, a custom API resource server, or an MCP server, and that you've connected an AI agent to the server as a **Managed Connection**.

The token exchange flow for an AI agent involves the following steps:

1. The user authenticates with the [Okta org authorization server](/docs/concepts/auth-servers/#org-authorization-server) using a web app. The server returns an ID token to the web app.
1. The web app passes the ID token to the AI agent so that it can perform actions on the user's behalf.
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
