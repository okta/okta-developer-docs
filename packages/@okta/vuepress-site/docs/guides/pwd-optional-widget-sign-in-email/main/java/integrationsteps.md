> **Note**: The examples in this guide use Java 11 and Spring Boot MVC.

The following code defines an endpoint that receives the `OTP` and `state` values from the magic link. If `state` is null or `IDX_CLIENT_CONTEXT` isn't present in session state, the code assumes the callback hasn't come from the same browser. Redirect the user to a page where the widget prompts the user to enter the code or open the magic link in the original browser.

If successful, the `OTP` and `state` values are passed to the widget with the rest of its configuration details.

```java
@GetMapping("/magic-link/callback")
public ModelAndView handleMagicLinkCallback(
   HttpServletRequest request,
   @RequestParam(name = "state") String state,
   @RequestParam(name = "otp") String otp,
   HttpSession session) throws MalformedURLException {

   if (idxClientContext == null) {
      ModelAndView modelAndView = new ModelAndView("error");
      modelAndView.addObject("error_details", "Unknown error");
      return modelAndView;
   }

   // if we don't have the state parameter redirect
   if (state == null) {
      return new ModelAndView("redirect:" + oktaOAuth2Properties.getRedirectUri());
   }

   String issuer = oktaOAuth2Properties.getIssuer();
   String orgUrl = new URL(new URL(issuer), "/").toString();

   ModelAndView mav = new ModelAndView("login");
   mav.addObject(STATE, state);
   mav.addObject(OTP, otp);
   mav.addObject(SCOPES, oktaOAuth2Properties.getScopes());
   mav.addObject(OKTA_BASE_URL, orgUrl);
   mav.addObject(OKTA_CLIENT_ID, oktaOAuth2Properties.getClientId());
   mav.addObject(INTERACTION_HANDLE, idxClientContext.getInteractionHandle());
   mav.addObject(CODE_VERIFIER, idxClientContext.getCodeVerifier());
   mav.addObject(CODE_CHALLENGE, idxClientContext.getCodeChallenge());
   mav.addObject(CODE_CHALLENGE_METHOD, CODE_CHALLENGE_METHOD_VALUE);
   mav.addObject(REDIRECT_URI,
      request.getScheme() + "://" + request.getServerName() + ":" +
      request.getServerPort() + request.getContextPath() + "/authorization-code/callback"
   );
   mav.addObject(ISSUER_URI, issuer);
   session.setAttribute(CODE_VERIFIER, idxClientContext.getCodeVerifier());
   return mav;
}
```

> **Note**: For more information on magic links and OTP, including customizations and complete user journeys, see [Email Magic Links overview](/docs/guides/email-magic-links-overview/main/).

### 4. Your app handles an authentication success response

After the user successfully verifies their identity, Identity Engine sends an interaction code in a query parameter to `${signInRedirectURI}`. For example, `http://localhost:8080/?interaction_code=2JFmObNY8snovJP6_UK5gI_l7RQ-....`

Create an endpoint that calls your custom authorization server and exchanges the interaction code for access tokens. The user has now signed in.

```java
@GetMapping("/")
public String home(
   @RequestParam(name = "error", required = false) String error,
   @RequestParam(name = "interaction_code", required = false) String interactionCode,
   @RequestParam(name = "state", required = false) String state,
   HttpSession session) {

   if (interactionCode != null && state != null) {
      String oauthAuthUri =
         String.format("/oauth2/authorization/okta?interaction_code=%s&state=%s", interactionCode, state);
      return "redirect:" + oauthAuthUri;
   }

   // handle errors
   return "home";
}
```

Store these tokens for future requests and redirect the user to the default page after a successful sign-in attempt.
