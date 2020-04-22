### Create an OIDC integration

If you don't have an Okta developer account, begin by signing up for one at <https://developer.okta.com/signup/>.

1. After you request the developer account and have received the initialization email, click the link to go to your developer org. Sign in as a user with administrative privileges.
1. Navigate to the Admin Console in your Okta org by clicking **Admin**.
  ![Admin Button](/img/oin/scim_end-user-ui.png "Admin Button")
1. If you are in the Developer Console, click **Developer Console** and then **Classic UI** to switch over to the Admin Console in your Okta org.
  ![Switch to Admin Console](/img/oin/scim_switch-ui.png "Switch to Admin UI")
1. Click **Applications** > **Applications**.
  ![Open Applications](/img/oin/scim_open-apps.png "Open Applications")
1. Click **Add Application**.
  ![Create Application](/img/oin/scim_create-app.png "Add App button")
1. Click **Create New App** to start the Application Integration Wizard.
  ![Create New Application](/img/oin/scim_create-app-new.png "Create App button")
1. Choose **Web** as the platform for your app. Web is the only supported platform for OIDC apps in the OIN.
1. Select **OpenID Connect** in the **Sign on method** section.
1. Click **Create**.
1. On the **General Settings** tab, enter a name for your app and (optionally) upload a logo.
1. On the **Configure OpenID Connect** tab, add your **Login redirect URIs** and optional **Logout redirect URIs**. These must be [absolute URIs](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier#URI_resolution) and you can specify more than one.
1. Click **Save**.
1. In the new application window, you can specify **General Settings** and **Sign On** options, as well as assign the app to users in your org. Click **Edit** to change any of the options, and **Save** when you have made your changes.
1. Select from among the different grant type options.
1. If you only want to support direct login to your app (not launched from the Okta End-User Dashboard), then you only need to set the **Login initiated by**  to App Only, enter one or more **Login redirect URI** values and you can leave all the remaining entries at their default values.
1. If you want to support launching your app from Okta:
    1. Enter one or more redirect URIs where Okta will send OAuth responses.
    1. Optionally, enter one or more logout redirect URIs where Okta will send relying-party initiated sign-out requests.
    1. Change the **Login initiated by** field to “Either Okta or App” to grant your app an Okta app button. When you select this option and click **Save**, an **App Embed Link** section appears on the **General Settings** page that shows the URL used to sign in to the OIDC client from outside of Okta..
    1. Check the box for **Display application icon to users**.
    1. Select the appropriate **Login flow** option. If you choose **Send ID Token directly to app (Okta Simplified)**, you're also able to choose **Scopes** for the flow.
    1. Enter or change the URI used to initiate the sign-in request.
    1. Click **Save** to commit your changes.

If required, you can generate a new client secret. In the **Client Credentials** section, click **Edit**, then **Generate New Client Secret**.

You can use the API endpoint `.well-known/openid-configuration` to configure Okta interactions programmatically. When a web app contains the value `implicit` for `grant_types_supported`, admins can publish apps with the **Login initiated by** feature. For more information, see the [OpenID Connect](/docs/reference/api/oidc/#well-known-openid-configuration) API reference.

<!--[ian 2020.02.25] we don't currently support OIDC native apps in the OIN -->
<!--
#### Native apps

1. Select from among the different grant type options.
1. Enter one or more login redirect URIs where Okta will send OAuth responses.
1. Optionally, enter one or more logout redirect URIs where Okta will send relying-party initiated sign-out requests.
1. Click **Save** to commit your changes.

* In the **Client Credentials** section, you can select a **Client authentication** type:
  * **Use PKCE (for public clients)** &mdash; Recommended for native apps. By requiring a Proof Key for Code Exchange, this option ensures that only the client that requested the access token can redeem it.
  * **Use Client Authentication** &mdash; This option is not recommended for distributed native apps. A client secret is embedded in the client and sent with requests to prove the client's identity.
* Click **Save** to commit your changes.

* If required, you can generate a new client secret. In the **Client Credentials** section, click **Edit**, then **Generate New Client Secret**.
-->

<!-- [ian 2020.02.25] we don't currently support OIDC SPA apps in the OIN -->
<!--
#### SPA apps

1. Select from among the different grant type options.
1. If you only want to support direct login to your app (not launched from the Okta End-User Dashboard), then you only need to set the **Login initiated by**  to App Only, enter one or more **Login redirect URI** values and you can leave all the remaining entries at their default values.
1. If you want to support launching your app from Okta:
    1. Enter one or more redirect URIs where Okta will send OAuth responses.
    1. Optionally, enter one or more logout redirect URIs where Okta will send relying-party initiated sign-out requests.
    1. Change the **Login initiated by** field to “Either Okta or App” to grant your app an Okta app button. When you select this option and click **Save**, an **App Embed Link** section appears on the **General Settings** page that shows the URL used to sign in to the OIDC client from outside of Okta..
    1. Check the box for **Display application icon to users**.
    1. Select the appropriate **Login flow** option. If you choose **Send ID Token directly to app (Okta Simplified)**, you're also able to choose **Scopes** for the flow.
    1. Enter or change the URI used to initiate the sign-in request.
    1. Click **Save** to commit your changes.

* If required, you can generate a new client secret. In the **Client Credentials** section, click **Edit**, then **Generate New Client Secret**.
-->

### Consent

>**Note:** Consent is an Early Access feature. To enable it, contact [Okta Support](https://support.okta.com/help/s/).

If you have enabled User Consent for OAuth 2.0 Flows in API Access Management, then the following section appears in the General Settings tab for an OIDC app.

![Consent](/img/oin/sso_user-consent.png "User Consent Panel")

If you want to prompt your user to approve the app's access to specified resources, check the **Require consent** box. Alternatively, you can set up the consent for a scope in your custom authorization, as described in the [Create Scopes](https://help.okta.com/en/prod/okta_help_CSH.htm#create-scopes) section of the API Access Management documentation.

### Set the Groups claims filter

Beyond the default set of claims that are contained in ID tokens and access tokens, you can define your own Groups claims. The Group claim filter contains a list of the user's groups for the ID token. The first field identifies the claim name to use in the token. The second field sets a filter for the list of groups. For more detail on adding a Groups claim with tokens, see [Add a Groups claim](/docs/guides/customize-tokens-returned-from-okta/create-groups-claim/).

To specify the Groups claim filter, go to the **Sign On** tab and click **Edit** in the **OpenID Connect ID Token** section.

>**Note:** If the value you specify in the Groups claim filter matches more than 100 groups, an error occurs when the API tries to create ID tokens.
