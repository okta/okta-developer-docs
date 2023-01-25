### 1: The user signs in

The user signs in with the Sign-In Widget that was set up in the [Load the Widget](/docs/guides/oie-embedded-widget-use-case-load/nodejs/main/) use case. After the user enters their credentials and clicks **Next**, the Widget sends an identify request to Okta.

<div class="half">

![Screenshot of basic Okta Sign-In Widget](/img/siw/okta-sign-in-javascript.png)

</div>

### 2: Handle the callback from the Widget

Okta returns the Interaction Code to the **Sign-in redirect URI** specified in the [create new application step](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#create-a-new-application). The Interaction Code is accessed in the sample app from `login.js`.

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

### 3: Request and store the tokens from Okta

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

### 4 (Optional): Get the user profile information

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
