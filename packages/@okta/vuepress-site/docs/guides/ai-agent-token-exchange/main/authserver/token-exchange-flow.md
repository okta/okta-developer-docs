<div class="full wireframe-border">

  ![Flow diagram illustrating the process of AI agent token exchange](/img/auth/ai-agent-token-exchange-id-jag.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/
@startuml
skinparam defaultFontName Arial
skinparam defaultFontSize 12

skinparam ArrowColor #005CB9
skinparam ArrowThickness 1.5

skinparam ParticipantBackgroundColor ##ececff
skinparam ParticipantBorderColor ##e0d7f5
skinparam ParticipantBorderThickness 1

skinparam padding 5
skinparam BoxPadding 10

participant "Web app" as WebApp
participant "AI agent" as AIAgent
participant "Okta org authorization server" as OAS
participant "Okta custom authorization server" as CAS
participant "Resource server" as RS

WebApp -> OAS: 1 User SSO
OAS ..> WebApp: ID token
WebApp -> AIAgent: 2 Pass token to AI agent
AIAgent -> OAS: 3 Token exchange (requesting ID-JAG)
OAS ..> AIAgent: Returns ID-JAG
AIAgent -> CAS: 4 Exchange ID-JAG
CAS ..> AIAgent: Access token
AIAgent -> RS: 5  Resource request with access token
RS ..> AIAgent: Returns Resource Data
@enduml

-->

> **Note:** This flow assumes that user authentication and authorization are complete and the authorization server issued an access token and ID token associated with a successful login to the linked OIDC app.

The token exchange flow for an AI agent involves the following steps:

1. The user authenticates with the [Okta org authorization server](/docs/concepts/auth-servers/#org-authorization-server) using a web app. The server returns an ID token to the web app.
1. The web app passes the ID token to the AI agent so that it can perform actions on the user's behalf.
1. The AI agent sends the ID token to the org authorization server and requests an exchange for an ID-JAG token. The server validates the request based on the configuration in the **Managed Connections** tab and returns the requested ID-JAG.
1. Since the requested credential was an ID-JAG, the AI agent sends the ID-JAG to the [custom authorization server](/docs/concepts/auth-servers/#custom-authorization-server) to exchange it for a usable access token.
1. The AI agent uses the access token to request access to the resource.
