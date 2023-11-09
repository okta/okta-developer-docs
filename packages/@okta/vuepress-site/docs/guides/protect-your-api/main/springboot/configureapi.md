Configure the Okta Spring Boot Starter by setting the following environment variables, making sure you replace the below placeholder with your own value:

```bash
OKTA_OAUTH2_ISSUER=https://${yourOktaDomain}/oauth2/default

# Optional
OKTA_OAUTH2_AUDIENCE=api://default
```

> **Note:** For other configuration techniques see [Spring Boot's external configuration guide](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html).
