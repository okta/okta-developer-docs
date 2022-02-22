1. In order to configure CORS in Spring Security, first enable it in the `WebSecurityConfigurerAdapter` you defined in the previous step:

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
  // previous configuration
  ...
  http.cors();
}
``` 

2. Then configure individual controllers with `CrossOrigin` annotation. For example:

```java
…
@CrossOrigin(origins = "http://example.com:80")
@GetMapping("/api/whoami")
…
```

For more details, refer to the [Spring CORS guide](https://spring.io/guides/gs/rest-service-cors/).