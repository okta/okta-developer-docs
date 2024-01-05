1. Start your app with the built-in PHP server:

   ```bash
   php -S 127.0.0.1:8080 -t public
   ```

1. Open a browser and go to `http://localhost:8080`.
1. Click **Sign In**. The browser redirects you to Okta to sign in using the Sign-In Widget.
1. After you've signed in, check that your user's name appears.

> **Note**: If you're signed in as an administrator in the same browser already, it displays your name. You can open an incognito window and create a test user in the Admin Console to use.

### Troubleshooting

When troubleshooting errors in `authorization_code_callback_handler()`, use `var_dump()` to echo the response to a token request to the page. For example:

```php
if(isset($response['error'])) {
    var_dump($response);
    throw new Exception("token endpoint returned an error: ".$response['error']);
}

if(!isset($response['access_token'])) {
    var_dump($response);
    throw new Exception("token endpoint didn't return an error or an access token");
}
```

Use the [/token](/docs/reference/api/oidc/#token) reference docs to understand the issue. If the response is `NULL`, echo the response from the curl call to the page:

```php
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
    'grant_type' => 'authorization_code',
    'code' => $_GET['code'],
    'code_verifier' => $_SESSION['oauth_code_verifier'],
    'redirect_uri' => $_ENV['OKTA_OAUTH2_REDIRECT_URI'],
    'client_id' => $_ENV['OKTA_OAUTH2_CLIENT_ID'],
    'client_secret' => $_ENV['OKTA_OAUTH2_CLIENT_SECRET'],
]));
$data = curl_exec($ch);
var_dump($data);
echo $token_endpoint."\n";
echo curl_error($ch)."\n";
$response = json_decode($data, true);
```
