See the instructions for the [Okta JWT Verifier for PHP](https://github.com/okta/okta-jwt-verifier-php).

## Required Packages

The Okta JWT Verifier can be installed through composer.

```
composer require okta/jwt-verifier
```

This library requires a JWT library. We currently support firebase/php-jwt. You will have to install this or create your own adaptor.

```
composer require firebase/php-jwt
```

You will also need to install a PSR-7 compliant library. We suggest that you use guzzlehttp/psr7 in your project.

```
composer require guzzlehttp/psr7
```

## Validate Access Token

For any access token to be valid, the following are asserted:

- Signature is valid (the token was signed by a private key which has a corresponding public key in the JWKS response from the authorization server).
- Access token is not expired (requires local system time to be in sync with Okta, checks the exp claim of the access token).
- The `aud` claim in the jwt matches any expected `aud` claim set up in the builder.
- The `iss` claim matches the issuer the verifier is constructed with.
- Any custom claim assertions that you add are confirmed

```php
$jwtVerifier = (new \Okta\JwtVerifier\JwtVerifierBuilder())
    ->setAdaptor(new \Okta\JwtVerifier\Adaptors\FirebasePhpJwt)
    ->setAudience('api://default')
    ->setClientId('{clientId}')
    ->setIssuer('https://{yourOktaDomain}.com/oauth2/default')
    ->build();

$jwt = $jwtVerifier->verify($jwt);
```

