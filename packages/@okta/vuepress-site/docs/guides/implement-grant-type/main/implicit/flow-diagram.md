#### Implicit flow

![Implicit flow](/img/authorization/oauth-implicit-grant-flow.png "Sequence diagram that displays the back and forth between the resource owner, authorization server, and resource server for Implicit grant flow")

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

skinparam monochrome true
actor "Resource Owner (User)" as user
participant "Client" as client
participant "Authorization Server (Okta)" as okta
participant "Resource Server (Your App)" as app

autonumber "<b>#."
client -> okta: Access token request to /authorize
okta -> user: 302 redirect to authentication prompt
user -> okta: Authentication & consent
okta -> client: Access token response
client -> app: Request with access token
app -> client: Response

-->
The Implicit flow contains the following interactions:

1. The Client sends a request to the Auth Server (Okta) for an access token.<br>
You need to register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can initiate this authorization request to Okta for an access token. See [Redirect to Auth Server](#redirect-to-auth-server) to implement this request.

2. The Auth Server redirects the User browser to an authentication prompt (the Okta Sign-In Page), where the user authenticates.

3. User authenticates with the Auth Server (Okta) and provides consent. <br>
In order for Okta to authenticate the user credentials, Okta needs user profile data.
See [Add a user using Console](/docs/guides/quickstart/cli/add-user/). Alternatively, you can [Set up Self-service registration](/docs/guides/set-up-self-service-registration/) to allow users to register their membership with the app.

4. Okta redirects the browser back to the specified redirect URI, along with access and ID tokens as a hash fragment in the URI.

5. Your application extracts the tokens from the URI and can now use these tokens to call the resource server (for example an API) on behalf of the User. See [Access token response](#access-token-response).
