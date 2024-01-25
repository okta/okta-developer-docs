### Your app displays the sign-in page

Build a sign-in page that captures the user's name and password with the Widget. Ensure the page completes the steps described in [Load the Widget](/docs/guides/oie-embedded-widget-use-case-load/java/main/) when the page loads.

### The user submits their username and password

When the user submits their credentials, the widget sends an identify request to Identity Engine. OIE returns an interaction code to the sign-in redirect URI you configured earlier.

### Exchange interaction code for tokens

Handle the callback from OIE to the sign-in redirect URI. The Spring security framework doesn't understand Okta’s Interaction code flow. Therefore:

1. Intercept Spring’s OAuth authentication code flow
1. Exchange the Interaction code that is obtained from Okta for an access token
1. Populate the user profile attributes
1. Construct an [`OAuth2AuthenticationToken`](https://github.com/spring-projects/spring-security/blob/main/oauth2/oauth2-client/src/main/java/org/springframework/security/oauth2/client/authentication/OAuth2AuthenticationToken.java) to hand back to Spring's authentication code flow.

```java
@Override
public Authentication attemptAuthentication(
   final HttpServletRequest request, final HttpServletResponse response)
   throws AuthenticationException, IOException {

   final ServletRequestAttributes servletRequestAttributes =
      (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
   final HttpSession session = servletRequestAttributes.getRequest().getSession();

   final MultiValueMap<String, String> requestParams =
      OAuth2AuthorizationResponseUtils.toMultiMap(request.getParameterMap());

   final String interactionCode = requestParams.getFirst("interaction_code");
   final String codeVerifier = (String) session.getAttribute("codeVerifier");

   if (!Strings.hasText(interactionCode)) {
      String error = requestParams.getFirst("error");
      String errorDesc = requestParams.getFirst("error_description");
      throw new OAuth2AuthenticationException(new OAuth2Error(error, errorDesc, null));
   }

   // exchange the interaction code for an access and refresh tokens
   final JsonNode jsonNode = helperUtil.exchangeCodeForToken(interactionCode, codeVerifier);
   final OAuth2AccessToken oAuth2AccessToken = helperUtil.buildOAuth2AccessToken(jsonNode);
   final OAuth2RefreshToken oAuth2RefreshToken = helperUtil.buildOAuth2RefreshToken(jsonNode);

   // retrieve user properties
   final OAuth2User oauth2User = helperUtil.BuildOAuth2User(request, response);

   final Collection<? extends GrantedAuthority> mappedAuthorities = this.authoritiesMapper
            .mapAuthorities(oauth2User.getAuthorities());
   final OAuth2LoginAuthenticationToken authenticationResult = new OAuth2LoginAuthenticationToken(
            clientRegistration, oAuth2AuthorizationExchange,
            oauth2User, mappedAuthorities, oAuth2AccessToken, oAuth2RefreshToken);
   authenticationResult.setDetails(authenticationDetails);

   // return OAuth2AuthenticationToken to Spring
   final OAuth2AuthenticationToken oauth2Authentication = new OAuth2AuthenticationToken(
            oauth2User, authenticationResult.getAuthorities(),
            authenticationResult.getClientRegistration().getRegistrationId());
   oauth2Authentication.setDetails(authenticationDetails);
   return oauth2Authentication;
}
```

### Get the user profile information

After the user signs in successfully, request basic user information from the authorization server using the [`OAuth2AuthenticationToken`](https://github.com/spring-projects/spring-security/blob/main/oauth2/oauth2-client/src/main/java/org/springframework/security/oauth2/client/authentication/OAuth2AuthenticationToken.java) returned in the previous step.

```java
Map<String, Object> claims = new LinkedHashMap<>();

try {
   // get user claim info from /v1/userinfo endpoint
   String userInfoUrl = normalizedIssuerUri(issuer, "/v1/userinfo");

   HttpHeaders httpHeaders = new HttpHeaders();
   headers.set("Authorization", "Bearer " + oAuth2AccessToken.getTokenValue());
   headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

   HttpEntity<String> requestEntity = new HttpEntity<>(null, httpHeaders);

   ParameterizedTypeReference<Map<String, Object>> responseType =
            new ParameterizedTypeReference<Map<String, Object>>() { };
   ResponseEntity<Map<String, Object>> responseEntity =
            restTemplate.exchange(userInfoUrl, HttpMethod.GET, requestEntity, responseType);

   claims = responseEntity.getBody();
} catch (Exception e) {
   logger.error("Error retrieving profile from user info endpoint", e);
}
```
