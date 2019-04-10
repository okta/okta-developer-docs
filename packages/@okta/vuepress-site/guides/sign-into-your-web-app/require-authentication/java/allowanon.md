Brought in from old quick start guide:

Allowing anonymous access, or only protecting specific routes, is similar to requiring authentication for everything, with minor changes to how `http.authorizeRequests()` is configured.

```java
@Configuration
    static class WebConfig extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.authorizeRequests()

                    // allow antonymous access to the /my-anon-page page
                    .antMatchers("/my-anon-page").permitAll()

                    // require authentication for all other requests
                    .anyRequest().authenticated()

                // enable OAuth2/OIDC
                .and().oauth2Client()
                .and().oauth2Login();
        }
    }
```
For more information, see the official [Spring Boot documentation](https://docs.spring.io/spring-security/site/docs/current/reference/html/jc.html#jc-httpsecurity).
