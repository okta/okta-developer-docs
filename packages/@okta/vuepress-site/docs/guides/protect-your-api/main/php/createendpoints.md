1. In your `index.php` file, set up a basic router, load the environment variables, and create placeholders for the two endpoints:

   ```php
   <?php
     require_once(__DIR__.'/../vendor/autoload.php');

     $dotenv = Dotenv\Dotenv::createImmutable(__DIR__.'/..');
     $dotenv->load();

     $path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
     switch($path) {

       case '/api/whoami':
         whoami();
         break;

       case '/api/hello':
         hello();
         break;

      }
   ```

2. The two functions `whoami()` and `hello()` are where you define the actual logic of your API methods. For now, you can define these functions to just output a string of text.

   ```php
   function hello() {
     echo "Hello World";
   }

   function whoami() {
     echo "whoami";
   }
   ```
