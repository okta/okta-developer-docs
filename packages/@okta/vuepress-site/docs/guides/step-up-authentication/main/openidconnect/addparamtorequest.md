In this example, the Authorization Code [grant type](/docs/guides/implement-grant-type/authcode/main/) is used.

**Request**

```bash
https://${yourOktaDomain}/oauth2/default/v1/authorize?client_id={clientId}
&response_type=code
&scope=openid
&redirect_uri=https://${yourOktaDomain}/authorization-code/callback
&state=296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601
&acr_values=urn:okta:loa:1fa:any
```

The authorization code is returned in the response. And then the request is made to the `/token` endpoint to exchange the authorization code for an ID token and an access token. See the [Authorization Code grant type](/docs/guides/implement-grant-type/authcode/main/#grant-type-flow) for a diagram of this flow.
