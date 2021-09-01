### 1: The user signs in with Facebook

After you've completed the steps in [Configuration Updates](#configuration-updates), and have configured your app to [load the Sign-In Widget](/docs/guides/oie-embedded-widget-use-cases/java/oie-embedded-widget-use-case-load/), then the **Sign in with Facebook** option is available in the embedded Widget. No coding is required to have the **Sign in with Facebook** option.

<div class="common-image-format">

![Displays the Sign-In Widget with the 'Sign in with Facebook' button](/img/oie-embedded-sdk/oie-embedded-widget-use-case-social-sign-in-screen-java.png)

</div>

When the user selects **Sign in with Facebook** from the Widget, they are directed to the Facebook sign-in screen.

The user enters their Facebook credentials (email and password) on the Facebook sign-in screen, which is hosted by the Facebook platform.

> **Note:** You can use the Facebook test user account that you've created in [Set up the Facebook test user](/docs/guides/oie-embedded-common-org-setup/java/main/#_2-set-up-the-facebook-test-user).

### 2: Facebook redirects the user to your Okta org

After the user signs in to Facebook successfully, Facebook routes the user to the location that you've specified in the **Valid OAuth Redirect URIs** field from the Facebook developer site.

> **Note:** The **Valid OAuth Redirect URIs** value for your Okta org is in the format: `https://{yourOktaDomain}/oauth2/v1/authorize/callback`. See [Create a Facebook app in Facebook](/docs/guides/oie-embedded-common-org-setup/java/main/#_1-create-a-facebook-app-in-facebook) for details on configuring the **Valid OAuth Redirect URIs** value.

### 3: The Okta org redirects the request to your app

After your Okta org receives a successful Facebook sign-in request, your org redirects the request to your app's **Sign-in redirect URIs** setting.

> **Note:** For the Java SDK embedded authentication sample app, the **Sign-in redirect URIs** is set to `http://localhost:8080`.

### 4: Handle the callback from Okta

Okta returns the Interaction code to the **Sign-in redirect URI** that is specified during the [create new application step](/docs/guides/oie-embedded-common-org-setup/java/main/#create-a-new-application).

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

### 5: Request the tokens from Okta

The Spring security framework doesn't understand Okta’s Interaction code flow. Therefore, your app needs to intercept Spring’s OAuth authentication code flow, exchange the Interaction code that is obtained from Okta for an access token, populate the user profile attributes, and construct [`OAuth2AuthenticationToken.java`](https://github.com/spring-projects/spring-security/blob/main/oauth2/oauth2-client/src/main/java/org/springframework/security/oauth2/client/authentication/OAuth2AuthenticationToken.java) before handing over the authentication flow back to Spring.

In the following example, the helper function [`exchangeCodeForToken()`](https://github.com/okta/okta-idx-java/blob/master/samples/embedded-sign-in-widget/src/main/java/com/okta/spring/example/HelperUtil.java#L80) is used to obtain the access and refresh tokens.

```java
final JsonNode jsonNode = helperUtil.exchangeCodeForToken(interactionCode, codeVerifier);
final OAuth2AccessToken oAuth2AccessToken = helperUtil.buildOAuth2AccessToken(jsonNode);
final OAuth2RefreshToken oAuth2RefreshToken = helperUtil.buildOAuth2RefreshToken(jsonNode);
```

### 6: Get the user profile information

Retrieve the user profile attributes with the access token object and populate Spring framework’s [`OAuth2AuthenticationToken`](https://github.com/spring-projects/spring-security/blob/main/oauth2/oauth2-client/src/main/java/org/springframework/security/oauth2/client/authentication/OAuth2AuthenticationToken.java) object reference for Spring to continue with the rest of the authentication flow. See the helper class method [`getUserAttributes()`](https://github.com/okta/okta-idx-java/blob/master/samples/embedded-sign-in-widget/src/main/java/com/okta/spring/example/HelperUtil.java#L67) for details.

```java
final Map<String, Object> userAttributes =
      helperUtil.getUserAttributes(clientRegistration.getProviderDetails().getUserInfoEndpoint().getUri(),
            oAuth2AccessToken);
```
