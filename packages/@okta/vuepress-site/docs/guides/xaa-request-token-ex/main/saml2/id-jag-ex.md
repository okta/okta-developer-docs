Send a POST request to your Okta org's [OAuth 2.0 token endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/orgas/token) with the following parameters to obtain an ID-JAG token.

| Parameter              | Type   | Description |
|------------------------|--------|-------------|
| `grant_type`           | String | Set to `urn:ietf:params:oauth:grant-type:token-exchange`. |
| `client_id`            | String | Set to `{clientId}`. This is the client ID of the requesting app role, which is the AI agent in Okta. |
| `client_assertion_type`| String | Set to `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| `client_assertion`     | String | Set to `{client_assertion}`, the signed JWT generated from [Create a client assertion JWT](#create-a-client-assertion-jwt). |
| `subject_token`        | String | Set to `{refresh_token}`, which identifies the user. |
| `subject_token_type`   | String | Set to `urn:ietf:params:oauth:token-type:refresh_token` |
| `requested_token_type` | String | Set to `urn:ietf:params:oauth:token-type:id-jag` |
| `audience`             | String | Set to `{resourceAud}`, the issuer URL of the resource app's authorization server. |
| `scope`                | String | Set to `{idJagScopes}`, the scopes requested to access the resource server. |
| `resource`             | String | Set to `{resourceApiUrl}`, the resource server's API base URL. |
| `actor_token`          | String | Set to `{client_assertion}`, the signed JWT generated from [Create a client assertion JWT](#create-a-client-assertion-jwt). In the SAML requesting app XAA flow, this parameter is the delegated actor (the party authorized to act on behalf of the subject). |
| `actor_token_type`     | String | Set to `urn:ietf:params:oauth:token-type:jwt`. Specify this parameter when `actor_token` is provided. |

For example:

```bash
POST /oauth2/v1/token HTTP/1.1
Host: your-okta-domain.okta.com
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:token-exchange&
client_id={clientId}&
client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&
client_assertion={client_assertion}&
subject_token={refresh_token}&
subject_token_type=urn:ietf:params:oauth:token-type:refresh_token&
requested_token_type=urn:ietf:params:oauth:token-type:id-jag&
audience={resourceAud}&
scope={idJagScopes}&
resource={resourceApiUrl}&
actor_token={client_assertion}&
actor_token_type=urn:ietf:params:oauth:token-type:jwt
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

If you decode the ID-JAG token, the following claims appear for a SAML requesting app that has the AI agent as a delegated actor.

```JSON
// header
{ "kid": "1T4g9ux3EsFK_tpGeqfv7lIccFt9SPV5AqlhrMI2adE",
  "typ": "oauth-id-jag+jwt", "alg": "RS256" }
// payload
{
  "sub": "00uzkk8ctx1WtQ8fy1d7",     // The user (from SAML NameID)
  "sub_profile": "user",             // Appears if your resource app is also SAML
  "act": {                           // The delegation
    "sub": "wlpa0eiuaoCNrpoaE0g7",   // The AI agent (from {client_assertion})
    "sub_profile": "ai_agent"
  },
  "sub_id": {
    "format": "saml-nameid",
    "issuer": "http://www.okta.com/exk2410vjbjB62Oc61d8",
    "nameid": "example.user@okta.com",
    "nameid_format": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"
  },
  "aud": "https://as.myresource.com", // The resource audience: {resourceAud}
  "client_id": "0oaa0esowyOyPreaI0g7",   // The resource server's client ID: {resourceClientId}
  "email": "example.user@okta.com",    // The user's email
  "iss": "https://{yourOktaDomain}", // The Okta org that issued the ID-JAG
  "iat": 1781223753,
  "exp": 1781224053,                 // 5-minute lifetime
  "jti": "IDAAG.OmT8mh0IPyEwvTM6MYodfTFB_dYo4JmZIHP4tnh9xoA",
  "resource": "{resourceApiUrl}",
  "scope": "my.xaa.a.read my.xaa.b.manage",  // resource server scopes requested: {idJagScopes}
}
```

> **Note:** When the ID-JAG expires, you can request for a new ID-JAG using the refresh token. If you use an expired refresh token, your ID-JAG request returns an `invalid_grant` error. You need to obtain a new refresh token by having the user sign in through SSO again.
