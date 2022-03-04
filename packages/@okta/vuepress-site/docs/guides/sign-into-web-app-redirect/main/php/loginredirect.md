1. Create a route for your app's home page that renders the link to start the OAuth flow by adding the following code inside the `index.php` file in place of the `TODO: define routes here` placeholder:

```php
switch($path) {
  case '/':
    index();
    break;
}
```

2. Define the function `index()` that checks if there is an ID token in the session and displays the sign-in link if not. This can go somewhere near the bottom of `index.php`:

```php
function index() {
  if(empty($_SESSION['okta_id_token'])) {
    ?>
      <a href="/login">Log In</a>
    <?php
  } else {
    ?>
      Hello, <?= htmlspecialchars($_SESSION['name']) ?>
    <?php
  }
}
```

3. When the user clicks the Log In link, they visit the `/login` route, which we need to define now. Add the following new case inside your `switch` statement:

```php
  ...
  case '/login':
    start_oauth_flow();
    break;
  ...
```

4. Create the function `start_oauth_flow()` that kicks off the OAuth Authorization Code flow and redirects the user to Okta. Again, this can go near the bottom of `index.php`:

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