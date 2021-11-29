Using the [JJWT library](https://github.com/jwtk/jjwt):

```java
PrivateKey privateKey = // Load an RSA private key from configuration
Instant now = Instant.now();

String jwt = Jwts.builder()
        .setAudience("https://${yourOktaDomain}/oauth2/default/v1/token")
        .setIssuedAt(Date.from(now))
        .setExpiration(Date.from(now.plus(5L, ChronoUnit.MINUTES)))
        .setIssuer(clientId)
        .setSubject(clientId)
        .setId(UUID.randomUUID().toString())
        .signWith(privateKey)
        .compact();
```
