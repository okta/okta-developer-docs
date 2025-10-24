There are two steps to configure <StackSnippet snippet="idp" inline /> as an IDV vendor in Okta:

1. At [<StackSnippet snippet="idp" inline />](https://workforce.incode.com/overview), follow these steps to create an Okta IDV integration: [Create Okta IDV Integration in Incode Workforce](https://workforce.developer.incode.com/docs/incode-okta-idv-configuration#step-1-create-okta-idv-integration-in-incode-workforce). Ensure that you copy the **Client ID** and **Client Secret** values into a text editor. You need these values in the next section.
2. Then, integrate your user directory in Okta with <StackSnippet snippet="idp" inline />. Follow these steps to integrate your user directory in your <StackSnippet snippet="idp" inline /> app: [Incode Directory Sync Integration with Okta IAM](https://workforce.developer.incode.com/docs/okta-service-app-api-integration). Use your test group ID when syncing your test group in your <StackSnippet snippet="idp" inline /> app.

### Other IDV vendor configuration

There are more settings for the <StackSnippet snippet="idp" inline /> app that you can configure. The steps in this guide address the quickest route to set up <StackSnippet snippet="idp" inline /> as an IDV vendor with Okta.

See the [<StackSnippet snippet="idp" inline /> documentation](https://workforce.developer.incode.com/docs/setup-wizard-guide#step-2-configure-verification-policy) for more information about other configuration settings.
