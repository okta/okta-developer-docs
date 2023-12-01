1. Open the **server** > **init.go** file.
1. Add the code for the endpoints to the `Init()` function after the call to `godotenv.Load()`:

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

1. Add the code for the route handlers to `server/controller.go`:

   ```go
   package server

   import (
      "net/http"
      "github.com/gin-gonic/gin"
   )

   // IndexHandler serves the index route
   func IndexHandler(c *gin.Context) {
      c.JSON(http.StatusOK, gin.H{"message": "You have reached the index"})
   }

   func HelloHandler(c *gin.Context) {
      c.JSON(http.StatusOK, gin.H{"message": "Hello world!"})
   }

   func WhoAmIHandler(c *gin.Context) {
      c.JSON(http.StatusOK, gin.H{"message": "You are a super developer"})
   }
   ```
