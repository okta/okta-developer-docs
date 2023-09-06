Since you requested the scopes `openid profile email`, Okta also returns an ID token along with the access token. You can parse out the claims in the ID token to find the user's profile information.

For example, after the user is signed in, you can extract the user's name from the ID token and show it in the app. Change `index()` to:

   ```php
   function index() {
       if(empty($_SESSION['okta_id_token'])) {
           ?>
               <a href="/signin">Sign In</a>
           <?php
       } else {
           $claims = json_decode(base64_decode(explode('.', $_SESSION['okta_id_token'])[1]), true);
           $_SESSION['name'] = $claims['name'];

           ?>
               Hello, <?= htmlspecialchars($_SESSION['name']) ?>
           <?php
       }
   }
   ```

> **Note**: Because your app received the ID token in exchange for the authorization code, it's OK to skip the normal checks needed for an ID token that your app received in a redirect.
