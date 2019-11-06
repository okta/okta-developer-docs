---
title: Integrate Your App
---

### 2. Integrate Your App

> If you are using the developer dashboard you will first need to switch to the Classic UI.
> If you see a **Developer** prompt in the top left, click it and select **Classic UI** to switch to the Classic UI.

* Sign up for an Okta [developer account](https://www.okta.com/integrate/signup/).
* In your Okta account (make sure you are signed in as an admin), use the [App Wizard](https://help.okta.com/en/prod/Content/Topics/Apps/Apps_App_Integration_Wizard.htm) to build a Single Sign-on integration with Okta.
* When you are ready, navigate to the Feedback tab of the App Wizard:
    ![Feedback tab of SAML App Wizard](/img/oin/saml-step3.png "Feedback page for App wizard")

    1. Select **I'm a software vendor. I'd like to integrate my app with Okta.** if you want your app added to the OIN. Okta won't contact you until this option is selected.
    2. Click **Submit your app for review.** You are redirected to [the OIN Manager](https://oinmanager.okta.com/).
    ![OIN Manager Submission page](/img/oin/oan-manager.png "OIN Manager submission page")
    3. In the OIN Manager, click **Start Submission Form,** and enter the requested information in the General Settings tab.
    ![General tab in the OIN Manager](/img/oin/oan-general.png "General tab for OIN review")
    4. In the SAML tab, select On in the **SAML support** button, and enter information requested.
    5. When you've  entered all the information requested on the General Settings and SAML tabs, the **Submit for Review** button is enabled. Click it to submit your app for review.
    ![Submit for OIN review](/img/oin/submit-for-review.png "Submit for OIN review")

Once submitted, you can track the stage of your integration in the OIN Manager.

>Note: Okta doesn't proactively add SWA-only, branded apps to the OIN. If you want a branded app in the OIN that only supports SWA to all customers, submit a request to <developers@okta.com>.

<NextSectionLink/>
