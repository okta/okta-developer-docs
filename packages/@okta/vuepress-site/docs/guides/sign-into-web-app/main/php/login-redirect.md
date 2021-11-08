You can give the user a **Sign In** button or link to direct the user to your login route:

```html
<a href="/login">Sign In</a>
```

Your login handler will generate the link and redirect the user to Okta:

```php
$route->get('/login', function() use ($state) {
        $query = http_build_query([
            'client_id' => getenv('CLIENT_ID'),
            'response_type' => 'code',
            'response_mode' => 'query',
            'scope' => 'openid profile',
            'redirect_uri' => 'http://localhost:8080/authorization-code/callback',
            'state' => $state
        ]);

        header('Location: ' . getenv("ISSUER").'/v1/authorize?'.$query);
    });
```

- `$route` is used here as an instance of your router. For ease of this sample, we are using [FastRoute](https://github.com/nikic/FastRoute)
- `$state` is an arbitrary alphanumeric string that the Authorization Server reproduces when redirecting the user agent back to the client. This is used to help prevent cross-site request forgery.
