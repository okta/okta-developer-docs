You can use a middleware function to protect any endpoint so only authenticated users can access it.

1. Add a function `IsAuthenticated()` in `main.go` to check the user's status:

   ```go
   func isAuthenticated(r *http.Request) bool {
      session, err := sessionStore.Get(r, "okta-hosted-signin-session-store")

      if err != nil || session.Values["id_token"] == nil || session.Values["id_token"] == "" {
         return false
      }

      return true
   }
   ```

1. Add a middleware function that wraps `IsAuthenticated()`:

   ```go
   func middleware(next http.Handler) http.Handler {
      return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
         if !isAuthenticated(c.Request) {
            log.Printf("Unauthorized route: %s", c.Request.URL.Path)
            c.Redirect(http.StatusFound, "/login")
            return
         }
         next.ServeHTTP(w, r)
      })
   }
   ```

1. Change your route handler to wrap the handler function in the middleware:

   ```go
   http.Handle("/profile", middleware(http.HandlerFund(ProfileHandler)))
   ```
