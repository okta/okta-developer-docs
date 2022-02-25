Add the two routes to the application:

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

```
