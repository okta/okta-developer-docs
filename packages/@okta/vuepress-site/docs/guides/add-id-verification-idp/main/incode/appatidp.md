There are two steps to configure Incode as an IDV vendor in Okta:

1. At [Incode](https://workforce.incode.com/overview), follow these steps to create an Okta IDV integration: [Create Okta IDV Integration in Incode Workforce](https://workforce.developer.incode.com/docs/incode-okta-idv-configuration#step-1-create-okta-idv-integration-in-incode-workforce). Ensure that you copy the **Client ID** and **Client Secret** values into a text editor. You need these values in the next section.
   * The **Okta Instance URL** (redirect URI) is the location where <StackSnippet snippet="idp" inline /> sends the verification response (the inquiry ID of the completed inquiry). The URI sent in the verification request from the client needs to match the redirect URI set at the IDV vendor. Ensure that the URI is located in a secure domain that you own.
   * For example, if your Okta subdomain is called `company`, then the URL would be: `company.okta.com.` If you’ve configured a custom domain in your Okta org, use that value to construct your redirect URI, such as `login.company.com.`
   * Include all base domains (Okta domain and custom domain) that your users interact with in the allowed redirect URI list.
2. Then, integrate your user directory in Okta with Incode. Follow these steps to integrate your user directory in your Incode app: [Incode Directory Sync Integration with Okta IAM](https://workforce.developer.incode.com/docs/okta-service-app-api-integration). Use your test group ID when syncing your test group in your Incode app.

### Other IDV vendor configuration

There are more settings for the Incode app that you can configure. The steps in this guide address the quickest route to set up Incode as an IDV vendor with Okta.

See the [Incode documentation](https://workforce.developer.incode.com/docs/setup-wizard-guide#step-2-configure-verification-policy) for more information about other configuration settings.
