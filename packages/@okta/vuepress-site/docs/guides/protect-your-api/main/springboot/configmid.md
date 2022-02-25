Configure the Okta Spring Boot Starter by setting the following environment variables:

```bash
OKTA_OAUTH2_ISSUER=${issuer-from-above}

# Optional
OKTA_OAUTH2_AUDIENCE="api://default"
```

**NOTE:** For other configuration techniques see [Spring Boot's external configuration guide](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html).
