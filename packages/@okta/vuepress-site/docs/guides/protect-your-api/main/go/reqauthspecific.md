1. Remove the call to register the middleware for all endpoints from `server\init.go`.

1. Add the middleware to the specific route group that requires authentication, for example:

   ```go
   authorized := router.Group("/api", AuthMiddleware())
   ```
