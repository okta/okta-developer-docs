Since you requested the scopes `openid profile email`, Okta also returns an ID token along with the access token. You can parse out the claims in the ID token to find the user's profile information.

For example, once the user has signed in, you can extract the user's name from the ID token and show it in the app:

1. Open **src** > **main** > **java** > **com** > **example** > **demo** > **DemoApplication.java**.
1. Add the following import statements at the top of the file:

   ```java
   import org.springframework.security.core.annotation.AuthenticationPrincipal;
   import org.springframework.security.oauth2.core.oidc.user.OidcUser;
   import org.springframework.web.bind.annotation.GetMapping;
   import org.springframework.web.bind.annotation.RestController;
   ```

1. Add the following route handler to the `DemoApplication` class beneath `main()`:

   ```java
   @GetMapping("/")
   public String hello(@AuthenticationPrincipal OidcUser user) {
       return String.format("Welcome, %s", user.getFullName());
   }
   ```
