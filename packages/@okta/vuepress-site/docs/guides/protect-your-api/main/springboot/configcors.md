1. To configure CORS in Spring Security, enable it in the `WebSecurityConfigurerAdapter` that you defined in the previous step:

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
  // previous configuration
  ...
  http.cors();
}
```

2. Configure individual controllers with `CrossOrigin` annotation. For example:

```java
…
@CrossOrigin(origins = "http://example.com:80")
@GetMapping("/api/whoami")
…
```

> **Note**: See the [Spring CORS guide](https://spring.io/guides/gs/rest-service-cors/).
