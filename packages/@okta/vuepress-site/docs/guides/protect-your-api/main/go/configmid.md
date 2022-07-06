1. Add your issuer value to an environment file inside your project root, for example, `.okta.env`, remembering to replace the placeholder with your own value:

   ```
   OKTA_OAUTH2_ISSUER="https://${yourOktaDomain}/oauth2/default"
   ```

2. Load this configuration (for example we handle it in [`server/init.go`](https://github.com/okta-samples/okta-go-api-sample/blob/main/server/init.go)):

   ```go
   godotenv.Load("./.okta.env")
   ```

3. Create a verifier instance bound to the issuer and set the audience. We handle this inside a function called `isAuthenticated`; see the full listing in [Require authorization for everything](#require-authorization-for-everything).

   ```go
   toValidate := map[string]string{}
   toValidate["aud"] = "api://default"

   verifier := jwtverifier.JwtVerifier{
     Issuer:           os.Getenv("OKTA_OAUTH2_ISSUER"),
     ClaimsToValidate: toValidate,
   }
   ```
