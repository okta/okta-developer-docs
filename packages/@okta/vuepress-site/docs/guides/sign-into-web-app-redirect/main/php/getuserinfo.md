Since you requested the scopes `openid profile email`, Okta also returns an ID token along with the access token. You can parse out the claims in the ID token to find the user's profile information.

For example, once the user has signed in, you can extract the user's name from the ID token and show it in the app.

1. Change `index()` to read as follows:

   ```php
   function index() {
     if(empty($_SESSION['okta_id_token'])) {
       ?>
         <a href="/signin">Sign In</a>
       <?php
     } else {
       ?>
         Hello, <?= htmlspecialchars($_SESSION['name']) ?>
         $claims = json_decode(base64_decode(explode('.', $_SESSION['okta_id_token'])[1]), true);
         $_SESSION['name'] = $claims['name'];
       <?php
     }
   }
   ```

> **Note**: Since the ID token was received by your app in response to exchanging the authorization code, it's okay to skip the normal checks needed on an ID token that your app received in a redirect.
