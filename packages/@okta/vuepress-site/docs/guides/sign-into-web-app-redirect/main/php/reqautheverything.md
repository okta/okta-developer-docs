The framework that you're using determines how to implement this. For example, with the minimal `switch` statement router, check for the ID token in the session before the router and show the sign-in link if it's missing:

```php
if(empty($_SESSION['okta_id_token'])) {
  ?>
    <a href="/signin">Sign In</a>
  <?php
  die();
}

$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
switch($path) {
```
