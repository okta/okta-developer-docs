Enabling CORS in PHP requires you to add a header before any responses are sent:

```php
header("Access-Control-Allow-Origin: *");
```

> NOTE: Most request/response handlers in PHP will give you a method to add this header. This is highly dependant on the package you are using, so check the documentation for your specific package.
