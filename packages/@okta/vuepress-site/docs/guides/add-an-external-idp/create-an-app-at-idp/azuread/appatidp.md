1. Access the [Microsoft Azure](https://portal.azure.com/) portal and sign in.

2. From Azure services section of the portal, select **Azure Active Directory**. Click **More services** if you don't see Azure Active Directory.

3. Select Properties from the Manage panel.

Copy the Directory ID from the Directory properties page and paste into a text editor for use later.

Select App registrations from the Manage panel, and then click New Registration.

Name your application, and then enter the following as the Redirect URI: https://<your authentication domain>/cdn-cgi/access/callback.

Click Register.

On the app page, copy the Application (client) ID for use later. (cbee53a2-08aa-4398-8c0e-699db8a76415)

Select Certificates & secrets from the Manage panel, and then click New client secret.

Enter a description of the client secret and click Add.

Click Copy to clipboard to copy the client secret. Paste it into a text editor for use later. (RuPd/rIuN:mIOikHsyUKk0b?5:7gnbQ1)

On the app page, select API permissions from the Manage panel.

Click Add a permission, and then select APIs my organization uses in the panel.

Select Windows Azure Active Directory in the table.

Select Delegated permissions and select the following permissions from the Select permissions table:

- Expand Directory and select Directory.Read.All (Read directory data)
- Expand Group and select Group.Read.All (Read all groups)
- Expand User and select User.Read (Sign in and read user profile)

Click Add permissions.







2. Access the [Facebook App Dashboard](https://developers.facebook.com/apps).

3. Create a Facebook app using these [instructions](https://developers.facebook.com/docs/apps/register).

    > **Note:** The `public_profile` and `email` OAuth scopes are automatically included by Okta. If your app requires more scopes, request a [Login Review](https://developers.facebook.com/docs/facebook-login/review) with Facebook. For more information on Facebook scopes, see [Permissions](https://developers.facebook.com/docs/facebook-login/permissions).

4. On the App Dashboard page, expand **Settings** on the left side of the page, and then click **Basic**.

5. Save the **App ID** and the **App Secret** values so you can add them to the Okta configuration in the next section.

> **Note:** There may be additional settings on the [Facebook App Dashboard](https://developers.facebook.com/apps) that you can configure for the app. The steps in this guide address the quickest route to setting up Facebook as an Identity Provider with Okta. See the Facebook documentation for more information on additional configuration settings.