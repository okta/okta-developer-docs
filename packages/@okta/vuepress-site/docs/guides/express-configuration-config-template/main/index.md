---
title: Express Configuration customer configuration guide template
meta:
  - name: description
    content: Express Configuration setup and enablement instructions are now available in the Auth0 documentation portal.
layout: Guides
---

<ApiLifecycle access="ie" />

# Purpose

This guide ensures that your users (Okta administrators) have a seamless experience setting up your app from the OIN catalog. By following these standardized templates, you provide clear instructions that minimize configuration errors and accelerate app adoption.

In addition, comprehensive documentation allows users to self-serve, significantly reducing the support volume related to setup and provisioning questions. For more information, see [Customer configuration document guidelines](https://developer.okta.com/docs/guides/submit-app-prereq/main/#saml-configuration-warning-example).

Instructions for creating your configuration guide:

1.  Provide relevant information in the Overview, Support features, and Prerequisites sections (mentioned after this).
2.  Choose your template in the “Configuration steps” section below:
    
  - Template 1: SSO only
  - Template 2: SSO and Universal Logout
  - Template 3: SSO and Universal Logout, and provisioning
4.  Replace all placeholder text in \[brackets\] (for example, \[app name\]) with your specific app details.
5.  Include any images that can assist the user with configuring your app integrations.

## Title and overview
Express Configuration guide for \[app name\]

This guide provides instructions to configure the \[app name\] \[SSO, Universal Logout, and SCIM\] Okta integration\[s\] with Express Configuration.

### Supported features
In this section of your guide, list the functionality that your app supports and include any restrictions or limitations.

- SSO: SSO is a prerequisite for Express Configuration. Ensure that your app utilizes SSO and indicate whether it supports SP-initiated SSO, IDP-initiated SSO or both.
- Universal Logout: Indicate if your app supports Universal Logout.
- Provisioning: List any supported provisioning features. For example, push new users, push profile updates.

## Prerequisites
In this section, specify any prerequisites required before your users to configure your integration in Okta. Examples may include:
  - [app name\] admin account. Include specific instructions on how an Okta admin can request/receive an Express Config/SaaS admin account for your service.
  - Administrator access to your Okta tenant.

### Configuration steps

#### Template 1: SSO Only (Express Configuration)

1.  Add the \[app name\] instance in your Okta org. See [Add the existing app integration.](https://developer.okta.com/docs/guides/create-an-app-integration/openidconnect/main/#how-to-create-an-app-integration)
2.  Configure SSO
  a. In the \[app name\] app instance in your Okta org, click the Authentication tab.
  b. Click Express Configure SSO in the Express Configuration for [app name] section.
  c. Click Authorize in the Authorization window. You're being redirected to the \[app name\] login page.
  d. Sign in to the app using your admin credentials.
  e. Review the Authorize App details on the consent page to grant Okta access to \[app name\] and click Accept. You are being automatically redirected back to your Okta org. A success message indicates that SSO has been configured.
3.  Verification
 - For IdP-initiated SSO:
    a. Assign the app to a test user in Okta.
    b. Sign in as that test user to the Okta dashboard.
    c. Click the \[app name\] tile.
    d. Confirm that you are successfully logged in to \[app name\].

  - For SP-initiated SSO:
    Sign in to the app using SSO credentials.

#### Template 2: SSO + Universal Logout (Express Configuration)

1.  Add the \[app name\] instance in your Okta org. See [Add the existing app integration.](https://developer.okta.com/docs/guides/create-an-app-integration/openidconnect/main/#how-to-create-an-app-integration)
2.  Configure SSO and Universal Logout:
  a. In the \[app name\] app instance in your Okta org, click the Authentication tab.
  b. Click Express Configure SSO & UL in the Express Configuration for \[app name\] section.
  c. You are redirected to the \[app name\] login page.
  d. Sign in to the app using your admin credentials.
  e. Review the Authorize App details on the consent page to grant Okta access to \[app name\] and click Accept. You are automatically redirected back to your Okta org. A success message indicates that SSO and Universal Logout have been configured.
3.  Verification
  a. Verify SSO: Verify the SSO configuration based on the provider initiation. See the Verification step in Template 1 above.
  b. Verify logout: Sign out from \[app name\]. Confirm that you are redirected to the Okta login screen, which indicates the Okta session has also been terminated.

#### Template 4: SSO + Universal Logout + Provisioning (Express Configuration)

1.  Add the \[app name\] instance in your Okta org. See [Add the existing app integration.](https://developer.okta.com/docs/guides/create-an-app-integration/openidconnect/main/#how-to-create-an-app-integration)
2.  Fill out the General Settings tab and click Next.
3.  Configure SSO and Universal Logout
  a.  In the \[app name\] app instance in your Okta org, click the Authentication tab.
  b.  Click Express Configure SSO & UL in the Express Configuration for \[app name\] section.
  c.  You are redirected to the \[app name\] login page.
  d. Sign in to the app using your admin credentials.
  e. Review the Authorize App details on the consent page to grant Okta access to \[app name\] and click Accept. You are automatically redirected back to your Okta org. A success message indicates that SSO and Universal Logout have been configured.
4.  Configure provisioning (Express Configuration)
  a. In the app instance in your Okta org, go to the Provisioning tab.
  b. Click Express Configure SCIM in the Express Configuration for \[app name\] section.
  c. You are redirected to the \[app name\] login page.
  d. Sign in to the app using your admin credentials.
  e. Review the Authorize App details on the consent page to grant Okta access to \[app name\] and click Accept.
  f. You are automatically redirected back to your Okta org. A success message indicates that SCIM has been configured.
  g. Click To App within Settings, and then Edit to save the settings necessary for provisioning \[app name\]. Once done, click Save.
5. Verification
  a. Verify provisioning: Assign the [app name] app to a test user in Okta. Check your [app name] user list to confirm the user was created.
  b. Verify SSO: Sign in to [app name] using the Okta dashboard.
  c. Verify logout: Sign out from [app name]. Confirm that you are redirected to the Okta login page, which indicates the Okta session has also been terminated.
