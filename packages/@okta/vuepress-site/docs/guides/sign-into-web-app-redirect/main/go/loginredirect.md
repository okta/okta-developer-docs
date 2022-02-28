1. Create a simple index template that includes a sign-in control to direct the user to your sign in route. Our example [`index.gohtml`](https://github.com/okta-samples/okta-go-gin-sample/blob/main/templates/index.gohtml) template includes a simple form:

```html
<form method="get" action="login">
  <button id="login-button" class="btn btn-primary" type="submit">Login</button>
</form>
```

2. Create a handler for the `/login` route that redirects the user to the Okta-hosted sign-in page (see [`server/init.go`](https://github.com/okta-samples/okta-go-gin-sample/blob/main/server/init.go)):

```go
router.GET("/login", LoginHandler)
```

3. Create the handler function that performs the redirect (see [`server/controller.go`](https://github.com/okta-samples/okta-go-gin-sample/blob/main/server/controller.go)):

```go
func LoginHandler(c *gin.Context) {
    c.Header("Cache-Control", "no-cache")

    nonce = base64.URLEncoding.EncodeToString(randstr.Bytes(32))

    q := url.Values{}
    q.Add("client_id", os.Getenv("OKTA_OAUTH2_CLIENT_ID"))
    q.Add("response_type", "code")
    q.Add("response_mode", "query")
    q.Add("scope", "openid profile email")
    q.Add("redirect_uri", "http://localhost:8080/authorization-code/callback")
    q.Add("state", state)
    q.Add("nonce", nonce)

    location := url.URL{Path: os.Getenv("OKTA_OAUTH2_ISSUER") + "/v1/authorize", RawQuery: q.Encode()}
    c.Redirect(http.StatusFound, location.RequestURI())
}
```