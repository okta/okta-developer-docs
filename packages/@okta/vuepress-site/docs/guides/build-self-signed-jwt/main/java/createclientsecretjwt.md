Using the [JJWT library](https://github.com/jwtk/jjwt):

```java
String clientSecret = "{clientSecret}"; // Or load from configuration
SecretKey sharedSecret = Keys.hmacShaKeyFor(clientSecret.getBytes(StandardCharsets.UTF_8));
Instant now = Instant.now();

String jwt = Jwts.builder()
        .setAudience("https://{yourOktaDomain}/oauth2/default/v1/token")
        .setIssuedAt(Date.from(now))
        .setExpiration(Date.from(now.plus(5L, ChronoUnit.MINUTES)))
        .setIssuer(clientId)
        .setSubject(clientId)
        .setId(UUID.randomUUID().toString())
        .signWith(sharedSecret)
        .compact();
```
