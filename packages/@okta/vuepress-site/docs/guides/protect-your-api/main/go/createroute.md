Add the two routes to `main.go`:

```go
// Set the router as the default one shipped with Gin
router := gin.Default()

// setup public routes
router.GET("/", func(c *gin.Context) {
  c.String(200, "Hello World!")
})

api := router.Group("/api")
api.GET("/hello", func(c *gin.Context) {
  c.String(200, "Hello World!")
})

// setup private routes
authorized := router.Group("/api")
authorized.GET("/whoami", WhoAmIHandler)

router.Run("localhost:8080")
```