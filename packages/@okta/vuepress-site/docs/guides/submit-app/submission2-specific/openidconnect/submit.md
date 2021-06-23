#### OIDC settings

* **Does your Redirect URI vary per tenant?** &mdash; if **Yes**, a new field appears to assist you in setting up a per tenant configuration.
  * **What variables do your admins need to specify to install your app?** &mdash; when you click **Add Variable**, the interface displays a dialog box to collect the following information:
  * **Label Name** &mdash; a descriptive name for the dynamic variable that administrators see when installing your app integration.
  * **Variable Name** &mdash; an automatically generated variable used when constructing the dynamic address. This is hidden from admins and is only passed to your external application.
  * **Help Text** &mdash; any descriptive text to be shown to administrators when installing your app integration.
  * **Type** &mdash; the property type for your parameter. Options are "String", "URL", or "HTTPS URL".
  * Click **Save** to add the variable to the list.

  After the variable is created, you can click the pencil icon to make changes to the details, the clipboard icon to copy the **Variable Name** to your local clipboard, or the "X" icon to remove the variable entirely.

* **Construct your dynamic Redirect URI by copying the variables above and pasting them where applicable** &mdash; provide one or more complete sign-in redirect URIs where Okta sends the OAuth responses for your app integration. You must add at least one valid redirect URI.

  If you're using a per tenant design, include the variable names that you created. For example:
  * https://`${app.variableName}`.okta.com
  * https://okta-`${app.variableName}`.com

* **Optional: Do you require an Initiate Login URI** &mdash; include a login URI if you want the Okta integration to handle redirecting your users to your application to start the sign-in request. When end users click a tile in their Okta dashboard, they are redirected to the `initiate_login_uri` of the client application, which constructs an authorization request and redirects the end user back to Okta.

* **Does your Initiate Login URI vary per tenant?** &mdash; if **Yes**, an additional field appears to assist you in setting up a per tenant configuration. The instructions for adding and using the custom variables are identical to the per tenant instructions for the Redirect URI.

* **Enter your Initiate Login URI** &mdash; provide the complete login URI for your app integration, including the variable names if you're using a per tenant design.

* **Optional: Do you require a Post Logout Redirect URI?** &mdash; include a sign-out Redirect URI if you have a location where you want to send your end user to after they log out of your application.

* **Does your Post Logout URI vary per tenant?** &mdash; if **Yes**, an additional field appears to assist you in setting up a per tenant configuration. The instructions for adding and using the custom variables are identical to the per tenant instructions for the Redirect URI.

* **Enter your Post Logout Redirect URI** &mdash; provide the complete sign-out redirect URI for your app integration, including the variable names if you're using a per tenant design.

* **To configure OIDC, can your customers do it by themselves from your app's UI, or do they need to contact your support team?** &mdash; if a customer needs support to configure your app integration, you need to include support contact information in your configuration guide. We recommend that you build a UI that enables self-service configuration to reduce the setup time for your customers.

* **Link to configuration guide** &mdash; your configuration guide (in either HTML or PDF format) should have step-by-step instructions on how to configure SSO between Okta and your systems. See [Prepare a customer-facing configuration guide](/docs/guides/submit-app/create-guide).

* **What type of sign-in flows do you support?** &mdash; choose either **IdP initiated** or **SP initiated**, or both.

* **What OIDC mode(s) does your application support?** &mdash; choose either **SPA** (for Single-Page Application) or **Web**, or both.
