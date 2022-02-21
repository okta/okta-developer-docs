In Spring this can be done using a very similar `WebSecurityConfigurerAdapter` implementation to the previous one, but with a specific URL matching pattern specified in ` .antMatchers()`.

For example, require authentication for all routes under `/api/private` like so:

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
class OktaOAuth2WebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests()
      // Require authentication for all requests under /api/private
      .antMatchers("/api/private/**").authenticated()
    .and()
      .oauth2ResourceServer().jwt();
  }
}
```