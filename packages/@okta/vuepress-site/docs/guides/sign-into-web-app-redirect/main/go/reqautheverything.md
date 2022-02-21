You can add a Gin middleware to handle this. For example, add the below in `server/middleware.go`:

```go
func isAuthenticated(r *http.Request) bool {
    session, err := sessionStore.Get(r, "okta-hosted-login-session-store")

    if err != nil || session.Values["access_token"] == nil || session.Values["access_token"] == "" {
        log.Printf("Access token not found")
        return false
    }

    bearerToken := session.Values["access_token"].(string)
    toValidate := map[string]string{}
    toValidate["aud"] = "api://default"
    toValidate["cid"] = os.Getenv("OKTA_OAUTH2_CLIENT_ID")

    verifier := jwtverifier.JwtVerifier{
        Issuer:           os.Getenv("OKTA_OAUTH2_ISSUER"),
        ClaimsToValidate: toValidate,
    }
    _, err = verifier.New().VerifyAccessToken(bearerToken)

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
            c.AbortWithError(http.StatusUnauthorized, fmt.Errorf("Unauthorized route"))
            return
        }

        c.Next()
    }
}
```

Now, define a router group and add all the routes that needs to be authenticated to this group

```go
// setup public routes
router.GET("/login", LoginHandler)
router.GET("/authorization-code/callback", AuthCodeCallbackHandler)
router.GET("/", IndexHandler)

// setup private routes
authorized := router.Group("/", AuthMiddleware())

authorized.POST("/logout", LogoutHandler)
authorized.GET("/profile", ProfileHandler)
authorized.GET("/another-route", RouteHandler)
```

The `isAuthenticated()` method can also be used to check if a user is authenticated and show additional data like below:

```go
func IndexHandler(c *gin.Context) {
    …

    c.HTML(
        …
        gin.H{
            "Profile":         profile,
            "IsAuthenticated": isAuthenticated(c.Request),
            "Error":           errorMsg,
        },
    )
}
```
