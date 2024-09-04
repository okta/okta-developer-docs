The following sections outline the main requests required to implement the Authorization Code flow using direct calls to the [OIDC & OAuth 2.0 API](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/). Typically, you don't need to make direct calls if you're using one of the Okta SDKs.

### Request an authorization code

To get an authorization code, your app redirects the user to your [authorization server's](/docs/concepts/auth-servers/) `/authorize` endpoint. If you're using the org authorization server, then your request URL would look something like this:

```bash
https://{yourOktaDomain}/oauth2/v1/authorize?
   client_id=0oabucvyc38HLL1ef0h7&
   response_type=code&scope=openid&
   redirect_uri=https%3A%2F%2Fexample.com&
   state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601
```

Note the parameters that are being passed:

* `client_id` is the client ID of the app integration that you created earlier. Find it in the Admin Console on your app integration's **General** tab.
* `response_type` is `code`, indicating that you're using the Authorization Code grant type.
* `scope` is `openid`, which means that the `/token` endpoint returns an ID token. For custom scopes, see the **Create Scopes** section of the [Create an authorization server guide](/docs/guides/customize-authz-server/main/#create-scopes).
* `redirect_uri` is the callback location where the user agent is directed to along with the `code`. This URI must match one of the **Sign-in redirect URIs** that you specified when you created your app integration earlier.
* `state` is an arbitrary alphanumeric string that the authorization server reproduces when redirecting the user agent back to the client. This is used to help prevent cross-site request forgery.

See [the OAuth 2.0 API reference](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/authorizeCustomAS) for more information on these parameters.

If the user doesn't have an existing session, this request opens the Okta sign-in page. If they have an existing session, or after they authenticate, they arrive at the specified `redirect_uri` along with a `code`. For example:

```bash
http://www.example.com#code=P5I7mdxxdv13_JfXrCSq&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601
```

This code remains valid for 300 seconds, during which it can be exchanged for tokens.

### Exchange the code for tokens

To exchange this code for access and ID tokens, you pass it to your [authorization server's](/docs/concepts/auth-servers/) `/token` endpoint. If you’re using the org authorization server, then your request would look something like this:

```bash
curl --request POST \
  --url https://{yourOktaDomain}/oauth2/v1/token \
  --header 'accept: application/json' \
  --header 'authorization: Basic MG9hY...' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A8080&code=P59yPm1_X1gxtdEOEZjn'
```

> **Important:** The call to the `/token` endpoint requires authentication. In this case, it's Basic Authentication with the client ID and secret [Base64-encoded](/docs/guides/implement-grant-type/clientcreds/main/#base64-encode-the-client-id-and-client-secret). You can find the client ID and secret on your app integration's **General** tab. This requirement is why this call is only appropriate for applications that can guarantee the confidentiality of the client secret. See [Client Authentication Methods](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#client-authentication-methods).

Note the parameters that are being passed:

* `grant_type` is `authorization_code`, indicating that you’re using the Authorization Code grant type.
* `redirect_uri` is the URI that was used to get the authorization code.
* `code` is the authorization code that you got from the `/authorize` endpoint.

See the [OAuth 2.0 API reference](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/tokenCustomAS) for more information on these parameters.

If the code is still valid, your application receives back access and ID tokens:

```json
{
    "access_token": "eyJhbG[...]9pDQ",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "openid",
    "id_token": "eyJhbG[...]RTM0A"
}
```

### Validate access token

When your application passes a request with an `access_token`, the resource server needs to validate it. See [Validate access tokens](/docs/guides/validate-access-tokens/).
