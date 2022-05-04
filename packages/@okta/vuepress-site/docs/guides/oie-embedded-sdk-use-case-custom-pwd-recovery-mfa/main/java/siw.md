### 1: Start password recovery

The user starts the password recovery flow by completing these steps:

1. Click the **Forgot Password?** link on the sign-in page.
2. Enter their **Email or Username** in the dialog and then clicks **Next**.
3. Choose **Email** as the authenticator they want to use for password recovery and clicks **Submit**.

Okta then tells the user to either click the link in the email or enter the code to continue and sends an email to their email address matching the Forgot Password template that was altered earlier.

<div class="common-image-format">

![Example of email sent to user](/img/advanced-use-cases/custom-pwd-recovery-custom-email.png "Password recovery email")

</div>

The email's **Reset Password** link includes the `otp` and `request.relayState` variables sent back as query parameters to the application. For instance, the URL in the email template,  `http://localhost:8080/magic-link/callback?otp=${oneTimePassword}&state=${request.relayState}`, might be rendered as `http://localhost:8080/magic-link/callback?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32` in the email sent to the user.

### 2: Handle the OTP and state parameters

Create a callback handler that takes the `otp` and `state` parameters from the query string,  attempts to retrieve the current `IDXClientContext` object from the browser session, and then passes them all as session parameters to a page that contains the Sign-In Widget for processing.

If either the browser context object is `null` (because the user clicked the magic link from a different browser) or `state` is `null`, redirect to an error page instead.

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
      config.baseUrl = /*[[${oktaBaseUrl}]]*/ 'https://{yourOktaDomain}';
      config.clientId = /*[[${oktaClientId}]]*/ '{clientId}';
      config.otp = /*[[${otp}]]*/ '{otp}';
      config.redirectUri = /*[[${redirectUri}]]*/ '{redirectUri}';
      config.useInteractionCodeFlow = true;
      config.interactionHandle = /*[[${interactionHandle}]]*/ '{interactionHandle}';
      config.codeChallenge = /*[[${codeChallenge}]]*/ '{codeChallenge}';
      config.codeChallengeMethod = /*[[${codeChallengeMethod}]]*/ '{codeChallengeMethod}';
      config.redirect = 'always';
      config.authParams = {
          issuer: /*[[${issuerUri}]]*/ '{issuerUri}',
          pkce: true,
          state: /*[[${state}]]*/ '{state}' || false,
          nonce: /*[[${nonce}]]*/ '{nonce}',
          scopes: /*[[${scopes}]]*/ '[scopes]',
      };

      new OktaSignIn(config).showSignInAndRedirect(
          { el: '#sign-in-widget' },
          function (res) {}
      );
      /*]]>*/
  </script>
```

### 3: Displays password reset prompt and complete password recovery flow

The widget loads and then checks the validity of state and otp with the Okta server. If the values are valid, the user is prompted to reset their password, as shown below. The user continues the password recovery flow described in the [User password recovery summary of steps](/docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/java/main/#summary-of-steps).

<div class="common-image-format">

![Screenshot of password reset page](/img/advanced-use-cases/java-custom-pwd-recovery-custom-siw-reset-pwd-page.png "Password Reset Page")

</div>
