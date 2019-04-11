CORS can be enabled with a simple `CrossOrigin` annotation on in your controller for example:

```java
@CrossOrigin(origins = "http://example.com:80")
@GetMapping("/hello")
public String hello() {
    return "Hello simple example";
}
```

For more details checkout the [Spring CORS guide](https://spring.io/guides/gs/rest-service-cors/).
