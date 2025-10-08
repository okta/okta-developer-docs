---
title: Validate SSO federation
excerpt: Validate your single sign-on (SSO) and Just-In-Time (JIT) provisioning integration.
layout: Guides
---
Validate your single sign-on (SSO) and Just-In-Time (JIT) provisioning integration.

---

#### Learning outcomes

* Verify an SSO and JIT provisioning integration.
* Understand the testing process for both web and mobile apps.
* Perform tests from the perspective of both a customer admin and an end user.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* An app that uses SSO integration
* Optional. An app integration that supports JIT provisioning, and a test user that isn't in your org or assigned to this app.

---

### Overview

Validate your SSO federation and JIT provisioning integration to ensure that authentication, authorization, and user provisioning work as expected. The validation process includes testing from both Service Provider (SP) and Identity Provider (IdP) perspectives. The testing process confirms that users can sign in and sign out successfully.

If you skip the federation testing, it can lead to sign in failures, user provisioning issues, and an inconsistent user experience.

This guide outlines step-by-step instructions to validate your SSO and JIT provisioning integration of your web and mobile apps.

> **Note**: The steps in this guide use a web browser. For mobile apps, you can use a fresh app install or clear the app's data to ensure a clean session.

### Test the SP-initiated sign-in flow

The SP flow is also known as the app-initiated flow. It’s a sign-in process that begins when a user starts directly from the app, rather than from the IdP's dashboard.

