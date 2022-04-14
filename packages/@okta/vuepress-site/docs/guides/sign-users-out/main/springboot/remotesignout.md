You can configure an RP-Initiated (SSO) Logout by setting the `okta.oauth2.postLogoutRedirectUri` property with an absolute URI such as:

```properties
okta.oauth2.postLogoutRedirectUri=http://localhost:8080/
```

For more details, visit [Spring OIDC Logout](https://developer.okta.com/blog/2020/03/27/spring-oidc-logout-options).
