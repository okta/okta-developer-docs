---
exampleDescription: PHP Auth Code Example
---

## Okta PHP Quickstart

Now that your users can sign in, let's add authentication to your server.

## Redirecting to Authorization Endpoint
First you need to generate a URL to the authorization endpoint for the Authorization Server and redirect the user.
<DomainAdminWarning />

```php
<?php

$query = http_build_query([
    'client_id' => '{{CLIENT_ID}}',
    'response_type' => 'code',
    'response_mode' => 'query',
    'scope' => 'openid profile',
    'redirect_uri' => 'http://localhost/login_callback.php',
    'state' => $state,
    'nonce' => $nonce
]);

header('Location: ' . 'https://{yourOktaDomain}/oauth2/default/v1/authorize?'.$query);
```
> The `nonce` should be a generated string such as UUID, and the `state` can be any string representing state of the
application.

## Exchange Auth Code
After a successful login from the redirect, a code will be present in the request object.

This code should be placed in the file specified for your `redirect_uri` from the previous step.

```php
<?php

if(array_key_exists('state', $_REQUEST) && $_REQUEST['state'] !== $state) {
    throw new \Exception('State does not match.');
}

if(array_key_exists('code', $_REQUEST)) {
    $exchange = exchangeCode($_REQUEST['code']);
}

function exchangeCode($code) {
    $authHeaderSecret = base64_encode( '{CLIENT_ID}:{CLIENT_SECRET}' );
    $query = http_build_query([
        'grant_type' => 'authorization_code',
        'code' => $code,
        'redirect_uri' => 'http://localhost/login_callback.php'
    ]);
    $headers = [
        'Authorization: Basic ' . $authHeaderSecret,
        'Accept: application/json',
        'Content-Type: application/x-www-form-urlencoded',
        'Connection: close',
        'Content-Length: 0'
    ];
    $url = 'https://{yourOktaDomain}/oauth2/default/v1/token?' . $query;
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

The result of this will provide you with an access token for that user.

```php?start_inline=true
$jwt = $exchange->access_token;
```

This access token is a JWT and should be verified according to the process described in [Working With OAuth 2.0 Tokens](/authentication-guide/tokens/).  This verification can be done easily with the [Okta JWT Verifier for PHP](https://github.com/okta/okta-jwt-verifier-php).

### Handling Errors
If an error is present in the login, an `error` query parameter will be present.

```php?start_inline=true
if(array_key_exists('error', $_REQUEST)) {
    throw new \Exception($_REQUEST['error']);
}
```
