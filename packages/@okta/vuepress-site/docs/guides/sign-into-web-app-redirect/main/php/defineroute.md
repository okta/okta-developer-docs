When you [created an app integration in the admin console](#create-an-app-integration-in-the-admin-console), you set the sign-in redirect URL to <StackSnippet snippet="signinredirecturi" inline /> and the sign-out redirect URL to <StackSnippet snippet="signoutredirecturi" inline />. In this sample, only the sign-in callback requires additional code.

1. Add a route handler for the sign-in callback URI to the switch statement:

   ```php
   ...
   case '/authorization-code/callback':
       authorization_code_callback_handler();
       break;
   ...
   ```

1. Define the handler function `authorization_code_callback_handler()` at the end of the file. This reads the authorization code in the query string and then exchanges it for an access token and optional refresh token and ID token.

   ```php
   function authorization_code_callback_handler() {

     if(empty($_GET['state']) || $_GET['state'] != $_SESSION['oauth_state']) {
       throw new Exception("state does not match");
     }

     if(!empty($_GET['error'])) {
       throw new Exception("authorization server returned an error: ".$_GET['error']);
     }

     if(empty($_GET['code'])) {
       throw new Exception("this is unexpected,
         the authorization server redirected without a code or an error");
     }

     // Exchange the authorization code for an access token by making a request to the token endpoint
     $token_endpoint = $_ENV['OKTA_OAUTH2_ISSUER'].'/v1/token';

     $ch = curl_init($token_endpoint);
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
     curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
       'grant_type' => 'authorization_code',
       'code' => $_GET['code'],
       'code_verifier' => $_SESSION['oauth_code_verifier'],
       'redirect_uri' => $_ENV['OKTA_OAUTH2_REDIRECT_URI'],
       'client_id' => $_ENV['OKTA_OAUTH2_CLIENT_ID'],
       'client_secret' => $_ENV['OKTA_OAUTH2_CLIENT_SECRET'],
     ]));
     $response = json_decode(curl_exec($ch), true);

     if(isset($response['error'])) {
       throw new Exception("token endpoint returned an error: ".$response['error']);
     }

     if(!isset($response['access_token'])) {
       throw new Exception("token endpoint did not return an error or an access token");
     }

     // Save the tokens in the session
     $_SESSION['okta_access_token'] = $response['access_token'];

     if(isset($response['refresh_token']))
       $_SESSION['okta_refresh_token'] = $response['refresh_token'];

     if(isset($response['id_token']))
       $_SESSION['okta_id_token'] = $response['id_token'];

     header('Location: /');
   }
   ```
