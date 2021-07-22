## Integration steps

### Step 1: Create a sign out UI element

The first step is to create a link, button, or other similar UI element that allows the user to sign out of the app.

<div class="common-image-format">

![Sign out link](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-out-link.png
 "Sign out link")

</div>

### Step 2: Close Okta SSO session and revoke access token

When the sign-out request is initiated, create the following flow:

1. Obtain the access token from the active session state. For example, by calling `getAuthClient` from `getAuthClient.js` in the SDK sample application.

1. Call the `getSignOutRedirectURL` to close the Okta SSO session before revoking the token (`revokeAccessToken`) and invalidating the local session, as shown in the SDK sample application's `logout.js` file:

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

>**Note**: Revoking the refresh token is optional, as it requires `offline_access` in scopes.

### Step 3: Send user to the signed out page

After the access token is revoked and the local app session is no longer valid, redirect the user to the signed-out page.

```JavaScript
// Clear okta session with logout redirect
    res.redirect(signoutRedirectUrl);
```
