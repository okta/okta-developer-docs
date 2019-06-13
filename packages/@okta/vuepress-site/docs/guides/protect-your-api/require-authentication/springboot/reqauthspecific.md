For example, you could require authentication for all routes under `/api/private` by defining a new class:

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
