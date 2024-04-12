Spring Initializr automatically sets up the required dependencies.

If you are working on a non-Spring Initializr app, you need to manually add the Okta Spring Boot Starter dependency to your project:

```xml
<dependency>
    <groupId>com.okta.spring</groupId>
    <artifactId>okta-spring-boot-starter</artifactId>
    <version>2.1.4</version>
</dependency>
```

The Okta Spring Boot Starter configures Spring Security to validate an access token attached to incoming requests.
