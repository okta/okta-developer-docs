The Okta Spring Boot Starter leverages Spring Security and defaults to a callback route of `/login/oauth2/code/okta`.

Our [Spring Boot sample apps](https://github.com/okta/samples-java-spring) requires that you set the `okta.oauth2.redirect-uri` property to `/authorization-code/callback` in your `src/main/resources/application.properties` file:

```
okta.oauth2.redirect-uri=/authorization-code/callback
```
