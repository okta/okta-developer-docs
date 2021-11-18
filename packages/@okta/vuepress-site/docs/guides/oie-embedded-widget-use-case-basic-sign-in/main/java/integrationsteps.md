### 1: The user initiates the sign-in flow

The user signs in with the Sign-In Widget that was set up in the [Load the Widget](/docs/guides/oie-embedded-widget-use-case-load/java/main/) use case. After the user enters their credentials and clicks **Sign in**, the Widget sends an identify request to Okta.

### 2: Handle the callback from Okta

Okta returns an Interaction code to the **Sign-in redirect URI** that is specified in your [Okta app integration](/docs/guides/oie-embedded-common-org-setup/java/main/#create-a-new-application).

> **Note:** The redirect URI value that is used to start up the app (such as the `OKTA_IDX_REDIRECTURI` environment variable), must be defined as one of the **Sign-in redirect URI** settings for the app integration that is created in the Admin console. See [Create a new application](/docs/guides/oie-embedded-common-org-setup/java/main/#create-a-new-application).

```java
String issuer = oktaOAuth2Properties.getIssuer();
// the widget needs the base url, just grab the root of the issuer
String orgUrl = new URL(new URL(issuer), "/").toString();

ModelAndView mav = new ModelAndView("login");
mav.addObject(STATE, state);
mav.addObject(NONCE, nonce);
mav.addObject(SCOPES, oktaOAuth2Properties.getScopes());
mav.addObject(OKTA_BASE_URL, orgUrl);
mav.addObject(OKTA_CLIENT_ID, oktaOAuth2Properties.getClientId());
mav.addObject(INTERACTION_HANDLE, idxClientContext.getInteractionHandle());
mav.addObject(CODE_VERIFIER, idxClientContext.getCodeVerifier());
mav.addObject(CODE_CHALLENGE, idxClientContext.getCodeChallenge());
mav.addObject(CODE_CHALLENGE_METHOD, CODE_CHALLENGE_METHOD_VALUE);

// from ClientRegistration.redirectUriTemplate, if the template is change you must update this
mav.addObject(REDIRECT_URI,
   request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() +
   request.getContextPath() + "/authorization-code/callback"
);
mav.addObject(ISSUER_URI, issuer);

session.setAttribute(CODE_VERIFIER, idxClientContext.getCodeVerifier());
```

### 3: Request and store the tokens from Okta

The Spring security framework doesn't understand Okta’s Interaction code flow. Therefore, your app needs to intercept Spring’s OAuth authentication code flow, exchange the Interaction code that is obtained from Okta for an access token, populate the user profile attributes, and construct [`OAuth2AuthenticationToken.java`](https://github.com/spring-projects/spring-security/blob/main/oauth2/oauth2-client/src/main/java/org/springframework/security/oauth2/client/authentication/OAuth2AuthenticationToken.java) before handing over the authentication flow back to Spring.

In the following example, the helper function `exchangeCodeForToken()` is used to obtain the access and refresh tokens.

```java
final JsonNode jsonNode = helperUtil.exchangeCodeForToken(interactionCode, codeVerifier);
final OAuth2AccessToken oAuth2AccessToken = helperUtil.buildOAuth2AccessToken(jsonNode);
final OAuth2RefreshToken oAuth2RefreshToken = helperUtil.buildOAuth2RefreshToken(jsonNode);
```

### 4 (Optional): Get the user profile information

Retrieve the user profile attributes with the access token object, and populate the [`OAuth2AuthenticationToken`](https://github.com/spring-projects/spring-security/blob/main/oauth2/oauth2-client/src/main/java/org/springframework/security/oauth2/client/authentication/OAuth2AuthenticationToken.java) object reference for Spring to continue with the rest of the authentication flow. See the helper class method [`getUserAttributes()`](https://github.com/okta/okta-idx-java/blob/master/samples/embedded-sign-in-widget/src/main/java/com/okta/spring/example/HelperUtil.java) for details.

```java
final Map<String, Object> userAttributes =
      helperUtil.getUserAttributes(clientRegistration.getProviderDetails().getUserInfoEndpoint().getUri(),
            oAuth2AccessToken);
```
