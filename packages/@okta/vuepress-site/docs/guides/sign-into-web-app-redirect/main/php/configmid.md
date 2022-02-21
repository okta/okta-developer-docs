If you used the Okta CLI to create your app, it created an `.okta.env` file in your current directory. This file includes your Okta domain, client ID, and client secret.

1. Make a copy of `.okta.env` called `.env` in your project root and remove the `export` keywords so that the configuration is usable by the `phpdotenv` library. It should look like this:

```properties
OKTA_OAUTH2_ISSUER=https://${yourOktaDomain}/oauth2/${authorizationServerId}
OKTA_OAUTH2_CLIENT_ID=${clientId}
OKTA_OAUTH2_CLIENT_SECRET=${clientSecret}
```

2. Create a new folder called `public` with an empty file called `index.php` inside:

```bash
mkdir public
touch public/index.php
```

3. Set up a basic router and load the environment variables by adding the following code to the `index.php` file:

```php
<?php
require_once(__DIR__.'/../vendor/autoload.php');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__.'/..');
$dotenv->load();

session_start();

$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
switch($path) {

  // TODO: define routes here

}
```