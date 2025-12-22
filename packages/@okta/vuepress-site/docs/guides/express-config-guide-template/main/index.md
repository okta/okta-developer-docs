---
title: Express Configuration customer configuration guide template
meta:
  - name: description
    content: Use this template to create a standardized Express Configuration customer configuration guide for your Okta app integration.
layout: Guides
---

<ApiLifecycle access="ie" />

## Overview

This guide provides a template for your Express Configuration customer configuration guide that helps your users (Okta admins) set up your app from the OIN catalog. By using these standardized guide templates on your guide, you provide clear instructions that minimize configuration errors and accelerate app adoption. See [Customer configuration document guidelines](https://developer.okta.com/docs/guides/submit-app-prereq/main/#customer-configuration-document-guidelines).

Instructions for creating your Express Configuration customer configuration guide:

1. Provide relevant information in the [Title and supported features](#title-and-supported-features), and [Prerequisites](#prerequisites) sections.

2. Choose your template in the following [Configuration steps](#configuration-steps) section:

    - [Template 1: SSO only (Express Configuration)](#configuration-steps)

    - [Template 2: SSO and Universal Logout (Express Configuration)](#configuration-steps)

    - [Template 3: SSO and provisioning (Express Configuration)](#configuration-steps)

    - [Template 4: SSO and Universal Logout, and provisioning (Express Configuration)](#configuration-steps)

3. Replace all placeholder text in [brackets] with your specific app details. For example, [app_name].

4. Include any images that can assist the user with configuring your app integrations.

## Configuration guide template

Use this template as a starting point to create an accurate configuration guide for your app.

### Title and supported features

In this section of your guide, provide a title and a brief overview of the functionalities that your app supports. Ensure that you also include any restrictions or limitations.

- SSO: SSO is a prerequisite for Express Configuration. Ensure that your app uses SSO and indicate whether it supports SP-initiated SSO, IDP-initiated SSO or both.
- Universal Logout: Indicate if your app supports Universal Logout.
- Provisioning (SCIM): List any supported provisioning features. For example, push new users, push profile updates.

```markdown
Express Configuration guide for [app_name]

This guide provides instructions to configure the [app_name] [SSO, Universal Logout, and SCIM] Okta integrations with Express Configuration.

```

### Prerequisites

In this section, specify any prerequisites required before your users to configure your integration in Okta. Examples may include the following:

  - [app_name] admin account. Include specific instructions on how an Okta admin can request/receive an Express Config/SaaS admin account for your service.

  - Admin access to your Okta tenant.

### Configuration steps

Select the appropriate template for your integration.

<details>

<summary> Template 1: SSO only (Express Configuration) </summary>

``` markdown

1. Add the [app_name] instance in your Okta org. See [Add the existing app integration.](https://developer.okta.com/docs/guides/create-an-app-integration/openidconnect/main/#how-to-create-an-app-integration)

2. Configure SSO:

      a. In the [app_name] app instance in your Okta org, click the **Authentication** tab.
      b. Click **Express Configure SSO** in the Express Configuration for [app_name] section. You're redirected to the [app_name] sign-in page.
      c. Sign in to the app using your admin credentials.
      d. Review the **Authorize App** details on the consent page to grant Okta access to [app_name] and click **Accept**. You’re automatically redirected back to your Okta org. A success message indicates that SSO has been configured.

3. Verification:

      - For IdP-initiated SSO:

        a. Assign the app to a test user in Okta.
        b. Sign in as that test user to the Okta dashboard.
        c. Click the [app_name] tile.
        d. Confirm that you’re successfully logged in to [app_name].

      - For SP-initiated SSO: Sign in to the app using SSO credentials.

```

</details>

<details>

<summary> Template 2: SSO and Universal Logout (Express Configuration) </summary>

``` markdown

1. Add the [app_name] instance in your Okta org. See [Add the existing app integration](https://developer.okta.com/docs/guides/create-an-app-integration/openidconnect/main/#how-to-create-an-app-integration).

2. Configure SSO and Universal Logout:

    a. In the [app_name] app instance in your Okta org, click the **Authentication** tab.
    b. Click **Express Configure SSO & UL** in the Express Configuration for [app_name] section. You're redirected to the [app_name] login page.
    c. Sign in to the app using your admin credentials.
    d. Review the **Authorize App** details on the consent page to grant Okta access to [app_name] and click **Accept**. You’re automatically redirected back to your Okta org. A success message indicates that SSO and Universal Logout have been configured.

3. Verification:

    a. Verify SSO: Verify the SSO configuration based on the provider initiation. See the Verification step in [Template 1: SSO Only (Express Configuration)](#template-1-sso-only-express-configuration).
    b. Verify logout: Sign out from [app_name]. Confirm that you’re redirected to the Okta login page, which indicates the Okta session has also been terminated.

```

</details>

<details>

<summary> Template 3: SSO and provisioning (Express Configuration) </summary>

``` markdown

1. Add the [app name] instance in your Okta org. See [Add the existing app integration](https://developer.okta.com/docs/guides/create-an-app-integration/openidconnect/main/#how-to-create-an-app-integration).

2. Configure SSO:

    a. In the [app name] app instance in your Okta org, click the **Authentication** tab.
    b. Click **Express Configure SSO** in the Express Configuration for [app name] section. You're redirected to the [app name] sign-in page.
    c. Sign in to the app using your admin credentials.
    d. Review the **Authorize App** details on the consent page to grant Okta access to [app name] and click **Accept**. You’re automatically redirected back to your Okta org. A success message indicates that SSO has been configured.

3. Configure provisioning (Express Configuration):

    a. In the app instance in your Okta org, go to the Provisioning tab.
    b. Click **Express Configure SCIM** in the Express Configuration for [app_name] section. You're redirected to the [app_name] login page.
    c. Sign in to the app using your admin credentials.
    d. Review the **Authorize App** details on the consent page to grant Okta access to [app_name] and click **Accept**. You’re automatically redirected back to your Okta org. A success message indicates that SCIM has been configured.
    e. Click **To App** within **Settings**, and then **Edit** to save the settings necessary for provisioning [app_name]. Once done, click **Save**.

4. Verification

    a. Verify provisioning: Assign the [app_name] app to a test user in Okta. Check your [app_name] user list to confirm the user was created.
    b. Verify SSO: Sign in to [app_name] using the Okta dashboard.

```

</details>

<details>

<summary>Template 4: SSO and Universal Logout, and provisioning (Express Configuration) </summary>

``` markdown

1. Add the [app_name] instance in your Okta org. See [Add the existing app integration.](https://developer.okta.com/docs/guides/create-an-app-integration/openidconnect/main/#how-to-create-an-app-integration)

2. Configure SSO and Universal Logout:

    a. In the [app_name] app instance in your Okta org, click the **Authentication** tab.
    b. Click **Express Configure SSO & UL** in the Express Configuration for [app_name] section. You’re redirected to the [app_name] login page.
    c. Sign in to the app using your admin credentials.
    d. Review the **Authorize App** details on the consent page to grant Okta access to [app_name] and click **Accept**. You’re automatically redirected back to your Okta org. A success message indicates that SSO and Universal Logout have been configured.

3. Configure provisioning (Express Configuration):

    a. In the app instance in your Okta org, go to the Provisioning tab.
    b. Click **Express Configure SCIM** in the Express Configuration for [app_name] section. You're redirected to the [app_name] login page.
    c. Sign in to the app using your admin credentials.
    d. Review the **Authorize App** details on the consent page to grant Okta access to [app_name] and click **Accept**. You’re automatically redirected back to your Okta org. A success message indicates that SCIM has been configured.
    e. Click **To App** within **Settings**, and then **Edit** to save the settings necessary for provisioning [app_name]. Once done, click **Save**.

4. Verification

    a. Verify provisioning: Assign the [app_name] app to a test user in Okta. Check your [app_name] user list to confirm the user was created.
    b. Verify SSO: Sign in to [app_name] using the Okta dashboard.
    c. Verify logout: Sign out from [app_name]. Confirm that you’re redirected to the Okta login page, which indicates the Okta session has also been terminated.

```

</details>
