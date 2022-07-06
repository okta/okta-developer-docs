If you use the Okta CLI to create your okta app integration, it creates an `.okta.env` file in your current directory containing these values.

1. Make a copy of `.okta.env` called `.env` inside your project root.

2. Remove the `export` keywords so that the configuration is usable by the `phpdotenv` library. It should look like this:

   ```properties
   OKTA_OAUTH2_ISSUER=https://${yourOktaDomain}/oauth2/${authorizationServerId}
   OKTA_OAUTH2_CLIENT_ID=${clientId}
   OKTA_OAUTH2_CLIENT_SECRET=${clientSecret}
   ```

3. Set up a basic router and load the environment variables by adding the following code to the `index.php` file:

   ```php
   <?php
   require_once(__DIR__.'/../vendor/autoload.php');

   $dotenv = Dotenv\Dotenv::createImmutable(__DIR__.'/..');
   $dotenv->load();

   session_start();

   $path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
   switch($path) {

     // TODO: define routes here

   }
   ```