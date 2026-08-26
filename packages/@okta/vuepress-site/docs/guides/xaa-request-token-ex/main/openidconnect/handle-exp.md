If your tokens expire in the XAA flow, you can request for another token depending on the condition of the token:

* When the resource access token expires, you can reuse the refresh token to perform another token exchange. See [Token exchange for ID-JAG](#token-exchange-for-id-jag) with the existing refresh token. The ID-JAG typically has a shorter lifespan than the access token, so you need to perform another ID-JAG token exchange.
* If the ID-JAG token expired, you can reuse the refresh token to perform another token exchange. See [Token exchange for ID-JAG](#token-exchange-for-id-jag) with the existing refresh token.
* If the refresh token expired, obtain a new refresh token by having the user sign in through SSO again. See [User SSO](#user-sso).