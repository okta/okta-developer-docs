---
title: Express Configuration customer configuration guide template
meta:
  - name: description
    content: Express Configuration customer configuration guide template.
layout: Guides
---

<ApiLifecycle access="ie" />

# Purpose

This guide provides a template for your Express Configuration customer configuration guide that helps your users (Okta administrators) set up your app from the OIN catalog. By using these standardized guide templates on your guide, you provide clear instructions that minimize configuration errors and accelerate app adoption. For more information on guidelines, see [Customer configuration document guidelines](https://developer.okta.com/docs/guides/submit-app-prereq/main/#customer-configuration-document-guidelines).

Instructions for creating your Express Configuration customer configuration guide:

1. Provide relevant information in the Overview, Support features, and Prerequisites sections (mentioned after this).
2. Choose your template in the following Configuration steps section:

    - [Template 1: SSO Only (Express Configuration)](#template-1-sso-only-express-configuration)

    - [Template 2: SSO and Universal Logout (Express Configuration)](#template-2-sso--universal-logout-express-configuration)

    - [Template 3: SSO and provisioning (Express Configuration)](#template-3-sso-and-provisioning-express-configuration)

    - [Template 4: SSO and Universal Logout, and provisioning (Express Configuration)](#template-4-sso--universal-logout--provisioning-express-configuration)

4. Replace all placeholder text in [brackets] with your specific app details. For example, [app_name].
5. Include any images that can assist the user with configuring your app integrations.

### Configuration guide template

Use this template as a starting point to create an accurate configuration instructions for your app.

### Title and overview

Express Configuration guide for [app_name]

This guide provides instructions to configure the [app_name] [SSO, Universal Logout, and SCIM] Okta integrations with Express Configuration.

### Supported features

In this section of your guide, list the functionality that your app supports and include any restrictions or limitations.

- SSO: SSO is a prerequisite for Express Configuration. Ensure that your app uses SSO and indicate whether it supports SP-initiated SSO, IDP-initiated SSO or both.
- Universal Logout: Indicate if your app supports Universal Logout.
- Provisioning: List any supported provisioning features. For example, push new users, push profile updates.

### Prerequisites

In this section, specify any prerequisites required before your users to configure your integration in Okta. Examples may include:

  - [app_name] admin account. Include specific instructions on how an Okta admin can request/receive an Express Config/SaaS admin account for your service.

  - Administrator access to your Okta tenant.

### Configuration steps

Select the appropriate template for your integration.

#### Template 1: SSO Only (Express Configuration)

1. Add the [app_name] instance in your Okta org. See [Add the existing app integration.](https://developer.okta.com/docs/guides/create-an-app-integration/openidconnect/main/#how-to-create-an-app-integration)
2. Configure SSO:

      1. In the [app_name] app instance in your Okta org, click the **Authentication** tab.
      [[style="list-style-type:lower-alpha"]]
      2. Click **Express Configure SSO** in the Express Configuration for [app_name] section.
      3. Click **Authorize** in the Authorization window. You're being redirected to the [app_name] login page.
      4. Sign in to the app using your admin credentials.
      5. Review the **Authorize App** details on the consent page to grant Okta access to [app_name] and click **Accept**. You’re automatically redirected back to your Okta org. A success message indicates that SSO has been configured.

3. Verification:

      - For IdP-initiated SSO:

        1. Assign the app to a test user in Okta.
         [[style="list-style-type:lower-alpha"]]
        2. Sign in as that test user to the Okta dashboard.
        3. Click the [app_name] tile.
        4. Confirm that you’re successfully logged in to [app_name].

      - For SP-initiated SSO:
          Sign in to the app using SSO credentials.

#### Template 2: SSO + Universal Logout (Express Configuration)

1. Add the [app_name] instance in your Okta org. See [Add the existing app integration](https://developer.okta.com/docs/guides/create-an-app-integration/openidconnect/main/#how-to-create-an-app-integration).
2. Configure SSO and Universal Logout:

    1. In the [app_name] app instance in your Okta org, click the **Authentication** tab.
    [[style="list-style-type:lower-alpha"]]
    1. Click **Express Configure SSO & UL** in the Express Configuration for [app_name] section. You're redirected to the [app_name] login page.
    1. Sign in to the app using your admin credentials.
    1. Review the **Authorize App** details on the consent page to grant Okta access to [app_name] and click **Accept**. You’re automatically redirected back to your Okta org. A success message indicates that SSO and Universal Logout have been configured.

3. Verification:

    1. Verify SSO: Verify the SSO configuration based on the provider initiation. See the Verification step in [Template 1: SSO Only (Express Configuration)](#template-1-sso-only-express-configuration).
    [[style="list-style-type:lower-alpha"]]
    1. Verify logout: Sign out from [app_name]. Confirm that you’re redirected to the Okta login page, which indicates the Okta session has also been terminated.

#### Template 3: SSO and provisioning (Express Configuration)
1. Add the [app name] instance in your Okta org. See [Add the existing app integration](https://developer.okta.com/docs/guides/create-an-app-integration/openidconnect/main/#how-to-create-an-app-integration).
2. Configure SSO:

   1. In the [app name] app instance in your Okta org, click the **Authentication** tab.
   [[style="list-style-type:lower-alpha"]]
   1. Click **Express Configure SSO** in the Express Configuration for [app name] section. You're redirected to the [app name] sign-in page.
   1. Sign in to the app using your admin credentials.
   1. Review the **Authorize App** details on the consent page to grant Okta access to [app name] and click **Accept**. You’re automatically redirected back to your Okta org. A success message indicates that SSO has been configured.

#### Template 4: SSO + Universal Logout + Provisioning (Express Configuration)

1. Add the [app_name] instance in your Okta org. See [Add the existing app integration.](https://developer.okta.com/docs/guides/create-an-app-integration/openidconnect/main/#how-to-create-an-app-integration)
2. Configure SSO and Universal Logout:

    1. In the [app_name] app instance in your Okta org, click the **Authentication** tab.
    [[style="list-style-type:lower-alpha"]]
    1. Click **Express Configure SSO & UL** in the Express Configuration for [app_name] section. You’re redirected to the [app_name] login page.
    1. Sign in to the app using your admin credentials.
    1. Review the **Authorize App** details on the consent page to grant Okta access to [app_name] and click **Accept**. You’re automatically redirected back to your Okta org. A success message indicates that SSO and Universal Logout have been configured.

3. Configure provisioning (Express Configuration):

    1. In the app instance in your Okta org, go to the Provisioning tab.
    [[style="list-style-type:lower-alpha"]]
    1. Click **Express Configure SCIM** in the Express Configuration for [app_name] section. You're redirected to the [app_name] login page.
    1. Sign in to the app using your admin credentials.
    1. Review the **Authorize App** details on the consent page to grant Okta access to [app_name] and click **Accept**. You’re automatically redirected back to your Okta org. A success message indicates that SCIM has been configured.
    1. Click **To App** within **Settings**, and then **Edit** to save the settings necessary for provisioning [app_name]. Once done, click **Save**.

4. Verification

    1. Verify provisioning: Assign the [app_name] app to a test user in Okta. Check your [app_name] user list to confirm the user was created.
    [[style="list-style-type:lower-alpha"]]
    1. Verify SSO: Sign in to [app_name] using the Okta dashboard.
    1. Verify logout: Sign out from [app_name]. Confirm that you’re redirected to the Okta login page, which indicates the Okta session has also been terminated.
