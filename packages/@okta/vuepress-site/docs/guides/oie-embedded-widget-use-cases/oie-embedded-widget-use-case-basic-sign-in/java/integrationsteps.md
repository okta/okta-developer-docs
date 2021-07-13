## Integration steps

###  Step 1: User signs in

The user signs in with the Sign-In Widget that was set up in the [Load the widget](/docs/guides/oie-embedded-widget-use-cases/java/oie-embedded-widget-use-case-load/) use case. After the user enters their credentials and clicks **Sign in**, the widget sends an identify request to Okta.

<div class="common-image-format">

![Widget sign in screen for Java](/img/oie-embedded-sdk/oie-embedded-widget-use-case-sign-in-screen-java.png
 "Widget sign in screen for Java")

</div>

### Step 2: Handle the callback from the widget

Okta returns the interaction code to the **Sign-in redirect URI** specified in the [create new application](/docs/guides/oie-embedded-common-org-setup/java/main/#step-4-create-new-application) step.

> **Note:** The redirect URI configuration setting used to start up the app (such as `OKTA_IDX_REDIRECTURI` environment variable), must be defined as one of the **Sign-in redirect URI** settings for the app integration created in the Admin console. See [create new application](/docs/guides/oie-embedded-common-org-setup/java/main/#step-4-create-new-application).


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

> **Note:** In the previous code snippet used in the embedded Sign-In Widget sample app, the `REDIRECT_URI` is taken from the app start configuration setting (such as `https://localhost:8080`), as well as `http://localhost:8080/authorization-code/callback`.

### Step 3: Request tokens from Okta

Use the interaction code and code verifier to request for tokens.

```java
public JsonNode exchangeCodeForToken(final String interactionCode, final String codeVerifier)
      throws MalformedURLException {

   final HttpHeaders headers = new HttpHeaders();
   headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
   headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

   final MultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
   requestParams.add("grant_type", "interaction_code");
   requestParams.add("client_id", clientId);
   if (Strings.hasText(clientSecret)) {
      requestParams.add("client_secret", clientSecret);
   }
   requestParams.add("interaction_code", interactionCode);
   requestParams.add("code_verifier", codeVerifier);

   final HttpEntity<MultiValueMap<String, String>> requestEntity =
            new HttpEntity<>(requestParams, headers);
   final String tokenUri = ClientUtil.getNormalizedUri(issuer, "/v1/token");

   final ResponseEntity<JsonNode> responseEntity =
            restTemplate.postForEntity(tokenUri, requestEntity, JsonNode.class);

   return responseEntity.getBody();
}
```

```java
final JsonNode jsonNode = helperUtil.exchangeCodeForToken(interactionCode, codeVerifier);
final OAuth2AccessToken oAuth2AccessToken = helperUtil.buildOAuth2AccessToken(jsonNode);
final OAuth2RefreshToken oAuth2RefreshToken = helperUtil.buildOAuth2RefreshToken(jsonNode);

```

### Step 4: Call user profile information (Optional)

Use the Spring framework to retrieve user profile information with the access token.

```java
final Map<String, Object> userAttributes =
      helperUtil.getUserAttributes(clientRegistration.getProviderDetails().getUserInfoEndpoint().getUri(),
            oAuth2AccessToken);
```
