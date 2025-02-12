At [Persona](https://withpersona.com/), create the client app to use for verifying your users.

### Configure identity verification template

1. Create a Persona app.

1. In your Persona app, go to **Inquiries** > **Templates**.

1. Click **Create template**.

1. In the list of inquiry templates, select the Government ID and Selfie inquiry template. To test this template, you must have a camera that you can use to take a selfie.

1. Click **Configure**.

1. Under **Image capture methods** > **Capture Methods**, turn on **File upload**. Ensure that it’s turned on for at least one of:

   * Desktop web
   * Mobile web
   * Mobile native

   This allows you to upload the provided image when you test the integration.

1. Select **Save**. After you’ve saved, select **Publish**.

1. Go to **Inquiries** > **Templates**, find your Government ID and Selfie inquiry template.

1. Copy the Inquiry ID and paste it into a text editor so that you can use it in the next section.

> **Note:** If you want to use an inquiry template that doesn’t require a camera, use the Government ID (Front side only) inquiry template.

### Configure the API key and redirect URI of the Persona app

1. In your Persona app, go to **API** > **API Keys**.

1. Click **Create API key**. Enter a descriptive name for the API key.

1. Copy the API key and paste it into a text editor so that you can use it in the next section.

1. Go to **Inquiries** > **Domain Manager**.

1. In **Allowed Domains**, add a redirect URI. The redirect URI is your org’s URL. `{yourOktadomain}.okta.com`

   * The redirect URI is the location where Persona sends the verification response (the inquiry ID of the completed inquiry). The URI sent in the verification request from the client needs to match the redirect URI set at the IDV. This URI needs to be located in a secure domain that you own.
   * For example, if your Okta subdomain is called `company`, then the URL would be: `company.okta.com.` If you have configured a custom domain in your Okta org, use that value to construct your redirect URI, such as `login.company.com.`
   * Include all base domains (Okta domain and custom domain) that your users interact with in the allowed redirect URI list.

1. Click **Add** after you finish.

### Additional IDV configuration

There may be additional settings for the Persona app that you can configure. The steps in this guide address the quickest route to setting up Persona as an IDV with Okta.

See the [Persona documentation](https://docs.withpersona.com/docs/getting-started) for more information on additional configuration settings. You can configure different kinds of verifications. For example, you can require users to take a selfie to pass a liveliness check or verify their identity by requiring them to submit pictures of their driver’s license.
