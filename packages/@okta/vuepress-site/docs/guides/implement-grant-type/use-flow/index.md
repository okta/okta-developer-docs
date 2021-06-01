---
title: Use the Implicit flow
---

Using this flow is very similar to the [authorization code flow](/docs/guides/implement-auth-code/) except that the `response_type` is `token` and/or `id_token` instead of `code`.

Your application redirects the user's browser to your [Authorization Server's](/docs/concepts/auth-servers/) `/authorize` endpoint. If you are using the default Custom Authorization Server, then your request URL would look something like this:

```
https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id=0oabv6kx4qq6h1U5l0h7&response_type=token&scope=openid&redirect_uri=&redirect_uri=https%3A%2F%2Fexample.com&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601&nonce=foo'
```

Note the parameters that are being passed:

- `client_id` matches the Client ID of your Okta OAuth application that you created in the <GuideLink link="../setup-app">previous step</GuideLink>. You can find it at the bottom of your application's **General** tab.
- `response_type` is `token`. It could also be `id_token` or both.
- `scope` is `openid`, which is required, but additional scopes can be requested. See the **Create Scopes** section of the [Create an Authorization Server guide](/docs/guides/customize-authz-server/create-scopes/).
- `redirect_uri` is the callback location where the user agent is directed to along with the `access_token`. This must match one of the **Sign-in redirect URIs** that you specified when you were creating your Okta application in the <GuideLink link="../setup-app">previous step</GuideLink>.
- `state` is an arbitrary alphanumeric string that the Authorization Server reproduces when redirecting the user agent back to the client. This is used to help prevent cross-site request forgery.

See the [OAuth 2.0 API reference](/docs/reference/api/oidc/#authorize) for more information on these parameters.

If the user doesn't have an existing session, the request opens the Okta Sign-in Page. If they have an existing session, or after they authenticate, the user is redirected back to the specified `redirect_uri` along with a `token` as a hash fragment:

```
http://${yourOktaDomain}/#access_token=eyJhb[...]erw&token_type=Bearer&expires_in=3600&scope=openid&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601
```

Your application must now extract the token(s) from the URI and store them.

<NextSectionLink>Next Steps</NextSectionLink>
