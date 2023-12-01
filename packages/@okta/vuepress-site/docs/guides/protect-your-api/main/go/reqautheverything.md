You can use a middleware function to protect any endpoint so only authenticated users can access it.

1. Add a function `IsAuthenticated()` in `server\middleware.go` to check if a request is authenticated:

   ```go
   package server

   import (
      "log"
      "net/http"
      "os"
      "strings"

      "github.com/gin-gonic/gin"
      jwtverifier "github.com/okta/okta-jwt-verifier-golang"
   )

   func isAuthenticated(r *http.Request) bool {
      authHeader := r.Header.Get("Authorization")

      if authHeader == "" {
         log.Printf("Access token not found")
         return false
      }

      tokenParts := strings.Split(authHeader, "Bearer ")
      bearerToken := tokenParts[1]

      toValidate := map[string]string{}
      toValidate["aud"] = os.Getenv("OKTA_API_AUDIENCE")

      verifier := jwtverifier.JwtVerifier{
         Issuer:           os.Getenv("OKTA_OAUTH2_ISSUER"),
         ClaimsToValidate: toValidate,
      }
      _, err := verifier.New().VerifyAccessToken(bearerToken)

      if err != nil {
         log.Printf("Validation failed: %s", err.Error())
         return false
      }
      return true
   }
   ```

1. Add a middleware function that wraps `IsAuthenticated()` below it in `server\middleware.go`:

   ```go
   func AuthMiddleware() gin.HandlerFunc {
      return func(c *gin.Context) {
         if !isAuthenticated(c.Request) {
            log.Printf("Unauthorized route: %s", c.Request.URL.Path)
            c.AbortWithStatusJSON(
               http.StatusUnauthorized, gin.H{"error": "Unauthorized route"})
            return
         }

         c.Next()
      }
   }
   ```

1. Add the following code to your route handler in `server\init.go` to register the middleware for all endpoints. Include it after the call to `gin.Default()`:

   ```go
   router.Use(AuthMiddleware())
   ```
