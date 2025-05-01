At [<StackSnippet snippet="idp" inline />](https://withpersona.com/), create the client app to use for verifying your users.

### Configure an IDV template

1. Create a <StackSnippet snippet="idp" inline /> app.

1. In your <StackSnippet snippet="idp" inline /> app, go to **Inquiries** > **Templates**.

1. Click **Create template**.

1. In the list of inquiry templates, select the **Government ID and Selfie** inquiry template. To test this template, you must have a camera that you can use to take a selfie.

   > **Note:** If you want to use an inquiry template that doesn’t require a camera, use the **Government ID (Front side only)** inquiry template.

1. Click **Configure**.

1. Scroll down to **Image capture methods** > **Capture Methods**. Turn on **File upload**. Ensure that it’s turned on for at least one of:

   * Desktop web
   * Mobile web
   * Mobile native

   This allows you to upload the [provided image](#test-image) when you test the integration.

1. Click **Save**. After you’ve saved, click **Publish**.

1. Go to **Inquiries** > **Templates**, find your **Government ID and Selfie** inquiry template.

1. Copy the Inquiry ID and paste it into a text editor so that you can use it in the next section.

### Configure the API key and redirect URI of the <StackSnippet snippet="idp" inline /> app

> **Note:** In your <StackSnippet snippet="idp" inline /> app, ensure that you're in a sandbox environment before you create an API key.

1. In your <StackSnippet snippet="idp" inline /> app, go to **API** > **API Keys**.

1. Click **Create API key**. Enter a descriptive name for the API key.

1. Copy the API key and paste it into a text editor so that you can use it in the next section.

1. Go to **Inquiries** > **Domain Manager**.

1. In **Allowed Domains**, add a redirect URI. The redirect URI is your org’s URL. `{yourOktadomain}.okta.com`

   * The redirect URI is the location where <StackSnippet snippet="idp" inline /> sends the verification response (the inquiry ID of the completed inquiry). The URI sent in the verification request from the client needs to match the redirect URI set at the IDV. Ensure that the URI is located in a secure domain that you own.
   * For example, if your Okta subdomain is called `company`, then the URL would be: `company.okta.com.` If you’ve configured a custom domain in your Okta org, use that value to construct your redirect URI, such as `login.company.com.`
   * Include all base domains (Okta domain and custom domain) that your users interact with in the allowed redirect URI list.

1. Click **Add** after you finish.

### Other IDV vendor configuration

There are more settings for the <StackSnippet snippet="idp" inline /> app that you can configure. The steps in this guide address the quickest route to set up <StackSnippet snippet="idp" inline /> as an IDV vendor with Okta.

See the [<StackSnippet snippet="idp" inline /> documentation](https://docs.withpersona.com/docs/getting-started) for more information about other configuration settings.
