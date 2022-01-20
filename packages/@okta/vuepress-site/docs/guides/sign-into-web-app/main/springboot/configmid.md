The Okta CLI created an `.okta.env` file in your current directory. This file includes your Okta domain, client ID, and client secret:

```properties
OKTA_OAUTH2_ISSUER=https://${yourOktaDomain}/oauth2/${authorizationServerId}
OKTA_OAUTH2_CLIENT_ID=${clientId}
OKTA_OAUTH2_CLIENT_SECRET=${clientSecret}
```

Run the following commands to set these values as environment variables and start your app:

```shell
source .okta.env
./mvnw spring-boot:run
```

<!-- todo: add Windows instructions -->

<!--
If you're using the [default Custom Authorization Server](/docs/concepts/auth-servers/#default-custom-authorization-server), replace `${authorizationServerId}` with `default`. If you're using another [Custom Authorization Server](/docs/concepts/auth-servers/#custom-authorization-server), set `${authorizationServerId}` to the custom Authorization Server ID.
-->

Take a look at the [Spring Boot Externalized Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config) for other ways to configure the properties.
