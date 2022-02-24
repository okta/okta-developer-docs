Add the following code to return the user’s name upon a successful sign-in flow:

```
@GetMapping("/")
public String hello(@AuthenticationPrincipal OidcUser user) {
  return "Hello, " + user.getName();
}
```

This code should go in a controller class or in the main application class. For an example, see our [Spring Boot sample's code](https://github.com/okta-samples/okta-spring-boot-sample/blob/main/src/main/java/com/example/sample/Application.java#L17).
