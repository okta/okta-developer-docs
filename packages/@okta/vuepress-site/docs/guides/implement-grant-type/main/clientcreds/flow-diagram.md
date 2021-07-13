### Client Credentials

![Client Credentials flow](/img/authorization/oauth-client-creds-grant-flow.png "Sequence diagram that displays the back and forth between the resource owner, authorization server, and resource server for Client Credentials flow")

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true
participant "Client + Resource Owner" as client
participant "Authorization Server (Okta)" as okta
participant "Resource Server (Your App)" as app

autonumber "<b>#."
client -> okta: Access token request to /token
okta -> client: Access token response
client -> app: Request with access token
app -> client: Response
@enduml

-->
At a high-level, this flow has the following steps:

- Your application passes its client credentials to your Okta Authorization Server.
- If the credentials are accurate, Okta responds with an access token.
