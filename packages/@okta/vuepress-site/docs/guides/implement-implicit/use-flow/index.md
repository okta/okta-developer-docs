---
title: Use the Implicit Flow
---

Kicking off this flow is very similar to the [authorization code flow](/docs/guides/implement-auth-code/) except that the `response_type` is `token` and/or `id_token` instead of `code`.

Your application redirects the user's browser to your authorization server's `/authorize` endpoint. If you are using the default Okta authorization server, then your request URL would look something like this:

```
https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id=0oabv6kx4qq6
h1U5l0h7&response_type=token&scope=openid&redirect_uri=http%3A%2F%2Flocalhost%3
A8080&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601&nonce=foo'
```

Note the parameters that are being passed:

- `client_id` matches the Client ID of your Okta OAuth application that you created above. You can find it at the bottom of your application's General tab.
- `response_type` is `token`. It could also be `id_token` or both.
- `scope` is `openid` which is required, though additional scopes can be requested. For more information about scopes, see [here](/docs/reference/api/oidc/#scopes).
- `redirect_uri` is the callback location where the user-agent will be directed to along with the `access_token`. This must match one of the "Login redirect URIs" you specified when you were creating your Okta application in Step 1.
- `state` is an arbitrary alphanumeric string that the authorization server will reproduce when redirecting the user-agent back to the client. This is used to help prevent cross-site request forgery.

For more information on these parameters, see [the OAuth 2.0 API reference](/docs/reference/api/oidc/#authorize).

If the user does not have an existing session, this will open the Okta Sign-in Page. If they have an existing session, or after they authenticate, they will be redirected back to the specified `redirect_uri` along with a `token` as a hash fragment:

```
http://localhost:8080/#access_token=eyJhb[...]erw&token_type=Bearer&expires_in=
3600&scope=openid&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601
```

Your application must now extract the token(s) from the URI and store them.

<NextSectionLink>Next Steps</NextSectionLink>
