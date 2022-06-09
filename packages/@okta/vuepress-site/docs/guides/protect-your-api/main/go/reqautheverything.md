1. Add a utility function to handle this (see [`server/middleware.go`](https://github.com/okta-samples/okta-go-api-sample/blob/main/server/middleware.go)). This checks whether a request is authenticated. Note that the JWT is added to the `http.Request` object.

   ```go
   func isAuthenticated(r *http.Request) bool {
     authHeader := r.Header.Get("Authorization")

     if authHeader == "" {
        log.Printf("Access token not found")
        return false
     }

     tokenParts := strings.Split(authHeader, "Bearer ")
     bearerToken := tokenParts[1]

     toValidate := map[string]string{}
     toValidate["aud"] = "api://default"

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

2. Create a middleware function that uses the above utility function to verify the token in the `Authorization` header. 

   ```go
   func AuthMiddleware() gin.HandlerFunc {
     return func(c *gin.Context) {
       if !isAuthenticated(c.Request) {
         log.Printf("Unauthorized route: %s", c.Request.URL.Path)
         c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized route"})
         return
       }

       c.Next()
     }
   }
   ```

3. Inside your routing code, register the middleware for all routes to the app instance.

   ```go
   router.Use(AuthMiddleware())
   ```
