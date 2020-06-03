For example, you could require authentication for all routes under `/api/private` by defining a new function:

```go
func isAuthenticated(r *http.Request) bool {
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
		return false
	}

	return true
}
```

and then in your route, you would call this function to confirm authorization

```go
if !isAuthenticated(req) {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("401 - You are not authorized for this request"))
		return
}
```
