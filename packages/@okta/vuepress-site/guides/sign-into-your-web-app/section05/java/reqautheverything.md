Brought in from old quick start guide:

For example, by default, Spring Boot requires authentication for everything:

```java
@Configuration
public class WebConfig extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(HttpSecurity http) throws Exception {

            // all routes protected
            http.authorizeRequests().anyRequest().authenticated()

                // enable OAuth2/OIDC
                .and().oauth2Client()
                .and().oauth2Login();
        }
    }
```
