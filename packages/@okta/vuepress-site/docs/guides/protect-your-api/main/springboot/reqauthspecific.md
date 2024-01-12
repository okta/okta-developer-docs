Use a `SecurityFilterChain` bean to identify the routes that require authentication and those available to everyone:

1. Open **src** > **main** > **java** > **com** > **example** > **demo** > **DemoApplication.java**.
1. Add the following import statements to the top of the page:

   ```java
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.security.config.Customizer;
   import org.springframework.security.config.annotation.web.builders.HttpSecurity;
   import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
   import org.springframework.security.web.SecurityFilterChain;
   ```

1. Add the following code to the **DemoApplication** class to implement the bean such that only calls to `/api/whoami` require authentication:

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
             .build();
      }
   }
   ```

Note that the matchers are considered in order. Therefore, the following is invalid because the first matcher matches every request and will never get to the second mapping:

```java
return http.authorizeHttpRequests(
    (req) -> req.requestMatchers("/**").permitAll()
        .requestMatchers("/api/whoami").authenticated()
    )
    .oauth2ResourceServer((srv) -> srv.jwt(Customizer.withDefaults()))
    .build();
```

To allow **only** anonymous access to an endpoint, replace `permitAll()` with `anonymous()`. Any calls to an endpoint marked anonymous-only from a client using any method of authentication will receive an **HTTP 403 Forbidden** response.
