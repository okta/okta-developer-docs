## Integration steps

###  Step 1: User signs in

The user signs in with the Sign-In Widget that was set up in the [Load the widget](/docs/guides/oie-embedded-widget-use-cases/nodejs/oie-embedded-widget-use-case-load/) use case. After the user enters their credentials and clicks Sign in, the widget sends an identify request to Okta.

<div class="common-image-format">

![Widget sign in screen](/img/oie-embedded-sdk/oie-embedded-widget-use-case-sign-in-screen.png
 "Widget sign in screen")

</div>

### Step 2: Handle the callback from the widget

Okta returns the interaction code to the **Sign-in redirect URI** specified in the [create new application step](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#step-4-create-new-application) and is accessed in the sample app from `login.js`.

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

### Step 3: Request and store tokens from Okta

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
});
```

### Step 4: Call user profile information (optional

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
