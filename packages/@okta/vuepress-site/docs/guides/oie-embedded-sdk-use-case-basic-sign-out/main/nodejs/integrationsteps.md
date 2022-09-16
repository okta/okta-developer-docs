### 1: Create a sign-out UI element

The first step is to create a link, button, or other similar UI element that allows the user to sign out of the app.

### 2: Close the Okta SSO session and revoke the access token

When the sign-out request is initiated, create the following flow:

1. Obtain the access token from the active session state. For example, obtain the access token by calling `getAuthClient` from `getAuthClient.js` in the SDK sample application.

1. Call `getSignOutRedirectURL` to close the Okta SSO session before you revoke the token (`revokeAccessToken`) and invalidate the local session, as shown in the SDK sample application's `logout.js` file:

```JavaScript
router.post('/logout', async (req, res) => {
  try {
    const authClient = getAuthClient(req);
    // Get okta signout redirect url
    // Call this method before revoke tokens as revocation clears tokens in storage
    const signoutRedirectUrl = authClient.getSignOutRedirectUrl();
    // Revoke tokens
    await authClient.revokeRefreshToken();
    await authClient.revokeAccessToken();
    // Clear local session
    req.session.destroy();
    // Clear okta session with logout redirect
    res.redirect(signoutRedirectUrl);
  } catch (err) {
    console.log('/logout error: ', err);
  }
});
```

>**Note**: Revoking the refresh token is optional, as it requires that you request the `offline_access` scope.

### 3: Send the user to the signed-out page

After the access token is revoked and the local app session is no longer valid, redirect the user to the sign-out page.

```JavaScript
// Clear okta session with logout redirect
    res.redirect(signoutRedirectUrl);
```
