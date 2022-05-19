If you use the Okta CLI to create your okta app integration, it creates an `.okta.env` file in your current directory containing these values, for example:

```properties
export OKTA_OAUTH2_ISSUER=https://${yourOktaDomain}/oauth2/${yourAuthorizationServerId}
export OKTA_OAUTH2_CLIENT_ID=${yourAppClientId}
export OKTA_OAUTH2_CLIENT_SECRET=${yourClientSecret}
```

Run `source .okta.env` in a terminal window to set the values above as environment variables. If you're on Windows, you can change `export` to `set`, rename the file to `okta.bat`, and then execute it.

If you use `okta start spring-boot` to create an app, it has an `.okta.env` file in it that looks a bit different. That's because it's configured to use [spring-dotenv](https://github.com/paulschwarz/spring-dotenv) to load its configuration from this file.

> **Note**: For other ways to configure the properties, see the [Spring Boot Externalized Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config).
