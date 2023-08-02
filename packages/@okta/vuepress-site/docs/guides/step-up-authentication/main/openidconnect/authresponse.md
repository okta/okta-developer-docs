The tokens are truncated for brevity.

```json
{
   "token_type": "Bearer",
   "expires_in": 3600,
   "access_token": "eyJraW…..vSqrH1Q",
   "scope": "openid",
   "id_token": "eyJraW…..WlB8Y9pQ"
}
```

To check the returned ID token payload, copy the values and paste them into any JWT decoder (for example: `https://jwt.io/`). Using a JWT decoder, confirm that the token contains the `acr` claim.

**ID token**

```json
{
  "sub": "00u47ijy7sRLaeSdC0g7",
  "ver": 1,
  "iss": "https://{yourOktaDomain}/oauth2/default",
  "aud": "0oa48e74ox4t7mQJX0g7",
  "iat": 1661289624,
  "exp": 1661293224,
  "jti": "ID.dz6ibX-YnBNlt14huAtBULam_Z0_wPG0ig5SWCy8XQU",
  "amr": [
    "pwd"
  ],
  "acr": "urn:okta:loa:1fa:any",
  "idp": "00o47ijbqfgnq5gj00g7",
  "auth_time": 1661289603,
  "at_hash": "w6BLQV3642TKWvaVwTAJuw"
}
```

**Access token**

```json
{
  "ver": 1,
  "jti": "AT.NovJtQ_NrJ6cgy3h1-638ArovwYXWslu0teQ2M3Ux9c",
  "iss": "https://{yourOktaDomain}/oauth2/default",
  "aud": "api://default",
  "iat": 1661289624,
  "exp": 1661293224,
  "acr": "urn:okta:loa:1fa:any",
  "cid": "0oa48e74ox4t7mQJX0g7",
  "uid": "00u47ijy7sRLaeSdC0g7",
  "scp": [
    "openid"
  ],
  "auth_time": 1661289603,
  "sub": "joe.smith@example.com"
}
```

### Refresh token behavior

When you use the refresh token to refresh access and ID tokens, the tokens reflect the `acr_values` parameter value sent in the original authentication request. Use the `auth_time` [parameter value](/docs/reference/api/oidc/#request-parameters) to validate when the original authentication occurred.
