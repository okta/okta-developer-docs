This code uses the [Okta JWT Verifier for Golang](https://github.com/okta/okta-jwt-verifier-golang).

For any access token to be valid, the following must be asserted:

- Signature is valid. The private key signed the token, and this private key has a corresponding public key in the JWKS response from the authorization server.
- Access token isn't expired. This requires the local system time to be in sync with Okta and checks the `exp` claim of the access token.
- The `aud` claim in the JWT matches any expected `aud` claim passed in `ClaimsToValidate` during setup.
- The `iss` claim matches the issuer that the verifier is constructed with.
- Custom claim assertions that you add are confirmed.

```go
import github.com/okta/okta-jwt-verifier-golang

toValidate := map[string]string{}
toValidate["aud"] = "api://default"
toValidate["cid"] = "{clientId}"

jwtVerifierSetup := jwtverifier.JwtVerifier{
        Issuer: "{issuer}",
        ClaimsToValidate: toValidate
}

verifier := jwtVerifierSetup.New()

token, err := verifier.VerifyAccessToken("{JWT}")
```

You may need to adjust your clock skew leeway. Okta defaults to a `PT2M` clock skew adjustment in our validation. You can adjust this to your needs by setting the `SetLeeway` in seconds after getting a new instance of the verifier:

```go
jwtVerifierSetup := JwtVerifier{
        Issuer: "{issuer}",
}

verifier := jwtVerifierSetup.New()
verifier.SetLeeway(60) // seconds
```
