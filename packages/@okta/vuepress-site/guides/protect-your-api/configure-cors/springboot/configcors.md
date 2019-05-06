You can enable CORS with a simple `CrossOrigin` annotation in your controller, for example:

```java
@CrossOrigin(origins = "http://example.com:80")
@GetMapping("/hello")
public String hello() {
    return "Hello simple example";
}
```

For more details, check out the [Spring CORS guide](https://spring.io/guides/gs/rest-service-cors/).
