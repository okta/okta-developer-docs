### Specify OIDC settings

* On the **General** tab, select the [grant type](/docs/guides/implement-grant-type/) for your OAuth 2.0 flow based on your app type:

  * Web app:
    * **Authorization Code** (mandatory for web platform applications)
    * **Refresh token** (not supported for OIN app integrations)
    * **Implicit (hybrid)** (optional) Click **Advanced** to select.
      > **Note:** If you're using Classic Engine, select **Implicit (hybrid)** from the **Grant type** section.
  * SPA:
    * **Authorization Code**
    * **Implicit (hybrid)** Click **Advanced** to select.

    > **Note:** For SPA app integrations, the **Authorization Code** grant type always uses PKCE to verify the client. Also, the **Client acting on behalf of itself** grant type isn't supported in OIN app integrations.

* If you only want to support direct SSO to your application (the integration isn't launched from the Okta End-User Dashboard), then:
  1. Enter one or more **Sign-in redirect URIs** values where Okta sends the OAuth responses.
  1. Set the **Sign-in initiated by** dropdown box to **App Only**.
  1. Leave the remaining default values.

* If you want to support launching your application from the Okta dashboard:
  1. Enter one or more **Sign-in redirect URIs** values where Okta sends the OAuth responses.
  2. (Optional) Enter the **Sign-out redirect URIs** where Okta redirects the browser after it receives the sign-out request from the relying party. Okta also terminates the user's session. See [Configure Single Logout in app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Single_Logout) or the [`/logout` API endpoint](/docs/reference/api/oidc/#logout).
  3. Change the **Login initiated by** field to **Either Okta or App** to give your integration an Okta tile.
      >**Note:** When you select this option, an **App Embed Link** section appears at the bottom of the page. The URL that the user can use to sign in to the OIDC client from outside of Okta is provided.
  4. Select **Display application icon to users**.
  5. Select the **Login flow** option. For OIN app integrations, you must select **Redirect to app to initiate login (OIDC Compliant)**.
  6. Enter or change the URI used to initiate the sign-in request.
  7. Click **Save** to commit your changes.

* If required, you can generate a new client secret. In the **Client Credentials** section, click **Edit**, then **Generate New Client Secret**.

> **Note:** If you generate a new set of client credentials, update your app to include the new credentials for your SSO integration.
