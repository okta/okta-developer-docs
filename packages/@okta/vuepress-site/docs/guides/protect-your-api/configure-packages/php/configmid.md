Create a verifier instance, bound to the issuer:

```php
$jwtVerifier = ( new \Okta\JwtVerifier\JwtVerifierBuilder() )
        ->setAdaptor( new \Okta\JwtVerifier\Adaptors\FirebasePhpJwt() )
        ->setClientId( '{CLIENT_ID}' )
        ->setIssuer( 'https://${yourOktaDomain}/oauth2/default' )
        ->build();
```
