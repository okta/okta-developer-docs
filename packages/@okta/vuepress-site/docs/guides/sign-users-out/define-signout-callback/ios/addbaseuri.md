Signing out of Okta requires the app to open a browser and navigate to the [end session endpoint](https://developer.okta.com/docs/reference/api/oidc/#logout). Okta destroys the user's session and immediately redirects back to your application.

Define your sign out callback (for example, `com.okta.example:/signoutCallback`) in `Okta.plist` file and set it as a value for the `logoutRedirectUri` key. Also note that in order to redirect back to your application from a web browser, you must specify a unique URI to your app. To do this, open the `Info.plist` file in your application bundle and set a URL Scheme to the scheme of the redirect URI. For example, if your redirect URI is `com.okta.example:/signoutCallback`, the URL Scheme is `com.okta.example`.

Next, add defined callback as an allowed **Logout redirect URI** in the Okta Admin Console.