To test the app-initiated sign-in flow, you need to execute the test cases as an end user persona. Use one of the test end users you previously [assigned to your integration](/docs/guides/submit-oin-app/openidconnect/main/#assign-test-users-to-your-integration-instance).

The end user has two options for signing in using the SP-initiated flow:

1. Direct URL: [Sign in using a direct URL](#sign-in-using-a-direct-url)
2. Sign-in page: [Sign in using the sign-in page](#sign-in-using-the-sign-in-page)

#### Sign in using a direct URL

> **Note**: Ensure that the app is integrated with an Okta tenent. This is required to enable SSO for end users and to allow admins to manage the access from the Admin Console.

To test the SP-initiated flow using a direct URL:

1. Open an incognito window in your browser.
1. Go to the app sign-in page directly from the browser URL address field (for example: `https://berryfarm.example.org/strawberry/signin`). The browser redirects you to Okta for authentication.
1. Sign in with Okta credentials for the test end user.
1. Confirm that you’re signed in to the app.
1. Sign out of your app.
1. Verify that you're able to sign out and are redirected to the sign-in page.

#### Sign in using the sign-in page

> **Note**: Ensure that the app is integrated with an Okta tenant. This is required to enable SSO for end users and to allow admins to manage the access from the Admin Console.

To test the SP-initiated flow using a sign-in page:

1. Open an incognito window in your browser.
1. Go to the app sign-in page.
1. Initiate the sign-in action from the sign-in page (such as clicking **Sign in with Okta**).
1. Sign in with Okta credentials for the test end user.
1. Confirm that you're signed in to the app.
1. Sign out of your app.
1. Verify that you're able to sign out and are redirected to the sign-in page.

### Test the IdP-initiated sign-in flow

> **Note**: This section is optional. Follow these steps only if your app supports the IdP-initiated sign-inflow.

1. Open an incognito window in your browser.
1. Sign in to your Okta org as a user that has been assigned to the app integration instance.
1. Click the icon with four boxes next to your name > **My end user dashboard**.
1. Confirm that your app tile appears on your End-User Dashboard.
1. Click your app tile and confirm that you can sign in to your app successfully.
1. Sign out of the app.
1. Verify that you're able to sign out and are redirected to the sign-in page.

### Test JIT provisioning

> **Note**: This section is optional. Follow these steps only if your app supports JIT provisioning.

To test JIT provisioning, you need to execute the test cases using two personas: as a customer admin user and as an end user. The customer admin user sets up the new end user in Okta, and the new end user signs in to the app. The new user profile is provisioned in the app without extra admin intervention.

Test JIT provisioning using either SSO flow:

- SP-initiated SSO flow: [Test JIT provisioning using the SP-initiated flow](#test-jit-provisioning-using-the-sp-initiated-flow)
- IdP SSO flow: [Test JIT provisioning using the IdP-initiated flow](#test-jit-provisioning-using-the-idp-initiated-flow)

#### Test JIT provisioning using the SP-initiated flow

Test case preconditions:

* App integration supports the SP-initiated flow
* App integration supports JIT provisioning
* The [Sign in using the SP-initiated flow](#sign-in-with-a-direct-url-for-the-sp-flow) test case was executed successfully
* A new test user profile that isn't in your org or your app

To test JIT provisioning using the SP-initiated flow:

1. Sign in to your org as an admin user, verify that the test user doesn't exist in your Okta org.
1. Sign in to your app as an admin user, verify that your new test user doesn't exist in the app. Ensure that there's no user with the same unique attributes as your new test user.
1. Sign in to your Okta org as an admin user.
1. Go to **Directory** > **People** and add the new test user in Okta. See [Add users manually](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) for complete instructions.
1. Go to **Applications** > **Applications** > your app integration instance in the Admin Console.
1. Click the **Assignments** tab, **Assign**, and then **Assign to People**.
1. Find the name of the new test user and click **Assign** next to their name. A dialog appears with the title **Assign {app-name} to People**.
1. Click **Save and Go Back**.
1. On the **People** page, click **Done**.
1. Open an incognito window in your browser.
1. Go to the app sign-in page directly from the browser URL address box (for example: `https://berryfarm.example.org/strawberry/signin`). The browser redirects you to Okta for authentication.
1. Sign in with Okta credentials for the new test user that you assigned to the app integration.
1. Confirm that you can sign in to the app.
1. Sign out of the app.
1. Verify that you're able to sign out and are redirected to the sign-in page.
1. Verify that the new user was created in your app with supported attributes passed from the Okta profile.

#### Test JIT provisioning using the IdP-initiated flow

> **Note**: This section is optional. Follow these steps only if your app supports JIT provisioning with the IdP-initiated flow.

Test case preconditions:

* App integration supports the IdP-initiated flow
* App integration supports JIT provisioning
* The [Test the IdP-initiated sign-in flow](#test-the-idp-initiated-sign-in-flow) test case was executed successfully
* A new test user profile that isn't in your org or your app

To test JIT provisioning using the IdP-initiated flow:

1. Sign in to your org as an admin user, verify that the test user doesn't exist in your Okta org.
1. Sign in to your app as an admin user, verify that your new test user doesn't exist in the app. Ensure that there's no user with the same unique attributes as your new test user.
1. Sign in to your Okta org as an admin user.
1. Go to **Directory** > **People** and add the new test user in Okta. See [Add users manually](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) for complete instructions.
1. Go to **Applications** > **Applications** > your app integration instance in the Admin Console.
1. Click the **Assignments** tab, **Assign**, and then **Assign to People**.
1. Find the name of the new test user and click **Assign** next to their name. A dialog appears with the title **Assign {app-name} to People**.
1. Click **Save and Go Back**.
1. On the **People** page, click **Done**.
1. Open an incognito window in your browser.
1. Go to your Okta org URL.
1. Sign in as the new user that you assigned to the app integration. The End-User Dashboard appears.
1. Confirm that your app tile appears on the End-User Dashboard.
1. Click the app tile and confirm that you can sign in.
1. Sign out of your app.
1. Verify that you're able to sign out and are redirected to the sign-in page.
1. Verify that the new user was created in your app with supported attributes. These attributes are passed from the Okta profile, such as the user's name and email.

## See also
[Submit an integration with the OIN Wizard](/docs/guides/submit-oin-app/openidconnect/main/)
