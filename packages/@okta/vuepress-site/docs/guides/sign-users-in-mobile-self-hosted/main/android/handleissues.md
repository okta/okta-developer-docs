**Invalid credentials**<br>
If you see an authentication error, verify the following:

* The username and password are correct.
* The user is assigned to your app in Okta.
* The Resource Owner Password grant type is enabled in your authorization server.

**Configuration errors**<br>
If the app crashes on launch, verify the following:

* Double-check your `okta.properties` values.
* Ensure that your client ID and issuer URL are correct.
* Confirm that you registered `OktaPasswordAuthApplication` in `AndroidManifest.xml` with `android:name`.
* Confirm that `buildConfig = true` is set so the `BuildConfig` values are generated.

**Token expiration**<br>
Access tokens typically expire after one hour. Use the **Refresh Token** button to get a new one without reauthenticating. A refresh token is only issued when you request the `offline_access` scope.

**Pre-release SDK**<br>
`okta-direct-auth` is a pre-release library (`0.0.1`). Its API may change before a stable release, so check the [SDK releases](https://github.com/okta/okta-mobile-kotlin/releases) and changelog when you upgrade.
