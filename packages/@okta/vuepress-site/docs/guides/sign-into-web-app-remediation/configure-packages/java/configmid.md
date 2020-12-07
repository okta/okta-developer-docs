Edit `src/main/resources/application.properties` and update these values to include your Okta domain and the Okta Application's client ID and secret:

```properties
okta.oauth2.issuer=https://${yourOktaDomain}/oauth2/default
okta.oauth2.client-id={clientId}
okta.oauth2.client-secret={clientSecret}

# Customize the callback route path
okta.oauth2.redirect-uri=/authorization-code/callback
```

Take a look at the [Spring Boot Externalized Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html) for details on other ways to configure properties.
