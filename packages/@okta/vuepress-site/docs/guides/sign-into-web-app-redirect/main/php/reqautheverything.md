The way that you protect every route is different depending on the framework you are using. In this example, with the minimal `switch` statement router, check for the ID token in the session before the router and show the log-in link if it's missing.

This can be handled as follows:

```php
if(empty($_SESSION['okta_id_token'])) {
  ?>
    <a href="/login">Log In</a>
  <?php
  die();
}

$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
switch($path) {
```