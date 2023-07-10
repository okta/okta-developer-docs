### Specify OIDC settings

* On the **General** tab, select the [grant type](/docs/guides/implement-grant-type/) for your OAuth 2.0 flow based on your app type:

  * Web app:
    * **Authorization Code** (mandatory for web platform applications)
    * **Refresh token** (not supported for OIN app integrations)
    * **Implicit (Hybrid)** (optional)
  * SPA:
    * **Authorization Code**
    * **Implicit (Hybrid)**&mdash;choose:
      * **Allow ID Token with implicit grant type**
      * **Allow Access Token with implicit grant type**

    > **Note:** For SPA app integrations, the **Authorization Code** grant type always uses PKCE to verify the client. Also, the **Client acting on behalf of itself** grant type isn't supported in OIN app integrations.

* If you only want to support direct SSO to your application (so the integration isn't launched from the Okta End-User Dashboard), then:
  1. Enter one or more **Sign-in redirect URIs** values where Okta sends the OAuth responses.
  1. Set the **Sign-in initiated by** dropdown box to **App Only**.
  1. Leave the remaining default values.

* If you want to support launching your application from the Okta dashboard:
  1. Enter one or more **Sign-in redirect URIs** values where Okta sends the OAuth responses.
  2. (Optional) Enter the **Sign-out redirect URIs** where Okta redirects the browser after it receives the sign-out request from the relying party and terminates the end user's session. See [Configure Single Logout in app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Single_Logout) or the [`/logout` API endpoint](/docs/reference/api/oidc/#logout).
  3. Change the **Login initiated by** field to **Either Okta or App** to give your integration an Okta tile.
      >**Note:** When you select this option, an **App Embed Link** section appears at the bottom of the page. The URL that the user can use to sign in to the OIDC client from outside of Okta is provided.
  4. Select **Display application icon to users**.
  5. Select the **Login flow** option. For OIN app integrations, you must select **Redirect to app to initiate login (OIDC Compliant)**.
  6. Enter or change the URI used to initiate the sign-in request.
  7. Click **Save** to commit your changes.

* If required, you can generate a new client secret. In the **Client Credentials** section, click **Edit**, then **Generate New Client Secret**.

> **Note:** If you generate a new set of client credentials, update your app to include the new credentials for your SSO integration.

<!--[ian 2020.02.25] we don't currently support OIDC native applications in the OIN -->
<!--
#### Native applications

1. Select from among the different grant type options.
1. Enter one or more sign-in redirect URIs where Okta sends the OAuth responses.
1. (Optional). Enter one or more sign-out redirect URIs where Okta sends relying-party initiated sign-out requests.
1. Click **Save** to commit your changes.

* In the **Client Credentials** section, you can select a **Client authentication** type:
  * **Use PKCE (for public clients)** &mdash; recommended for native applications. By requiring a Proof Key for Code Exchange, this option ensures that only the client that requested the access token can redeem it.
  * **Use Client Authentication** &mdash; this option isn't recommended for distributed native applications. A client secret is embedded in the client and sent with requests to prove the client's identity.
* Click **Save** to commit your changes.

* If required, you can generate a new client secret. In the **Client Credentials** section, click **Edit**, then **Generate New Client Secret**.
-->

<!-- [ian 2020.02.25] we don't currently support OIDC SPA applications in the OIN -->
<!--
#### Single-page applications

1. Select from among the different grant type options.
1. If you only want to support direct SSO to your integration (not launched from the Okta End-User Dashboard), then you only need to set the **Sign-in initiated by** to App Only and enter one or more **Sign-in redirect URIs** values. You can leave all of the remaining entries at their default values.
1. If you want to support launching your application from Okta:
    1. Enter one or more redirect URIs where Okta sends the OAuth responses.
    1. (Optional). Enter one or more sign-out redirect URIs where Okta sends relying-party initiated sign-out requests.
    1. Change the **Login initiated by** field to “Either Okta or App” to grant your integration an Okta tile. When you select this option and click **Save**, an **App Embed Link** section appears on the **General Settings** page that shows the URL used to sign in to the OIDC client from outside of Okta..
    1. Check the box for **Display application icon to users**.
    1. Select the appropriate **Login flow** option. If you choose **Send ID Token directly to app (Okta Simplified)**, you're also able to choose **Scopes** for the flow.
    1. Enter or change the URI used to initiate the sign-in request.
    1. Click **Save** to commit your changes.

* If required, you can generate a new client secret. In the **Client Credentials** section, click **Edit**, then **Generate New Client Secret**.
-->

<!-- [ian 2020.08.06] consent and group claim filters are not supported for OIN app integrations -->
<!--
### Consent

>**Note:** OIDC consent is an Early Access feature. To enable it, contact [Okta Support](https://support.okta.com/help/s/).

* If you have enabled User Consent for OAuth 2.0 flows in API Access Management, then the following section appears in the **General Settings** tab for an OIDC integration.

    ![Consent](/img/oin/sso_user-consent.png "User Consent Panel")

* If you want to prompt your user to approve the integration access to specified resources, select the **Require consent** box. Alternatively, you can set up the consent for a scope in your custom authorization, as described in the [Create Scopes](https://help.okta.com/okta_help.htm?id=create-scopes) section of the API Access Management documentation.

-->
<!--
### Set the Groups claims filter

* You can define your own Groups claims outside the default set of claims that are contained in ID tokens and access tokens.
* To specify the Groups claim filter:
  * Go to the **Sign On** tab
  * Click **Edit** in the **OpenID Connect ID Token** section.
  * The Group claim filter contains a list of the user's groups for the ID token:
    * The first field identifies the claim name to use in the token.
    * The second field sets a filter for the list of groups.
    >**Note:** If the value you specify in the Groups claim filter matches more than 100 groups, an error occurs when the API tries to create ID tokens.

* For more detail on adding a Groups claim with tokens, see [Add a Groups claim](/docs/guides/customize-tokens-returned-from-okta/create-groups-claim/).
-->
