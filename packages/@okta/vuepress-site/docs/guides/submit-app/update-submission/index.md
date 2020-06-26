---
title: Update your published integration
---

If you need to make protocol changes to your integration that is already published in the OIN catalog, you can visit the [OIN Manager](https://oinmanager.okta.com/) and create an updated version of the integration.

Similarly, when you enable a new capability in your application (for example, adding SCIM provisioning onto an existing published SAML application), you don't need to create an entirely new submission. You can update your existing submission to enable and specify the settings for that protocol, then submit the updated integration.

1. Sign on to the OIN Manager using the credentials for your original dev org.
    >**Note:** You must submit the updated integration using the same dev org that was used to make the original submission, otherwise the Okta OIN team will reject the update.
1. The published integration appears on your integrations page. Click **Update**.

    This creates a new instance of your integration where you can safely change any of the parameters. Your existing integration remains in the OIN catalog and keeps the previous settings until this new version is published.
1. Update any of the parameters for your existing protocols, or add a new protocol depending on your needs.

    If you need to leave your in-progress submission at any point, you can return to it through the OIN Manager. When you sign on again, you will see the published version and your in-progress version. Click **Edit** on the in-progress version to pick up where you left off.
1. When you have completed the updates, or have filled the new protocol information so that indicator shows 100% complete, you can click **Submit for Review**.

    At this point, the Okta OIN team is notified and your submission undergoes the same process flow as the original submission.

    After the new version of the integration has reached the **Publish** stage and been published by Okta, the new version replaces the old one in the OIN catalog.
