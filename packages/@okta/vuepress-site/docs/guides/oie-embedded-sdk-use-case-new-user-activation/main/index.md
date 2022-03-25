---
title: Embedded SDK New user activation
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector />

Learn how to integrate user activations using email with the Embedded SDK

**Learning outcomes**

<StackSnippet snippet="learningoutcomes" />
</br>

**What you need**

<StackSnippet snippet="whatyouneed" />
</br>

**Sample code**

<StackSnippet snippet="samplecode" />

---

## Overview

User activations using the self service registration and embedded SDK


## Activations using Okta email

### Summary

| Email template  | Email verification required before access  | Enrollment policy for email authenticator | Self-service recovery with email| Supported methods |
| ----------------------------| ------------------|------------------------|-------------|-------------------------|
| Email Factor Verification   | Yes   | Optional or Disabled | Yes | OTP
| Registration - Activation   | Yes   | Optional or Disabled | No | Link

#### Where to find settings in the Admin Console

Talk about the email authenticator needing to be setup with authentication and recovery ...

### Email verification required before access

1. Select **Security > Profile Enrollment**, in the Admin Console
1. Edit the **Default Policy** by clicking the pencil icon in the **Profile Enrollment** page
1. In the **Default Policy** screen under **Enrollment Settings**, select **Edit** under the **Actions** menu.
1. In the **Edit Rule** popup, find the **Email Verfication** field.
1. Click the **Required before access is granted** option to enable and disable the field.
1. Set the desired value.
1. Click **Save** to save your changes.

### Enrollment policy for email authenticator

1. Select **Security > Authenticators**
1. Click on the **Enrollment** tab in the **Authenticators** page
1. Under the **Enrollment** tab, scroll down to the **Default Policy** and click **Edit**
1. Toggle the values for **Email** under **Eligible Authenticators**. Possible values are **Optional**, **Required**, **Disabled**
1. Set the desired value.
1. Click **Update Policy** to save your changes

### Self-service recovery with email

1. Select **Security > Authenticators**.
1. In the **Authenticators** page, find **Password** and select **Edit** under the **Actions** menu.
1. In the **Edit Rule** popup, find the **Users can initiate recovery with** field under **Recovery authenticators**
1. Click the field's **Email** option to toggle it's value.
1. Click **Update Rule** to save changes.

### Initiate URL

1. Select **Applications > Applications**
1. Select your application in the **Applications** page
1. In your application page, click **Edit** in the **General Settings** section
1. Under **Login**, find **Initiate login URI** and set its value. The sample application uses <StackSnippet snippet="initiateloginuri" inline />
1. Click **Save** to save the changes.

### Email Factor Verification template



### Registration - Activation template


## Integrate user activations using Okta email

### Integrate the Email Factor Verification template

#### Update Configurations

* **Email verification required before access:** Yes
* **Enrollment policy for email authenticator:** Optional or Disabled
* **Self-service recovery with email:** Yes, email selected.

#### 1. Start register new account and submit email authenticator

First the user starts a new account registration using your app. During the process, they are prompted to enroll in the email authenticator. When they submit the email authenticator, your app displays the a screen to enter the OTP from the email.

In-depth integration guides:

* See the <StackSnippet snippet="emailenrollmentotp" inline /> , to learn about integrating the email enrollment.
* See the <StackSnippet snippet="ssrguide" inline /> guide, to learn more about integrating self-service registration.

#### 3. Email gets sent

After the user submits the email authenticator for enrollment, Okta sends an email to the user. The email is based off of the **Email Factor Verification Template**

<div class="common-image-format">

![Email using the email factor verification template](/img/emailusecases/email-use-cases-user-activation-email-factor-verification-template.png)

</div>

#### 4. Opens email and copies OTP to your app

Next the user opens the email and copies the OTP to your app. After the OTP is verified the user continues the steps to complete the user registraiton. Depending on your org configuration, these steps could included additional required authenticators.

#### 5. Completes registration and activation completion

TODO ****

### Integrate the Registration - Activation template

#### Update Configurations

* **Email verification required before access:** Yes
* **Enrollment policy for email authenticator:** Optional or Disabled
* **Self-service recovery with email:** No.

#### 1. Register new account

First the user registers a new account using your app. This registration includes setting the username, optional password, and enrolling in required authenticators.  To learn more about integrating self-service registration using the Embedded SDK, see the <StackSnippet snippet="ssrguide" inline /> guide.

<StackSnippet snippet="registrationactivationtemplatelaststep" />

#### 3. Email gets sent

After the user registration is completed in your app, Okta sends an email to the user. The email is based off of the **Registration - Activation template**

<div class="common-image-format">

![Email using the activation registration template](/img/emailusecases/email-use-cases-user-activation-registration-activation-template.png)

</div>

#### 4. Clicks on email link and completes activation

The user clicks on the email link. The request is first sent to Okta where the user is activated.  Once activiated the request is redirected to your app's URL defined in [Initiate login URI].  for [Initiate login URI]. Once redirected to your app, the user can now successfully sign into your app.

## Integrate user activations using your own infrastructure

### Create the user

`/api/v1/users?activate=false'` - creates user and returns userid

### Start user activation and get activation token

`api/v1/users/{{userid}}/lifecycle/activate?sendEmail=false` get activationtoken

### Prove user ownership of the mail

Send user email

### Redeem activation token

Node JS specific ...

### Complete activation

</div>
