There are two main options to configure CORS in Go:

1. You can add CORS headers manually to a route handler.
   1. Open `controller.go`
   1. Add the required CORS HTTP headers to the target handler. For example:

      ```go
      func HelloHandler(c *gin.Context) {
         c.Header("Access-Control-Allow-Origin", "*")
         c.JSON(http.StatusOK, gin.H{"message": "Hello world!"})
      }
      ```

1. You can use the [gin-cors](https://github.com/itsjamie/gin-cors) middleware.
   1. Install `gin-cors` as a dependency using `go get`:

      ```shell
      go get github.com/itsjamie/gin-cors
      ```

   1. Open `server\init.go` and update your import statement:

      ```go
      import (
         "log"
         "time"

         "github.com/gin-gonic/gin"
         cors "github.com/itsjamie/gin-cors"
         "github.com/joho/godotenv"
      )
      ```

   1. Add the following code to `Init()` in `server\init.go`. Include it after the call to `gin.Default()`:

      ```go
      // Apply the middleware to the router (works with groups too)
      router.Use(cors.Middleware(cors.Config{
         Origins:         "*",
         Methods:         "GET, PUT, POST, DELETE",
         RequestHeaders:  "Origin, Authorization, Content-Type",
         ExposedHeaders:  "",
         MaxAge:          50 * time.Second,
         Credentials:     false,
         ValidateHeaders: false,
      }))
      ```

   In this example, CORS is now enabled for all routes. If needed, you can choose to enable it only for certain endpoints.
