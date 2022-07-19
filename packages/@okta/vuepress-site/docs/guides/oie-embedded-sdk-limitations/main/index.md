---
title: SDK limitations and workarounds
excerpt: Current SDK Limitations
layout: Guides
---

<ApiLifecycle access="ie" />

## Passwordless sign-in with magic links

### Description

The Okta Identity Engine SDKs currently don't support passwordless sign-in with magic links.

In a passwordless sign-in with magic links flow, a user submits only their email address through their app to initiate the sign-in flow. An email with a sign-in link is then sent to the user. The user opens the email and clicks the link that redirects them to the app. See the following sequence of steps for details on the passwordless sign-in process.

### Sequence of steps

<div class="full">

![Sequence diagram for passwordless sign-in](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-sign-passwordless-seq.png)

</div>

### Sign-in email

The following image shows an example of the sign-in email's content.

<div class="half border">

![Passwordless sign-in email link example](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-sign-passwordless-screen-email-signin.png)

</div>

### Workaround

Use other means to sign in, such as by entering the password or through social identity providers.

## Primary factor for the Global Session Policy rule

### Description

The primary factor for the org's Global Session Policy must be set to **Password / IDP**, because the SDK currently only supports password and IDP as the factors to sign in to an app.

To identify the current value for this field:

1. In the Admin Console for the Okta org that you set up, select **Security** > **Global Session Policy** from the left-hand navigation pane.
1. In the left pane, select **Default Policy**. The Default Rule for this policy is automatically created when the org is created with the **Primary factor** set to **Password / IDP**. To verify this value, expand the **Default Rule** by clicking the information icon to the right of the rule.
1. If other rules are defined in the **Default Policy** pane, ensure that the **Primary factor** field is set to **Password / IDP** for the other rules.

### Workaround

Preserve the default state, and use either the password or social identity providers.

## User creation through self-service registration

### Description

Since the sample apps and SDKs do not handle password expiration flows, users cannot be directly created in the Okta org with the **Password** field set to **Set by user**.

To check the **Password** field:

1. In the Admin Console (for the Okta org that you set up in the previous step), select **Directory** > **People** from the left-hand navigation pane.
1. On the **People** page, select **Add Person**.
1. In the **Add Person** dialog box, check the **Password** field. The two values are:
   * **Set by user**
   * **Set by admin**
1. Ensure that **Set by admin** is selected.

### Workaround

Use either of these two workarounds:

* Create users through self registration.
* Create users in the Okta org with the **Password** set to **Set by admin**.

## The email link to verify that the email address isn't working

### Description

If the email factor is enabled for a new user registration or user authentication,
the **Verify Email Address** link that's provided in the email won't redirect the
user to the application that generated the email.

### Workaround

Use either of these recommended options to mitigate the email verification link issue:

> **Note:** The verification of activation emails by using the **Verify Email Address** link
  isn't supported yet.

* Remove the verification link from the Email Factor Verification email template.
* Inform your users to ignore the Verify Email Address link and continue the activation through the code flow.

#### Option 1: Remove the verification link

> Email template customizations are not available for free developer orgs.

The Okta org that you created in [Create your Okta account](/docs/guides/oie-embedded-common-org-setup/-/main/#create-your-okta-account) contains a list of email templates that are used for correspondence with your users. The **Email Factor Verification** template is used during the new user registration process. The default template includes a Verify Email Address link. Since email verification through this link is not yet supported, we recommend that you delete this link in the email template.

<div class="full">

![Remove link from email template](/img/oie-embedded-sdk/oie-embedded-sdk-email-template-remove-link.png)

</div>

To remove the verification link from the Email Factor Verification email template:

1. In the Admin Console, select **Settings** > **Emails & SMS** from the
   left-hand navigation pane.
1. On the **Email & SMS Customization** page, scroll down the template list and click **Email Factor Verification**.
1. In the **Email Factor Verification** pane click **Edit**.

Contact Okta support if the **Edit** button is disabled.

#### Option 2: Inform users

Inform your users to ignore the Verify Email Address link and continue the activation through the code flow.