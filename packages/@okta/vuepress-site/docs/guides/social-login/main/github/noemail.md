## Handle users without email addresses

GitHub doesn’t always provide email addresses for users that it authenticates. Okta requires an email address for its users, so if a user from <StackSelector snippet="idp" noSelector inline /> doesn't have one, a fake email address is created using some information from the IdP (for example, if the IdP provides a username, an email might be formed using `idp_username@domain.com`). You can customize this mapping by using the [Okta Expression Language](/docs/reference/okta-expression-language/).
