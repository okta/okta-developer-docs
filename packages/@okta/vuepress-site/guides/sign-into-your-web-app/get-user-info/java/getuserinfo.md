Brought in from the old quick start guide;

In order to retrieve attributes on the currently logged in user, you can inject an [`OAuth2AuthenticationToken`](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/oauth2/client/authentication/OAuth2AuthenticationToken.html) into your application and access the corresponding attributes:

```java
@GetMapping("/some-path")
public ModelAndView userDetails(OAuth2AuthenticationToken authentication) {
    String userId = authentication.getName();
    String email = ObjectUtils.nullSafeToString(authentication.getPrincipal().getAttributes().get("email"));
```