By default, Spring Security requires authentication for all routes. This is equivalent to the following `WebSecurityConfigurerAdapter` implementation:

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
class OktaOAuth2WebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests()
      .anyRequest().authenticated() // All requests require authentication
    .and()
      .oauth2ResourceServer().jwt(); // validates access tokens as JWTs
  }
}
```