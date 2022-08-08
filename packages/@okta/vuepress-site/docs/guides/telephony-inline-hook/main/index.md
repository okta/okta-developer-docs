---
title: Telephony inline hook with Twilio
excerpt: Learn how to easily implement a telephony inline hook
layout: Guides
---

<ApiLifecycle access="ie" /><br>

This guide provides a working example of an Okta telephony inline hook. It uses the web site [Glitch](https://glitch.com/) to act as an external service and uses Twilio as the telephony provider that receives and responds to SMS and voice inline hook calls.

---

**Learning outcomes**

* Understand the Okta telephony inline hook calls and responses.
* Implement a simple working example of a telephony inline hook using a Glitch.com project.
* Preview and test the telephony inline hook.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* [Glitch](https://glitch.com/) project or account
* [Twilio account](https://www.twilio.com/try-twilio) paid or free trial account

**Sample code**

[Okta Telephony Inline Hook Example](https://glitch.com/~okta-inlinehook-telephonyhook)

---

## Before you begin

* Read the information and perform any required steps in the [Common Hook set-up steps](https://developer.okta.com/docs/guides/common-hook-set-up-steps/nodejs/main/) page first. This includes remixing (copying) the Glitch.com project for this guide and understanding how Glitch projects are configured and used with hooks.

> **Note:** You can also use Amazon Web Services Lambda Serverless Framework as an external service. See [Setting Up Serverless Framework With AWS](https://www.serverless.com/framework/docs/getting-started).

* Make sure that you have an active phone number in Twilio with SMS and MMS capabilities.

* Create a [TwiML bin](https://www.twilio.com/docs/runtime/tutorials/twiml-bins#create-a-new-twiml-bin) in your Twilio account for use with Voice (Call) messages. You need the handler URL that is automatically generated to use as a variable. Additionally, place an `otp` tag key in double brackets in the prepopulated XML. This tag key directly references the dynamic `otp` used in this exercise. For example:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Response><Say>Your code is {{otp}}</Say></Response>
    ```

* Make sure that you have a user in your org that already has the [Phone authentication enrolled](https://help.okta.com/okta_help.htm?type=oie&id=ext-mfa-usage) with Okta.

## About telephony inline hook implementation

You can customize a telephony service provider for your org by using an Okta telephony inline hook. A telephony inline hook allows you to integrate your own custom code into several of Okta's flows that send SMS or Voice (Call) messages (except Okta Verify enrollment). You can integrate this hook with enrollment, authentication, and recovery flows that involve the Phone authenticator. While the One-Time Passcode (OTP) is sent to the requester, Okta calls your external service to deliver the OTP, and the external service responds with commands that indicate success or failure in delivering the OTP.

> **Note:** An org can have only one active telephony inline hook.

In the following example, the external service code parses requests from Okta and responds to Okta with commands that indicate whether the SMS or Voice (Call) message was sent successfully.

At a high-level, the following workflow occurs:

* A user attempts to sign in to Okta. The Okta org has an authentication requirement of a Phone authenticator. The user selects **Receive a code via SMS** or **Receive a voice call instead**.
* Okta generates a One-Time Passcode (OTP) and looks up whether any telephony hooks are configured and active for the org.
* A telephony inline hook is triggered and sends a request to the provider to have them deliver the OTP.
* The external service evaluates the request, and if the request headers are valid, the Telephony provider(s) request is made.

    > **Note:** Although you can have only one active telephony inline hook in your org at a time, logic in the external web service can direct requests to different providers based on conditions that you specify. For example, you can send the request to different telephony providers based on the country where the request originates.

* The provider-specific response code and transaction ID are mapped to generic response categories, for provider-independent processing.

## Configure your org to use the Phone authenticator

Verify that your org has the Phone authenticator added and enabled for **Authentication, Recovery**.

1. In the Admin Console, go to **Security** > **Authenticators**.
1. On the **Setup** tab, verify that the Phone authenticator is listed and that **Authentication, Recovery** is enabled in the **Used for** column.
1. Select **Edit** from the **Actions** menu and verify that both **Voice call** and **SMS** are selected as how the verification messages are sent.
1. Verify that **Authentication and recovery** is selected as how the Phone authenticator is used.
1. Click **Save** if made any changes.

> **Note:** If the Phone authentication isn't already added, click **Add Authenticator** and then click **Add** on the Phone tile and make sure that you select the options mentioned above and click **Add**.

## Update an authentication policy

In this section, you update a [preset authentication policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-preset-auth-policies) with another rule. Before we make changes to the authentication policy, we first create a test group and add a test user for this use case example.

### Create a group and add a user

1. In the Admin Console, go to **Directory** > **Groups**.
1. Click **Add Group** , name it **Support**, and then click **Save**.
1. Select the group that you just created and on the **People** tab, click **Assign People**.
1. Add a user to the group for testing. Make sure that the user has a working phone number included in their profile.
1. Click **Save**.

### Add a rule to the policy

Update the **Okta Dashboard** [preset authentication policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-preset-auth-policies) to include an additional factor by adding a rule for the Support group that you just created.

1. In the Admin Console, go to **Security** > **Authentication Policies**, and then select the **Okta Dashboard** preset policy.
1. Click **Add Rule** and name the rule.
1. In the **AND User's group membership includes** dropdown list, select **At least one of the following groups**.
1. In the box that appears, start typing the group that you just created and select it when it appears.
1. In the **AND Possession factor constraints are** section, clear the **Device Bound (excludes phone and email)** checkbox.
1. Verify that **Phone** is listed as an additional factor type in the **AND Access with Okta FastPass is granted** section.
1. Click **Save**. Users signing in to Okta are then required to use both their password and the Phone authenticator to authenticate.

## Activate the telephony inline hook in Okta

You must activate the telephony inline hook in your Okta org. Activating the telephony inline hook registers the hook with the Okta org and associates it with your external service.

1. Navigate to the **Workflow** > **Inline Hooks** page.
1. Click **Add Inline Hook** and select **Telephony** from the dropdown list.
1. Add a name for the hook (in this example, **Twilio Telephony Hook**).
1. Add the external service URL, including the endpoint. For example, use your Glitch project name with the endpoint: `https://your-glitch-projectname.glitch.me/telephonyHook`.
1. Include values for the following fields. For this use case example:<br>
    **Authentication field**: `authorization`<br>
    **Authentication secret**: `Basic YWRtaW46c3VwZXJzZWNyZXQ=`<br>
1. Click **Save**. The telephony inline hook is now set up with an active status.

> **Note:** You can also set up an inline hook using the API. See [Inline Hooks Management API](/docs/reference/api/inline-hooks/#create-inline-hook).

## Add Twilio credentials to the external service

Copy the account SID and auth token from your Twilio account and add them as variables in the `.env` file in the Glitch project.

> **Note:** Ensure that you have the required default code and packages in your project. See [Common Hook set-up steps](https://developer.okta.com/docs/guides/common-hook-set-up-steps/nodejs/main/).

1. From the left navigation in the Glitch project, click **.env**.
1. In the first blank variable line that appears, add **ACCOUNT_SID** and then paste your account SID as the value on the right.
1. In the second blank variable line, add **AUTH_TOKEN** and then paste your account authentication token as the value on the right.
1. Click **Add a Variable** and then add **FROM_PHONE_NUMBER** as the variable and then the Twilio phone number from your account as the value.
1. Click **Add a Variable** and then add **TWIML_URL** as the variable and then the [TwiML URL](https://www.twilio.com/docs/runtime/tutorials/twiml-bins#create-a-new-twiml-bin) from your Twilio account.

> **Note:** See the code comments in the Glitch `server.js` file where these variable values appear.

## Parse the telephony inline hook request

The external service in this scenario requires code to handle the telephony inline hook request from Okta. Use the [Okta Telephony Inline Hook](https://glitch.com/~okta-inlinehook-telephonyhook) Glitch example to either build or copy the code (re-mix on Glitch) that parses the telephony inline hook call.

From the telephony inline hook request, the following code retrieves the value of the user’s phone number from the `data.messageProfile` object. The code parses the Okta request body for the value of `phoneNumber` and stores it in the variable `userPhoneNumber`.

<StackSelector snippet="userphonenumber" noSelector/>

The following code retrieves the value of the OTP code sent by Okta from the `data.messageProfile` object. The code parses the Okta request body for the value of `otpCode` and stores it in the variable `userOtpCode`.

<StackSelector snippet="userotpcode" noSelector/>

## Response sent to the user

The following code is used to send the SMS or Voice (Call) to the user:

<StackSelector snippet="sendsmsmakecall" noSelector/>

## Send response to Okta

The way to tell Okta that the SMS or Voice (Call) message was successfully sent is by returning a `commands` object in the body of your HTTPS response. The `commands` object is an array that allows you to send multiple commands. The two required properties are `type` and `value`. The`value` property is where you specify the status of your telephony transaction and other relevant transaction metadata. The action type is `com.okta.telephony.action`.

<StackSelector snippet="responsetookta" noSelector/>

## Preview and test

The external service example is now ready with code to receive and respond to an Okta call. The Okta org is now set up to call the external service using a telephony inline hook. In your Okta org, you can preview the request and response JSON right from the Admin Console. You can also test the code directly in your org.

### Preview

To preview the telephony inline hook:

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
1. Select the telephony inline hook name that you just set up (in this example, **Twilio Telephony Hook**).
1. Select the **Preview** tab.
1. Define a value for `data.userProfile` by selecting a user in your org from the **data.userProfile** dropdown list.
1. Define a value for `requestType` by selecting the flow that you want to test. In this example, select **MFA Verification**.

    > **Note:** If your user doesn't have a phone number in their profile, change the phone number to one that you want to test in the **Preview example inline hook request** section. Click **Edit** and then add a value for the `phoneNumber` in the `messageProfile` section of the request (for example, `"+15555551212"`).

1. From the **Preview example inline hook request** section, click **Generate Request**. You should see the user's request information in JSON format that is sent to the external service.
1. From the **View Service's Response** section, click **View Response**. You should see the response from your external service in JSON format. If it’s a successful response, an SMS code or Voice (Call) message with the code is sent to the user that you specified. If there is an error, the error message appears in the response.

### Test

To run a test of your telephony inline hook, go to your Okta org’s sign-in page and sign in as a user in your org.
When you click **Sign in**, you are prompted for an additional factor to either receive a code through SMS or receive a voice call instead. Click whichever option that you want to test. The SMS or Voice Call is sent to your phone.

## Next steps

Review the following guides to implement other inline or event hook examples:

* [Event hook](/docs/guides/event-hook-implementation/)
* [Password import inline hook](/docs/guides/password-import-inline-hook/nodejs/main/)
* [Token inline hook](/docs/guides/token-inline-hook/nodejs/main/)

## See also

For a complete description of this inline hook type, see [telephony inline hook](/docs/reference/telephony-hook/).
