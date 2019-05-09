---
exampleDescription: Spring Implicit Example
---

## Okta Java/Spring Quickstart

Now that your users can sign in, let's add authentication to your server. We'll show you how to add the Okta Spring Boot library to your Spring app.

> If you would prefer to download a complete sample application instead, please visit [Spring Sample Applications for Okta][] and follow those instructions.

### Include the dependency

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

| Property                 | Default       | Details                                                                                                                                                                        |
| --------                 | ---------     | -------                                                                                                                                                                        |
| okta.oauth2.issuer       | N/A           | [Authorization Server](/authentication-guide/implementing-authentication/set-up-authz-server/) issuer URL, i.e.: `https://{yourOktaDomain}/oauth2/default`. Note that your Okta domain does **not** include `-admin`. |
| okta.oauth2.clientId     | N/A           | The Client Id of your Okta OIDC application                                                                                                                                    |
| okta.oauth2.audience     | api://default | The audience of your [Authorization Server](/authentication-guide/implementing-authentication/set-up-authz-server/)                                                                                                   |
| okta.oauth2.groups-claim | groups        | The claim key in the Access Token's JWT that corresponds to an array of the users groups.                                                                                      |

### Create a Controller

The above client makes a request to `/api/messages`, we simply need to create a `Controller` to handle the response:

```java
@RestController
class MessagesRestController {

    @GetMapping("/api/messages")
    public List<String> getMessages(Principal principal) {
        // handle request
    }
}
```

### Customize the configuration (optional)

The OAuth 2.0 behavior can be customized the same way as using Spring Security directly:

```java
@Configuration
public class OktaOAuth2WebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.oauth2ResourceServer().jwt();
    }
}
```
### That's it!

Okta's Spring Security integration will [parse the JWT access token](/blog/2017/06/21/what-the-heck-is-oauth#oauth-flows) from the HTTP request's `Authorization: Bearer` header value.

Check out a [Spring Boot example](https://github.com/okta/okta-spring-boot/tree/master/examples) or this [blog post](/blog/2017/09/19/build-a-secure-notes-application-with-kotlin-typescript-and-okta).

[Spring Sample Applications for Okta]: https://github.com/okta/samples-java-spring
