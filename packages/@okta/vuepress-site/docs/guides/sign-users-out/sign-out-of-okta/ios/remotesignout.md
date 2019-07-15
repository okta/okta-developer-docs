#### Define a sign-out callback

Signing out of Okta requires the app to open a browser and navigate to the [end session endpoint](https://developer.okta.com/docs/reference/api/oidc/#logout). Okta destroys the user's session and immediately redirects back to your application.

Define your sign out callback(for example, `com.okta.example:/signoutCallback`) in `Okta.plist` file and set it as a value to `logoutRedirectUri` key. Also note that in order to redirect back to your application from a web browser, you must specify a unique URI to your app. To do this, open `Info.plist` file in your application bundle and set an URL Scheme to the scheme of the redirect URI. For example, if your Redirect URI is `com.okta.example:/signoutCallback`, the URL Scheme will be `com.okta.example`.

Next, add defined callback as an allowed **Logout redirect URI** in the Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, and then select your application.
2. Select **General** and click **Edit**.
3. In the **Logout redirect URI**, enter the callback that you defined (for example, `com.okta.example:/signoutCallback`).
4. Click **Save**.


#### Clear the Okta session

With the callback in place, clear the Okta session in the browser by calling:

```swift
oktaOidc.signOutOfOkta(authStateManager, from: self) { error in
    if let error = error {
        // Error
        return
    }
}
```