The following example uses the [JJWT library ](https://github.com/jwtk/jjwt).

```java
SecretKey sharedSecret = Keys.hmacShaKeyFor(clientSecret.getBytes(StandardCharsets.UTF_8));
Instant now = Instant.now();
String jwt = Jwts.builder()
        .setAudience("{yourOktaDomain}/oauth2/default/v1/token")
        .setIssuedAt(Date.from(now))
        .setExpiration(Date.from(now.plus(1L, ChronoUnit.HOURS)))
        .setIssuer(clientId)
        .setSubject(clientId)
        .setId(UUID.randomUUID().toString())
        .signWith(sharedSecret)
        .compact();

```
