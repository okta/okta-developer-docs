The following example uses the [JJWT library ](https://github.com/jwtk/jjwt).
```java

Instant now = Instant.now();
String jwt = Jwts.builder()
        .setAudience("{yourOktaDomain}/oauth2/default/v1/token")
        .setIssuedAt(Date.from(now))
        .setExpiration(Date.from(now.plus(5L, ChronoUnit.MINUTES)))
        .setIssuer(clientId)
        .setSubject(clientId)
        .setId(UUID.randomUUID().toString())
        .signWith(privateKey)
        .compact();

```
