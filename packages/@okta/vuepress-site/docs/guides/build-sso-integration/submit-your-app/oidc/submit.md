### Submit an OIDC integration

After you have completed your testing and your OIDC app is working as expected, you can start the submission process to have your app included in the [Okta Integration Network](https://www.okta.com/okta-integration-network/) (OIN).

1. Open the [OIN Manager](https://oinmanager.okta.com/) website.
1. Click **Start Submission Form**.
1. Login with the same credentials that you use for your development org.
1. Click **Add New Submission**.
1. Fill in all the fields on the **General Settings** tab.
  ![General tab in the OIN Manager](/img/oin/oin_general-settings.png "General tab for OIN review")
1. Click the **OIDC** tab and then in the **OIDC support** drop down menu, click **On**.
1. Paste the instance URL for your app into the first field.
1. In the **OIDC SETTINGS** section, under **Redirect URI**, click **Add Another** and enter the redirect URI for your app.
    When entering your redirect URI, specify if part of the URI is customized per customer. For example, enter `<https://subdomain.yourappname.com/cdn-cgi/access/callback>` where `subdomain` is the part that customers should add.
1. After you have filled the fields on both tabs, click **Submit for Review** and your app will be sent for review by the Okta team. If the button is not available, there is information missing from one or more fields.
  ![Submit for OIN review](/img/oin/oin_submit-for-review.png "Submit for OIN review")

After you have submitted your app review request, you can track the progress in the OIN Manager.

If you decide to change a component of your submission, you can go back into the submission document and click **Edit Submission**. This cancels your current review and you'll need to click **Submit for Review** once you have made your changes.

If you have any problems with your integration, contact <developers@okta.com>.
