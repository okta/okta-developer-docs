---
title: Use the Authorization Code flow
---

To get an authorization code, your app redirects the user to your [Authorization Server's](/docs/concepts/auth-servers/) `/authorize` endpoint. If you are using the default Custom Authorization Server, then your request URL would look something like this:

```
https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id=0oabucvy
c38HLL1ef0h7&response_type=code&scope=openid&redirect_uri=https%3A%2F%2Fexample.com&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601'
```

Note the parameters that are being passed:

- `client_id` matches the Client ID of your Okta OAuth application that you created above. You can find it at the bottom of your application's **General** tab.
- `response_type` is `code`, indicating that we are using the authorization code grant type.
- `scope` is `openid`, which means that the `/token` endpoint returns an ID token. See the **Create Scopes** section of the [Create an Authorization Server guide](/docs/guides/customize-authz-server/create-scopes/).
- `redirect_uri` is the callback location where the user agent is directed to along with the `code`. This must match one of the **Login redirect URIs** that you specified when you were creating your Okta application in the <GuideLink link="../setup-app">previous step</GuideLink>.
- `state` is an arbitrary alphanumeric string that the Authorization Server reproduces when redirecting the user agent back to the client. This is used to help prevent cross-site request forgery.

See [the OAuth 2.0 API reference](/docs/reference/api/oidc/#authorize) for more information on these parameters.

If the user doesn't have an existing session, making this request opens the Okta sign-in page. If they have an existing session, or after they authenticate, they arrive at the specified `redirect_uri` along with a `code`:

```
http://localhost:8080/?code=P5I7mdxxdv13_JfXrCSq&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601
```

This code remains valid for 300 seconds, during which it can be exchanged for tokens.

<NextSectionLink/>
