### The user selects the Facebook sign-in link

After you complete the [Configuration updates](#configuration-updates), the **Sign in with Facebook** link appears automatically in the Sign-In Widget. No code change is required.

<div class="half wireframe-border">

![The widget's sign-in page with a username field, Next button, Sign in with Facebook button, and links to reset your password and sign up](/img/wireframes/widget-sign-in-form-username-only-sign-up-forgot-your-password-facebook-links.png)

<!--
Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4662-25341&mode=design&t=mABNx7Cm2rdSOFyx-11 widget-sign-in-form-username-only-sign-up-forgot-your-password-facebook-links
 -->

</div>

When the user clicks this link, they're redirected to the Facebook sign-in page.

### The user signs in to Facebook

The user enters their Facebook credentials (email and password) on the sign-in page, which the Facebook platform hosts.

> **Note:** Use the user information from the test user you configured in [Set up the Facebook test user](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#_2-set-up-the-facebook-test-user). You don't need to make any code changes in your app for this step.

<div class="half border">

![Displays the Facebook sign-in page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-social-sign-in-fb-login.png)

</div>

### Facebook redirects the user to your Okta org

After the user signs in to Facebook, Facebook redirects them. You defined the redirect location in the **Valid OAuth Redirect URIs** and **Site URL** fields on the Facebook developer site.

> **Note:** The **Valid OAuth Redirect URIs** and the **Site URL** values for your Okta org are in the format: `https://{yourOktaDomain}/oauth2/v1/authorize/callback`. See [Create a Facebook app in Facebook](/docs/guides/oie-embedded-common-org-setup/nodejs/main/create-a-facebook-app-in-facebook) for details on configuring these values.

### Redirect the user to your app

After your Okta org receives a successful Facebook sign-in request, your org redirects the request to your app's **Sign-in redirect URIs** setting.

This step handles the callback from the widget that returns an `interaction_code`. This code is redeemed in the next step for tokens. The callback URL is defined in two locations and must be identical. These locations are:

* The `RedirectURI` parameter in the configuration setting defined in [Download and set up the SDK and sample app](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/).
* A URI defined in the **Sign-in redirect URIs** field in the Okta app. The **Sign-in redirect URIs** field is described in [Create an application](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#create-an-application).

For the sample application, set the **RedirectURI** to `http://localhost:8080/login/callback`

Okta returns the interaction code to the **Sign-in redirect URI** that's specified in the [create an application step](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#create-an-application) and is accessed in the sample app from `login.js`.

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

### Request and store the tokens from Okta

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

### Get the user profile information

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
