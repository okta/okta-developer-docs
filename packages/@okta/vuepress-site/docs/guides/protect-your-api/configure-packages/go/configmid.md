Create a verifier instance, bound to the issuer:

```go
toValidate := map[string]string{}
toValidate["aud"] = "api://default"
toValidate["cid"] = "{CLIENT_ID}"

jwtVerifierSetup := jwtverifier.JwtVerifier{
        Issuer: "https://${yourOktaDomain}/oauth2/default",
        ClaimsToValidate: toValidate
}
```
