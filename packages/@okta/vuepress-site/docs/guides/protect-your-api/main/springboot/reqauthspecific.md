In Spring you can do this using a `WebSecurityConfigurerAdapter` implementation that is similar to the previous one, but with a URL matching pattern specified in ` .antMatchers()`.

For example, require authentication for the `/api/whoami` route like so:

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
      .antMatchers("/api/whoami").authenticated()
    .and()
      .oauth2ResourceServer().jwt();
  }
}
```
