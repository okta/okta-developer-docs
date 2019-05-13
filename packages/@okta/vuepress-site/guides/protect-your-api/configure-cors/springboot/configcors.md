You can enable CORS with the `CrossOrigin` annotation in your controller. For example:

```java
@CrossOrigin(origins = "http://example.com:80")
@GetMapping("/hello")
public String hello() {
    return "Hello simple example";
}
```

For more details, refer to the [Spring CORS guide](https://spring.io/guides/gs/rest-service-cors/).
