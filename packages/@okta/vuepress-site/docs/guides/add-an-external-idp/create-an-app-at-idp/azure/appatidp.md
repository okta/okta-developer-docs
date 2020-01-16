1. Create an Azure AD app using these [instructions](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).

2. Skip the **Redirect URI** section for now. We come back to it later.

3. Copy the Application ID value so that you can add it to the Okta configuration in the <GuideLink link="../configure-idp-in-okta">next section</GuideLink>.

4. Under **Certificates & secrets**, click **New client secret** to generate a client secret for your app. Copy the value so that you can add it to the Okta configuration in the next section. This is the secret that corresponds to your Application ID.

    > **Note:** There may be additional settings for the app that you can configure. The steps in this guide address the quickest route to setting up Azure AD as an Identity Provider with Okta. See the Azure AD documentation for more information on additional configuration settings.

For use in the <GuideLink link="../configure-idp-in-okta">next section</GuideLink>, do the following:

1. On the app **Overview** page, click **Endpoints**.

2. In the panel that appears, copy the **OpenID Connect metadata document URL** and then paste that URL into a browser window to obtain the following endpoints:

    * Issuer
    * Authorization
    * Token
    * JWKS
    >**Note:** The userinfo endpoint is optional.

3. Paste the endpoints into a text editor for use in the next section.