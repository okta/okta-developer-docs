1. Move the code that checks for the ID token in the session into a new function, `require_login()`:

   ```php
   function require_login() {
     if(empty($_SESSION['okta_id_token'])) {
       ?>
         <a href="/login">Log In</a>
       <?php
       die();
     }  
   }
   ```

2. Call the `require_login()` function from any specific route that you want protected. For example, call it from `index()` to protect the home page:

   ```php
   function index() {
     require_login();
     ...
   }
   ```
