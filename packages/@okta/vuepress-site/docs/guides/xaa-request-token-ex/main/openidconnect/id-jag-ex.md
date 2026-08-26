Send a POST request to your Okta org's [OAuth 2.0 token endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/orgas/token) with the following parameters to obtain an ID-JAG token.

| Parameter              | Type   | Description |
|------------------------|--------|-------------|
| `grant_type`           | String | Set to `urn:ietf:params:oauth:grant-type:token-exchange`. |
| `client_assertion_type`| String | Set to `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| `client_assertion`     | String | Set to `{client_assertion}`, the signed JWT generated from [Create a client assertion JWT](#create-a-client-assertion-jwt). |
| `subject_token`        | String | Set to `{id_token}`, which identifies the user. |
| `subject_token_type`   | String | Set to `urn:ietf:params:oauth:token-type:id_token` |
| `requested_token_type` | String | Set to `urn:ietf:params:oauth:token-type:id-jag` |
| `audience`             | String | Set to `{resourceAud}`, the issuer URL of the resource app's authorization server. |
| `scope`                | String | Set to `{idJagScopes}`, the scopes requested to access the resource server. |
| `resource`             | String | Set to `{resourceApiUrl}`, the resource server's API base URL. |

For example:

```bash
POST /oauth2/v1/token HTTP/1.1
Host: your-okta-domain.okta.com
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:token-exchange&
client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&
client_assertion={client_assertion}&
subject_token={id_token}&
subject_token_type=urn:ietf:params:oauth:token-type:id_token&
requested_token_type=urn:ietf:params:oauth:token-type:id-jag&
audience={resourceAud}&
scope={idJagScopes}&
resource={resourceApiUrl}&
```

After the ID-JAG token exchange request is sent, the IdP (Okta) responds with the requested token. For example:

```json
{
  "access_token": "eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWV...",
  "expires_in": 300,
  "issued_token_type": "urn:ietf:params:oauth:token-type:id-jag",
  "token_type": "N_A"
}
```

The returned `access_token` value contains the ID-JAG token. The `issued_token_type` indicates what type of token is returned. Save the `access_token` value in the `{id-jag_token}` variable to use in your request for an access token from the resource's authorization server.

#### Contents of ID-JAG

If you decode the ID-JAG token, the following claims appear in the payload.

```JSON
// header
{ "kid": "1T4g9ux3EsFK_tpGeqfv7lIccFt9SPV5AqlhrMI2adE",
  "typ": "oauth-id-jag+jwt",
  "alg": "RS256" }

// payload
{
  "iss": "https://{yourOktaDomain}", // The Okta org that issued the ID-JAG
  "sub": "00uzkk8ctx1WtQ8fy1d7",     // The user ID
  "aud": "https://as.myresource.com", // The resource audience: {resourceAud}
  "client_id": "0oaa0esowyOyPreaI0g7",   // The resource server's client ID: {resourceClientId}
  "resource": "{resourceApiUrl}",
  "scope": "my.xaa.a.read my.xaa.b.manage",  // resource server scopes requested: {idJagScopes}
  "email": "example.user@okta.com",    // The user's email
  "iat": 1781223753,
  "exp": 1781224053,                 // 5-minute lifetime
  "jti": "IDAAG.OmT8mh0IPyEwvTM6MYodfTFB_dYo4JmZIHP4tnh9xoA"
}
```
