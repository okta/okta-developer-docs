1. Create a Microsoft app using these [instructions](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).

2. Skip the **Redirect URI** section for now. We come back to it later.

3. Save the Application ID value so you can add it to the Okta configuration in the next section.

4. Under **Certificates & secrets**, click **New client secret** to generate a client secret for your app. Save the value so you can add it to the Okta configuration in the next section. This is the secret that corresponds to your Application ID.

> Note: There may be additional settings on the `https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app` site that you can configure for the app. The steps in this guide address the quickest route to setting up Microsoft as an Identity Provider with Okta. See the Microsoft documentation for more information on additional configuration settings.