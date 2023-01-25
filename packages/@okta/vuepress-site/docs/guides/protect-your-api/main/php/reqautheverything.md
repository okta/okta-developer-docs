1. First, create a function that checks whether a request has a valid access token. This function is responsible for parsing the incoming `Authorization` header and validating the JWT.

    ```php
    function hasValidAccessToken() {
      // Require an access token is sent in the HTTP Authorization header
      if(!isset($_SERVER['HTTP_AUTHORIZATION'])) {
        return false;
      }

      $accessToken = explode(' ', $_SERVER['HTTP_AUTHORIZATION'])[1];

      $keys = getJWKS();

      try {
        $decoded = \Firebase\JWT\JWT::decode($accessToken, $keys);
      } catch(\Exception $e) {
        echo $e->getMessage()."\n";
        return false;
      }

      // Check the audience and issuer claims

      if($decoded->iss != $_ENV['OKTA_OAUTH2_ISSUER'])
        return false;

      if($decoded->aud != $_ENV['OKTA_AUDIENCE'])
        return false;

      return $decoded;
    }
    ```

2. This function calls another function that you need to create that is responsible for fetching and caching the JWT keys from Okta. Create that function now:

    ```php
    function getJWKS() {
      $httpClient = new \GuzzleHttp\Client();
      $httpFactory = new \GuzzleHttp\Psr7\HttpFactory();
      $cacheItemPool = \Phpfastcache\CacheManager::getInstance('files');

      $jwksUri = $_ENV['OKTA_OAUTH2_ISSUER'].'/v1/keys';

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

3. Now you can run the function `hasValidAccessToken()` before your router to require any request to have a valid access token in the header. Insert this code above the `switch` statement in your `index.php` file:

    ```php
    if(!hasValidAccessToken()) {
      header(HTTP/1.1 401 Unauthorized);
      echo "Unauthorized";
      die();
    }
    ```
