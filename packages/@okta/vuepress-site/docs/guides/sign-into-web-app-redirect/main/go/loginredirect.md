Create a Sign in link to direct the user to your login route:

```html
<a href="/login">Sign in</a>
```

Next, create a handler for the `/login` route that will redirect the user to the Okta hosted login page. In `server/init.go`:

```go
router.GET("/login", LoginHandler)
```

In `server/controller.go`:

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
