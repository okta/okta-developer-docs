After setting up the previous steps, you stored the `access_token` in the PHP `session`:


```php
function getProfile()
{
    if(!isAuthenticated()) {
        return [];
    }

    $jwtVerifier = (new \Okta\JwtVerifier\JwtVerifierBuilder())
        ->setIssuer(getenv('ISSUER'))
        ->setAudience('api://default')
        ->setClientId(getenv('CLIENT_ID'))
        ->build();

    $jwt = $jwtVerifier->verify($_COOKIE['access_token']);

    return $jwt->claims;

}
```
The claims from the JWT returned by `getProfile` contains user profile information.
