---
title: Inline hooks
meta:
  - name: description
    content: Inline hooks are outbound calls from Okta to your own custom code. Find out more about the types of Okta inline hooks, the process flow, and how to set them up.
---

# Inline hooks

## What are Okta inline hooks?

Inline hooks are outbound calls from Okta to your own custom code, triggered at specific points in Okta process flows. They allow you to integrate custom functionality into those flows.

You implement your custom code as a web service with an internet-accessible endpoint. It's your responsibility to host your code on a system external to Okta. Okta defines the REST API contract for the requests sent to your custom code, and for the responses from your custom code. The outbound call from Okta is called a hook. Your code, which receives the call, is referred to as your external service.

Inline hooks use synchronous calls, which means that the Okta process that triggered the hook is paused until a response from your service is received.

## Multiple types of Okta inline hooks

Okta defines several different types of inline hooks. Each type of inline hook makes it possible to customize a different Okta process flow. All the types share a general syntax for requests and responses sent between Okta and the external service. But each inline hook differs in the specifics of the JSON objects that are sent and received. When implementing your external service, you need to develop your code according to the details of the particular type of hook you intend to use.

### Currently supported types

| Name                                                           | Description                                                                    |
|----------------------------------------------------------------|--------------------------------------------------------------------------------|
| [Token inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createTokenInlineHook)               | Customizes tokens returned by Okta API Access Management                       |
| [User import inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createUserImportInlineHook)        | Adds custom logic to the user import process                                   |
| [SAML assertion inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createSAMLAssertionInlineHook)       | Customizes SAML assertions returned by Okta                                    |
| [Registration inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/create-registration-hook) | Customizes handling of Self-Service Registration (SSR) and Progressive Enrollment support |
| [Password import inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createPasswordImportInlineHook)  | Verifies a user-supplied password to support migration of users to Okta        |
| [Telephony inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createTelephonyInlineHook) | Customizes the Okta flows that send SMS or voice messages |

## Process flow to use inline hooks

### Extension points

There are various points in Okta process flows where inline hooks can be triggered. These points are called extension points because they're where you can extend Okta functionality. Each type of inline hook is triggered at a particular extension point in a particular Okta process flow. At an extension point, if you've configured an inline hook, Okta calls your external service, and waits for a response. When the response is received, Okta resumes the process flow.

### Inline hook call within an Okta process flow

The following graphic illustrates the sequence of steps:

<div class="three-quarter">

![Hook call steps diagram](/img/hooks/hook-call-steps.png)

</div>

1. During the execution of an Okta process flow, at the extension point between points A and B, Okta sends a request to your external service.

1. Your external service performs some processing.

1. Your external service sends a response back to Okta.

1. Okta receives the response, acts on any commands it includes, and resumes the process flow that originally triggered the inline hook.

### Request and response overview

The request to your external service from Okta consists of an HTTPS POST request with a JSON payload. The objects included in the JSON payload provide data relevant to the process flow that triggered the inline hook. The set of objects varies depending on the type of inline hook that you're using.

<div class="three-quarter">

![Hook request and response](/img/hooks/hook-request-response.png)

</div>

Your service needs to handle the inline hook by responding to the request from Okta. The JSON payload of the response your service sends can contain a `commands` object, in which you send commands to Okta that affect the course of the Okta process flow. The commands available vary depending on the type of inline hook that you're using.

## The request

### HTTP method

Okta uses an HTTPS POST request to call your service.

### Inline hook security

To secure the communication channel between Okta and your external service, you have the option of using HTTP headers or OAuth 2.0 tokens.

### OAuth 2.0

OAuth 2.0 tokens provide enhanced security between Okta and your external service, and you can configure them for the following methods: client secret (`client_secret_post`) and private key (`private_key_jwt`). <!-- Okta uses the RS256 algorithm -->

#### Client secret post

