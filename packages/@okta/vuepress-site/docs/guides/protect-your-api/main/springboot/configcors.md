1. To configure CORS in Spring Security, enable it in the `SecurityFilterChain` that you defined in the previous step:

   ```java
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                // previous configuration
                ...
                .cors(withDefaults())
                .build();
    }
}
   ```

2. Configure individual controllers with `CrossOrigin` annotation. For example:

   ```java
     ...
   @CrossOrigin(origins = "http://example.com:80")
   @GetMapping("/api/whoami")
     ...
   ```

   > **Note**: For more detailed information, see the [Spring CORS guide](https://spring.io/guides/gs/rest-service-cors/).
