---
title: Create a public/private key pair
---

The `private_key_jwt` client authentication method is the only supported method for OAuth service apps that want to get access tokens with Okta scopes.

The private key that you use to sign the JWT must have the corresponding public key registered in the [JWKSet](/docs/reference/api/oauth-clients/#json-web-key-set) of the OAuth service app. We recommend generating the public/private key pair first before creating the OAuth service app.

1. Use a tool such as this [JSON Web Key Generator](https://mkjwk.org/) to generate a JWKS public/private key pair for testing. Okta supports both RSA and Elliptic Curve (EC) keys. In this example, we are selecting **RSA** as the encryption algorithm. Select the following values:

    * Key size &mdash; 2048
    * Key use &mdash; signature
    * Algorithm &mdash; RSA256
    * Key ID &mdash; (Optional) This can be any random value.

> **Note:** Use the JSON Web Key Generator link to generate a JWKS public/private key pair for testing purposes only. For a production use case, use your own [internal instance](https://github.com/mitreid-connect/mkjwk.org) of the key pair generator.

2. The JSON Web Key Generator tool extracts the public key from the key pair automatically. For testing purposes, copy the Public Key that is provided.

> **Note:** Some Okta SDKs require that keys be in Privacy Enhanced Mail (PEM) format. If you are working with an Okta SDK that requires that the key be in PEM format, use a [JWK to PEM Convertor tool](https://www.npmjs.com/package/pem-jwk) and then use the private key in PEM format when signing the JWT.

The JWKS should look something like this:

```json
{
  "keys": [
    {
      "kty": "RSA",
      "e": "AQAB",
      "use": "sig",
      "kid": "my_key_id",
      "alg": "RS256",
      "n": "u0VYW2-76A_lYg5NQihhcPJYYU9-NHbNaO6LFERWnOUbU7l3MJdmCailwSzjO76O-2GdLE-Hn2kx04jWCCPofnQ8xNmFScNo8UQ1dKVq0UkFK-sl-Z0Uu19GiZa2fxSWwg_1g2t-ZpNtKCI279xGBi_hTnupqciUonWe6CIvTv0FfX0LiMqQqjARxPS-6fdBZq8WN9qLGDwpjHK81CoYuzASOezVFYDDyXYzV0X3X_kFVt2sqL5DVN684bEbTsWl91vV-bGmswrlQ0UVUq6t78VdgMrj0RZBD-lFNJcY7CwyugpgLbnm4HEJmCOWJOdjVLj3hFxVVblNJQQ1Z15UXw"
    }
  ]
}
```

<NextSectionLink/>