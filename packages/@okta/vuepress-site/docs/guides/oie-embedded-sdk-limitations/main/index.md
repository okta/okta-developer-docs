---
title: Limitations
excerpt: Current SDK Limitations
layout: Guides
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

## Passwordless sign in using magic links is not supported

### Description

Passwordless sign in using magic links is currently not supported with
the SDK. In this use case, the user submits only their email address
through your app to initiate the sign in. An email is subsequently
sent to the user to complete the sign in via a sign link. The user opens
the email and clicks the link that sends them to your app already signed
in.  See the sequence of steps below for a more detailed explanation of
the passwordless sign in process.

### Sequence of steps

<div class="common-image-format">

![Passwordless sign on](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-sign-passwordless-seq.png
 "Passwordless sign on")

</div>

### Sign in email

The screenshot below shows a sample of the sign in email’s content.

<div class="common-image-format">

![Passwordless sign on email link](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-sign-passwordless-screen-email-signin.png
 "Passwordless sign on email link")

</div>

### Workaround

User other means for user sign in such as using the password or social identity providers.

## Primary factor for the Okta sign in policy rule must be set to Password / IDP

### Description

Currently, the SDK only supports the primary factor for the Org’s
global sign in policy to be set to **Password / IDP**. This limitation is due
to the fact that the SDK currently only supports password and IDP as
factors to sign in to an app.  To identify the current value
for this field perform the following steps:

1. In the Admin Console (for the Okta org you set up in the previous step),
   select **Security > Okta Sign-on policy** from the left navigation menu.
1. Take note of the number of policies configured. The Default policy is
   automatically created when the Org is created and will have a default rule with the **Primary factor** set to **Password / IDP**. To verify this value, expand the **Default Policy’s Default rule** by clicking on the information icon to the right of the rule. Note the value of the Primary factor which should be set to Password / IDP.
1. If there is another rule defined to the Default Policy or there are other
   policies defined, ensure that the policy rule’s **Primary factor** field
   is set to **Password / IDP**.

### Workaround

Preserve the default state and use either password or social identity providers.

### User creation should be done via self service registration

### Description

Due to a limitation where the sample apps and SDKs do not handle password
expiration flows, users cannot be created in the Okta org directly with
the **Password** field set to **Set by user**.

To find this field to do the following:

1. In the Admin Console (for the Okta org you set up in the previous step),
   select **Directory > People** from the left navigation menu.
1. Select **Add Person** from the **People** screen.
1. In the **Add Person** page, note the **Password** field. The two current values are:
   1. **Set by user**
   1. **Set by admin**
1. Only set by admin is supported.

### Workaround

There are two workarounds:

* Create users via self registration
* Create users in the Okta org with the **Password** set to **Set by Admin**

## Email verify email link does not work

### Description

If the email factor is enabled for new user registration or user authentication,
the **Verify Email Address** link provided in the email will not redirect the
user to the application that generated the email.

### Workaround

There are two recommended options to mitigate this limitation.

> Verification of activation emails via the Verify Email Address link
  is not yet supported. It is recommended to do one of the following:

* Remove the verification link from the Email Factor Verification email
     template.
* Inform your users to ignore the Verify Email Address link and continue
     the activation via the code flow.

#### Option 1: Remove the verification link

> Email template customizations are not available for free developer orgs.

The Okta org you created in
[Create your Okta Account](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#create-your-okta-account)
contains a list of email templates used for correspondence with the users.
One such template, named **Email Factor Verification**, is used during the
new user registration process. The default template included a
Verify Email Address link.  Since the email verification via this link is
not yet supported it is recommended to delete this link in the email template.
See screenshot below:

<div class="common-image-format">

![Remove link from email template](/img/oie-embedded-sdk/oie-embedded-sdk-email-template-remove-link.png
 "Remove link from email template")

</div>

To find the Email Factor Verification email template to the following:

1. In the Admin Console select **Settings > Email & SMS** from the
   left navigation menu.
1. On the **Email & SMS Customization** page, scroll down through the
   template list and click on Email Factor Verification.
1. In the **Email Factor Verification** page click on **Edit**.

Contact Okta support if the Edit button is disabled.

#### Option 2: Inform users

Inform your users to ignore the Verify Email Address link
and continue the activation via the code flow.


</div>
