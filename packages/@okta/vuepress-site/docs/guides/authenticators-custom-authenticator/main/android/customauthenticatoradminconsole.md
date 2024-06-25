1. In the Admin Console, go to **Security** > **Authenticators**.
2. On the **Setup** tab, click **Add Authenticator**.
3. Click **Add** on the **Custom Authenticator** tile.
4. Configure the following settings:
   * **Authenticator name:** Type a name for the custom authenticator. This is the name that is used when you sign in using the authenticator.
   * **Add to existing application:** Select the application that receives the push MFA prompt.
   * **User Verification:** Select an option to determine whether users must provide a PIN or biometric verification during authentication.
      * **Preferred** - User verification is optional.
      * **Required** - User verification is required.
   * **Authenticator logo:** Select the logo that users see on authentication screens.
      * **Browse files** - Click this button and select an SVG file from the file selection dialog.
      * **Use default logo** - Click the lock icon to use the default logo.
5. Configure the connection to the push notification service:
   * **FCM configuration:** Select the connection to the FCM service that you want the custom authenticator to use.
6. Select the checkbox to agree to Okta's Terms and Conditions.
   > **Note:** By adding this feature, you agree on behalf of the entity you represent that it's your sole responsibility to provide any required notices and disclosures to end users, including any necessary information from [https://www.okta.com/privacy-policy](https://www.okta.com/privacy-policy).
7. Click **Add**.

Alternatively, you can create an authenticator using the [Authenticator API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/createAuthenticator).
