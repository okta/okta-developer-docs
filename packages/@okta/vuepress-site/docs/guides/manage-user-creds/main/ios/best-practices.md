Here are some key recommendations for secure token management:

* Use short-lived access tokens. See [Refresh the access and ID tokens](/docs/guides/oie-embedded-common-refresh-tokens/ios/main/).
* Use and rotate refresh tokens. See [Refresh token rotation](/docs/guides/refresh-tokens/main/#refresh-token-rotation).
* Always revoke tokens when a user signs out of Okta. See [Revoke tokens](/docs/guides/revoke-tokens/main/).
* Register a custom domain URL for your Okta org to unlock branding capabilities and simplify session management. See [Customize domain and email address](/docs/guides/custom-url-domain/main/).
* To mitigate risk and ensure proper access token usage:
  * Configure APIs with specific authorization server audiences, for example, `api.company.com/product1` instead of the base `api.company.com`. See [Create an authorization server](/docs/guides/customize-authz-server/main/).
  * Use granular scopes, for example, `com.okta.product1.admin` instead of a generic administrator scope. See [Create scopes](/docs/guides/customize-authz-server/main/#create-scopes).
