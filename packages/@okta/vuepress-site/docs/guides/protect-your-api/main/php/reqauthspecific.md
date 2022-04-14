Delete or comment out the code block you added above that calls `hasValidAccessToken()` and instead move that into the particular API routes that you want to protect. For example, you can protect only the `whoami` route and output the claims of the access token. Replace your `whoami` function with the following:

```php
function whoami() {
  $token = hasValidAccessToken();

  if(!$token) {
    header(HTTP/1.1 401 Unauthorized');
    echo "Unauthorized";
    die();
  }

  header('Content-type: application/json');
  echo json_encode($token->all());
}
```
