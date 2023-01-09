In Spring you can do this using a `SecurityFilterChain` bean that is similar to the previous one, but with a URL matching pattern specified in ` .mvcMatchers()`.

For example, require authentication for the `/api/whoami` route like so:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
class SpringSecurityConfiguration {

  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
      // Require authentication for all requests under /api/whoami
      .authorizeRequests((requests) -> requests.mvcMatchers("/api/whoami").authenticated())
      .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt) // validates access tokens as JWTs
      .build();
  }
}
```
