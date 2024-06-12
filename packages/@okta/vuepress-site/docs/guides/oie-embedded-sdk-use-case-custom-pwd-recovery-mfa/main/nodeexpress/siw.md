### 1: Initiate password recovery

The first step is to initiate the password recovery flow and choose email as the authenticator. After the user submits the email as an authenticator, Okta sends an email to their email address. These initial steps are described in detail in the [User password recovery guide](/docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/nodejs/main/).

Before sending the email, Okta builds the message based on the **Forgot Password** template. The `otp` and `request.relayState` variables are translated into actual values. For example,`http://localhost:8080/login/callback?otp={oneTimePassword}&state={request.relayState}` becomes `http://localhost:8080/login/callback?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32`.

### 2: Click the email magic link

The next step is to open the Okta email and click its reset password link.

<div class="three-quarter">

![Screenshot of email sent to user](/img/advanced-use-cases/custom-pwd-recovery-custom-email.png)

</div>

Add a route to accept the link's URL in your app. Include logic to parse the `otp` and `state` parameters out of the URL string.

```javascript
router.get('/login/callback', async (req, res, next) => {
  const parsedUrl = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
  const { search, href } = parsedUrl;
  const { state, otp } = req.query;
  const authClient = getAuthClient(req);
  ...
```

### 3: Check if the otp and state parameters are included in URL

Check to see if the `otp` and `state` parameters exist in the query parameter by calling `OktaAuth.idx.isEmailVerifyCallback()` and passing in the query parameter string. For example, the query string can look like `?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32`.

```javascript
if (authClient.idx.isEmailVerifyCallback(search)) {
  ...
}
```

### 4: Check for the existence of an in-progress password recovery

Call `OktaAuth.idx.canProceed()` and pass in the`state` parameter to verify that there is an active in-progress password recovery for the current user.

```javascript
    if (authClient.idx.canProceed({ state })) {
      res.redirect(`/login?state={state}&otp={otp}`);
      return;
```

### 5: Set up and render widget with otp and state

After you validate the `state` parameter, the final step is to set up the `otp` and `state` in the widget configurations. Set up the configurations based on the following snippet. Replace `{widgetVersion}` with the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the widget (-=OKTA_REPLACE_WITH_WIDGET_VERSION=-).

```javascript
    const widgetConfig = {
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
      siwVersion: '{widgetVersion}',
      widgetConfig: JSON.stringify(widgetConfig),
      selfHosted: !!process.env.SELF_HOSTED_WIDGET
    });
```

> **Important**: In Okta Sign-In Widget version 7+, Identity Engine is enabled by default. If you are using an earlier version than 7, you must explicitly enable Identity Engine features by setting `useInteractionCodeFlow: true` in the `widgetConfig` object shown above. If you are using version 7+ and you want to use Okta Classic Engine rather than Identity Engine, specify `useClassicEngine: true` in the `widgetConfig` object.

After set up, render the client site page and pass the configurations to the widget during initialization.

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

### 6: Display password reset page and continue the password recovery flow

After the widget is loaded, the following reset page appears:

<div class="half border">

![Screenshot of password reset page](/img/advanced-use-cases/custom-pwd-recovery-custom-siw-reset-pwd-page.png)

</div>
