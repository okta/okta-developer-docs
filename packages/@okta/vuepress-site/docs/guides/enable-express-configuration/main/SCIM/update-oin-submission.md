# Update your OIN submission

If you're updating a published integration, you must ensure that the integration is configured to support Express Configuration for SCIM.

To enable Express Configuration for your integration, ensure you update the following configurations on your existing OIN submission. See [Update a published integration with the OIN Wizard](https://developer.okta.com/docs/guides/update-oin-app/scim/main/).

1. In the **Integration variables** section, add:
    **Label**: `scim_base_url`
    **Name**: `scim_base_url`
2. In the **SCIM properties** section, add:
    **Base URL**: `app.scim_base_url`
