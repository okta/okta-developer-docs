Create a verifier instance, bound to the issuer:

```py
jwt_verifier = JWTVerifier(issuer="https://${yourOktaDomain}/oauth2/default",
                           client_id="${yourClientID}",
                           audience='api://default')
```
