Edit `src/main/resources/application.properties` and update these values to include your Okta domain and the Okta Application's client ID and secret:

```properties
okta.oauth2.issuer=https://${yourOktaDomain}/oauth2/default
okta.oauth2.clientId={clientId}
okta.oauth2.clientSecret={clientSecret}

# Customize the callback route path
security.oauth2.sso.loginPath=/authorization-code/callback
```

Take a look at the [Spring Boot Externalized Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html) for details on other ways to configure properties.
