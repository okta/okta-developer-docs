For example, you could require authentication for all routes under `/api/private` by defining a new function:

```php
function authenticate() {

    try {
        switch(true) {
            case array_key_exists('HTTP_AUTHORIZATION', $_SERVER) :
                $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
                break;
            case array_key_exists('Authorization', $_SERVER) :
                $authHeader = $_SERVER['Authorization'];
                break;
            default :
                $authHeader = null;
                break;
        }
        preg_match('/Bearer\s(\S+)/', $authHeader, $matches);

        if(!isset($matches[1])) {
            throw new \Exception('No Bearer Token');
        }

        return $jwtVerifier->verify($matches[1]);
    } catch (\Exception $e) {
        http_response_code(401);
        die('Unauthorized');
    }
}
```

and then in your route, you would call this function to confirm authorization:

```php
$route->get('/protected/route', function() {
  authenticate(); // will die here if not authenticated

  // Handle rest of your protected route here.

});
```
