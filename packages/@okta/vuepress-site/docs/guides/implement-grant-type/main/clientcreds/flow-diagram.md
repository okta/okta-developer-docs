#### Client Credentials flow

![Client Credentials flow](/img/oauth_client_creds_flow.png "Flowchart that displays the back and forth between the resource owner, authorization server, and resource server for Client Credentials flow")

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true

participant "Client + Resource Owner" as client
participant "Authorization Server (Okta)" as okta
participant "Resource Server (Your App)" as app

client -> okta: Access token request to /token
okta -> client: Access token response
client -> app: Request with access token
app -> client: Response

-->