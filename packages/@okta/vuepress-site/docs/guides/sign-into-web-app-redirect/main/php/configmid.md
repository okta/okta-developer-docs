1. Create a `.env` file in the root of your project. Add the following, replacing the placeholders with your own values.

   ```properties
   OKTA_OAUTH2_ISSUER=https://${yourOktaDomain}/oauth2/default
   OKTA_OAUTH2_CLIENT_ID=${clientId}
   OKTA_OAUTH2_CLIENT_SECRET=${clientSecret}
   OKTA_OAUTH2_REDIRECT_URI=http://localhost:8080/authorization-code/callback
   ```

1. Set up a basic router and load those values in `index.php`:

   ```php
   <?php
   require_once(__DIR__.'/../vendor/autoload.php');

   $dotenv = Dotenv\Dotenv::createImmutable(__DIR__.'/..');
   $dotenv->load();

   session_start();

   $path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
   switch($path) {
     // TODO: define routes here
      default:
         echo 'not found';
         die();
   }
   ```
   