1. Create a LinkedIn app using these [instructions](https://www.linkedin.com/developer/apps).

2. Save the OAuth client ID and client secret values so you can add them to the Okta configuration in the next section.

3. Leave the **Authorized redirect URLs** section blank for now. We come back to it later.

    > Note: You must explicitly request the `r_liteprofile` and `r_emailaddress` scopes when requesting an authorization code. See [Permissions](https://docs.microsoft.com/en-us/linkedin/shared/authentication/permissions?context=linkedin/context) for more information.

    Example: `scope=r_liteprofile r_emailaddress w_member_social`

> Note: There may be additional settings on the `https://www.linkedin.com/developer/apps` site that you can configure for the app. The steps in this guide address the quickest route to setting up LinkedIn as an Identity Provider with Okta. See the LinkedIn documentation for more information on additional configuration settings.