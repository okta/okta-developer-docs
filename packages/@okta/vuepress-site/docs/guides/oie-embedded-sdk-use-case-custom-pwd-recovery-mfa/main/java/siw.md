> **Note**: The examples in this guide use Java 11 and Spring Boot MVC.

### 1: Start password recovery

After the user starts the password recovery flow and selects the email authenticator for the process, Okta sends them an email that matches the **Forgot Password** template that you altered earlier.

<div class="three-quarter">

![Example of email sent to user](/img/advanced-use-cases/custom-pwd-recovery-custom-email.png)

</div>

When the user clicks the **Reset Password** link, their browser sends a request to the endpoint defined by the template and attaches the `{oneTimePassword}` and `{request.relayState}` VTL variables as query parameters to the URL. For instance, in the sample this request might render as `http://localhost:8080/magic-link/callback?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32`.

### 2: Handle the OTP and state parameters

Create a callback handler that takes the `{oneTimePassword}` and `{request.relayState}` values from the query string, saves them into local variables (for instance, 'otp', and 'state'), and makes the following checks:

1. That the current session attribute `IdxClientContext` isn't `null` (because the user clicked the magic link from a different browser).
2. That `state` isn't `null`.

If either check returns false, redirect the browser to an error page. If both checks return true, pass `IdxClientContext`,`otp` and `state` as session attributes to a page that contains the Sign-In Widget for processing. For example:

```java
@GetMapping("/magic-link/callback")
public ModelAndView handleMagicLinkCallback(
   HttpServletRequest request,
   @RequestParam(name = "state") String state,
   @RequestParam(name = "otp") String otp,
   HttpSession session) throws MalformedURLException
{
  if (session.getAttribute(IDX_CLIENT_CONTEXT) == null) {
      try {
         idxClientContext = idxAuthenticationWrapper.getClientContext();
      }
      catch (ProcessingException e) {
         // return error details
      }
      session.setAttribute(IDX_CLIENT_CONTEXT, idxClientContext);
  }

  if (idxClientContext == null) {
     // return error details
  }

  if (state == null) {
      return new ModelAndView("redirect:" + oktaOAuth2Properties.getRedirectUri());
  }

  String issuer = oktaOAuth2Properties.getIssuer();
  // the widget needs the base url, just grab the root of the issuer
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
    request.getServerPort() + request.getContextPath() +
    "/authorization-code/callback");
  mav.addObject(ISSUER_URI, issuer);
  session.setAttribute(CODE_VERIFIER, idxClientContext.getCodeVerifier());
  return mav;
}
```

Pass the values using the widget's `config` object.

```html
  <div id="sign-in-widget"></div>

  <script th:inline="javascript">
      /*<![CDATA[*/

      var config = {};
      config.baseUrl = /*[[{oktaBaseUrl}]]*/ 'https://{yourOktaDomain}';
      config.clientId = /*[[{oktaClientId}]]*/ '{clientId}';
      config.otp = /*[[{otp}]]*/ '{otp}';
      config.redirectUri = /*[[{redirectUri}]]*/ '{redirectUri}';
      config.interactionHandle = /*[[{interactionHandle}]]*/ '{interactionHandle}';
      config.codeChallenge = /*[[{codeChallenge}]]*/ '{codeChallenge}';
      config.codeChallengeMethod = /*[[{codeChallengeMethod}]]*/ '{codeChallengeMethod}';
      config.redirect = 'always';
      config.authParams = {
          issuer: /*[[{issuerUri}]]*/ '{issuerUri}',
          pkce: true,
          state: /*[[{state}]]*/ '{state}' || false,
          nonce: /*[[{nonce}]]*/ '{nonce}',
          scopes: /*[[{scopes}]]*/ '[scopes]',
      };

      new OktaSignIn(config).showSignInAndRedirect(
          { el: '#sign-in-widget' },
          function (res) {}
      );
      /*]]>*/
  </script>
```

> **Important**: In Okta Sign-In Widget version 7+, Identity Engine is enabled by default. If you are using an earlier version than 7, you must explicitly enable Identity Engine features by setting `config.useInteractionCodeFlow = true;` in the code above. If you are using version 7+ and you want to use Okta Classic Engine rather than Identity Engine, specify `config.useClassicEngine = true;` in the code above.

### 3: Display password reset prompt and complete password recovery flow

After the widget loads, it checks the validity of the `otp` and `state` values with the Okta server. If they are valid, the user is prompted to reset their password, as shown below. The user continues the password recovery flow described in the [User password recovery summary of steps](/docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/java/main/#summary-of-steps).

<div class="half border">

![Screenshot of password reset page](/img/advanced-use-cases/java-custom-pwd-recovery-custom-siw-reset-pwd-page.png)

</div>
