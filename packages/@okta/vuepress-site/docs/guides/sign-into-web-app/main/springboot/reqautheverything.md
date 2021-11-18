Use `.anyRequest().authenticated()` in your `WebSecurityConfigurerAdapter` implementation: 

**Java:**

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
class OktaOAuth2WebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
            // all routes protected
            http.authorizeRequests()
                .anyRequest().authenticated()
            // enable OAuth2/OIDC
            .and()
                .oauth2Login();
    }
}
```

**Kotlin:**

```kotlin
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
class SecurityConfig2 : WebSecurityConfigurerAdapter() {
    override fun configure(http: HttpSecurity?) {
        http {
            authorizeRequests {
                authorize("/my-anon-page", permitAll)
                authorize( anyRequest, authenticated)
            }
            oauth2Login {  }
        }
    }
}
```
