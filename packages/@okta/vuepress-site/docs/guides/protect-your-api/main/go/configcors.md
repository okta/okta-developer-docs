To configure CORS in Go, there are a couple of main options. You can set some headers on your response in the route handler:

```go
func RouteHandler(c *gin.Context) {
  c.Header("Access-Control-Allow-Origin", "*")

  // add rest of your handler here
}
```

You can also do this with the [gin-cors](https://github.com/itsjamie/gin-cors) middleware. We recommend this for a more practical approach.

1. Add `gin-cors` as a dependency like you did with the others.

2. Add the following to your routing code:

   ```go
   // Apply the middleware to the router (works with groups too)
   router.Use(cors.Middleware(cors.Config{
      Origins:         "*",
      Methods:         "GET, PUT, POST, DELETE",
      RequestHeaders:  "Origin, Authorization, Content-Type",
      ExposedHeaders:  "",
      MaxAge:          50 * time.Second,
      Credentials:     true,
      ValidateHeaders: false,
   }))
   ```