The client secret method (`client_secret_post`) uses a generated client ID and secret to obtain a token from the authorization server. The OAuth 2.0 inline hook request includes the token as a signed JWT. Your external service must verify the JWT to authenticate the inline hook call. See [OAuth 2.0: Client Secret](/docs/guides/common-hook-set-up-steps/#oauth-2-0-client-secret).

#### Private key

The private key method (`private_key_jwt`) uses a generated key, which includes a private key and a public key. A JWT is generated using the private key and sent to the authorization server. The authorization server uses the public key to verify the JWT and returns an access token as a signed JWT. The OAuth 2.0 inline hook request includes the signed JWT. Your external service must verify the JWT to authenticate the inline hook call. See [OAuth 2.0: Private Key](/docs/guides/common-hook-set-up-steps/#oauth-2-0-private-key).

### HTTP header

Support is provided for header-based authentication to authenticate every request received by your external service. The header of the request sent by Okta includes the following fields:

```http
Accept: application/json
Content-Type: application/json
Authorization: {key}
```

#### Authorization header

The Authorization header (`Authorization: {key}`) is a secret string that you provide to Okta when you register your external service. This string serves as an API access key for your service, and Okta provides it in every request. Your code can check if the string is present as a security measure. (This isn't an Okta authorization token, it's simply a text string you decide on.) See [HTTP header: Basic Authentication](/docs/guides/common-hook-set-up-steps/#http-header-basic-authentication).

### JSON request payload objects

The Okta JSON payload provides specific information about the process flow that's being executed, so that your external service can evaluate the situation. Information is encapsulated in JSON objects. The set of objects sent depends on the type of inline hook that you're using. Objects are defined in the specific documentation for each type of inline hook.

The objects providing this information are nested within a larger object called `data`.

The `data.context` object is always included and provides context information. In general, `data.context` encapsulates Okta objects that your external service can't affect, while objects in `data` that are outside of `data.context` encapsulate objects that your external service can affect, with the commands it sends in its response.

## The response

Your service receives the request from Okta and needs to respond to it. The response needs to include an HTTP response code and, usually, a JSON payload. In particular, you typically include a `commands` object in the JSON payload to specify actions for Okta to execute or to communicate information back to Okta.

<HookResponseSize/>

### HTTP status code

Return an HTTP status code with your response. Typically, your service should return an HTTP status code of 200 (OK). In inline hook types that support empty responses, HTTP status code 204 (No Content) needs to be provided when sending an empty response.

#### Don't use HTTP status code to return information

Don't use the HTTP status code to return information to Okta regarding problems your service has detected in the data. Use an [error](#error) object sent in the JSON payload of the response. HTTP error codes shouldn't be used unless your service couldn't parse the request from Okta.

### JSON response payload objects

You can include any of the following types of objects in the JSON payload:

#### Commands object

It allows you to return commands to Okta to affect the process flow being executed and to modify values within Okta objects. The available commands differ by inline hook type and are defined in the specific documentation for each inline hook type.

The `commands` object is an array, which allows you to return more than one command in your response. Each element within the array needs to consist of a pair of `type` and `value` elements. Each `type` element needs to be the name of a supported command you want to invoke. The corresponding `value` element is the operand that you want to specify for the command.

The names of the commands follow Java-style reverse DNS name format, beginning with `com.okta`, followed by an Okta object that the command operates on, and then an action.

#### Error object

It allows you to return error messages. How the error data is used varies by inline hook type.

The `error` object has the following structure:

| Property     | Description                             | Data type            |
|--------------|-----------------------------------------|----------------------|
| errorSummary | Human-readable summary of one or more errors  | String               |
| errorCauses  | An array of ErrorCause objects          | Array of ErrorCauses |

The `errorSummary` should be a general statement of any problem the external service encountered in handling the request from Okta. The `errorCauses` are intended to provide more detailed information and are helpful if there were multiple problems.

An `ErrorCause` object must include the following fields:

| Property     | Description                                                                                                                                                                                        | Data type |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| errorSummary | Human-readable summary of the error.                                                                                                                                                               | String    |
| reason       | A brief, enum-like string that indicates the nature of the error. For example, `UNIQUE_CONSTRAINT` for a property uniqueness violation.                                                                       | String    |
| locationType | Where in the request the error was found (`body`, `header`, `url`, or `query`).                                                                                                                    | String    |
| location     | The valid JSON path to the location of the error. For example, if there was an error in the user's `login` field, the `location` might be `data.userProfile.login`.                                | String    |
| domain       | Indicates the source of the error. If the error was in the user's profile, for example, you might use `end-user`. If the error occurred in the external service, you might use `external-service`. | String    |

While there are no technical restrictions on the values for any of the fields in an `ErrorCause` object, using them as described in the previous table allows you to provide rich error information that can be useful in determining why an inline hook's processing failed.

#### debugContext object

It allows you to specify additional information to make available in the Okta System Log with the call to your hook. You can use this object as you want, sending any information that would be useful for debugging purposes. In the System Log, the content sent in this object is populated into the `inline_hook.response.processed` event.

## Time out and retry

When Okta calls an external service, it enforces a default timeout of three seconds. Okta attempts at most one retry. A request isn't retried if the external service endpoint responds with a 2xx HTTP success code or a 4xx HTTP error code. If the external service endpoint responds with a redirect, it isn't followed.

### Inline hooks and concurrent rate limits

The Okta process flow that triggered the inline hook remains in progress until a response from your external service is received. For process flows initiated by calls to Okta APIs, slow processing times by your external service can cause open API transactions to accumulate. That accumulation can potentially cause you to exceed [Concurrent Rate Limits](/docs/reference/rl-additional-limits/#concurrent-rate-limits).

> **Note:** Concurrent inline hook rate limits are based on your Okta org type.

### Inline hook time-out behavior

In the case of an inline hook time-out or failure, the Okta process flow either continues or stops based on the inline hook type:

| Inline hook        | Inline hook failure behavior                             |
|--------------------------------| ---------------------------------------------------------|
| Password import inline hook | The Okta process flow stops and the user can't sign in. The password isn't imported. Future attempts to sign in triggers the inline hook again. |
| Registration inline hook | The Okta process flow stops and the registration or the profile update is denied. The user receives one of the following default UI messages:<ul><li>"There was an error creating your account. Please try registering again". (Self-service registration)</li><li>"There was an error updating your profile. Please try again later." (Progressive profile enrollment)</li></ul> |
| SAML assertion inline hook | The Okta process flow continues with the original SAML assertion returned. |
| Telephony inline hook | The Okta process to deliver the OTP continues and the OTP is sent using the Okta providers. The failover mechanism that uses the Okta telephony providers is heavily rate-limited. |
| Token inline hook | The Okta process flow continues with the original token returned. |
| User import inline hook | The Okta import process continues and a user is created. |

>**Note:** Review the System Log for errors of type `inline_hook.executed`. This error type appears when Okta doesn't receive a response from your external service or receives a response with status codes other than `2xx`. See [Troubleshooting](#troubleshooting).

## Inline hook setup

After creating your external service, you need to tell Okta it exists, and enable it for a particular process flow. The steps are:

1. Create an external service.

1. Register your service's endpoint with Okta. You can do this in the Admin Console by going to **Workflow > Inline Hooks** and clicking **Add Inline Hook**. Alternatively, you can do this using a REST API call by making a `POST` request to `/api/v1/inlineHooks`; see [Inline Hooks Management API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook) for information.

1. Associate the endpoint with a particular Okta process flow. This step varies by inline hook type.

In an Okta org, you can create up to 100 inline hooks. 100 is the total for any combination of inline hook types.

For more information on implementing inline hooks, see the documentation for specific inline hook types linked to in [currently supported types](#currently-supported-types).

## Troubleshooting

A hook preview feature is available for the following hooks: SAML, telephony, token, and registration inline hooks. Use this feature to view a sample request body and evaluate and troubleshoot the response from your external service. See [Troubleshoot hook implementations](/docs/guides/common-hook-set-up-steps/nodejs/main/#troubleshoot-hook-implementations) and [Preview an inline hook](https://help.okta.com/okta_help.htm?type=oie&id=ext-preview-inline-hooks).

The [Okta System Log](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/) also captures events related to inline hook setup and execution that you can use to troubleshoot your implementation. You can see descriptions of the relevant event types by querying the event types catalog with the `inline_hook` query parameter. See [Event Types](/docs/reference/api/event-types/).

> **Note:** You can see errors from the error object in the external service response, errors when Okta can't apply an inline hook response, and errors related to communication with the external service, such as network-related failures and responses with HTTP status codes other than `200`.
