Add the two routes to your app (our routing is handled inside [`server/init.go`](https://github.com/okta-samples/okta-go-api-sample/blob/02c9c1daef0a59bdbf531c0d67f086c99f4a1090/server/init.go)):

```go
// Set the router as the default one shipped with Gin
router := gin.Default()

// setup public routes
router.GET("/", IndexHandler)

api := router.Group("/api")
api.GET("/hello", HelloHandler)

// setup private routes
authorized := router.Group("/api")
authorized.GET("/whoami", WhoAmIHandler)

router.Run(":8080")
```

> **Note**: For examples of what the handlers could look like, see our [finished sample controller file](https://github.com/okta-samples/okta-go-api-sample/blob/main/server/controller.go).
