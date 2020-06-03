In order to handle auth for all routes within a group, you need to wrap the previous function into middleware:

```go
func AuthMiddleware(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    authHeader := r.Header.Get("Authorization")
    if authHeader == "" {
      return false
    }
    tokenParts := strings.Split(authHeader, "Bearer ")
    bearerToken := tokenParts[1]
    toValidate := map[string]string{}
    toValidate["aud"] = "api://default"
    toValidate["cid"] = "{CLIENT_ID}"
    jwtVerifierSetup := jwtverifier.JwtVerifier{
            Issuer: "https://${yourOktaDomain}/oauth2/default",
            ClaimsToValidate: toValidate
    }
    _, err := jwtVerifierSetup.New().VerifyAccessToken(bearerToken)
    if err != nil {
      return
    }
    next.ServeHTTP(w, r)
  })
}
```

Then you can use the middleware in your handler:

```go
http.Handle("/order/{id:[0-9]+}",Middleware(
    http.HandlerFunc(OrderHandler),
    AuthMiddleware,
)))
```
