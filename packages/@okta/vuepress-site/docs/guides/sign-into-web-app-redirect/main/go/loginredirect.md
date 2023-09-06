Create a link for the user to start the sign-in process and be redirected to Okta.

1. Open the **templates** > **home.gohtml** file.
1. Add the code for a sign-in and a sign-out link.

   ```html
   {{if .IsAuthenticated}}
   <div>
      <p>Hello <span>{{.Profile.name}}</span>!</p>
      <p>Visit your <a href="profile">Profile</a> page.</p>
      <form method="post" action="/signout">
         <button id="signout-button" type="submit">Sign out</button>
    </form>
   </div>
   {{else}}
   <div>
      <p>Hello!</p>
      <form method="get" action="/signin">
         <button id="signin-button" type="submit">Sign in</button>
   </form>
   {{end}}
   ```

1. Add code to handle the `Sign In` click.
   1. Add a route handler for `/signin` to `main()` in `main.go`:

      ```go
      http.HandleFunc("/signin", SigninHandler)
      ```

   1. Add the handler function that performs the redirect:

      ```go
      func SigninHandler(w http.ResponseWriter, r *http.Request) {
         w.Header().Add("Cache-Control", "no-cache")

         nonce, _ = oktaUtils.GenerateNonce()
         var redirectPath string

         q := r.URL.Query()
         q.Add("client_id", os.Getenv("CLIENT_ID"))
         q.Add("response_type", "code")
         q.Add("response_mode", "query")
         q.Add("scope", "openid profile email")
         q.Add("redirect_uri", "http://localhost:8080/authorization-code/callback")
         q.Add("state", state)
         q.Add("nonce", nonce)

         redirectPath = os.Getenv("ISSUER") + "/v1/authorize?" + q.Encode()

         http.Redirect(w, r, redirectPath, http.StatusFound)
      }
      ```

   1. Create a function to generate a **nonce** value for the process. This is a string value that associates the user's session with their ID token when returned. Create `utils\nonce.go` and implement this function:

      ```go
      package utils

      import (
         "crypto/rand"
         "encoding/base64"
         "fmt"
      )

      func GenerateNonce() (string, error) {
         nonceBytes := make([]byte, 32)
         _, err := rand.Read(nonceBytes)
         if err != nil {
            return "", fmt.Errorf("couldn't generate nonce")
         }

         return base64.URLEncoding.EncodeToString(nonceBytes), nil
      }
      ```

1. Add code to handle the `Sign Out` click.
   1. Add a route handler for `/signout` to `main()` in `main.go`:

      ```go
      http.HandleFunc("/signout", SignoutHandler)
      ```

   1. Add the handler function. To sign a user out, the function must delete the ID and access tokens that Okta issued when the user signed in:

      ```go
      func SignoutHandler(w http.ResponseWriter, r *http.Request) {
         session, err := sessionStore.Get(r, "okta-hosted-signin-session-store")
         if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
         }

         delete(session.Values, "id_token")
         delete(session.Values, "access_token")

         session.Save(r, w)

         http.Redirect(w, r, "/", http.StatusFound)
      }
      ```
