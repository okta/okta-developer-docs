---
title: Embedded SDK New user activation
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

<StackSelector />

Learn how to integrate user activations with the Embedded SDK

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

User activation is the final step in the self-service registration process where a user verifies their identity typically with an email. How you integrate the user activation in your app depends on how you've implemented self-service registration. With the Embedded SDK, Okta supports two main self-service registration approaches. Each approach guides how you integrate user activations.

### Approach 1: Create and activate the user with the Embedded SDK

In this approach, your app uses the Embedded SDK to create and activate users. See the <StackSnippet snippet="ssrguide" inline /> guide for more details. With this approach, your app uses [Okta email](docs/guides/oie-embedded-sdk-use-case-new-user-activation/nodeexpress/main/#integrate-using-okta-email) to activate the user. Your Okta org configuration dictates which Okta email template your app needs to support. The possible templates are:

* [The Email Factor Verification template](docs/guides/oie-embedded-sdk-use-case-new-user-activation/nodeexpress/main/#integrate-the-email-factor-verification-template)
* [The Registration - Activation template](docs/guides/oie-embedded-sdk-use-case-new-user-activation/nodeexpress/main/#integrate-the-registration-activation-template)


### Approach 2: Create and activate the user with the Okta API and Embedded SDK

TODO ...




## Integrate using Okta email



### Summary

| Email template  | Email verification required before access  | Enrollment policy for email authenticator | Self-service recovery with email| Supported methods |
| ----------------------------| ------------------|------------------------|-------------|-------------------------|
| Email Factor Verification   | Yes   | Optional or Disabled | Yes | OTP
| Registration - Activation   | Yes   | Optional or Disabled | No | Link

### Setting location in Admin Console

Talk about the email authenticator needing to be setup with authentication and recovery ...

#### Email verification required before access

1. Select **Security > Profile Enrollment**, in the Admin Console
1. Edit the **Default Policy** by clicking the pencil icon in the **Profile Enrollment** page
1. In the **Default Policy** screen under **Enrollment Settings**, select **Edit** under the **Actions** menu.
1. In the **Edit Rule** popup, find the **Email Verfication** field.
1. Click the **Required before access is granted** option to enable and disable the field.
1. Set the desired value.
1. Click **Save** to save your changes.

#### Enrollment policy for email authenticator

1. Select **Security > Authenticators**
1. Click on the **Enrollment** tab in the **Authenticators** page
1. Under the **Enrollment** tab, scroll down to the **Default Policy** and click **Edit**
1. Toggle the values for **Email** under **Eligible Authenticators**. Possible values are **Optional**, **Required**, **Disabled**
1. Set the desired value.
1. Click **Update Policy** to save your changes

#### Self-service recovery with email

1. Select **Security > Authenticators**.
1. In the **Authenticators** page, find **Password** and select **Edit** under the **Actions** menu.
1. In the **Edit Rule** popup, find the **Users can initiate recovery with** field under **Recovery authenticators**
1. Click the field's **Email** option to toggle it's value.
1. Click **Update Rule** to save changes.

#### Initiate login URI

1. Select **Applications > Applications**
1. Select your application in the **Applications** page
1. In your application page, click **Edit** in the **General Settings** section
1. Under **Login**, find **Initiate login URI** and set its value. The sample application uses <StackSnippet snippet="initiateloginuri" inline />
1. Click **Save** to save the changes.

#### Email Factor Verification template

#### Registration - Activation template

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

Next the user opens the email and copies the OTP to your app. After the OTP is verified the user continues the steps to complete the user registraiton. Depending on your org configuration, these steps could included additional required authenticators. The OTP flow for Okta email is desribed in detail in the <StackSnippet snippet="emailenrollmentotp" inline />.

#### 5. Completes registration and activation completion

After all the registration steps are coompleted `IdxTransaction` returns a status of `SUCCESS` along with access and ID tokens. Your app redirects the user to the default home page for newly registered user.

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

`https://${yourOktaDomain}/api/v1/users?activate=false`

 creates user and returns userid

See the [Create user without credentials](/docs/reference/api/users/#create-user-without-credentials) API reference for more details on the endpoint.

#### Request

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

#### Response

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

### Start user activation and get activation token

#### Request

`api/v1/users/{{userid}}/lifecycle/activate?sendEmail=false` get activationtoken

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/lifecycle/activate?sendEmail=false"
```

#### Response

```json
{
  "activationUrl": "https://${yourOktaDomain}/welcome/XE6wE17zmphl3KqAPFxO",
  "activationToken": "XE6wE17zmphl3KqAPFxO"
}
```

For more details see [Activate User](/docs/reference/api/users/#activate-user).


### Prove user ownership of the mail

Send user email

### Redeem activation token

Node JS specific ...

`http://${yourAppsURL}/register?activationToken=7nlzWIv1aCKStPXlknwd`

<StackSnippet snippet="sampleappregisterurl" />



```javascript
router.get('/register', async (req, res, next) => {
  const activationToken = query['activationToken'] || query['token'];
  const transaction = await authClient.idx.register({ activationToken });
  ...
}
```




### Complete activation




</div>
