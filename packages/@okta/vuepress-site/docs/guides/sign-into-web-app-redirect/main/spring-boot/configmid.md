1. Open **src** > **main** > **resources** > **application.properties**.
1. Add the following, replacing the placeholders with your own values.

   ```properties
   okta.oauth2.issuer=https://{yourOktaDomain}/oauth2/default
   okta.oauth2.client-id={clientId}
   okta.oauth2.client-secret={clientSecret}
   ```

> **Note**: For other ways to configure the properties, see the [Spring Boot Externalized Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config).
