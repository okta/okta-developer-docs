# Update your OIN submission

To configure your OIN submission to support Express Configuration SCIM integration, ensure you update the following configurations on your existing OIN submission: 

1. On your OIN Wizard, in the **Integration variables** section, add:
    * **Label**: `scim_base_url`
    * **Name**: `scim_base_url`
2. In the **SCIM properties** section, add **Base URL**: `app.scim_base_url`.
3. Submit the updated OIN submission.

See [Update a published integration with the OIN Wizard](https://developer.okta.com/docs/guides/update-oin-app/scim/main/) for more information.
