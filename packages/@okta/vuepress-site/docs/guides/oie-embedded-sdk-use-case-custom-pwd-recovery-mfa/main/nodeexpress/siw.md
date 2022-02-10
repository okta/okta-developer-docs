### 1: Initiate password recovery

The first step is for the user to initiate the password recovery flow and choosing email as the authenticator. Once the email is submited as the authenticator, Okta sends an email to the user's email address. Integrating these initials steps are described in detail in the [User password recovery guide](docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/nodejs/main/).

Before sending out the email, Okta first builds the message by using the **Forgot Password** template and translating the including template variables. The `otp` and `request.relayState` variables, you setup in [previously](#update-the-forgot-password-email-template) are translated into actual values. For example:

**URL in the template:** `http://localhost:8080/login/callback?otp=${oneTimePassword}&state=${request.relayState}`
**Translated URL send to user:** `http://localhost:8080/login/callback?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32`

### 2: Click on email magic link

The next step is for the user to click on link in the email. Add a route to accept the link's url in your app. Include logic to parse the OTP and state query parameters out of the URL string.

```javascript
router.get('/login/callback', async (req, res, next) => {
  const parsedUrl = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
  const { search, href } = parsedUrl;
  const { state, otp } = req.query;
  const authClient = getAuthClient(req);
  ...
```

### 3: Check if OTP and state parameters are included in URL

Check to see if OTP and state exists in the query parameter by calling `OktaAuth.idx.isEmailVerifyCallback()` passing in the query parameter string. An example query string: `?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32`

```javascript
if (authClient.idx.isEmailVerifyCallback(search)) {
  ...
}
```

### 4: Check for the existence of an in-progress password recovery

Call `OktaAuth.idx.canProceed()` passing in the`state` parameter to verify there is an active in-progress password recovery for the current user.

```javascript
    if (authClient.idx.canProceed({ state })) {
      res.redirect(`/login?state=${state}&otp=${otp}`);
      return;
```

### 5:
-------- ACTUAL DATA
### Check if OTP and relaystate has been passed to url

```javascript
    const widgetConfig = {
      useInteractionCodeFlow: true,
      issuer,
      clientId,
      redirectUri,
      state,
      scopes,
      codeChallenge,
      codeChallengeMethod,
      otp
    };
    res.render('login', {
      siwVersion: '6.0.0',
      widgetConfig: JSON.stringify(widgetConfig),
      selfHosted: !!process.env.SELF_HOSTED_WIDGET
    });
```

```html
<script type="text/javascript">
  const widgetConfig = {{{widgetConfig}}};
  const signIn = new OktaSignIn({
    el: '#okta-signin-widget-container',
    ...widgetConfig
  });
  signIn.showSignInAndRedirect()
    .catch(err => {
      console.log('Error happen in showSignInAndRedirect: ', err);
    });
</script>
```

```javascript
  if (authClient.idx.isEmailVerifyCallback(search)) {
    if (authClient.idx.canProceed({ state })) {
      res.redirect(`/login?state=${state}&otp=${otp}`);
      return;
    } else {
      const error = new Error(`Enter the OTP code in the original tab: ${otp}`);
      next(error);
      return;
    }
  }
```

The widget polls on both tabs but the SDK does not.
