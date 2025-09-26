At [<StackSnippet snippet="idp" inline />](https://workforce.incode.com/overview), follow these steps to create a <StackSnippet snippet="idp" inline /> app:

1. Go to your <StackSnippet snippet="idp" inline /> dashboard.
1. [Create a project](https://docs.clearme.com/docs/create-project).
1. In the **IDV builder** tab, configure how you want to verify your users.
1. After you've configured your IDV settings, click **Save**.
   > **Note:** You can always return to the **IDV builder** tab to make other changes to your project.
1. Click **Publish**. Set the **Environment** as **Sandbox** and then click **Publish** again.
1. Go to **Integrations**, and select the **OpenID Connect** tab.
1. Click **Add client ID & secret**.
1. In the first drop-down menu, select **Sandbox**. In the other drop-down menu, select your project name.
1. Click **Next**.
1. Copy the **Client ID** and **Client Secret** values into a text editor. You need these values in the next section.
1. Under **URI allowlist**, enter your Okta org's domain and append `/idp/identity-verification/callback`. For example: `https://{yourOktadomain}.okta.com/idp/identity-verification/callback`
   * The redirect URI is the location where <StackSnippet snippet="idp" inline /> sends the verification response. The URI sent in the verification request from the client needs to match the redirect URI set at the IDV vendor. Ensure that the URI is located in a secure domain that you own.
   * For example, if your Okta subdomain is called `company`, then the URL would be: `company.okta.com.` If you’ve configured a custom domain in your Okta org, use that value to construct your redirect URI, such as `login.company.com.`
   * Include all base domains (Okta domain and custom domain) that your users interact with in the allowed redirect URI list.
1. Click **Done**.

### Other IDV vendor configuration

There are more settings for the <StackSnippet snippet="idp" inline /> app that you can configure. The steps in this guide address the quickest route to set up <StackSnippet snippet="idp" inline /> as an IDV vendor with Okta.

See the [<StackSnippet snippet="idp" inline /> documentation](https://docs.clearme.com/docs/okta) for more information about other configuration settings.
