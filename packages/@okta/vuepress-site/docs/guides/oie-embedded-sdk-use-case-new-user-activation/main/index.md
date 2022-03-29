---
title: Embedded SDK New user activation
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector />

Learn how to integrate user activations with the Embedded SDK

**Learning outcomes**

* Integrate user activations using Okta email
* Integrate user activations using your own infrastructure

**What you need**

<StackSnippet snippet="whatyouneed" />
</br>

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Overview

User activation is the final step in self-service registration where a user proves ownership of the email they've used during registration. After the email is verified, their account status changes to active and they are now permitted to sign in to your app. How you integrate user activation depends on how you've implemented self-service registration. With the Embedded SDK, Okta supports two main self-service registration architectures: registration with the Embedded SDK or with the Okta API and Embedded SDK. Each architectures supports a unique way to integrate a user activation.

### Architecture 1: Create and activate the user with the Embedded SDK

In this architecture, your solution uses the Embedded SDK to create and activate users during self-service registration. The user uses <StackSnippet snippet="oktaemailguide" inline /> to verify their email address which enables them to be activated. The type of Okta email [template](/docs/guides/custom-email/main/) used depends on how you've configured your Okta org.

<div class="common-image-format">

![High level diagram showing components involved in full Embedded SDK solution](/img/emailusecases/email-use-cases-user-activation-embedded-sdk-okta-email-overview.png)

</div>

