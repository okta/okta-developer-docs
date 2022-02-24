To handle anonymous access:

1. Remove the call to register the `ensureLoggedIn()` middleware for all routes in the app instance.
1. Add the middleware to the specific routes that require authentication.
