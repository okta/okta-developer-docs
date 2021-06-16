![Authorization Code flow](/img/oauth_auth_code_flow.png "Sequence diagram that displays the back and forth between the resource owner, authorization server, and resource server for Auth Code flow")

At a high-level, this flow has the following steps:

- Your application directs the browser to the Okta sign-in page, where the user authenticates.
- The browser receives an authorization code from your Okta Authorization Server.
- The authorization code is passed to your application.
- Your application sends this code to Okta, and Okta returns access and ID tokens, and optionally a refresh token.
- Your application can now use these tokens to call the resource server (for example an API) on behalf of the user.

<!--
Your app (the Client) directs the browser to the Okta Sign-In Page (Auth Server), where the user authenticates.
Your app needs to redirect this authentication request to the Auth Server (Okta). See Redirect to Auth Server to implement this request. Before implementing this request, you need to Set up your app in Okta to obtain an Okta Client ID.

In Okta, you need to register your app so that Okta can accept the authentication request. See Set up your app to register and configure your app with Okta. After registration, Okta provides you with a Client ID that you can embed in your app to make a trusted request to Okta.

Okta authenticates the user credentials. To do this, Okta needs the user profile data. See Add app users. Alternatively, you can enable Self-service registration to allow users to register their membership with the app. Okta also needs to know where to redirect the ID token once authentication is successful. See Sign-in redirect URI parameter in Set up your app.

Your app needs to implement the callback route to accept the redirect request from (3). See Define a callback route. This callback route path must match the Sign-in redirect URI configured in (3).
-->