The Okta Spring Boot starter is secure-by-default, meaning that all your routes are protected, which is the equivalent of:

```java
@EnableWebSecurity
public class SecurityConfiguration {

  @Bean
  SecurityFilterChain oauth2SecurityFilterChain(HttpSecurity http) throws Exception {
    http.authorizeRequests((requests) -> requests.anyRequest().authenticated());

    // enables OAuth redirect login
    http.oauth2Login();

    // enables OAuth Client configuration
    http.oauth2Client();

    // enables REST API support for JWT bearer tokens
    http.oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);

    return http.build();
  }
}
```
