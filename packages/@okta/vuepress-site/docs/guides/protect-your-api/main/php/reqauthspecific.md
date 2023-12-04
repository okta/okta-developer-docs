1. Remove the call to `hasValidAccessToken()` for all endpoints from `index.php`.

1. Add the call into the particular endpoints that require authentication, for example:

   ```php
   function whoami() {
      $token = hasValidAccessToken();

      if(!$token) {
         header("HTTP/1.1 401 Unauthorized");
         echo "Unauthorized";
         die();
      }

      header("Content-type: application/json");
      echo "You are a super developer";
   }
   ```
