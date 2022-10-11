This guide uses several libraries that you need to install before continuing. The easiest way to install these libraries is to use [Composer](https://getcomposer.org), so install that on your system before continuing to install the dependencies.

1. Install the `phpdotenv` library to manage the config file for this project.

	```bash
	composer require vlucas/phpdotenv ^5.4
	```

2. Next, install the Firebase JWT library

	```bash
	composer require firebase/php-jwt ^6.3
	```

3. To fetch Okta's JWT signing keys, this quickstart uses the Guzzle HTTP client

	```bash
	composer require guzzlehttp/guzzle ^7
	```

4. As explained later, it's a good idea to cache the public key to speed up access token validation. You should probably use whatever caching mechanism is available in the particular framework you're using for your API, but to keep things simple, this quickstart uses a file-based cache using phpfastcache.

	```bash
  composer require phpfastcache/phpfastcache ^9.1
  composer require guzzlehttp/psr7 ^2.4
	```
