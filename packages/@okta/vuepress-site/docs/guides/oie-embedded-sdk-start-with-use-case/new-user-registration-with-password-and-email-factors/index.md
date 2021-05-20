---
title: New user registration with password and email factors
---

<div class="oie-embedded-sdk">

<StackSelector class="cleaner-selector" snippet="oie-embedded-sdk-lang" />

Self service registration allows users to sign up for the app themselves.  In
this use case we will require the user to register with a **password** and an
**email** factor. To enable self service registrations, the following steps need
to be performed:

1. Enable the self service registration option for your app in the Okta org
1. Build the self service registration flow in your app

### New user registration generic sequence flow

Once fully integrated, the self service registration flow in your app will look
similar to the following;

<div class="sequence-diagram-format">

![Self Service Registration Flow](/img/oie-embedded-sdk/self-serv-reg-flow-complete.png
 "Complete flow of the user self service registration")

</div>

The above sequence diagram illustrates generically how the required factors are
retrieved and verified within an app. For this use case, the loop in the
sequence flow will process two factors: password and email. Though not shown
above each factor verification is handled differently.

In this use case there will be two factors: password and email.  Password is
verified first with the user and then the email.

### Password factor sequence flow
The sequence flow for the password factor is shown below.

<div class="sequence-diagram-format">

![Self Service Registration Flow](/img/oie-embedded-sdk/self-serv-reg-flow-password.png
 "Flow of the user self service registration password factor")

</div>

### Email factor sequence flow
After the password is verified the email is verified. The steps to verify the
email are shown below.

<div class="sequence-diagram-format">

![Self Service Registration Flow](/img/oie-embedded-sdk/self-serv-reg-flow-email.png
 "Flow of the user self service registration email factor")

</div>

### Configuration updates
Before building out the self registration flow in your app, perform the
following steps to configure the Okta org to accept self registration with
both the password and email factors.

#### Step 1:  Update the profile enrollment default policy

1. In the Admin Console, go to **Security -> Profile Enrollment**.
1. From the Profile Enrollment page, click on the **edit** pencil icon next to the
   default policy.
1. From the Default Policy page, click on the **actions (⋮)** menu item for the rule
   under Enrollment Settings.
1. In the Edit Rule page, select Allowed in the **For new users** section for
   sign up.
1. Click Save.

> **Note:** For more information on profile enrollment policies go to
[Create a Profile Enrollment policy for self-registration](https://help.okta.com/en/oie/Content/Topics/identity-engine/policies/create-profile-enrollment-policy-sr.htm).

#### Step 2:  Confirm org application is assigned to everyone

1. In the [Admin console](/docs/guides/quickstart/using-console/)
   (for the [Okta org](/docs/concepts/okta-organizations/)
   you set up in the previous step), select  **Applications > Applications**
   from the left navigation menu.
1. From the Applications page, select the **Assignments** tab:
1. Click on the **Groups** filter.
1. Confirm that the **Everyone** group appears in the Assignment list.

#### Step 3:  Remove security question authenticator from password policy

1. In the [Admin console](/docs/guides/quickstart/using-console/)
   (for the [Okta org](/docs/concepts/okta-organizations/) you set up in
   the previous step), select **Security > Authenticators** from the left
   navigation menu.
1. From the **Authenticators** page, select the **Actions** link from
   **Password** authenticator row.
1. Click the **Edit** submenu.
1. From the **Password** page, click **Edit**.
1. Scroll down to the **Self Service Password Recovery** section, and uncheck
   the **Security question** checkbox.
1. Click **Update Policy**.

### Integration steps

#### Step 1: Create the create account page

Create a page that accepts the user’s basic profile information. An example is
shown below:

<div class="sequence-diagram-format">

![Create your account page](/img/oie-embedded-sdk/ssr-create-your-account-page.png
 "Shows the user a create your account mockup page")

</div>

#### Step 2: Create a sign up link for new users

On the sign in page, create a sign up link that links to the create account
page.  Note the sign up link in the example below under the Continue button.

<div class="sequence-diagram-format">

![Sign up link](/img/oie-embedded-sdk/ssr-sign-up-link-page.png
 "Shows the user the sign up link on the login page")

</div>

#### Step 3: Call RegisterAsync to register the new user

When the user clicks on the register button, create a `UserProfile` object and
set its properties with the user profile information captured in the Create
account page. Pass this object into the `IdxClient’s` `RegisterAsync` method.

<StackSelector snippet="call-registerasync" noSelector />

</div>
