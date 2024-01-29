### 1: The user selects the Facebook sign-in link

If the the steps in [Configuration updates](#configuration-updates) were completed, the **Sign in with Facebook** link appears automatically on the Widget. No code change is required for the Facebook sign-in link to appear.

<div class="half wireframe-border">

![The Okta Sign-In Widget's sign-in form with a field for a username, next button, sign in with Facebook button and links to reset your password and sign up](/img/wireframes/widget-sign-in-form-username-only-sign-up-forgot-your-password-facebook-links.png)

<!--
Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4662-25341&mode=design&t=mABNx7Cm2rdSOFyx-11 widget-sign-in-form-username-only-sign-up-forgot-your-password-facebook-links
 -->

</div>

When the user clicks this link they are send to the Facebook login screen.

### 2: The user signs in to Facebook

Next, the user enters their email and password and clicks login.
This page is hosted by Facebook. The user information you enter originates
from  a test user you configured in [Set up the Facebook test user](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#_2-set-up-the-facebook-test-user). There are no code changes
you need to make in your app to support to this step.

<div class="half border">

![Displays the Facebook sign-in form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-social-sign-in-fb-login.png)

</div>

### 3: Facebook redirects the user to your Okta org

If the user Facebook login is successful, facebook routes the user to the value you enter for **Valid OAuth Redirect URIs** and **Site URL** in [Create a Facebook app in Facebook](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#_1-create-a-facebook-app-in-facebook).
The value takes on the following format: `https://{Okta org domain}/oauth2/v1/authorize/callback` (for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`).

### 4: The Okta org redirects the user to your app using the sign-in redirect URI

After Facebook sends the success login request to your Okta org, the org
redirects the request to your app via the Application’s
**Sign-in redirect URIs** field.

This step handles the callback from the Widget that
returns an `interaction_code`. This code is redeemed in the
next step for tokens. The callback URL is defined in two locations
and must be identical. These locations are:

* The `RedirectURI` parameter in the configuration setting defined in
   [Download and set up the SDK and sample app](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/).
* A URI defined in the **Sign-in redirect URIs** field in the Okta
   Application. The **Sign-in redirect URIs** field is described in
   [Create a new application](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#create-a-new-application).

For the sample application, the **RedirectURI** should be set to `http://localhost:8080/login/callback`

Okta returns the Interaction Code to the **Sign-in redirect URI** that is specified in the [create new application step](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#create-a-new-application) and is accessed in the sample app from `login.js`.

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

### 5: Request and store the tokens from Okta

Use the Interaction Code component of the `login.js` page to request tokens and store them in the SDK.

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

### 6 (Optional): Get the user profile information

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
