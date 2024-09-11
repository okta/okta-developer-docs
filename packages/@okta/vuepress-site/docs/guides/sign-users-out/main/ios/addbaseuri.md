Signing out of Okta requires the app to open a browser and go to the [end session endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/logoutCustomASWithPost). Okta destroys the user's session and immediately redirects back to your application.

Define your sign out callback (for example, `com.okta.example:/signoutCallback`) in `Okta.plist` and set it as a value for the `logoutRedirectUri` key. Also note that to redirect back to your application from a web browser, you must specify a unique URI to your app. To do this, open the `Info.plist` file in your application bundle and set a URL scheme to the scheme of the redirect URI. For example, if your redirect URI is `com.okta.example:/signoutCallback`, the URL scheme is `com.okta.example`.

Next, add the defined callback to **Sign-out redirect URIs** in the Admin Console.
