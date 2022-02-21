1. Create a middleware method to verify the token in the `Authorization` header. The JWT is added to the `http.Request` object.

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

2. Register the middleware for all routes to the app instance.

```go
router.Use(AuthMiddleware())
```
