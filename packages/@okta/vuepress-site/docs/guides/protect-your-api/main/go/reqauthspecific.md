1. Remove the call to register the middleware for all routes in the app instance.

2. Add the middleware to the specific route group that requires authentication. Update the existing `authorized := router.Group("/api")` line to the following:

```go
authorized := router.Group("/api", AuthMiddleware())
```
