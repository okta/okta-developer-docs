### Your app displays the sign-in page

Build a sign-in page that captures the user's name and password with the Widget. Ensure that the page completes the steps described in [Load the Widget](/docs/guides/oie-embedded-widget-use-case-load/nodejs/main/) when the page loads.

### The user submits their username and password

When the user submits their credentials, the Widget sends an identify request to Identity Engine. Identity Engine returns an interaction code to the sign-in redirect URI that you configured earlier.

### Your app handles an authentication success response

Handle the callback from Identity Engine to the sign-in redirect URI.

1. Check for any errors returned from Identity Engine. If the user correctly supplies their password, there are no errors.
1. Call `authClient.idx.handleInteractionCodeRedirect` to exchange the code for the user's tokens from the authorization server, and then save the tokens for future use.
1. Redirect the user to the default page after a successful sign-in attempt.

The user has now signed in.

```javascript
router.get('/login/callback', async (req, res, next) => {
   const parsedUrl =
      new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
   const { search, href } = parsedUrl;
   const { state, otp } = req.query;
   const authClient = getAuthClient(req);

   // error handling elided

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

### Get the user profile information

After the user signs in successfully, retrieve basic user information from session storage where it was saved in the previous step.

```javascript
router.get('/', (req, res) => {
   const userinfo = req.userContext && req.userContext.userinfo;
   const attributes = userinfo ? Object.entries(userinfo) : [];
   res.render('home', {
      isLoggedIn: !!userinfo,
      userinfo,
      attributes
   });
});
```
