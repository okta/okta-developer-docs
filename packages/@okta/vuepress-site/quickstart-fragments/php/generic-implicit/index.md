---
exampleDescription: PHP Implicit Example
---

## Okta PHP Quickstart

Now that your clients can get tokens, let's validate those tokens on your server.

When a request is made to the messages api of your PHP application, we need to get the bearer token from the
authorization header and validate that the token. If the token is valid, we can reply with the messages we want to
provide to the user, if not, we should return a 401 to let the front end know that the request could not be authorized.

> NOTE: The rest of this quickstart assumes that you have an understand of PHP and composer. You should have at least
 PHP7 and the latest version of composer installed on your computer. Your project should contain a `composer.json`
 file that is ready to have dependencies installed.
>
> If you would prefer to download a complete sample application instead, please visit [PHP Sample Applications for Okta][] and follow those instructions.

## Installing Dependencies
There are a few libraries you will need to install in order for us to verify the token that is provided in the
Authorization header. We have created a JWT verifier library to help you decode and verify JWTs (which is how the
authroization token will be provided).

```bash
composer require okta/jwt-verifier
```

The JWT Verifier package that you have just installed is built as a wrapper around some of the popular PHP libraries.
 The rest of this quickstart will assume that we are using the [spomky-labs/jose](https://packagist.org/packages/spomky-labs/jose).
The package is also built to allow you to use any PSR-7 compliant library for making http requests. The rest of this
quickstart will assume the use of the [guzzlehttp/psr7](https://packagist.org/packages/guzzlehttp/psr7) library.
Let's install these two packages with composer.

```bash
composer require spomky-labs/jose guzzlehttp/psr7
```

## Messages API
Our client side application is going to be sending us a call to an api endpoint to get messages. In our example below,
 we will not be using a router, so we need to change the endpoint of the fetch call in our client application code.
 In your client side app, we need to change `/api/messages` to `/api/messages.php`. Once you are done, create the
 file `/api/messages.php`

Our first step is to include the composer autoload file.  In your new `messages.php` file, add the following:

> NOTE: All code blocks will be added progressively to the file. The full file is provided at the end of this quickstart.

```php?start_inline=true
require __DIR__ . '/../vendor/autoload.php'; // This path may be different for you.
```

Next, we need to make sure that the authorization header is present, but we also need to ignore any `prefetch`
requests that have a request method of `OPTIONS`. We do this because the modern browsers will prefetch the page to
get all available options, but will not send the authorization header. If we return a `401 Unauthorized` during the
prefetch, the client side application will quit trying to make the call, and will no longer respond to the messages
api.

```php?start_inline=true
// Don't do anything for prefetch requests.
if ( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
    return false;
}

// Make sure the authorization header is available, if not return 401.
if ( ! isset( $_SERVER['HTTP_AUTHORIZATION'] ) ) {
    return http_response_code( 401 );
}
```

Now that we have ignored any requests for `OPTIONS` (prefetch requests) and made sure that the authorization header
is present, we can now begin our verification process.  First, we set up some variables to store some information in.
 Next we extract the authentication type and the token from the Authorization header then we need to make sure that
 the authentication type is a Bearer token.

```php?start_inline=true
$authType = null;
$authData = null;

// Extract the auth type and the data from the Authorization header.
list( $authType, $authData ) = explode( " ", $_SERVER['HTTP_AUTHORIZATION'], 2 );

// If the Authorization Header is not a bearer type, return a 401.
if ( $authType != 'Bearer' ) {
    return http_response_code( 401 );
}

```

Now we are ready to use our verifier library to make sure the token is valid. The library only requires a few options
 to be set. Full documentation can be found in our [github repository](https://github.com/okta/okta-jwt-verifier-php).
 All of this will be wrapped inside of a try catch block. If there are any exceptions, we will respond with a `401
 Unauthorized` to tell the client there was an issue.

{% include domain-admin-warning.html %}

```php?start_inline=true
try {
    // Setup the JWT Verifier.
    $jwtVerifier = ( new \Okta\JwtVerifier\JwtVerifierBuilder() )
        ->setAdaptor( new \Okta\JwtVerifier\Adaptors\SpomkyLabsJose() )
        ->setClientId( '{clientId}' )
        ->setIssuer( 'https://{yourOktaDomain}/oauth2/default' )
        ->build();

    // Verify the JWT from the Authorization Header.
    $jwt = $jwtVerifier->verify( $authData );
} catch (\Exception $e) {
    // We encountered an error, return a 401.
    return http_response_code( 401 );
}
```

Finally, if we have made it to this point, everything checks out and you can respond with the messages you want to
supply the client application.

```php?start_inline=true
//JWT is valid!
print json_encode([
    'messages' => [
        'message 1',
        'message 2'
    ]
]);
```

All that is left is to start the php server and try it out. To start your PHP server, and to make sure everything
works with the proxy of the client code, you can run the following:

```bash
php -S 0.0.0.0:8000
```

> NOTE: The port used above should match the port you specified in the proxy setup. The important part here is that
you use `0.0.0.0` for the host instead of `localhost` or `127.0.0.1`.  If you run into an issue where the browser
console is reporting `Proxy error: Could not proxy request /api/messages.php from localhost:3000 to
http://localhost:8000.` or similar, close our of both servers (the client server and PHP) and make sure your proxy
port match and that you are using `0.0.0.0` when starting the PHP server.

#### Full Messages API

```php
<?php

// /api/messages.php

require __DIR__ . '/../vendor/autoload.php';

// Don't do anything for prefetch requests.
if ( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
    return false;
}

// Make sure the authorization header is available, if not return 401.
if (!isset( $_SERVER['HTTP_AUTHORIZATION'] ) ) {
    return http_response_code( 401 );
}

$authType = null;
$authData = null;

// Extract the auth type and the data from the Authorization header.
list( $authType, $authData ) = explode( " ", $_SERVER['HTTP_AUTHORIZATION'], 2 );

// If the Authorization Header is not a bearer token, return a 401.
if ( $authType != 'Bearer' ) {
    return http_response_code( 401 );
}

try {
    // Setup the JWT Verifier.
    $jwtVerifier = ( new \Okta\JwtVerifier\JwtVerifierBuilder() )
        ->setAdaptor( new \Okta\JwtVerifier\Adaptors\SpomkyLabsJose() )
        ->setClientId( '{clientId}' )
        ->setIssuer( 'https://{yourOktaDomain}/oauth2/default' )
        ->build();

    // Verify the JWT from the Authorization Header.
    $jwt = $jwtVerifier->verify( $authData );

} catch (\Exception $e) {
    // We encountered an error, return a 401.
    return http_response_code( 401 );
}

//JWT is valid!
print json_encode([
    'messages' => [
        'message 1',
        'message 2'
    ]
]);
```

[PHP Sample Applications for Okta]: https://github.com/okta/samples-php
