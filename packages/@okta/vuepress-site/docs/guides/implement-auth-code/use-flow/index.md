---
title: Use the Authorization Code Flow
---

To get an authorization code, your app redirects the user to your authorization server's `/authorize` endpoint. If you are using the default Okta authorization server, then your request URL would look something like this:

```
https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id=0oabucvy
c38HLL1ef0h7&response_type=code&scope=openid&redirect_uri=http%3A%2F%2Flocal
host%3A8080&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601'
```

Note the parameters that are being passed:

- `client_id` matches the Client ID of your Okta OAuth application that you created above. You can find it at the bottom of your application's General tab.
- `response_type` is `code`, indicating that we are using the authorization code grant type.
- `scope` is `openid`, which means that the `/token` endpoint will return an ID token. For more information about scopes, see [here](/docs/reference/api/oidc/#scopes).
- `redirect_uri` is the callback location where the user-agent will be directed to along with the `code`. This must match one of the "Login redirect URIs" you specified when you were creating your Okta application in Step 1.
- `state` is an arbitrary alphanumeric string that the authorization server will reproduce when redirecting the user-agent back to the client. This is used to help prevent cross-site request forgery.

For more information on these parameters, see [the OAuth 2.0 API reference](/docs/reference/api/oidc/#authorize).

If the user does not have an existing session, this will open the Okta Sign-in Page. If they have an existing session, or after they authenticate, they will arrive at the specified `redirect_uri` along with a `code`:

```
http://localhost:8080/?code=P5I7mdxxdv13_JfXrCSq&state=state-296bc9a0-a2a2-4a57
-be1a-d0e2fd9bb601
```

This code will remain valid for 60 seconds, during which it can be exchanged for tokens.

<NextSectionLink/>
