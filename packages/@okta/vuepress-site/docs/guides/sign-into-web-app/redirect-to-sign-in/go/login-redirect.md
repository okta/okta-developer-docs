You can give the user a **Sign In** button or link to direct the user to your login route:

```html
<a href="/login">Sign In</a>
```

Your login handler will generate the link and redirect the user to Okta:

```go
http.HandleFunc("/login", LoginHandler)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
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

	http.Redirect(w, r, redirectPath, http.StatusMovedPermanently)
}
```
