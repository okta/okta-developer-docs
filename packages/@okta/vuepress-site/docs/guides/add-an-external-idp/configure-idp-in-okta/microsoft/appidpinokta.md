* **Name** &mdash; Enter a name for the Identity Provider configuration.
* **Client Id** &mdash; Paste the app ID or client ID that you obtained from the Identity Provider in the <GuideLink link="../create-an-app-at-idp">previous section</GuideLink>.
* **Client Secret** &mdash; Paste the secret that you obtained from the Identity Provider in the <GuideLink link="../create-an-app-at-idp">previous section</GuideLink>. 
* **Scopes** &mdash; Leave the defaults.

    By default, Okta requires the `email` attribute for a user. The `email` scope is required to create and link the user to Okta's Universal Directory. If your Identity Provider doesn't support this attribute, you can make it optional. See [Manage User Profiles](https://help.okta.com/en/prod/Content/Topics/Directory/eu-profile-editor.htm). For Just In Time (JIT) provisioning, Okta requires the `firstName` and `lastName` attributes for a user. Include the `name` scope if the the Identity Provider needs to support JIT.

> **Note:** For more information about these settings as well as the **Advanced Settings**, see [Social Identity Provider Settings](/docs/reference/social-settings/).
