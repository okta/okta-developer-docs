**Invalid credentials**<br>
If you see an authentication error, verify the following:

* The username and password are correct
* The user is assigned to your app in Okta
* The Resource Owner Password grant type is enabled in your authorization server

**Configuration errors**<br>
If the app crashes on launch, verify the following:

* Double-check your `Okta.plist` values.
* Ensure that your client ID and issuer URL are correct.
* Verify that the redirect URIs match exactly.

**Token expiration**<br>
Access tokens typically expire after one hour. Use the **Refresh Token** button to get a new one without reauthenticating.
