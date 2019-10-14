---
exampleDescription: Spring Auth Code Example
---

## Okta Java/Spring Quickstart

Now that your users can sign in, let's add authentication to your server.

### Include the dependencies

For Apache Maven:
```xml
<dependency>
    <groupId>com.okta.spring</groupId>
    <artifactId>okta-spring-boot-starter</artifactId>
    <version>1.0.0</version>
</dependency>
```
For Gradle:
```groovy
compile 'com.okta.spring:okta-spring-boot-starter:1.0.0'
```

### Configure your properties

You can configure your applications properties with environment variables, system properties, or configuration files. Take a look at the [Spring Boot documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html) for more details.

An example `application.properties` file would look like:
<DomainAdminWarning />

```properties
okta.oauth2.issuer=https://${yourOktaDomain}/oauth2/default
okta.oauth2.client-id={clientId}
okta.oauth2.client-secret={clientSecret}
# Configure the callback URL to match the previous section
okta.oauth2.redirect-uri=/authorization-code/callback
```

### Customize the configuration (optional)

The OAuth 2.0 behavior can be customized the same way as using Spring Security directly:
```java
@Configuration
public class WebConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().anyRequest().authenticated()
            .and().oauth2Client()
            .and().oauth2Login();
    }
}
```

That's it! Open an incognito window (to ensure clean browser cache) and browse to `http://localhost:8080/login` you will be  automatically redirected to the Okta login page.

You can read more about [Spring's OAuth 2.0 support](https://docs.spring.io/spring-security/site/docs/current/reference/html5/#oauth2login) or take a look at this [blog post](https://developer.okta.com/blog/2017/03/21/spring-boot-oauth) that describes the steps and configuration in detail.
