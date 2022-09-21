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
       $jwt = \Jose\Easy\Load::jws($accessToken)
         ->algs(['RS256'])
         ->keyset($keys)
         ->exp()
         ->iat()
         ->iss($_ENV['OKTA_OAUTH2_ISSUER'])
         ->aud($_ENV['OKTA_AUDIENCE'])
         ->run();
         ;
     } catch(\Exception $e) {
       return false;
     }

     return $jwt->claims;
   }
   ```

2. This function calls another function that you need to create that is responsible for fetching and caching the JWT keys from Okta. Create that function now:

   ```php
   function getJWKS() {
     $cache = new \Kodus\Cache\FileCache(__DIR__.'/../cache/', 86400);

     $cacheKey = 'okta-jwks';

     $jwks = $cache->get($cacheKey);

     if(!$jwks) {
       $client = new \GuzzleHttp\Client();
       $response = $client->request('GET', $_ENV['OKTA_OAUTH2_ISSUER'].'/v1/keys');
       $jwks = (string)$response->getBody();
       $cache->set($cacheKey, $jwks);
     }

     return \Jose\Component\Core\JWKSet::createFromJson($jwks);
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
