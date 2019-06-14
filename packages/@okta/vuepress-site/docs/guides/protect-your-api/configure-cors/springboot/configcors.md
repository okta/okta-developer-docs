In order to configure CORS in Spring Security you must enable it in the `WebSecurityConfigurerAdapter` you defined in the previous step:

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
class OktaOAuth2WebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // previous configuration
        ...
        http.cors();
    }
}
``` 

Then configure individual controllers with `CrossOrigin` annotation. For example:

```java
@CrossOrigin(origins = "http://example.com:80")
@GetMapping("/hello")
public String hello() {
    return "Hello simple example";
}
```

For more details, refer to the [Spring CORS guide](https://spring.io/guides/gs/rest-service-cors/).
