# Update your OIN submission

To configure your OIN submission to support Express Configuration SCIM, ensure you update the following configurations on your existing OIN submission. See [Update a published integration with the OIN Wizard](https://developer.okta.com/docs/guides/update-oin-app/scim/main/).

1. On your OIN Wizard, in the **Integration variables** section, add:
    **Label**: `scim_base_url`
    **Name**: `scim_base_url`
2. In the **SCIM properties** section, add:
    **Base URL**: `app.scim_base_url`

## Email the Okta Express Configuration team

Email the following information to the Okta Express Configuration team at [expressconfig@okta.com](mailto:expressconfig@okta.com):

* Confirmation that you completed all the steps in this guide and that your app is ready to support Express Configuration.
* Confirmation that your app supports SCIM provisioning.
* Your app name in the OIN
* Okta OIN Integration Client app client ID

The Okta Express Configuration team configures your app in the OIN and then assigns it to your Integrator Free Plan org.

You can test the feature by creating an instance of your app in the OIN catalog.
