Apps created with [Spring Initializr](https://start.spring.io/#!type=maven-project&language=java&packaging=jar&groupId=com.example&artifactId=demo&name=demo&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.demo&dependencies=web,okta) already include the correct dependencies. If you're developing a non-Spring Initializr app, you need to manually add the [Okta Spring Boot Starter](https://github.com/okta/okta-spring-boot) dependency to your project:

```xml
<dependency>
    <groupId>com.okta.spring</groupId>
    <artifactId>okta-spring-boot-starter</artifactId>
    <version>3.0.6</version>
</dependency>
```

The Okta Spring Boot Starter configures Spring Security to validate an access token attached to incoming requests.
