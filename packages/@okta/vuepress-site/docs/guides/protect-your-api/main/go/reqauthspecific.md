1. Remove the call to register the middleware for all routes in the app instance.

2. Add the middleware to the specific route group that requires authentication.

```go
api := router.Group("/api")
api.GET("/hello", HelloHandler)

// setup private routes
authorized := router.Group("/api", AuthMiddleware())
authorized.GET("/whoami", WhoAmIHandler)
```
