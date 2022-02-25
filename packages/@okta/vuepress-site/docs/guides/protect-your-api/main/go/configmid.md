Add the issuer to an environment file, for example, `.okta.env`:

```
OKTA_OAUTH2_ISSUER="https://{yourOktaOrg}/oauth2/default"
```

Load this configuration in your application:

```go
godotenv.Load("./.okta.env")
```

Create a verifier instance bound to the issuer and set the audience.

```go
toValidate := map[string]string{}
toValidate["aud"] = "api://default"

verifier := jwtverifier.JwtVerifier{
  Issuer:           os.Getenv("OKTA_OAUTH2_ISSUER"),
  ClaimsToValidate: toValidate,
}
```
