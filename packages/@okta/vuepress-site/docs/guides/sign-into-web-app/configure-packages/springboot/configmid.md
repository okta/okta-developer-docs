Edit `src/main/resources/application.properties` and update these values to include your Okta domain and the Okta Application's client ID and secret:

```properties
okta.oauth2.issuer=https://${yourOktaDomain}/oauth2/{authServerId}
okta.oauth2.client-id={clientId}
okta.oauth2.client-secret={clientSecret}

# Customize the callback route path
okta.oauth2.redirect-uri=/authorization-code/callback
```

If you are using the [default Custom Authorization Server](/docs/concepts/auth-servers/#default-custom-authorization-server), set `{authServerId}=default`. If you are using another [Custom Authorization Server](/docs/concepts/auth-servers/#custom-authorization-server), set `{authServerId}` to the custom Authorization Server ID.

Take a look at the [Spring Boot Externalized Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config) for details on other ways to configure properties.
