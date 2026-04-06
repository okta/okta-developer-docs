The response during the token exchange depends on if Okta has a stored token.

##### Interaction required response

```html
HTTP/1.1 400
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache

{
  "error": "interaction_required",
  "error_description": "The user must authenticate with the authorization server for the request to proceed",
  "interaction_uri": "https://example.okta.com/some/opaque/path"
}
```

If Okta doesn't have a valid token, it returns an HTTP 400 error. Your agent's logic must handle this by initiating the user consent flow.

To handle this, your app should:

1. Parse the `interaction_uri` from the JSON response.
1. Redirect the end user's browser to this URL.
1. After the user completes the flow and is redirected back to your app, retry the original `/token` request.

#### Token exists response

```html
{
  "issued_token_type": "urn:okta:params:oauth:token-type:oauth-sts",
  "access_token": "eyJhbGciOiJIUzI1NiIsI...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "repo profile"
}
```

Your agent should use the `access_token` from this response to make authenticated API calls to the target resource, including it in the `Authorization` header as a Bearer token.
