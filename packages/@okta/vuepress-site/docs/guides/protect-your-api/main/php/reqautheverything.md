You can use a middleware function to protect any endpoint so only authenticated users can access it.

1. Add a function `hasValidAccessToken()` in `index.php` to check if a request has a valid access token:

   ```php
   function hasValidAccessToken()
   {
      // Require an access token is sent in the HTTP Authorization header
      if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
         return false;
      }

      $accessToken = explode(' ', $_SERVER['HTTP_AUTHORIZATION'])[1];

      $keys = getJWKS();

      try {
         $decoded = \Firebase\JWT\JWT::decode($accessToken, $keys);
      } catch (\Exception $e) {
         echo $e->getMessage() . "\n";
         return false;
      }

      // Check the audience and issuer claims
      if ($decoded->iss != $_ENV['OKTA_OAUTH2_ISSUER'])
         return false;

      if ($decoded->aud != $_ENV['OKTA_AUDIENCE'])
         return false;

      return $decoded;
   }
   ```

1. `hasValidAccessToken()` relies on another function `getJWKS()` to fetch and cache the JWT signing keys from Okta before decoding the access tokens. Add the code for `getJWKS()` to `index.php`:

   ```php
   function getJWKS()
   {
      $httpClient = new \GuzzleHttp\Client();
      $httpFactory = new \GuzzleHttp\Psr7\HttpFactory();
      $cacheItemPool = \Phpfastcache\CacheManager::getInstance('files');

      $jwksUri = $_ENV['OKTA_OAUTH2_ISSUER'] . '/v1/keys';

      $keySet = new \Firebase\JWT\CachedKeySet(
         $jwksUri,
         $httpClient,
         $httpFactory,
         $cacheItemPool,
         300,  // $expiresAfter int seconds to set the JWKS to expire
         true  // $rateLimit    true to enable rate limit of 10 RPS on lookup of invalid keys
      );

      return $keySet;
   }
   ```

1. Add the following code to `index.php` to require any request to have a valid access token in the header. Insert this code above the `switch` statement:

   ```php
   if (!hasValidAccessToken()) {
      header("HTTP/1.1 401 Unauthorized");
      echo "Unauthorized";
      die();
   }
   ```
