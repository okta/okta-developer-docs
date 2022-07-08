### 1. User navigates to your app's page hosting the Sign-in Widget

The first step involves the user navigating to your app's page hosting the Sign-in Widget. Since you've configure your Okta org for password-optional sign-ins, only the username field is visible on this page.

<div class="half border">

![Screenshot showing the Sign-in Wiget sign-in page with a username field and a Next button.](/img/pwd-optional/pwd-optional-widget-sign-in-page.png)

</div>

> **Note:** This guide assumes you have already set up and configured the Sign-in Widget in your app. To learn more about how to add the Sign-In Widget to your app, see the [Embedded Okta Sign-In Widget fundamentals](docs/guides/embedded-siw/main/) guide.

### 2. User signs in using their username

To start the sign-in process, the user enters their username and selects the **Next** button.

### 3. User chooses to send email

After **Next** is selected, the widget displays a page for the user to verify their email only. The user is only given this because email is the only authenticator they have enrolled and the app's authentication policy is configured to allow for one factor type. Presented with this page, the user selects the **Send me an email** button.

<div class="half border">

![Screenshot showing the Sign-in Wiget sign-in page with a username field and a Next button.](/img/pwd-optional/pwd-optional-widget-send-email-page.png)

</div>

### 4. User verifies their email

<StackSnippet snippet="emailverification" />



The following code snippet defines a route to handle the magic link callback. Use `OktaAuth.idx.isEmailVerifyCallback()` to verify the request is from a magic link and `OktaAuth.idx.canProceed()` to perform the same-browser check. In this example, `otp` and `state` are forwarded to the page hosting the Sign-in Widget. To learn more about initilizing the Sign-In Widget with `otp` and `state`, see the [Embedded Okta Sign-In Widget fundamentals](docs/guides/embedded-siw/main/) guide.

```javascript
router.get('/login/callback', async (req, res, next) => {
  const parsedUrl = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
  const { search, href } = parsedUrl;
  const { state, otp } = req.query;
  const authClient = getAuthClient(req);

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
  ...
});
```

### 4. Your app obtains the sign-in tokens from the interaction code

After the user successfully verifies their email, the Identity Engine sends a request to a URI defined in the **Sign-in redirect URIs** setting for the org's application integration.

"http://localhost:8080/login/callback?interaction_code=2JFmObNY8snovJP6_UK5gI_l7RQ-dPL69QDx6iGr3ZE&state=cc1dc88285b9873be5f90fc2573e4022"

```javascript
router.get('/login/callback', async (req, res, next) => {
  const parsedUrl = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
  const { search, href } = parsedUrl;
  const { state, otp } = req.query;
  const authClient = getAuthClient(req);

  ...

  try {
    // Exchange code for tokens
    await authClient.idx.handleInteractionCodeRedirect(href);
    // Redirect back to home page
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

```

### 5. Your app redirects user to default home page

TODO
-->
