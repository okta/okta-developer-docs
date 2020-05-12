See the instructions for the [Okta JWT Verifier for Java](https://github.com/okta/okta-jwt-verifier-java).

### Required Libraries

To validate a JWT, you will need the Okta JWT Verifier for Java library.

Include the lines below in your Maven `pom.xml`:

```xml
<dependency>
   <groupId>com.okta.jwt</groupId>
   <artifactId>okta-jwt-verifier</artifactId>
   <version>${okta-jwt.version}</version>
</dependency>
  
<dependency>
  <groupId>com.okta.jwt</groupId>
  <artifactId>okta-jwt-verifier-impl</artifactId>
  <version>${okta-jwt.version}</version>
  <scope>runtime</scope>
</dependency>
```

### Validate Access Token

Create the Okta JWT Verifier using the `JwtVerifiers` class:

```java
AccessTokenVerifier jwtVerifier = JwtVerifiers.accessTokenVerifierBuilder()
    .setIssuer("https://{yourOktaDomain}/oauth2/default")
    .setAudience("api://default")                // defaults to 'api://default'
    .setConnectionTimeout(Duration.ofSeconds(1)) // defaults to 1s
    .setReadTimeout(Duration.ofSeconds(1))       // defaults to 1s
    .build();
```

This helper class configures a JWT parser with the details found through the [OpenID Connect discovery endpoint](https://openid.net/specs/openid-connect-discovery-1_0.html).  The public keys used to validate the JWTs will also be retrieved and cached automatically.

After you have a `JwtVerifier` from the above section and an `access_token` from a successful sign in, or from a Bearer token 
in the authorization header, you will need to make sure that it is still valid. All you need to do is call the 
`decode` method (where `jwtString` is your access token in string format).

```java
Jwt jwt = jwtVerifier.decode(jwtString);
```

This will validate your JWT for the following:

- Token expiration date
- The 'token not valid before' date
- The token issuer matches the expected value passed into the above helper
- The token audience matches the expected value passed into the above helper

The result of the decode method is a `Jwt` object which you can introspect for additional claims by calling:

```java
jwt.getClaims().get("aClaimKey");
```
