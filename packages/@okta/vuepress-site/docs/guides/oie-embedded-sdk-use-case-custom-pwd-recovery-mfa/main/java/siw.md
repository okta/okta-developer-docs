### 1: Start password recovery

To begin the password recovery flow, the user must:

1. Click the **Forgot Password?** link on the sign-in page.
2. Enter their **Email or Username** in the box and click **Next**.
3. Choose **Email** as the authenticator they want to use for password recovery and click **Submit**.

Okta then sends the user an email that matches the Forgot Password template that you altered earlier, and the Sign-In Widget tells them to click the link in the email or to enter the OTP to continue.

<div class="common-image-format">

![Screenshot of email sent to user](/img/advanced-use-cases/custom-pwd-recovery-custom-email.png "Password Recovery Email")

</div>

The email's **Reset Password** link includes the `otp` and `request.relayState` variables sent back as query parameters to the application. For example,

`http://localhost:8080/magic-link/callback?otp=${oneTimePassword}&state=${request.relayState}` becomes `http://localhost:8080/magic-link/callback?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32`.

### 2: Handle the OTP and state parameters

Create a callback handler method that takes the `otp` and `state` parameters in the query string and passes them as session parameters to a page that contains the Sign-In Widget. First, retrieve the current `IDXClientContext` object from the browser session and check that `state` has a value.

If `state` is `null` or the browser context object is `null` (because the user is clicking the magic link in a different browser), the widget will advise the user to return to the original tab in the browser where they requested a password reset and enter the OTP to proceed.

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

```

If both values are valid, collate all the values required by the widget and pass them to the page hosting the widget in your application.

```java
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

You can pass the values to the widget using the widget's `config` object.

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

After the widget is loaded, it checks whether `state` and `otp` are valid with the Okta server. Assuming they are, either the following reset page or a prompt appears for the user to enter the OTP. After the user enters the OTP, the reset page appears. The user continues the password recovery flow described in the [User password recovery guide](/docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/java/main/).

<div class="common-image-format">

![Screenshot of password reset page](/img/advanced-use-cases/java-custom-pwd-recovery-custom-siw-reset-pwd-page.png "Password Reset Page")

</div>
