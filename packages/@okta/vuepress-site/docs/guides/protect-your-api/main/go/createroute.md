Add the two routes to `main.go`:

```go
// Set the router as the default one shipped with Gin
router := gin.Default()

// setup public routes
router.GET("/", IndexHandler)

api := router.Group("/api")
api.GET("/hello", HelloHandler)

// setup private routes
authorized := router.Group("/api", AuthMiddleware())
authorized.GET("/whoami", WhoAmIHandler)

router.Run("localhost:8080")
```
> **Note**: For examples of what the handlers could look like, see our [finished sample contrroller file](https://github.com/okta-samples/okta-go-api-sample/blob/main/server/controller.go).
