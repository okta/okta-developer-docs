---
title: Configure protocol-specific settings
---

Your app needs to support at least one protocol for interacting with Okta: SAML or OIDC for authentication, or SCIM for provisioning.

Protocol support details can be submitted all together or asynchronously. For example, if your app currently only supports SAML and SCIM, you can create the submission with the SAML and SCIM protocol details. At a later date, when you add OIDC support in your app, you can return to your integration submission, activate the OIDC support panel, and add in the details needed for Okta to enable OIDC support.

For each protocol, click on the appropriate tab name and change the protocol support drop-down box from **Off** to **On**.

## Instance URL

For each protocol, enter the **Okta instance URL** for your app in the first field.

To get your Okta instance URL:

1. Open the Okta Admin Console in your development org.
1. If you are not in the **Classic UI**, switch to that view.
1. Click **Applications > Applications** to see all the applications in your org.
1. Click on the name of the application you are going to submit. The browser opens the app settings page. Confirm that the app settings match what you want as the global defaults for all customers.
1. In your browser, click on the address bar showing the current URL and copy it to your clipboard. This is the Okta instance URL for your app.
1. Back in the OIN Manager, paste that URL into your app submission.
  
  For example:
  ![Okta OIDC instance URL](/img/oin/isv-portal_okta-instance-url-oidc.png "Okta instance URL for an OIDC app in the browser address bar")

<!--
1. Click the **General** tab.
1. Go to the **App Embed Link** section and copy the text in the Embed Link field:
   ![App Embed Link](/img/oin/isv-portal_app-embed-link.png "App Embed Link GUI in the Application settings")
1. Paste that value into your app submission.
-->

## Protocol-specific settings

Each of the supported protocols has different configuration settings for the remainder of the submission.

<StackSelector snippet="submit" />

As you add configuration information about your app to the submission page, the indicators in the top right show your progress towards 100% completion.

You must include all required information before you can click the **Submit for Review** button to move your app into the submission phase.

<NextSectionLink/>
