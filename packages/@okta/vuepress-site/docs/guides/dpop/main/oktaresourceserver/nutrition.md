* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* [Glitch](https://glitch.com/) project or account
* An [OAuth 2.0 client app](/docs/concepts/oauth-openid/#oauth-2-0) that has the **Require Demonstrating Proof of Possession (DPoP) header in token requests** checkbox enabled.<br>
  If you're using the API, add the [DPoP parameter](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/createApplication!path=4/settings/oauthClient/dpop_bound_access_tokens&t=request) (`dpop_bound_access_tokens: true`) to `settings.oauthClient` to your app.
* Be able to [build a request](/docs/guides/implement-grant-type/authcode/main/#flow-specifics) and obtain an access token for your app.
* Be able to create a [JSON Web Key](https://www.rfc-editor.org/rfc/rfc7517). In a production environment, use your internal instance of a key pair generator to generate the JWK for use with DPoP. See this [key pair generator](https://github.com/mitreid-connect/mkjwk.org) for an example. For testing purposes only, you can use this [simple JWK generator](https://mkjwk.org/) to generate a key pair for an example setup. Use only [asymmetric keys](https://www.okta.com/identity-101/asymmetric-encryption/) with DPoP.

  > **Note:** The JWK that's used for DPoP authentication is separate from the JWK used for client authentication.