1. Add the following **import** statement to **DemoApplication.java**:

   ```java
   import org.springframework.web.bind.annotation.CrossOrigin;
   ```

1. Enable CORS in the `SecurityFilterChain` bean that you defined in the previous step:

   ```java
   @EnableWebSecurity
   @Configuration
   static class OktaOAuth2WebSecurityConfiguration {

      @Bean
      SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
         return http.authorizeHttpRequests(
             (req) -> req.requestMatchers("/api/whoami").authenticated()
                 .requestMatchers("/**").permitAll()
             )
             .oauth2ResourceServer((srv) -> srv.jwt(Customizer.withDefaults()))
             .cors(Customizer.withDefaults())
             .build();
      }
   }
   ```

1. Configure individual endpoints with `CrossOrigin` annotation. For example:

   ```java
   @GetMapping("/api/whoami")
   @CrossOrigin(origins = "http://example.com")
   public String whoami(Authentication authentication) {
      return authentication.getDetails().toString();
   }
   ```

> **Note**: For more detailed information, see the [Spring CORS guide](https://spring.io/guides/gs/rest-service-cors/).
