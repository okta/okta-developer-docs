1. Move the code that checks for the ID token in the session into a new function, `require_signin()`:

   ```php
   function require_signin() {
     if(empty($_SESSION['okta_id_token'])) {
       ?>
         <a href="/signin">Sign In</a>
       <?php
       die();
     }
   }
   ```

2. Call the `require_signin()` function from any specific route that you want protected. For example, call it from `index()` to protect the home page:

   ```php
   function index() {
     require_signin();
     ...
   }
   ```
