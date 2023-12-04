1. Open the **public** > **index.php** file.
1. Add the following code to load the environment variables, set up a basic router, and create placeholders for the two endpoints:

   ```php
   <?php
   require_once(__DIR__ . '/../vendor/autoload.php');

   $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
   $dotenv->load();

   if (!hasValidAccessToken()) {
      header("HTTP/1.1 401 Unauthorized");
      echo "Unauthorized";
      die();
   }

   $path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
   switch ($path) {

      case '/api/whoami':
         whoami();
         break;

      case '/api/hello':
         hello();
         break;
   }

   ?>
   ```

1. Add the code for the route handlers.

   ```php
   function hello()
   {
      echo "Hello World";
   }

   function whoami()
   {
      echo "You are a super developer";
   }
   ```
