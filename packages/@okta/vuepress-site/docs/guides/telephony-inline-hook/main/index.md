---
title: Telephony inline hook with Twilio
excerpt: Learn how to easily implement a telephony inline hook
layout: Guides
---

This guide provides an example of an Okta telephony inline hook. This guide uses [Glitch](https://glitch.com/) as an external service and Twilio as a telephony provider that receives and responds to SMS and voice inline hook calls. While this guide uses Twilio, the process explained in this guide should be similar for any other telephony provider.

---

#### Learning outcomes

* Understand the Okta telephony inline hook calls and responses.
* Implement a simple example of a telephony inline hook using a Glitch.com project.
* Preview and test the telephony inline hook.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* [Glitch](https://glitch.com/) project or account
* [Twilio account](https://www.twilio.com/try-twilio) paid or free trial account

#### Sample code

[Okta Telephony Inline Hook Example](https://glitch.com/~okta-inlinehook-telephonyhook)

---

## Before you begin

* Review the information and required steps in the [Common Hook set-up steps](https://developer.okta.com/docs/guides/common-hook-set-up-steps/nodejs/main/) page first. This includes remixing (copying) the Glitch.com project used in this guide and understanding how Glitch projects are configured and used with hooks.

> **Note:** You can also use Amazon Web Services Lambda Serverless Framework as an external service. See [Setting Up Serverless Framework With AWS](https://www.serverless.com/framework/docs/getting-started).

* Ensure that you have a user in your org with a Phone authenticator enrolled. See [MFA Usage report](https://help.okta.com/okta_help.htm?type=oie&id=ext-mfa-usage).

* Make sure you have an active phone number in Twilio with SMS and MMS capabilities.

* Create a [TwiML bin](https://www.twilio.com/docs/runtime/tutorials/twiml-bins#create-a-new-twiml-bin) in your Twilio account for use with voice call messages. Use the automatically generated handler URL as a variable. Also, include an `otp` tag key within double brackets in the prepopulated XML. This tag key references the dynamic `otp` used later in this exercise. For example:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Response><Say>Your code is {{otp}}</Say></Response>
    ```

## About telephony inline hook implementation

The Okta telephony inline hook enables you to integrate your own custom code into Okta flows that send SMS or voice call messages (except Okta Verify enrollment). You can integrate this hook with enrollment, authentication, and recovery flows that involve phone authenticators. Okta uses your external provider to deliver the one-time passcode (OTP) to the requester. The provider can respond with commands that indicate if the delivery was successful.

> **Note:** An org can have only one active telephony inline hook.

At a high-level, the following workflow occurs:

* A user attempts to sign in to Okta. The Okta org has an authentication requirement of a Phone authenticator. The user selects **Receive a code via SMS** or **Receive a voice call instead**.
* Okta generates a one-time passcode (OTP) and verifies if a telephony hook is configured and active for the org.
* A telephony inline hook is triggered and sends a request to a provider to deliver the OTP.
* The external service evaluates the request. If the request headers are valid, a request is sent to a telephony provider.
* Okta receives a response that indicates if the OTP was sent successfully.

### Multiple providers
Although each org can have only one active telephony inline hook, you aren't limited to a single telephony provider. Orgs sometimes build conditional logic into their web service to control how requests are sent to multiple telephony providers. This might be done to protect against provider failures, or to route messages depending on a user's country or region.

## Configure your org to use the Phone authenticator

Verify that your org has the Phone authenticator added and enabled for **Authentication, Recovery**.

1. In the Admin Console, go to **Security** > **Authenticators**.
1. On the **Setup** tab, verify that the Phone authenticator is listed and that **Authentication, Recovery** is enabled in the **Used for** column.
1. Select **Edit** from the **Actions** menu and verify that both **Voice call** and **SMS** are selected as how the verification messages are sent.
1. Verify that the **Authentication and recovery** option is selected.
1. Click **Save** if made any changes.

> **Note:** If a phone authenticator isn't already added, click **Add Authenticator**, and then **Add** on the Phone tile. Make sure that you select the options mentioned earlier, and then click **Add**.

## Update an authentication policy

In this section, you update a [preset authentication policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-preset-auth-policies) with another rule. Before you change the authentication policy, you should first create a test group and add a test user for this use case example.

### Create a group and add a user

1. In the Admin Console, go to **Directory** > **Groups**.
1. Click **Add Group**, name it **Support**, and then click **Save**.
1. Select the group that you created and on the **People** tab, click **Assign People**.
1. Add a user to the group for testing. Make sure that the user has a useable phone number included in their profile.
1. Click **Save**.

### Add a rule to the policy

Update the **Okta Dashboard** [preset authentication policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-preset-auth-policies) to include an additional factor by adding a rule for the Support group that you created.

1. In the Admin Console, go to **Security** > **Authentication Policies**, and then select the **Okta Dashboard** preset policy.
1. Click **Add Rule** and name the rule.
1. In the **AND User's group membership includes** dropdown list, select **At least one of the following groups**.
1. In the box that appears, start typing the group that you created and select it when it appears.
1. In the **AND Possession factor constraints are** section, clear the **Device Bound (excludes phone and email)** checkbox.
1. Verify that **Phone** is listed as an additional factor type in the **AND Access with Okta FastPass is granted** section.
1. Click **Save**. Users signing in to Okta are then required to use both their password and the Phone authenticator to authenticate.

## Activate the telephony inline hook in Okta

Activate the telephony inline hook in your Okta org. Activating the telephony inline hook registers the hook with the Okta org and associates it with your external service.

Alternatively, you can use the Inline Hooks Management API to create an inline hook. See [Inline Hooks Management API](/docs/reference/api/inline-hooks/#create-inline-hook).

1. Go to the **Workflow** > **Inline Hooks** page.
1. Click **Add Inline Hook** and select **Telephony** from the dropdown list.
1. Add a name for the hook (in this example, **Twilio Telephony Hook**).
1. Add the external service URL, including the endpoint. For example, use your Glitch project name with the endpoint: `https://your-glitch-projectname.glitch.me/telephonyHook`.
1. <HookBasicAuthStep/> <HookOAuthNote/>
1. Click **Save**. The telephony inline hook is now set up with an active status.

## Add Twilio credentials to the external service

Copy the account SID and auth token from your Twilio account and add them as variables in the `.env` file in the Glitch project.

> **Note:** Make sure you have the required default code and packages in your project. See [Common Hook set-up steps](https://developer.okta.com/docs/guides/common-hook-set-up-steps/nodejs/main/).

1. From the left navigation in the Glitch project, click **.env**.
1. In the first blank variable line that appears, add **ACCOUNT_SID** and then paste your account SID as the value on the right.
1. In the second blank variable line, add **AUTH_TOKEN** and then paste your account authentication token as the value on the right.
1. Click **Add a Variable** and then add **FROM_PHONE_NUMBER** as the variable and then the Twilio phone number from your account as the value.
1. Click **Add a Variable** and then add **TWIML_URL** as the variable and then the [TwiML URL](https://www.twilio.com/docs/runtime/tutorials/twiml-bins#create-a-new-twiml-bin) from your Twilio account.

> **Note:** See the code comments in the Glitch `server.js` file where these variable values appear.

## Parse the telephony inline hook request

In this example, the external service requires code to handle the telephony inline hook request from Okta. Use the [Okta Telephony Inline Hook](https://glitch.com/~okta-inlinehook-telephonyhook) Glitch example to either build or copy the code (remix on Glitch) that parses the telephony inline hook call.

From the telephony inline hook request, the following code retrieves the value of the user's phone number from the `data.messageProfile` object. The code parses the Okta request body for the value of `phoneNumber` and stores it in the variable `userPhoneNumber`.

<StackSelector snippet="userphonenumber" noSelector/>

The following code retrieves the value of the OTP code sent by Okta from the `data.messageProfile` object. The code parses the Okta request body for the value of `otpCode` and stores it in the variable `userOtpCode`.

<StackSelector snippet="userotpcode" noSelector/>

## Response sent to the user

The following code is used to send the SMS or voice call to the user:

<StackSelector snippet="sendsmsmakecall" noSelector/>

## Send a response to Okta

To tell Okta that the SMS or voice call message was successfully sent, return a `commands` object in the body of your HTTPS response. This object is an array that allows you to send multiple commands. The two required properties are `type` and `value.status`. The `value.status` property is where you specify the status of your telephony transaction and other relevant transaction metadata. The action type is `com.okta.telephony.action`.

<StackSelector snippet="responsetookta" noSelector/>

### Example JSON response for successful OTP delivery

> **Note:** The other `value` properties aren't required, but are useful for tracking when the OTP isn't being delivered.

```json
{
  "commands":[
    {
      "type":"com.okta.telephony.action",
      "value":[
        {
          "status":"SUCCESSFUL",
          "provider":"VONAGE",
          "transactionId":"SM49a8ece2822d44e4adaccd7ed268f954",
          "transactionMetadata":"Duration=300ms"
        }
      ]
    }
  ]
}
```

### Failover to Okta telephony providers

Your response to Okta needs to have the correct format and the required properties. If it doesn't, Okta attempts to send the OTP using Okta telephony providers. This failover may happen even if your service successfully sends the SMS/voice to the user. Some providers have an asynchronous model where they might not know the status of a telephony transaction right away. The user then receives two SMS messages.

When Okta calls an external service, it enforces a default timeout of three seconds. See [Time out and retry](https://developer.okta.com/docs/concepts/inline-hooks/#time-out-and-retry).

> **Note:** The failover mechanism that uses the Okta telephony providers is heavily rate-limited.

There are other common causes of failure for telephony inline hooks. See the [Troubleshoot](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createTelephonyInlineHook) section in the Telephony Inline Hook API reference. This section contains a list of possible failures for telephony hook callouts, information on the impact of the failure, and error visibility.

## Preview and test

The external service example is now ready with code to receive and respond to an Okta call. The Okta org is set up to call the external service using a telephony inline hook. In your Okta org, preview the JSON-formatted request and response directly from the Admin Console.

<HookBasicAuthValuesNote/>

### Preview

To preview the telephony inline hook:

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
1. Select the telephony inline hook that you set up (in this example, **Twilio Telephony Hook**).
1. Select the **Preview** tab.
1. Define a value for `data.userProfile` by selecting a user in your org from the **data.userProfile** dropdown list.
1. Define a value for `requestType` by selecting a flow to test. In this example, select **MFA Verification**.

    > **Note**: If your user hasn't enrolled a phone authenticator, you can manually specify a phone number in the **Preview example inline hook request** section. Click **Edit** and add a value for the `phoneNumber` in the `messageProfile` section of the request (for example, `"+15555551212"`).

1. From the **Preview example inline hook request** section, click **Generate Request**. The request sent to the external service appears in JSON format.
1. From the **View Service's Response** section, click **View Response**. A response from the external service appears in JSON format. Upon a successful response, an SMS code or voice call message with the code is sent to the associated user. Upon an error, the error message is returned in the response.

    > **Note**: If your external service fails, an OTP is still delivered to the user through the default Okta telephony provider. If the failure happens when previewing the hook, Okta doesn't generate an OTP.

### Test

To run a test of your telephony inline hook, go to your Okta org's sign-in page and sign in as an existing org user.
When you click **Sign in**, you're prompted for an additional factor to either receive a code through SMS or receive a voice call instead. Click whichever option that you want to test. The SMS or Voice Call is sent to your phone.

## Next steps

Review the following guides to implement other inline or event hook examples:

* [Event hook](/docs/guides/event-hook-implementation/)
* [Password import inline hook](/docs/guides/password-import-inline-hook/nodejs/main/)
* [Token inline hook](/docs/guides/token-inline-hook/nodejs/main/)
* [SAML assertion inline hook](/docs/guides/saml-inline-hook/nodejs/main)
* [Registration inline hook](/docs/guides/registration-inline-hook/nodejs/main)

## See also

For a complete description of this inline hook type, see [telephony inline hook](/docs/reference/telephony-hook/).
