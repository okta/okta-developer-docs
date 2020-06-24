Depending on your router you use, you can define middleware that is used for requiring auth for all routes. For `league/route`.

Create a middleware class:

```php
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

class AuthMiddleware implements MiddlewareInterface
{
  public function process(ServerRequestInterface $request, RequestHandlerInterface $handler) : ResponseInterface
  {
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

        $jwtVerifier->verify($matches[1]);

        $handler->handle($request)
    } catch (\Exception $e) {
        http_response_code(401);
        die('Unauthorized');
    }
  }
}
```

Use the middleware in the router:
```php
$router = new League\Route\Router;
$router->middleware(new AuthMiddleware);
```
