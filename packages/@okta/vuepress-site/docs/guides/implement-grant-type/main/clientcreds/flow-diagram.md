### Client Credentials flow

<div class="three-quarter">

   ![Sequence diagram that displays the interaction between the resource owner, authorization server, and resource server for the Client Credentials flow](/img/authorization/oauth-client-creds-grant-flow.png)

   <!--
      Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4133%3A43887&mode=design&t=Me7qqw8odOmrLh6K-1
      oauth-client-creds-grant-flow
   -->

</div>

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

At a high level, this flow has the following steps:

1. Your client app makes an authorization request to your Okta authorization server using its Client Credentials.

    Before implementing this redirect request to the authorization server (Okta), you need to [set up your app](#set-up-your-app) in Okta. See [Request for token](#request-for-token).

1. Okta responds with an access token if the request credentials are accurate.
1. Your app uses the access token to make authorized requests to the resource server.
1. The resource server validates the token before responding to the request. See [Validate access token](#validate-access-token).
