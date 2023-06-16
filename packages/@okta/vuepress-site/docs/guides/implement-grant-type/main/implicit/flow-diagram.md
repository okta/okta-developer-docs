### Implicit flow

<div class="full">

![Sequence diagram that displays the back and forth between the resource owner, authorization server, and resource server for the Implicit grant flow](/img/authorization/oauth-implicit-grant-flow.png)

</div>

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
The Implicit flow contains the following interaction steps:

1. The Client sends a request to the authorization server (Okta) for an access token.

    You need to register your app so that Okta can accept the authorization request. See [Set up your app](#set-up-your-app) to register and configure your app with Okta. After registration, your app can initiate this authorization request to Okta for an access token. See [Request for tokens](#request-for-tokens) to implement this request.

2. The authorization server redirects the User browser to an authentication prompt (the Okta Sign-In Page), where the user authenticates.

3. User authenticates with the authorization server (Okta) and provides consent.

    For Okta to authenticate the user credentials, Okta needs user profile data.
    See [Add a user using the Admin Console](https://help.okta.com/okta_help.htm?id=ext-usgp-add-users), [Import Users](/docs/guides/password-import-inline-hook/), and the [Users API](/docs/reference/api/users/). Alternatively, you can [set up self-service registration](/docs/guides/oie-embedded-sdk-use-case-self-reg/) to allow users to register their membership with the app.

4. Okta redirects the browser back to the specified redirect URI, along with access and ID tokens as a hash fragment in the URI.

5. Your application extracts the tokens from the URI. See [Extract tokens from redirect URI](#extract-tokens-from-redirect-URI).

6. The Client can use the access token to call the resource server (for example, an API) on behalf of the User. See [Validate access token](#validate-access-token).
