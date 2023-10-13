When you [created an app integration in the Admin Console](#create-an-app-integration-in-the-admin-console), you set the sign-in redirect URL to <StackSnippet snippet="signinredirecturi" inline /> and the sign-out redirect URL to <StackSnippet snippet="signoutredirecturi" inline />. In this sample, only the sign-in callback requires additional code:

1. Add a route handler for `/authorization-code/callback` to `main()` in `main.go`:

   ```go
   http.HandleFunc("/authorization-code/callback", AuthCodeCallbackHandler)
   ```

1. Define the handler function:

   ```go
   func AuthCodeCallbackHandler(w http.ResponseWriter, r *http.Request) {
      // Check the state that was returned in the query string is the same as the above state
      if r.URL.Query().Get("state") != state {
         fmt.Fprintln(w, "The state wasn't as expected")
         return
      }
      // Make sure the code was provided
      if r.URL.Query().Get("code") == "" {
         fmt.Fprintln(w, "The code wasn't returned or isn't accessible")
         return
      }

      exchange := exchangeCode(r.URL.Query().Get("code"), r)
      if exchange.Error != "" {
         fmt.Println(exchange.Error)
         fmt.Println(exchange.ErrorDescription)
         return
      }

      session, err := sessionStore.Get(r, "okta-hosted-signin-session-store")
      if err != nil {
         http.Error(w, err.Error(), http.StatusInternalServerError)
      }

      _, verificationError := verifyToken(exchange.IdToken)

      if verificationError != nil {
         fmt.Println(verificationError)
      }

      if verificationError == nil {
         session.Values["id_token"] = exchange.IdToken
         session.Values["access_token"] = exchange.AccessToken

         session.Save(r, w)
      }

      http.Redirect(w, r, "/", http.StatusFound)
   }
   ```

1. The handler has two helper functions. The first, `exchangeCode()`, swaps the authorization code returned after the user signs in for ID and access tokens.

   ```go
   func exchangeCode(code string, r *http.Request) Exchange {
      authHeader := base64.StdEncoding.EncodeToString(
         []byte(os.Getenv("CLIENT_ID") + ":" + os.Getenv("CLIENT_SECRET")))

      q := r.URL.Query()
      q.Add("grant_type", "authorization_code")
      q.Set("code", code)
      q.Add("redirect_uri", "http://localhost:8080/authorization-code/callback")

      url := os.Getenv("ISSUER") + "/v1/token?" + q.Encode()

      req, _ := http.NewRequest("POST", url, bytes.NewReader([]byte("")))
      h := req.Header
      h.Add("Authorization", "Basic "+authHeader)
      h.Add("Accept", "application/json")
      h.Add("Content-Type", "application/x-www-form-urlencoded")
      h.Add("Connection", "close")
      h.Add("Content-Length", "0")

      client := &http.Client{}
      resp, _ := client.Do(req)
      body, _ := io.ReadAll(resp.Body)
      defer resp.Body.Close()
      var exchange Exchange
      json.Unmarshal(body, &exchange)

      return exchange
   }
   ```

1. The second helper function, `verifyToken()`, verifies that the tokens received aren't fraudulent.

   ```go
   func verifyToken(t string) (*verifier.Jwt, error) {
      tv := map[string]string{}
      tv["nonce"] = nonce
      tv["aud"] = os.Getenv("CLIENT_ID")
      jv := verifier.JwtVerifier{
         Issuer:           os.Getenv("ISSUER"),
         ClaimsToValidate: tv,
      }

      result, err := jv.New().VerifyIdToken(t)
      if err != nil {
         return nil, fmt.Errorf("%s", err)
      }

      if result != nil {
         return result, nil
      }

      return nil, fmt.Errorf("token could not be verified: %s", "")
   }
   ```
