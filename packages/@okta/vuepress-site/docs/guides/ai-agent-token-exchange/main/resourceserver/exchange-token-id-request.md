
In this step, the AI agent sends a `POST` request to the Okta org authorization server's `/token` endpoint to exchange the ID token for the ID-JAG resource token.

``` http
POST /oauth2/v1/token HTTP/1.1
Host: example.okta.com
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:token-exchange
&requested_token_type=urn:okta:params:oauth:token-type:oauth-sts
&subject_token=eyJraWQiOiJz...
&subject_token_type=urn:ietf:params:oauth:token-type:id_token
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion=eyJhbGci...
&resource=https://github.com
```

If the AI agent needs to retrieve an access token through brokered consent using the STS service, token exchange requests must also contain the following parameters:

| Parameter | Description and value |
| --- | --- |
| requested_token_type | Standard OAuth 2.0 token exchange grant. The value must be `urn:okta:params:oauthtoken-type:oauth-sts`. |
| resource | A resource identifier for the target app. This must match the resource configured in the Managed Connection. |
