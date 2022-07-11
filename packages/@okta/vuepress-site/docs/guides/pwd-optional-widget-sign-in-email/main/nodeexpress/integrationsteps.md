The following code snippet defines a route to handle the callback request originating from the magic link. Use `OktaAuth.idx.isEmailVerifyCallback()` to verify the request is from a magic link and `OktaAuth.idx.canProceed()` to perform the same-browser check. In this example, the `otp` and `state` parameters are forwarded to the page hosting the Sign-in Widget. To learn more about initializing the Sign-In Widget with `otp` and `state`, see the [Embedded Okta Sign-In Widget fundamentals](docs/guides/embedded-siw/main/) guide.

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

After the user successfully verifies their email, the Identity Engine sends an interaction code to your app using a URI defined in **Sign-in redirect URIs** in the org's application integration. The interaction code is sent as a query parameter, for example, `http://localhost:8080/login/callback?interaction_code=2JFmObNY8snovJP6_UK5gI_l7RQ-...`. Use `OktaAuth.idx.handleInteractionCodeRedirect()` to exchange the interaction for the Id and access tokens.

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
