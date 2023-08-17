Create a link for the user to start the sign-in process and be redirected to Okta.

1. Open **public** > **index.php**.
1. Add `index()` to display a sign-in link if if there isn't an ID token in the session:

   ```php
   function index() {
     if(empty($_SESSION['okta_id_token'])) {
       ?>
         <a href="/signin">Sign In</a>
       <?php
     } else {
       ?>
         Hello, <?= htmlspecialchars($_SESSION['name']) ?>
       <?php
     }
   }
   ```

1. Replace of the `TODO: define routes here` placeholder with the following route handler for `/`:

   ```php
   switch($path) {
     case '/':
       index();
       break;
   }
   ```

   Note that it calls `index()` to check if it should display the sign-in link.

1. Add code to handle the `Sign In` click.
   1. Add a new route handler for `/signin` to the switch statement in the previous step:

      ```php
      ...
      case '/signin':
         start_oauth_flow();
         break;
      ...
      ```

   1. Add the code for `start_oauth_flow()` to the end of `index.php`. This starts the [OAuth Authorization Code flow](/docs/concepts/oauth-openid/#authorization-code-flow-with-pkce) and redirects the user to Okta:

      ```php
      function start_oauth_flow() {
      // Generate a random state parameter for CSRF security
      $_SESSION['oauth_state'] = bin2hex(random_bytes(10));

      // Create the PKCE code verifier and code challenge
      $_SESSION['oauth_code_verifier'] = bin2hex(random_bytes(50));
      $hash = hash('sha256', $_SESSION['oauth_code_verifier'], true);
      $code_challenge = rtrim(strtr(base64_encode($hash), '+/', '-_'), '=');

      // Build the authorization URL by starting with the authorization endpoint
      $authorization_endpoint = $_ENV['OKTA_OAUTH2_ISSUER'].'/v1/authorize';
      $authorize_url = $authorization_endpoint.'?'.http_build_query([
         'response_type' => 'code',
         'client_id' => $_ENV['OKTA_OAUTH2_CLIENT_ID'],
         'state' => $_SESSION['oauth_state'],
         'redirect_uri' => $_ENV['OKTA_OAUTH2_REDIRECT_URI'],
         'code_challenge' => $code_challenge,
         'code_challenge_method' => 'S256',
         'scope' => 'openid profile email',
      ]);

      header('Location: '.$authorize_url);
      }
      ```