---
title: Telephony inline hook reference
excerpt: Customizes Okta's flows that send SMS or voice messages
---
<ApiLifecycle access="ie" />

# Telephony inline hook reference

This page provides reference documentation for telephony inline hooks, a type of inline hook supported by Okta. You can use this content to understand how to structure the JSON objects sent and received by Okta when communicating with an external telephony provider.

## See also

- For a general introduction to Okta inline hooks, see [inline hooks](/docs/concepts/inline-hooks/).

- For information on the API for registering external service endpoints with Okta, see [Inline Hooks Management API](/docs/reference/api/inline-hooks/) or [Add an inline hook](https://help.okta.com/okta_help.htm?type=oie&id=ext-add-inline-hook).

- For an example implementation of a telephony inline hook, see [Telephony inline hook with Twilio](/docs/guides/telephony-inline-hook/).

## About

The Okta telephony inline hook allows you to integrate your own custom code into Okta flows that send SMS or voice call messages. You can integrate this hook with enrollment, authentication, and recovery flows that involve the phone authenticator. Okta uses your external provider to deliver the one-time passcode (OTP) to the Requester. The provider can respond with commands that indicate if the delivery was successful or not.

You can have only one active telephony inline hook per org.

When you create a telephony inline hook, you must include the `authScheme` parameter. See [Create inline hook](/docs/reference/api/inline-hooks/#create-inline-hook) and the [authScheme object](/docs/reference/api/inline-hooks/#authscheme-object).

## Objects in the request from Okta

For the telephony inline hook, the outbound call from Okta to your external service includes the following objects in its JSON payload:

### requestType
OTP request or event for which this transaction is being requested: authentication, enrollment, recovery

Acceptable values for `requestType`

| Enum Value                      | Associated Okta Event      |
|---------------------------------|----------------------------|
| `com.okta.user.telephony.pre-enrollment`    | Enrollment     |
| `com.okta.user.telephony.mfa-verification`  | Authentication |
| `com.okta.user.telephony.account-unlock`    | Account unlock |
| `com.okta.user.telephony.password-reset`    | Password reset |

### data.userProfile

Provides information on the OTP Requester

| Property    | Description                       | Data Type                    |
|-------------|-----------------------------------|------------------------------|
| firstName   | First name of the OTP Requester   | String |
| lastName    | Family name of the OTP Requester  | String |
| userId      | Okta user ID of the OTP Requester | String |
| login       | Okta sign in of the OTP Requester | String |

### data.messageProfile

Provides information on the properties of the message being sent to the OTP Requester.

| Property | Description                        | Data Type                    |
|----------|------------------------------------|------------------------------|
| msgTemplate     | SMS message template. Not applicable for `voice call` authentication.    | String |
| phoneNumber     | Phone number enrolled for the Phone authenticator by the OTP Requester   | String |
| otpExpires      | Timestamp when the OTP expires                                           | String |
| deliveryChannel | OTP delivery method. Possible values: `SMS` or `voice call`              | String |
| otpCode         | OTP code                                                                 | String |
| locale          | Location of the OTP Requester                                            | String |

## Objects in the response that you send

For the telephony inline hook, the `commands` and `error` objects that you can return in the JSON payload of your response are defined in the following sections.

<HookResponseSize/>

### commands

The `commands` object is where you can provide commands to Okta. It’s where you can tell Okta whether your attempt to send the OTP using your own telephony provider was successful.

The `commands` object is an array, allowing you to send multiple commands. In each array element, there needs to be a `type` property and `value` property. The `value` property is where you specify the status of your telephony transaction and other relevant transaction metadata.

The `value` property is itself a nested object in which you specify a status, provider, transaction ID, and transaction metadata.

| Property | Description                                                              | Data Type       |
|----------|--------------------------------------------------------------------------|-----------------|
| type     | One of the [supported commands](#supported-commands)                    | String          |
| value    | Result of the send OTP operation. Indicates if the external web service or provider sent the OTP. | [value](#value) |

#### Supported commands

The following commands are supported for a telephony inline hook:

| Command                   | Description                           |
|---------------------------|---------------------------------------|
| com.okta.telephony.action | Telephony operation action result     |

#### value

The `value` object specifies the result of the Send OTP operation and includes the following properties:

| Property | Description                 | Data Type       |
|----------|-----------------------------|-----------------|
| status                 | Whether the OTP was sent successfully using the customer's web service                 | [status](#status) |
| provider               | The provider used to send the OTP using the customer's web service                     | String            |
| transactionId          | Transaction ID that uniquely identifies an attempt to deliver the OTP to the Requester | String            |
| transactionMetadata    | Any relevant transaction metadata, such as duration                                    | String            |

#### status

| Status     | Description               |
|------------|---------------------------|
| SUCCESSFUL | External web service was able to deliver the OTP to the Requester                |
| PENDING    | External web service wasn't able to confirm delivery of the OTP to the Requester |
| FAILED     | External web service was unable to deliver the OTP to the Requester              |

### error

When you return an error object, it should have the following structure:

| Property     | Description                          | Data Type |
|--------------|--------------------------------------|-----------|
| errorSummary | Human-readable summary of the error | String    |

Returning an error object causes Okta to retry sending the OTP to the Requester using the Okta telephony providers.

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

## Time-out behavior

If the provider response times out, Okta attempts to send the OTP using the Okta telephony providers. See [Troubleshoot](#troubleshoot).

>**Note:** Failovers that use the Okta telephony providers are heavily rate-limited.

## Troubleshoot

This section explains several common causes of failure for telephony inline hooks.

> **Note:** Administrators can use the [Okta System Log](/docs/reference/api/system-log/) to view errors. See the [Troubleshooting](/docs/concepts/inline-hooks/#troubleshooting) section in the inline hooks topic for details on events captured by the Okta System Log.

|       Issue      |          Impact            |      Error Visibility       |
|------------------|----------------------------|-----------------------------|
| External service fails to communicate or times out                          | Inline hook operation is skipped, OTP is sent to the Requester using an Okta telephony provider   | Administrators only                       |
| External service responds with any HTTP status code besides `200`           | Inline hook operation is skipped, OTP is sent to the Requester using an Okta telephony provider   | Administrators only                       |
| External service returns an error object                                    | Inline hook operation fails, OTP is sent to the Requester using an Okta telephony provider        | Administrators, developers, and end users |
| Hook response is malformed or can't be mapped to the expected API response  | Inline hook operation is skipped                                                                  | Administrators only                       |
| Request header doesn't include an `authScheme`                              | Inline hook operation is skipped                                                                  | Administrators only                       |
| Response uses an invalid status                                             | Inline hook operation is skipped                                                                  | Administrators only                       |
| Operation adds an active telephony inline hook when a hook exists           | Inline hook operation is skipped                                                                  | Administrators only                       |