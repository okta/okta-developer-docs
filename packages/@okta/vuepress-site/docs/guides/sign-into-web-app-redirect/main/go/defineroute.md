1. To set up the callback route you need to define a handler (this is defined in [`server/init.go`](https://github.com/okta-samples/okta-go-gin-sample/blob/main/server/init.go) in our sample):

   ```go
   router.GET("/authorization-code/callback", AuthCodeCallbackHandler)
   ```

2. Define the handler function and helper methods (see [`server/controller.go`](https://github.com/okta-samples/okta-go-gin-sample/blob/main/server/controller.go)):

    ```go
    func AuthCodeCallbackHandler(c *gin.Context) {
      session, err := sessionStore.Get(c.Request, "okta-hosted-login-session-store")
      if err != nil {
        c.AbortWithError(http.StatusForbidden, err)
        return
      }

      // Check the state that was returned in the query string is the same as the above state
      if c.Query("state") == "" || c.Query("state") != session.Values["oauth_state"] {
        c.AbortWithError(http.StatusForbidden, fmt.Errorf("The state was not as expected"))
        return
      }

      // Make sure the code was provided
      if c.Query("error") != "" {
        c.AbortWithError(http.StatusForbidden, fmt.Errorf("Authorization server returned an error: %s", c.Query("error")))
        return
      }

      // Make sure the code was provided
      if c.Query("code") == "" {
        c.AbortWithError(http.StatusForbidden, fmt.Errorf("The code was not returned or is not accessible"))
        return
      }

      token, err := oktaOauthConfig.Exchange(
        context.Background(),
        c.Query("code"),
        oauth2.SetAuthURLParam("code_verifier", session.Values["oauth_code_verifier"].(string)),
      )
      if err != nil {
        c.AbortWithError(http.StatusUnauthorized, err)
        return
      }

      // Extract the ID Token from OAuth2 token.
      rawIDToken, ok := token.Extra("id_token").(string)
      if !ok {
        c.AbortWithError(http.StatusUnauthorized, fmt.Errorf("Id token missing from OAuth2 token"))
        return
      }
      _, err = verifyToken(rawIDToken)

      if err != nil {
        c.AbortWithError(http.StatusForbidden, err)
        return
      } else {
        session.Values["access_token"] = token.AccessToken
        session.Save(c.Request, c.Writer)
      }

      c.Redirect(http.StatusFound, "/")
    }

    func verifyToken(t string) (*verifier.Jwt, error) {
      tv := map[string]string{}
      tv["aud"] = os.Getenv("OKTA_OAUTH2_CLIENT_ID")
      jv := verifier.JwtVerifier{
        Issuer:           os.Getenv("OKTA_OAUTH2_ISSUER"),
        ClaimsToValidate: tv,
      }

      result, err := jv.New().VerifyIdToken(t)
      if err != nil {
        return nil, fmt.Errorf("%s", err)
      }

      if result != nil {
        return result, nil
      }

      return nil, fmt.Errorf("token could not be verified")
    }
    ```
