The following sections outline the main requests required to implement the Authorization Code flow using direct calls to Okta's [OIDC & OAuth 2.0 API](/docs/reference/api/oidc/). Typically, you don't need to make direct calls to the [OIDC & OAuth 2.0 API](/docs/reference/api/oidc/) if you're using one of Okta's SDKs.

### Request an authorization code

To get an authorization code, your app redirects the user to your [authorization server's](/docs/concepts/auth-servers/) `/authorize` endpoint. If you are using the default custom authorization server, then your request URL would look something like this:

```bash
https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id=0oabucvy
c38HLL1ef0h7&response_type=code&scope=openid&redirect_uri=https%3A%2F%2Fexample.com&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601
```

Note the parameters that are being passed:

- `client_id` matches the Client ID of your Okta OAuth application that you created above. You can find it at the bottom of your application's **General** tab.
- `response_type` is `code`, indicating that we are using the Authorization Code grant type.
- `scope` is `openid`, which means that the `/token` endpoint returns an ID token. See the **Create Scopes** section of the [Create an authorization server guide](/docs/guides/customize-authz-server/main/#create-scopes).
- `redirect_uri` is the callback location where the user agent is directed to along with the `code`. This URI must match one of the **Sign-in redirect URIs** that you specified when you created your Okta application in the [Set up your app](#set-up-your-app) section.
- `state` is an arbitrary alphanumeric string that the authorization server reproduces when redirecting the user agent back to the client. This is used to help prevent cross-site request forgery.

See [the OAuth 2.0 API reference](/docs/reference/api/oidc/#authorize) for more information on these parameters.

If the user doesn't have an existing session, making this request opens the Okta sign-in page. If they have an existing session, or after they authenticate, they arrive at the specified `redirect_uri` along with a `code`:

```bash
http://localhost:8080/?code=P5I7mdxxdv13_JfXrCSq&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601
```

This code remains valid for 300 seconds, during which it can be exchanged for tokens.

### Exchange the code for tokens

To exchange this code for access and ID tokens, you pass it to your [authorization server's](/docs/concepts/auth-servers/) `/token` endpoint. If you are using the default custom authorization server, then your request would look something like this:

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'authorization: Basic MG9hY...' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A8080&code=P59yPm1_X1gxtdEOEZjn'
```

> **Important:** The call to the `/token` endpoint requires authentication. In this case, it's Basic Authentication with the client ID and secret [Base64 encoded](/docs/guides/implement-grant-type/clientcreds/main/#base64-encode-the-client-id-and-client-secret). You can find the Client ID and secret on your application's **General** tab. This requirement is why this call is only appropriate for applications that can guarantee the confidentiality of the client secret. See [Client Authentication Methods](/docs/reference/api/oidc/#client-authentication-methods).

Note the parameters that are being passed:

- `grant_type` is `authorization_code`, indicating that we are using the Authorization Code grant type.
- `redirect_uri` must match the URI that was used to get the authorization code.
- `code` is the authorization code that you got from the `/authorize` endpoint.

See the [OAuth 2.0 API reference](/docs/reference/api/oidc/#token) for more information on these parameters.

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
