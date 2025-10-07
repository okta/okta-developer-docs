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

---
> **Note**: This guide describes testing through a web browser. For mobile apps, you can use a fresh app install or clear the app's data to ensure a clean session.

### Test the SP-initiated sign-in flow

The Service Provider (SP) flow (also known as the app-initiated flow) is a sign-in process that begins when a user starts directly from the app rather than from the identity provider's dashboard.

To test the app-initiated sign-in flow, you need to execute the test cases as an end user persona. Use one of the test end users you previously [assigned to your integration](/docs/guides/submit-oin-app/openidconnect/main/#assign-test-users-to-your-integration-instance).

The end user has two options for signing in using the SP-initiated flow:

1. Direct URL: [Sign in with a direct URL](#sign-in-with-a-direct-url)
2. Sign-in page: [Sign in with the sign-in page](#sign-in-with-the-sign-in-page)

#### Sign in using a direct URL

> **Note**: Ensure that the app is integrated with an Okta tenent.

To test the SP-initiated flow using a direct URL:

1. Open an incognito window in your browser.
1. Go to the app sign-in page directly from the browser URL address field (for example: `https://berryfarm.example.org/strawberry/signin`). The browser redirects you to Okta for authentication.
1. Sign in with Okta credentials for the test end user.
1. Confirm that you’re signed in to the app.
1. Sign out of your app.
1. Verify that you're able to sign out and are redirected to the sign-in page.

#### Sign in with a sign-in page

> **Note**: Ensure that the app is integrated with an Okta tenant.

To test the SP-initiated flow using a sign-in page:

1. Open an incognito window in your browser.
1. Go to the app sign-in page.
1. Initiate the sign-in action from the sign-in page (such as clicking **Sign in with Okta**).
1. Sign in with Okta credentials for the test end user.
1. Confirm that you're signed in to the app.
1. Sign out of your app.
1. Verify that you're able to sign out and are redirected to the sign-in page.


### Test JIT provisioning

> **Note**: This section is optional. Follow these steps only if your app supports JIT provisioning.

To test JIT provisioning, you need to execute the test cases using two personas: as a customer admin user and as an end user. The customer admin user sets up the new end user in Okta, and the new end user signs in to the app. The new user profile is provisioned in the app without extra admin intervention.

Test JIT provisioning using either SSO flow:

- With SP-initiated SSO flow: [Test JIT provisioning with the SP flow](#test-jit-provisioning-with-the-sp-flow)
- IdP SSO flow: [Test JIT provisioning using the IdP-initiated flow](#test-jit-provisioning-with-the-idp-flow)

#### Test JIT provisioning with the SP flow

Test case preconditions:

* App integration supports the SP-initiated flow
* App integration supports JIT provisioning
* The [Sign in using the SP-initiated flow](#sign-in-with-a-direct-url-for-the-sp-flow) test case was executed successfully
* A new test user profile that isn't in your org or your app

To test JIT provisioning using the SP-initiated flow:

1. As an admin user, verify that the test user doesn't exist in your Okta org.
1. As an admin user, verify that the test user doesn't exist in the app. Sign in to your app and verify that there's no user with the same unique attributes as your new test user.
1. As an admin user, sign in to your Okta org.
1. Go to **Directory** > **People** and add the new test user in Okta. See [Add users manually](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-add-users.htm) for complete instructions.
1. Go to **Applications** > **Applications** > your app integration instance in the Admin Console.
1. Click the **Assignments** tab, **Assign**, and then **Assign to People**.
1. Find the name of the new test user and click **Assign** next to their name. A dialog box appears with the title **Assign {app-name} to People**.
1. Click **Save and Go Back**.
1. On the **People** page, click **Done**.
1. Open a new incognito window in your browser.
1. Go to the app sign-in page directly from the browser URL address field (for example: `https://berryfarm.example.org/strawberry/signin`). The browser redirects you to Okta for authentication.
1. Sign in with Okta credentials for the new test user that was assigned to the app integration.
1. Confirm that you can sign in to the app.
1. Sign out of your app.
1. Verify that you're able to sign out and are redirected to the sign-in page.
1. Verify that the new user was created in your app with supported attributes passed from the Okta profile.

#### Test JIT provisioning with the IdP flow

> **Note**: This section is optional. Follow these steps only if your app supports JIT provisioning with the IdP flow.

Test case preconditions:

* App integration supports IdP flow
* App integration supports JIT provisioning
* The [Sign in with the IdP flow](#sign-in-with-the-idp-flow) test case was executed successfully
* A new test user profile that isn't in your app

To test JIT provisioning with the IdP flow:

1. As an Okta admin user, verify that the test user doesn't exist in your Okta org.
1. As an app admin user, verify that the test user doesn't exist in the app. Sign in to your app and verify that there's no user with the same unique attributes as your new test user.
1. As an Okta admin user, sign in to your Okta org.
1. Go to **Directory** > **People** and add the new test user in Okta. See [Add users manually](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-add-users.htm) for complete instructions.
1. Go to **Applications** > **Applications** > your app integration instance in the Admin Console.
1. Click the **Assignments** tab, **Assign**, and then **Assign to People**.
1. Find the name of the new test user and click **Assign** next to their name. A dialog box appears with the title **Assign {app-name} to People**.
1. Click **Save and Go Back**.
1. On the **People** page, click **Done**.
1. Open a new incognito window in your browser.
1. Go to your Okta org URL.
1. Sign in as the new user that you assigned to the app integration. The End-User Dashboard appears.
1. Confirm that your app tile appears on the End-User Dashboard.
1. Click the app tile and confirm that you can sign in.
1. Sign out of your app.
1. Verify that you're able to sign out and are redirected to the sign-in page.
1. Verify that the new user was created in your app with supported attributes. These attributes are passed from the Okta profile, such as the user's name and email.


## See also
[Submit an integration with the OIN Wizard](/docs/guides/submit-oin-app/openidconnect/main/)
