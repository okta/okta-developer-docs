This quickstart uses several packages to build the API and consume access tokens from Okta. Install each of them with [Composer](https://getcomposer.org):

1. The PHP dotenv library loads values from the `.env` config file automatically.

   ```shell
   composer require vlucas/phpdotenv
   ```

1. The Firebase JWT library encodes and decodes tokens for and from Okta.

   ```shell
   composer require firebase/php-jwt
   ```

1. The Guzzle HTTP client library fetches Okta's JWT signing keys.

   ```shell
   composer require guzzlehttp/guzzle
   ```

1. The phpfastcache library caches the JWT signing keys to speed up access token validation.

   ```shell
   composer require phpfastcache/phpfastcache
   ```
