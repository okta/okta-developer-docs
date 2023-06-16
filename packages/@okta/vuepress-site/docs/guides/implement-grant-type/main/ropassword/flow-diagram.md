### Resource Owner Password flow

<div class="three-quarter">

![Sequence diagram that shows the back and forth between the resource owner, authorization server, and resource server for Resource Owner Password flow](/img/authorization/oauth-password-grant-flow.png)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true
actor "Resource Owner (User)" as user
participant "Client" as client
participant "Authorization Server (Okta)" as okta
participant "Resource Server (Your App)" as app

autonumber "<b>#."
user -> client: Authenticates
client -> okta: Access token request to /token
okta -> client: Access token (+optional refresh token) response
client -> app: Request with access token
app -> client: Response
@enduml

-->
At a high-level, this flow has the following steps:

1. User authenticates with your client application (app), providing their user credentials.

2. Your app sends these credentials to the Okta authorization server with its client ID and secret in the request header.

    You need to register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can make an authorization request to Okta. See [Request for tokens](#request-for-tokens).

3. If the credentials are accurate, Okta responds with the requested tokens.

4. Your app uses the access token to make authorized requests to the resource server.

5. The resource server validates the token before responding to the request. See [Validate access token](#validate-access-token).
