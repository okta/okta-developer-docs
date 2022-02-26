1. Add your issuer value to an environment file inside your project root, for example, `.okta.env`, remembering to replace the placeholder with your own value:

```
OKTA_OAUTH2_ISSUER="https://{yourOktaOrg}/oauth2/default"
```

2. Load this configuration into `main.go`:

```go
godotenv.Load("./.okta.env")
```

3. Create a verifier instance bound to the issuer and set the audience.

```go
toValidate := map[string]string{}
toValidate["aud"] = "api://default"

verifier := jwtverifier.JwtVerifier{
  Issuer:           os.Getenv("OKTA_OAUTH2_ISSUER"),
  ClaimsToValidate: toValidate,
}
```
