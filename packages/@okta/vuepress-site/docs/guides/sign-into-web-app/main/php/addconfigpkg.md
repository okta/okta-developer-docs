All Okta packages for PHP use [Composer](https://getcomposer.org/). Install the following dependencies in your project:

- `composer require nikic/fast-route` // Used for sample routing
- `composer require vlucas/phpdotenv` // Used to get environment variables
- `composer require okta/jwt-verifier`
- `composer require guzzlehttp/psr7`
- `composer require firebase/php-jwt`

You can then make them accessible in your project by including the vendor autoload file:

```php
require 'vendor/autoload.php';
```
