Spring Security automatically maps the claims from Okta into the user's attributes. You can get access to the currently logged in user by injecting an `OidcUser` using the `AuthenticationPrincipal` annotation.

```java
@GetMapping("/hello")
String helloUser(@AuthenticationPrincipal OidcUser user) {
    return "Hello " + user.getAttributes().get("name");
}
```
