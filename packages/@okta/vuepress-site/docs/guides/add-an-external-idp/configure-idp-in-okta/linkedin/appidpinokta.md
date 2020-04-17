* **Name** &mdash; Enter the name that you would expect to see on a button, such as **Sign in with LinkedIn**.
* **Client Id** &mdash; Paste the app ID or client ID that you obtained from the Identity Provider in the <GuideLink link="../create-an-app-at-idp">previous section</GuideLink>.
* **Client Secret** &mdash; Paste the secret that you obtained from the Identity Provider in the <GuideLink link="../create-an-app-at-idp">previous section</GuideLink>. 
* **Scopes** &mdash; Leave the defaults.

    By default, Okta requires the `email` attribute for a user. The `email` scope is required to create and link the user to Okta's Universal Directory. If your Identity Provider doesn't support this attribute, you can make it optional. See [Manage User Profiles](https://help.okta.com/en/prod/Content/Topics/Directory/eu-profile-editor.htm).

> **Note:** For more information about these settings as well as the **Advanced Settings**, see [Social Identity Provider Settings](/docs/reference/social-settings/).
