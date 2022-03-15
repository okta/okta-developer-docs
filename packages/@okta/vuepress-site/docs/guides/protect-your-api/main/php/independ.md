This guide uses several libraries that you need to install before continuing. The easiest way to install these libraries is to use [Composer](https://getcomposer.org), so install that on your system before continuing to install the dependencies.

Install the `phpdotenv` library to manage the config file for this project.

```bash
composer require vlucas/phpdotenv ^5.4
```

Next, install the Web Token JWT library:

```bash
composer require web-token/jwt-easy ^2
composer require web-token/jwt-signature-algorithm-rsa ^2
```

To fetch Okta's JWT signing keys, this quickstart uses the Guzzle HTTP client:

```bash
composer require guzzlehttp/guzzle ^7
```

As explained later, it's a good idea to cache the public key to speed up access token validation. You should probably use whatever caching mechanism is available in the particular framework you're using for your API, but to keep things simple, this quickstart uses a file-based cache.

```bash
composer require kodus/file-cache ^1
```
