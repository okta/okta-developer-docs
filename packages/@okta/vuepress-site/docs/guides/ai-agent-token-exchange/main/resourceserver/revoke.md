
After obtaining an OAuth STS access token through the token exchange flow, the AI agent can revoke that token using the org authorization server's `/oauth2/v1/revoke` endpoint and the same client credentials used for token exchange.

``` http
POST /oauth2/v1/revoke HTTP/1.1
Host: example.okta.com
Content-Type: application/x-www-form-urlencoded

token=eyJhbGciOiJIUzI1NiIsI...
&token_type_hint=oauth_sts
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion=eyJhbGci...
```

| Parameter | Description and value |
| --- | --- |
| token | The `access_token` value from the successful token exchange response. |
| token_type_hint | The value must be `oauth_sts`. |
| client_assertion_type | The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| client_assertion |  A signed JWT used for client authentication. You must sign the JWT using the key created during AI Agent registration. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). |

The endpoint returns `200 OK` regardless of whether the token was valid or already expired, to prevent information leaks.

> **Important:** Revoking an OAuth STS token at the Okta `/revoke` endpoint only removes the access token from Okta's token store. Keep the following behavior in mind:
>
> - If Okta still holds a valid refresh token for the connection, the next token exchange request obtains a new access token automatically.
> - If Okta's refresh token is also expired or invalid, the next token exchange request returns an `interaction_required` response and a new user consent flow is required.
> - The access token isn't automatically revoked from the external resource authorization server. If the access token was shared or copied elsewhere, you must revoke it directly with the external provider.

### Force re-consent for STS services

To prompt a user for consent again, clear authorization from both Okta and the third-party provider, because consent is stored with the third-party.

1. First, call the `/revoke` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/orgas/revoke) to clear the OAuth STS access token on the org authorization server.

> **Note**: You can also use the **Clear and revoke** button in the Admin Console. You can access the [Clear User Sessions function](https://help.okta.com/okta_help.htm?type=oie&id=csh-session-revoke) through the user's profile.

```bash
  curl --location --request POST \
    --url 'https://{yourOktaDomain}/oauth2/v1/revoke' \
    --header "Content-Type: application/x-www-form-urlencoded" \
    --header "Accept: application/json" \
    --data-urlencode "token=<access_token_value>" \
    --data-urlencode "token_type_hint=oauth_sts"
```

calling the revoke endpoint to clear access tokens from cache should also reprompt for consent if tokens have also been invalidated on github's side (e.g. via the 'revoke all user tokens' button in github's console)

use the clear Clear Sessions and Tokens in Okta



calling the /oauth2/v1/revoke endpoint directly

2. Access the Okta admin console and use the 'Clear sessions and revoke tokens' button. This removes the stored access and refresh tokens.

3. Revoke Access on the Third-Party Platform

4. Because consent is stored by the third-party service (e.g., GitHub), you must also revoke the connection directly in their interface. Locate the 'revoke all user tokens' or similar setting in the third-party provider's console.

Note: If the user has an active session in their browser at the third-party platform (where they are expecting to be prompted for consent), they may not be prompted for consent at all, as the flow can pass through silently, even if they have revoked access. Forcing re-consent requires clearing both Okta tokens and the third-party session.
