Spring Security automatically maps the claims from Okta into the user's attributes. You can get access to the currently logged in user by injecting an `OidcUser` using the `AuthenticationPrincipal` annotation.

```java
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.RestController;

@RestController
class ExampleRestController {
    @GetMapping("/hello")
    String helloUser(@AuthenticationPrincipal OidcUser user) {
        return "Hello " + user.getAttributes().get("email");
    }
}
```