See [Integrate user activations using Okta email](#integrate-user-activations-using-okta-email) to get started integrating this activation solution into your app.

### Architecture 2: Create and activate the user with the Okta API and Embedded SDK

Unlike the previous design where your solution uses the Embedded SDK to create users, in this architecture your system makes direct calls to the Okta API to create users and initiate activations. You use your own email infrastructure to send activation emails and use the Embedded SDK to complete the registration steps and activate the user.

<div class="common-image-format">

![High level diagram showing components involved in Okta API and Embedded SDK solution](/img/emailusecases/email-use-cases-user-activation-okta-api-embedded-sdk-overview.png)

</div>

See [Integrate user activations using your own infrastructure](#integrate-user-activations-using-your-own-infrastructure) to get started integrating this activation solution into your app.

## Integrate user activations using Okta email

When your app uses the <StackSnippet snippet="ssrguide" inline /> to create a user, Okta sends an email to the registered email address to prove the user's ownership of the address. This proof of ownership permits the user's account to be activated and allows it to sign in to your app.

### Org settings that control the email template

Okta emails are based off templates, and the type of template used to enable activations depends on how you've configured your org. Your app can integrate with two different email templates during the user activation process.  The following matrix lists the org setting values needed to enable each email template.

| Email template  | [Email verification required before access](#email-verification-required-before-access)  | [Enrollment policy for email authenticator](#enrollment-policy-for-email-authenticator) | [Self-service recovery with email](#self-service-recovery-with-email)| Supported methods |
| ----------------------------| ------------------|------------------------|-------------|-------------------------|
| [Email Factor Verification](#update-email-factor-verification-template)   | Yes   | Optional or Disabled | Yes | OTP
| [Registration - Activation](#find-the-registration-activation-template)  | Yes   | Optional or Disabled | No | Link

See [Setting location in the Admin Console](#setting-location-in-the-admin-console) to locate each setting in the Admin console. The following step-by-step instructions detail how to integrate each template in your app.

* [Integrate the Email Factor Verification template](#integrate-the-email-factor-verification-template)
* [Integrate The Registration - Activation template](#integrate-the-registration-activation-template)

### Setting location in the Admin Console

Learn how to find each setting in the Admin Console.

#### Email verification required before access

1. Select **Security > Profile Enrollment**, in the Admin Console.
1. Edit the **Default Policy** by clicking the pencil icon in the **Profile Enrollment** page.
1. In the **Default Policy** screen under **Enrollment Settings**, select **Edit** under the **Actions** menu.
1. In the **Edit Rule** popup, find the **Email Verfication** field.
1. Click the **Required before access is granted** option to enable and disable the field.
1. Set the desired value.
1. Click **Save** to save your changes.

#### Enrollment policy for email authenticator

1. Select **Security > Authenticators**.
1. Click on the **Enrollment** tab in the **Authenticators** page.
1. Under the **Enrollment** tab, scroll down to the **Default Policy** and click **Edit**.
1. Toggle the values for **Email** under **Eligible Authenticators**. Possible values are **Optional**, **Required**, **Disabled**.
1. Set the desired value.
1. Click **Update Policy** to save your changes.

#### Self-service recovery with email

1. Select **Security > Authenticators**.
1. In the **Authenticators** page, find **Password** and select **Edit** under the **Actions** menu.
1. In the **Edit Rule** popup, find the **Users can initiate recovery with** field under **Recovery authenticators**.
1. Click the field's **Email** option to toggle it's value.
1. Click **Update Rule** to save changes.

### Integrate the Email Factor Verification template

In this configuration the user submits the email authenticator for enrollment while registering a new account in your app. Okta sends an email baseed on the **Email Factor Verification** template to the entered email address. After the user verifies the email with the OTP, they complete all required registration steps in your app and are activated.  See the <StackSnippet snippet="emailenrollmentotp" inline /> section in the Okta email guide for more details on this flow.

#### Update configurations

To enable the **Email Factor Verification** template for user activations, set your org's settings to the following values:

* **[Email verification required before access](#email-verification-required-before-access):** Yes
* **[Enrollment policy for email authenticator](#enrollment-policy-for-email-authenticator):** Optional or Disabled
* **[Self-service recovery with email](#self-service-recovery-with-email):** Yes, email selected

##### Update Email Factor Verification template

Since the **Email Factor Verification** currently supports OTP only, remove the magic link from the email template to keep the user experience in your app. To find the template in the Admin Console, perform the following steps:

1. Select **Customizations > Emails**.
1. In the **Emails** page, click **Email Factor Verification** under **Other**.
1. In the **Email Verification** page click **Edit** to view and modify the template.

To learn more about this template and how to remove the magic link, see the <StackSnippet snippet="enableonlyotp" inline />  section in the Okta email authenticator guide.

#### Integration steps

Integrate the **Email Factor Verification** template into your app with the following steps:

#### 1. Start self-service registration and submit the email authenticator

First, the user starts a new account registration using your app. During the process, they submit the email authenticator for enrollment and your app displays an OTP page. See the following to learn more about this flow:

**Learn more:**

* To learn more about integrating self-service registration, see the <StackSnippet snippet="ssrguide" inline /> guide.
* To learn about integrating the email enrollment, see <StackSnippet snippet="emailenrollmentotp" inline /> under the Okta email guide.

#### 2. Send email

After the user submits the email authenticator for enrollment, Okta sends an email to the user based on the **Email Factor Verification Template**. See the following screenshot for an example of the email.

<div class="common-image-format">

![Email using the email factor verification template](/img/emailusecases/email-use-cases-user-activation-email-factor-verification-template.png)

</div>

#### 3. Open email and submit OTP in your app

Next, the user copies the OTP from their email and submits it in your app. Depending on how your org's configuration, they may be required to complete additional steps (including enrolling in any additional authenticators) before completing the registration. This flow is described in detail in <StackSnippet snippet="emailenrollmentotp" inline /> under the Okta email guide.

#### 4. Complete registration and activation completion

<StackSnippet snippet="integrateemailverifylaststep" />

### Integrate the Registration - Activation template

In this configuration the user initiates a new account registration and completes all registration steps including enrolling in optional and required authenticators. Due to how the org is configured the email authenticator is excluded from this authenticator list. After the user completes these steps, an email is sent to the user based on the **Registration - Activation** template. The user opens their email and clicks on the **Activate account** link to complete the activation.

#### Update configurations

To enable the **Registration - Activation** template for user activations, set your org's settings to the following values:

* **[Email verification required before access](#email-verification-required-before-access):** Yes
* **[Enrollment policy for email authenticator](#enrollment-policy-for-email-authenticator):** Optional or Disabled
* **[Self-service recovery with email](#self-service-recovery-with-email):** No, email not selected

##### Find the Registration - Activation template

If for any reason you want to view or modify the **Registration - Activation** template, go into the Admin Console and perform the following steps.

1. Select **Customizations > Emails**.
1. In the **Emails** page, click **Registration - Activation** under **Activation**.
1. In the **Email Verification** page, click **Edit** to view and modify the template.

##### Initiate login URI

When the user clicks the email's **Activate Account** link, Okta activates their account and the request is redirected to the URL defined in **Initiate login URI**. To update this value, perform the following steps in the Admin Console.

1. Select **Applications > Applications**.
1. Select your application in the **Applications** page.
1. In your application page, click **Edit** in  **General Settings**.
1. Under **Login**, update **Initiate login URI** to a URL used by your app. The sample application uses <StackSnippet snippet="initiateloginuri" inline />
1. Click **Save** to save the changes.

#### 1. Complete registration in your app

First, the user registers a new account using your app. This registration includes setting the username, optional password, and enrolling in any required authenticators. In this configuration, the email authenticator won't be in the list of authenticators eligible for enrollment.

**Learn more:**

* To learn more about integrating self-service registration, see the <StackSnippet snippet="ssrguide" inline /> guide.

#### 2. Notify user to complete registration using their email

<StackSnippet snippet="registrationactivationtemplatelaststep" />

#### 3. Send email

After the user completes the account registration, an email is sent to the user based on the **Registration - Activation** template. See the following screenshot for an example of the email.

<div class="common-image-format">

![Email using the activation registration template](/img/emailusecases/email-use-cases-user-activation-registration-activation-template.png)

</div>

#### 4. Click email and complete activation

When the user clicks on the email link, the request is first sent to Okta where the user is activated. After activation the request is redirect to your app's URL defined in **Initiate login URI**. The user is now able to sign into your app.

## Integrate user activations using your own infrastructure

In this architecture, you take more control over the account creation by calling Okta APIs directly to create the account and initiate the activation. It is your responsibility to prove ownership of the user's email. Once proven, send the user to your app to complete the activation with the Embedded SDK. This architecture is also referred to as the "proxy model" since your infrastructure servers as a relay between user requests and Okta.

### Integration steps

#### 1. Create the user

The first step is create a user using the [Create user](/docs/reference/api/users/#create-user) operation on the Users API. The following example creates a user without credentials.

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "firstName": "Isaac",
    "lastName": "Brock",
    "email": "john.doe@example.com",
    "login": "john.doe@example.com",
    "mobilePhone": "555-415-1337"
  }
}' "https://${yourOktaDomain}/api/v1/users?activate=false"
```

##### Response

```json
{
    "id": "00uomf0lstcwPYliG696",
    "status": "STAGED",
    "created": "2022-03-26T15:32:09.000Z",
    "profile": {
        "firstName": "John",
        "lastName": "Doe",
        "mobilePhone": null,
        "secondEmail": null,
        "login": "john.doe@example.com",
        "email": "john.doe@example.com"
    },
    ...
}
```

See the [Create user without credentials](/docs/reference/api/users/#create-user-without-credentials) API reference for more details on the API endpoints described in the examples.

#### 2. Start user activation and get activation token

After the user is created, the next step is obtain the activation token. Use the [Activate User](/docs/reference/api/users/#activate-user) operation in the User Lifecycle API to generate the activation token. The endpoint requires the user id, which is found in `id` property in the [Create user](/docs/reference/api/users/#create-user) response described in the previous step. In addition, set the `sendEmail` query parameter to `false` to include the activation token in the response. See the following examples for more details:

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/activate?sendEmail=false"
```

##### Response

```json
{
  "activationUrl": "https://${yourOktaDomain}/welcome/XE6wE17zmphl3KqAPFxO",
  "activationToken": "XE6wE17zmphl3KqAPFxO"
}
```

The activation token is returned in the `activationToken` property.

#### 3. Prove user ownership of the mail

Next, using your own infrastructure and email service, send the user an email with a link including the activation token as a query parameter. For example the link used by the sample app, <StackSnippet snippet="proxymodelsampleappactivationtokenlink" inline /> .

#### 4. Click on link and redeem activation token

<StackSnippet snippet="proxymodelredeemactivationtokenstep" />

#### 5. Complete activation

<StackSnippet snippet="proxymodelcompletestep" />

## See also

* The <StackSnippet snippet="oktaemailfullguide" inline /> guide
* The <StackSnippet snippet="oktaemailguide" inline /> guide

</div>
