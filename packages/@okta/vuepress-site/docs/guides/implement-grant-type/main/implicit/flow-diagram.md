![Implicit flow width:](/img/authorization/oauth-implicit-grant-flow.png "Sequence diagram that displays the back and forth between the resource owner, authorization server, and resource server for Implicit grant flow")

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

1. The User makes an access request to your app (the Client). Your app needs to handle this request and redirect the authentication request to the Auth Server (Okta). See [Redirect to Auth Server Code](#redirect-to-auth-server-for-code) to implement this request. Before implementing this request, you need to [Set up your app](#set-up-your-app) to obtain an Okta Client ID, that will 
2. In Okta, you need to register your app so that Okta can accept the authentication request. See Set up your app to register and configure your app with Okta. After registration, Okta provides you with a Client ID that you can embed in your app to make a trusted request to Okta.
3. Okta authenticates the user credentials. To do this, Okta needs the user profile data. 
See Add app users. Alternatively, you can enable Self-service registration to allow users to register their membership with the app. Okta also needs to know where to redirect the ID token once authentication is successful. See Sign-in redirect URI parameter in Set up your app.
4. Your app needs to implement the callback route to accept the redirect request from (3). See Define a callback route. This callback route path must match the Sign-in redirect URI configured in (3).

1. Your application directs the browser to the Okta Sign-In Page, where the user authenticates.
1. Okta redirects the browser back to the specified redirect URI, along with access and ID tokens as a hash fragment in the URI.
1. Your application extracts the tokens from the URI.
1. Your application can now use these tokens to call the resource server (for example an API) on behalf of the user.
