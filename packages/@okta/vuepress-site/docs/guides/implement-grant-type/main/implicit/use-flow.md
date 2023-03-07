Without using existing libraries, you can make a direct request to Okta's [OIDC & OAuth 2.0 API](/docs/reference/api/oidc/) through the `/authorize` endpoint.

### Request for tokens

This flow is very similar to the [Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/#authorization-code-flow), except that the `response_type` is `token` and/or `id_token` instead of `code`.

Your application redirects the user's browser to your authorization server's](/docs/concepts/auth-servers/) `/authorize` endpoint. If you are using the default custom authorization server, then your request URL would look something like this:

```bash
https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id=0oabv6kx4qq6h1U5l0h7&response_type=token&scope=openid&redirect_uri=&redirect_uri=https%3A%2F%2Fexample.com&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601&nonce=foo'
```

Note the parameters that are being passed:

- `client_id` matches the Client ID of your Okta OAuth application that you created in the [Set up your app](#set-up-your-app) section. You can find it at the bottom of your application's **General** tab.
- `response_type` is `token`. It could also be `id_token` or both.
- `scope` is `openid`, which is required, but additional scopes can be requested. See the **Create Scopes** section of the [Create an authorization server guide](/docs/guides/customize-authz-server/main/#create-scopes).
- `redirect_uri` is the callback location where the user agent is directed to along with the `access_token`. This must match one of the **Sign-in redirect URIs** that you specified when you created your Okta app integration in the [Set up your app](#set-up-your-app) section.
- `state` is an arbitrary alphanumeric string that the authorization server reproduces when redirecting the user agent back to the client. This is used to help prevent cross-site request forgery.

See the [OAuth 2.0 API reference](/docs/reference/api/oidc/#authorize) for more information on these parameters.

### Extract tokens from redirect URI

If the user doesn't have an existing session, the request opens the Okta sign-in page. If they have an existing session, or after they authenticate, the user is redirected back to the specified `redirect_uri` along with a `token` as a hash fragment:

```bash
https://${yourOktaDomain}/#access_token=eyJhb[...]erw&token_type=Bearer&expires_in=3600&scope=openid&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601
```

Your application must now extract the token(s) from the URI and store them.

### Validate access token

When your application passes a request with an access token, the resource server needs to validate it. See [Validate access tokens](/docs/guides/validate-access-tokens/).
