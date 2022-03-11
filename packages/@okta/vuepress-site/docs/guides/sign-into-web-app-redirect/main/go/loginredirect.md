1. Create a simple index template that includes a sign-in control to direct the user to your sign in route. Our example [`index.gohtml`](https://github.com/okta-samples/okta-go-gin-sample/blob/main/templates/index.gohtml) template includes a simple form:

```html
<form method="get" action="login">
  <button id="login-button" class="btn btn-primary" type="submit">Login</button>
</form>
```

2. Define the OAuth2 configuration for your project (this is defined in [`server/init.go`](https://github.com/okta-samples/okta-go-gin-sample/blob/main/server/init.go) in our sample):

```go
oktaOauthConfig = &oauth2.Config{
  RedirectURL:  "http://localhost:8080/authorization-code/callback",
  ClientID:     os.Getenv("OKTA_OAUTH2_CLIENT_ID"),
  ClientSecret: os.Getenv("OKTA_OAUTH2_CLIENT_SECRET"),
  Scopes:       []string{"openid", "profile", "email"},
  Endpoint: oauth2.Endpoint{
    AuthURL:   os.Getenv("OKTA_OAUTH2_ISSUER") + "/v1/authorize",
    TokenURL:  os.Getenv("OKTA_OAUTH2_ISSUER") + "/v1/token",
    AuthStyle: oauth2.AuthStyleInParams,
  },
}
```

3. Create a handler for the `/login` route that redirects the user to the Okta-hosted sign-in page (see [`server/init.go`](https://github.com/okta-samples/okta-go-gin-sample/blob/main/server/init.go)):

```go
router.GET("/login", LoginHandler)
```

4. Create the session store and handler function that performs the redirect (see [`server/controller.go`](https://github.com/okta-samples/okta-go-gin-sample/blob/main/server/controller.go)):

```go
var sessionStore = sessions.NewCookieStore([]byte("okta-hosted-login-session-store"))

func LoginHandler(c *gin.Context) {
	c.Header("Cache-Control", "no-cache") // See https://github.com/okta/samples-golang/issues/20

	session, err := sessionStore.Get(c.Request, "okta-hosted-login-session-store")
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}
	// Generate a random state parameter for CSRF security
	oauthState := randstr.Hex(16)

	// Create the PKCE code verifier
	oauthCodeVerifier := randstr.Hex(50)
	// create sha256 hash of the code verifier
	oauthCodeChallenge := generateOauthCodeChallenge(oauthCodeVerifier)

	session.Values["oauth_state"] = oauthState
	session.Values["oauth_code_verifier"] = oauthCodeVerifier

	session.Save(c.Request, c.Writer)

	redirectURI := oktaOauthConfig.AuthCodeURL(
		oauthState,
		oauth2.SetAuthURLParam("code_challenge", oauthCodeChallenge),
		oauth2.SetAuthURLParam("code_challenge_method", "S256"),
	)

	c.Redirect(http.StatusFound, redirectURI)
}

func generateOauthCodeChallenge(oauthCodeVerifier string) string {
	h := sha256.New()
	h.Write([]byte(oauthCodeVerifier))
	return base64.RawURLEncoding.EncodeToString(h.Sum(nil))
}
```
