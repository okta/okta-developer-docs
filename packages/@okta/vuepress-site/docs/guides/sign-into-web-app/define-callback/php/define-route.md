To set up the callback route, you need to define a handler:

```php
$route->get('/authorization-code/callback', AuthCodeCallbackHandler)
```

Then you need to define how the handler works. During this, you exchange the code for an access token and id token.

```php

function AuthCodeCallbackHandler() {
  if(array_key_exists('state', $_REQUEST) && $_REQUEST['state'] !== $applicationState) {
      throw new \Exception('State does not match.');
  }

  if(array_key_exists('code', $_REQUEST)) {
      $exchange = exchangeCode($_REQUEST['code']);
      if(!isset($exchange->access_token)) {
          die('Could not exchange code for an access token');
      }

      if(verifyJwt($exchange->access_token) == false) {
          die('Verification of JWT failed');
      }

      setcookie("access_token","$exchange->access_token",time()+$exchange->expires_in,"/",false);
      header('Location: / ');
  }

  die('An error during login has occurred');
}

function exchangeCode($code) {
    $authHeaderSecret = base64_encode( getenv('CLIENT_ID') . ':' . getenv('CLIENT_SECRET') );
    $query = http_build_query([
        'grant_type' => 'authorization_code',
        'code' => $code,
        'redirect_uri' => 'http://localhost:8080/authorization-code/callback'
    ]);
    $headers = [
        'Authorization: Basic ' . $authHeaderSecret,
        'Accept: application/json',
        'Content-Type: application/x-www-form-urlencoded',
        'Connection: close',
        'Content-Length: 0'
    ];
    $url = getenv("ISSUER").'/v1/token?' . $query;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, 1);
    $output = curl_exec($ch);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if(curl_error($ch)) {
        $httpcode = 500;
    }
    curl_close($ch);
    return json_decode($output);
}

```
