If you are using a PHP framework like [Laravel](https://laravel.com/docs/9.x/routing#cors) or [Symfony](https://symfony.com/doc/current/frontend/encore/dev-server.html#cors-issues), check the documentation for how to enable CORS in the framework. For this quickstart, you can send back the proper HTTP headers by adding the following above the `switch` statement:

```php
header('Access-Control-Allow-Origin: *');
```
