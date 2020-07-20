If you are using the [Okta Spring Boot Starter](https://github.com/okta/okta-spring-boot), you can configure an RP-Initiated (SSO) Logout by setting the `okta.oauth2.postLogoutRedirectUri` property with an absolute URI such as:

```properties
okta.oauth2.postLogoutRedirectUri=http://localhost:8080/
```
