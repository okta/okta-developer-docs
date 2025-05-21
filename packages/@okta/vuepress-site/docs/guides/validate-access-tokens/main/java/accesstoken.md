See the instructions for the [Okta JSON Web Token (JWT) Verifier for Java](https://github.com/okta/okta-jwt-verifier-java).

> **Note:** Use the JWT Verifier for Java on a resource server that runs an API Service. Don't use the verifier as part of a mobile app. Minor network delays could trigger the one second default timeout.

### Required libraries

To validate a JWT, you need the Okta JWT Verifier for Java library.

Include the following lines in your Maven `pom.xml`:

```xml
<dependency>
   <groupId>com.okta.jwt</groupId>
   <artifactId>okta-jwt-verifier</artifactId>
   <version>{okta-jwt.version}</version>
</dependency>

<dependency>
  <groupId>com.okta.jwt</groupId>
  <artifactId>okta-jwt-verifier-impl</artifactId>
  <version>{okta-jwt.version}</version>
  <scope>runtime</scope>
</dependency>
```

> **Note:** Replace `{okta-jwt.version}` in your Maven `pom.xml` with the latest version from the [Maven central repository](https://search.maven.org/search?q=a:okta-jwt-verifier).

### Validate access token

Create the Okta JWT Verifier using the `JwtVerifiers` class:

```java
AccessTokenVerifier jwtVerifier = JwtVerifiers.accessTokenVerifierBuilder()
    .setIssuer("https://{yourOktaDomain}/oauth2/default")
    .setAudience("api://default")                // defaults to 'api://default'
    .setConnectionTimeout(Duration.ofSeconds(1)) // defaults to 1s
    .setReadTimeout(Duration.ofSeconds(1))       // defaults to 1s
    .build();
```

This helper class configures a JWT parser with the details found through the [OpenID Connect discovery endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/getWellKnownOpenIDConfigurationCustomAS). The public keys used to validate the JWTs are also retrieved and cached automatically.

After you have a `JwtVerifier` from the previous section and an `access_token` from a successful sign-in flow, or from a Bearer token in the authorization header, make sure that it's still valid. Call the `decode` method (where `jwtString` is your access token in string format).

```java
Jwt jwt = jwtVerifier.decode(jwtString);
```

This validates your JWT for the following:

- Token expiration time
- Time it was issued at
- Token issuer matches the expected value passed into the helper
- Token audience matches the expected value passed into the helper

The result of the decode method is a `Jwt` object that you can introspect for more claims by calling:

```java
jwt.getClaims().get("aClaimKey");
```
