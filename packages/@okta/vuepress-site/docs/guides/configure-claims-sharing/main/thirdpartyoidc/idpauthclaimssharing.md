When you use OpenID Connect with claims sharing, the data that's shared between a third-party IdP and an Okta SP is included in the ID token (`id_token`) as AMR claims within an `amr` array.

Okta can extract AMR claims from the access token when the ID token contains no AMR claims. The access token must be in a signed JWT format and signed with the same keys as the ID token. If you use opaque access tokens, then the AMR value must be sent in the ID token.
