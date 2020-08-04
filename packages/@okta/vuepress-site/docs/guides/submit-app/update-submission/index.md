---
title: Update your published integration
---

If you need to make protocol changes to your integration that is already published in the OIN catalog, you can visit the [OIN Manager](https://oinmanager.okta.com/) and create an updated version of the integration.

Similarly, when you enable a new capability in your application (for example, adding SCIM provisioning onto an existing published SAML application), you don't need to create an entirely new submission. You can update your existing submission to enable and specify the settings for that protocol, then submit the updated integration.

1. Sign on to the OIN Manager using the credentials for your original dev org.
    >**Note:** You must submit the updated integration using the same dev org that was used to make the original submission, otherwise the Okta OIN team rejects the update.
1. The published integration appears on your integrations page. Click **Update**.

    This creates a new instance of your integration where you can safely change any of the parameters. Your existing integration remains in the OIN catalog and keeps the previous settings until this new version is published.
1. Update any of the parameters for your existing protocols, or add a new protocol depending on your needs.

    If you need to leave your in-progress submission at any point, you can return to it through the OIN Manager. When you sign on again, you will see the published version and your in-progress version. Click **Edit** on the in-progress version to pick up where you left off.
1. When you have completed the updates, or have filled the new protocol information so that indicator shows 100% complete, you can click **Submit for Review**.

    At this point, the Okta OIN team is notified and your submission undergoes the same process flow as the original submission.

    After the new version of the integration has reached the **Publish** stage and been published by Okta, the new version replaces the old one in the OIN catalog.

>**Note:** You can have a maximum of 10 submissions for any development org in the OIN Manager.

## Delete draft submissions

There are two scenarios where you need to delete a draft submission:

1. You have 10 draft submissions, which is the maximum number permitted in the OIN Manager.
1. You have decided against completing a draft submission and want to remove it.

In either of these scenarios, the OIN Manager provides a method to delete unpublished submissions. For instructions on how to delete app integrations that are already published in the OIN catalog, see [Delete published submissions](#delete-published-submissions).

You can only delete unpublished submissions that are in **DRAFT** state.

To delete your submission:

1. Click the delete icon ![Delete submission](/img/icons/delete_can.png "Deletion icon") beside the **Edit** button. If the delete icon is unavailable, that submission can't be deleted.
1. Confirm the deletion in the dialog box.

No email confirmation is sent when deleting a submission. Deleted submissions can't be recovered.

If you need assistance with deleting a draft submission, contact the Okta OIN team at <oin@okta.com> for assistance.

## Delete published submissions

If you want to remove an app integration that is already published to the OIN catalog, this change must be processed by the Okta OIN team. Send an email to <oin@okta.com> with the URL of your dev org, the name of the app integration, and a link to its location in the OIN catalog.

Removing an app integration from the OIN doesn't prohibit existing users from accessing it. The app integration won't be removed from end-user dashboards until an admin for the customer's org removes the app integration from the org.

Finally, if you intend to remove your back-end application support for the Okta app integration, alert your customer admins about the change and if you are deploying a replacement solution.
