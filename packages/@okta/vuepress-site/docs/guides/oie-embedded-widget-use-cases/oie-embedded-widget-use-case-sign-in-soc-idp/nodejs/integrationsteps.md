## Integration steps

### Step 1: User clicks on Sign in with Facebook link

If the the steps in
[Complete steps in Set up your Okta org (for social identity providers)](/docs/guides/oie-embedded-widget-use-cases/nodejs/oie-embedded-widget-use-case-sign-in-soc-idp/#step-2-complete-steps-in-set-up-your-okta-org-for-social-identity-providers),
were completed, the **Sign in with Facebook** link should
appear automatically on the widget. There are no code changes
need to make the link appear.

When the user clicks this link they are send to the Facebook login screen.

### Step 2: User signs into Facebook

Next, the user enters their email and password and clicks login.
This page is hosted by Facebook. The user information you enter originates
from  a test user you configured in
[Set up your Okta org (for social identity providers)](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-social-identity-providers). There are no code changes
you need to make in your app to support to this step.

<div class="common-image-format">

![Displays the Facebook sign-in form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-social-sign-in-fb-login.png)

</div>

### Step 3: Facebook redirects to your Okta org

If the user Facebook login is successful, facebook routes the user to the value you enter for **Valid OAuth Redirect URIs** and **Site URL** in
[Set up your Okta org (for social identity providers)](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-social-identity-providers).
The value takes on the following format:  `https://{Okta org domain}/oauth2/v1/authorize/callback.` (for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`)

### Step 4: Okta org redirects to your app via the Sign-in redirect URIs

After Facebook sends the success login request to your Okta org, the org
redirects the request to your app via the Application’s
**Sign-in redirect URIs** field.

This step handles the callback from the widget that
returns an `interaction_code`. This code will be redeemed in the
next step for tokens. The callback URL is defined in two locations
and must be identical. These locations are:

* The `RedirectURI` parameter in the configuration setting defined in
   [Download and set up the SDK and sample app](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/).
* A URI defined in the **Sign-in redirect URIs** field in the Okta
   Application. The **Sign-in redirect URIs** field is described in
   [Setup your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-password-factor-only-use-cases).

For the sample application, the **RedirectURI** should be set to `http://localhost:8080/login/callback`

Okta returns the interaction code to the **Sign-in redirect URI** that is specified in the [create new application step](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#create-a-new-application) and is accessed in the sample app from `login.js`.

```JavaScript
router.get('/login/callback', async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;
  const authClient = getAuthClient(req);
  try {
    // Exchange code for tokens
    await authClient.idx.handleInteractionCodeRedirect(url);
    // Redirect back to home page
    res.redirect('/');
  } catch (err) {
    if (authClient.isInteractionRequiredError(err) === true) {
      const { state } = req.query;
      res.redirect('/login?state=' + state);
      return;
    }

    next(err);
  }
});
```

### Step 5: Request and store tokens from Okta

Use the interaction code component of the `login.js` page to request tokens and store them in the SDK.

```JavaScript
  try {
    // Exchange code for tokens
    await authClient.idx.handleInteractionCodeRedirect(url);
    // Redirect back to home page
    res.redirect('/');
  } catch (err) {
    if (authClient.isInteractionRequiredError(err) === true) {
      const { state } = req.query;
      res.redirect('/login?state=' + state);
      return;
    }
  }
```

### Step 6: Call user profile information (optional)

Retrieve the user profile information, stored in the `attributes` variable, from the `home.js` file:

```JavaScript
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const userinfo = req.userContext && req.userContext.userinfo;
  const attributes = userinfo ? Object.entries(userinfo) : [];
  res.render('home', {
    isLoggedIn: !!userinfo,
    userinfo,
    attributes
  });
});

module.exports = router;
```
