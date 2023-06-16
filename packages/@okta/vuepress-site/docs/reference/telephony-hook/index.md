---
title: Telephony inline hook reference
excerpt: Customizes Okta's flows that send SMS or voice messages
---
<ApiLifecycle access="ie" />

# Telephony inline hook reference

This page provides reference documentation for telephony inline hooks, one type of inline hook supported by Okta. It provides sample JSON objects that are contained in the outbound request from Okta to your external service, and sample JSON objects that you can include in your response.

## See also

- For a general introduction to Okta inline hooks, see [inline hooks](/docs/concepts/inline-hooks/).

- For information on the API for registering external service endpoints with Okta, see [Inline Hooks Management API](/docs/reference/api/inline-hooks/) or [Add an inline hook](https://help.okta.com/okta_help.htm?type=oie&id=ext-add-inline-hook).

- For a use case example of how to implement a telephony inline hook, see [Telephony inline hook with Twilio](/docs/guides/telephony-inline-hook/).

## About

The Okta telephony inline hook allows you to integrate your own custom code into several of Okta's flows that send SMS or Voice (CALL) messages. You can integrate this hook with enrollment, authentication, and recovery flows that involve the Phone authenticator. While the One-Time Passcode (OTP) is sent to the requester, Okta calls your external service to deliver the OTP, and your service can respond with commands that indicate success or failure in delivering the OTP.

You can have only one active telephony inline hook per org.

When you create a telephony inline hook, you must include the `authScheme` parameter. See [Create inline hook](/docs/reference/api/inline-hooks/#create-inline-hook) and the [authScheme object](/docs/reference/api/inline-hooks/#authscheme-object).

## Objects in the request from Okta

For the telephony inline hook, the outbound call from Okta to your external service includes the following objects in its JSON payload:

### requestType
OTP request or event for which this transaction is being requested: authentication, enrollment, recovery

Acceptable values for `requestType`

| Enum Value                      | Associated Okta Event                                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `com.okta.user.telephony.pre-enrollment`                  | Enrollment |
| `com.okta.user.telephony.mfa-verification`    | Authentication |
| `com.okta.user.telephony.account-unlock`              | Account Unlock |
| `com.okta.user.telephony.password-reset`              | Password Reset |

### data.userProfile

Provides information on the OTP requester

| Property | Description                   | Data Type                    |
|----------|-------------------------------|------------------------------|
| firstName   | First name of the OTP requester | String     |
| lastName | Last name of the OTP requester        | String |
| login | Okta sign in of the OTP requester        | String |
| userId | Okta user ID of the OTP requester        | String |

### data.messageProfile

Provides information on the properties of the message being sent to the OTP requester.

| Property | Description                        | Data Type                    |
|----------|------------------------------------|------------------------------|
| msgTemplate   | SMS message template. Not applicable for CALL.      | String     |
| phoneNumber | Phone number enrolled for the Phone authenticator by the OTP requester             | String |
| otpExpires   | Time when the OTP expires | String     |
| deliveryChannel   | OTP delivery method: SMS or CALL | String     |
| otpCode   | OTP code | String     |
| locale   | Location of the OTP requester | String     |

## Objects in the response that you send

For the telephony inline hook, the `commands` and `error` objects that you can return in the JSON payload of your response are defined in the following sections.

<HookResponseSize/>

### commands

The `commands` object is where you can provide commands to Okta. It is where you can tell Okta whether your attempt to send the OTP using your own telephony provider was successful.

The `commands` object is an array, allowing you to send multiple commands. In each array element, there needs to be a `type` property and `value` property. The `value` property is where you specify the status of your telephony transaction and other relevant transaction metadata.

The `value` property is itself a nested object in which you specify a status, provider, transaction ID, and transaction metadata.

| Property | Description                                                              | Data Type       |
|----------|--------------------------------------------------------------------------|-----------------|
| type     | One of the [supported commands](#supported-commands)                    | String          |
| value    | Result of the send OTP operation. It specifies whether the OTP was sent successfully by the external web service/provider. | [value](#value) |

#### Supported commands

The following commands are supported for a telephony inline hook:

| Command                 | Description             |
|-------------------------|-------------------------|
| com.okta.telephony.action | Telephony operation action result     |

#### value

The `value` object is where you specify the result of the send OTP operation.

| Property | Description                                                                                                                                                                                                       | Data Type       |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| status       | Whether the OTP was sent successfully using the customer's web service | [status](#status)          |
| provider     | Provider that was used for sending the OTP using the customer's web service | String          |
| transactionId    | Transaction ID that uniquely identifies an attempt to deliver the OTP to the requester | String |
| transactionMetadata    | Any relevant transaction metadata, such as duration | String |

#### status

| Status      | Description               |
|---------|---------------------------|
| SUCCESSFUL     | External web service was able to deliver the OTP to the requester. |
| PENDING | External web service wasn't able to confirm delivery of the OTP to the requester. |
| FAILED  | External web service was unable to deliver the OTP to the requester. |

### error

When you return an error object, it should have the following structure:

| Property     | Description                          | Data Type |
|--------------|--------------------------------------|-----------|
| errorSummary | Human-readable summary of the error | String    |

Returning an error object causes Okta to retry sending the OTP to the requester using Okta's telephony provider(s).

> **Note:** If the error object doesn't include a defined `errorSummary` property, the following default message is returned to the end user: `The callback service returned an error`.

## Sample JSON payload of a request

```json
{
  "eventId": "uS5871kJThSsU8qlA1LTcg",
  "eventTime": "2022-01-28T21:43:40.000Z",
  "eventType": "com.okta.telephony.provider",
  "eventTypeVersion": "1.0",
  "contentType": "application/json",
  "cloudEventVersion": "0.1",
  "source": "https://${yourOktaDomain}/api/v1/inlineHooks/calz6lVQA77AwFeEe0g3",
  "requestType": "com.okta.user.telephony.pre-enrollment",
  "data": {
    "context": {
      "request": {
        "id": "reqRgSk8IBBRhuo0YdlEDTmUw",
        "method": "POST",
        "url": {
          "value": "/api/internal/v1/inlineHooks/com.okta.telephony.provider/generatePreview"
        },
        "ipAddress": "127.0.0.1"
      }
    },
    "userProfile": {
      "firstName": "test",
      "lastName": "user",
      "login": "test.user@okta.com",
      "userId": "00uyxxSknGtK8022w0g3"
    },
    "messageProfile": {
      "msgTemplate": "(HOOK)Your code is 11111",
      "phoneNumber": "9876543210",
      "otpExpires": "2022-01-28T21:48:34.321Z",
      "deliveryChannel": "SMS",
      "otpCode": "11111",
      "locale": "EN-US"
    }
  }
}
```

## Sample JSON payloads of responses

This section provides example JSON payloads for the supported operations.

### Sample response for successful OTP delivery

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

### Sample response for failed OTP delivery

```json
{
  "error":{
    "errorSummary":"Failed to deliver SMS OTP to test.user@okta.com",
    "errorCauses":[
      {
        "errorSummary":"Provider could not deliver OTP",
        "reason":"The content of the message is not supported",
        "location":"South Africa"
      }
    ]
  }
}
```

## Timeout behavior

After receiving the Okta request, if there is a response timeout, the Okta process flow proceeds with trying to send the OTP using Okta's telephony provider(s). See [Troubleshooting](#troubleshooting).

## Troubleshooting

This section covers what happens when a telephony inline hook flow fails either due to the external inline hook service returning an error object or not returning a successful response.

> **Note:** Administrators can use the [Okta System Log](/docs/reference/api/system-log/) to view errors. See the [Troubleshooting](/docs/concepts/inline-hooks/#troubleshooting) section in the inline hooks concept piece for more information on the events related to inline hooks that the Okta System Log captures.

- When there is a communication failure with the external service, a timeout for example, the inline hook operation is skipped, and the OTP is delivered to the requester using Okta's telephony provider(s).

  **Who can see this error?** Administrators

- When the external service returns a response with any other HTTP status code besides `200`, the inline hook operation is skipped, and the OTP is delivered to the requester using Okta's telephony provider(s).

  **Who can see this error?** Administrators

- When the external service returns an error object in the response, the telephony inline hook flow fails with no OTP delivered using the hook.

  **Who can see this error?** Administrators, developers, and end users

- When a hook response is malformed or couldn't be mapped to the expected API response, the inline hook operation is skipped.

  **Who can see this error?** Administrators

  The following actions result in an error:

  - Using an invalid status in the response

  - Attempting to add an active telephony inline hook when one already exists

  - Not including the `authScheme` in the request header
