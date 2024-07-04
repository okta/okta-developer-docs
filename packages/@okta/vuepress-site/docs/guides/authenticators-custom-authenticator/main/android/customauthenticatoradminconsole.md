1. In the Admin Console, go to **Security** > **Authenticators**.
2. On the **Setup** tab, click **Add Authenticator**.
3. Click **Add** on the **Custom Authenticator** tile.
4. Configure the following settings:
   * **Authenticator name:** Name for the authenticator. This name is displayed to end users when they sign in.
   * **Add to existing application:** Select the app that receives the push MFA prompt.
   * **User Verification:** Choose whether the user must provide a PIN or biometric verification during authentication.
      * **Preferred:** User verification is optional.
      * **Required:** User verification is required during setup.
   * **Authenticator logo:** Select the logo for the authenticator. The end user sees this logo on the authentication pages.
      * **Browse files:** Upload your logo. It must be an SVG file less than 1 MB. For better quality, use a square logo with a transparent background.
      * **Use default logo:** Use the default logo.
5. Configure the connection to the push notification service:
   * **FCM configuration:** Select the connection to the FCM service that you want the custom authenticator to use.
6. Select the checkbox to agree to the Okta terms and conditions mentioned in the Admin Console.
   > **Note:** By adding this feature, you agree to provide any required notices and disclosures to end users. This is your sole responsibility on behalf of the entity that you represent. Include any necessary information from [https://www.okta.com/privacy-policy](https://www.okta.com/privacy-policy).
7. Click **Add**. The authenticator appears in the list on the **Setup** tab.

Alternatively, you can create an authenticator using the [Authenticator API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/createAuthenticator).
