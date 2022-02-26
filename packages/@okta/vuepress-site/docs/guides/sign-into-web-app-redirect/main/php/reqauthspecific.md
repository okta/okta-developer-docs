1. Define a new function (`require_login()`) and move the code that checks for the ID token in the session into that function:

```php
function require_login() {
  if(empty($_SESSION['okta_id_token'])) {
    ?>
      <a href="/login">Log In</a>
    <?php
    die();
  }  
}
```

2. Call the `require_login()` function from any specific route that you want protected, for example calling it inside your `index()` function protects the home page:

```php
function index() {
  require_login();
  ...
}
```