---
title: Inline Hooks
meta:
  - name: description
    content: Inline hooks are outbound calls from Okta to your own custom code. Find out more about the types of Okta Inline Hooks, the process flow, and how to set them up.
---

# Inline Hooks

## What are Okta Inline Hooks?

Inline hooks are outbound calls from Okta to your own custom code, triggered at specific points in Okta process flows. They allow you to integrate custom functionality into those flows.

You implement your custom code as a web service with an Internet-accessible endpoint. It's your responsibility to arrange hosting of your code on a system external to Okta. Okta defines the REST API contract for the requests it sends to your custom code, as well as for the responses your custom code can send back.

The outbound call from Okta is called a hook. Your code, which receives the call, is referred to as your external service.

Inline hooks use synchronous calls, which means that the Okta process that triggered the hook is paused until a response from your service is received.

## Multiple types of Okta Inline Hooks

Okta defines several different types of Inline Hooks. Each type of Inline Hook makes it possible to customize a different Okta process flow. All the types share the same general syntax for requests and responses sent between Okta and the external service, but each differs in the specifics of the JSON objects that are sent and received. When implementing your external service, you need to develop your code according to the details of the particular type of hook you intend to use.

### Currently-supported types

| Name                                                           | Description                                                                    |
|----------------------------------------------------------------|--------------------------------------------------------------------------------|
| [Token Inline Hook](/docs/reference/token-hook/)               | Customizes tokens returned by Okta API Access Management                       |
| [User Import Inline Hook](/docs/reference/import-hook/)        | Adds custom logic to the user import process                                   |
| [SAML Assertion Inline Hook](/docs/reference/saml-hook/)       | Customizes SAML assertions returned by Okta                                    |
| [Registration Inline Hook](/docs/reference/registration-hook/) | Customizes handling of user registration requests in Self-Service Registration |
| [Password Import Inline Hook](/docs/reference/password-hook/)  | Verifies a user-supplied password to support migration of users to Okta        |

## Inline Hook process flow

### Extension points

The points in Okta process flows where Inline Hooks can be triggered are called extension points, because they are where you can extend Okta functionality. Each type of Inline Hook is triggered at a particular extension point in a particular Okta process flow. At an extension point, if you have configured an Inline Hook, Okta calls your external service, and waits for a response. When the response is received, Okta resumes the process flow.

### Inline Hook call within an Okta process flow

The graphic below illustrates the sequence of steps:

![Hook Call Steps Diagram](/img/hook-call-steps.png "Hook Call Steps Diagram")

1. During the execution of an Okta process flow, at the extension point between points A and B, Okta sends a request to your external service.

1. Your external service performs some processing.

1. Your external service sends a response back to Okta.

1. Okta receives the response, acts on any commands it includes, and resumes the process flow that originally triggered the Inline Hook.

### Request and response overview

Okta's request to your external service consists of an HTTPS POST request with a JSON payload. The objects included in the JSON payload provide data relevant to the process flow that triggered the Inline Hook. The set of objects varies depending on the type of Inline Hook you're using.

![Hook Request and Response](/img/hook-request-response.png "Hook Request and Response")

Your service needs to handle the Inline Hook by responding to Okta's request. The JSON payload of the response your service sends can contain a `commands` object, in which you send commands to Okta that affect the course of the Okta process flow. The commands available vary depending on the type of Inline Hook you're using.

## The request

### HTTP method

Okta uses an HTTPS POST request to call your service.

### HTTP header

The header of the request sent by Okta includes the following fields:

```http
Accept: application/json
Content-Type: application/json
Authorization: ${key}
```

#### Authorization header

The Authorization header is a secret string you provide to Okta when you register your external service. This string serves as an API access key for your service, and Okta provides it in every request, allowing your code to check for its presence as a security measure. (This is not an Okta authorization token, it is simply a text string you decide on.)

### JSON request payload objects

The JSON payload is where Okta provides specific information about the process flow that's being executed, so that your external service can evaluate the specific situation. Information is encapsulated in JSON objects. The set of objects sent depends on the type of Inline Hook you're using. Objects are defined in the specific documentation for each type of Inline Hook.

The objects providing this information are nested within a larger object called `data`.

Always included is `data.context`, providing context information. In general, `data.context` encapsulates Okta objects that your external service cannot affect, while objects in `data` that are outside of `data.context` encapsulate objects that your external service does have the ability to affect, by means of the commands it sends in its response.

### Security

To secure the communication channel between Okta and your external service, HTTPS is used for requests, and support is provided for header-based authentication. Okta recommends that you implement an authentication scheme using the authentication header, to be used to authenticate every request received by your external service.

## The response

Your service receives the request from Okta and needs to respond to it. The response needs to include an HTTP response code and will usually also include a JSON payload. In particular, you will typically include a `commands` object in the JSON payload to specify actions for Okta to execute or to communicate information back to Okta.

### HTTP status code

You need to return an HTTP status code with your response. Typically, your service should return an HTTP status code of 200 (OK). In Inline Hook types that support empty responses, HTTP status code 204 (No Content) needs to be provided when sending an empty response.

#### Don't use HTTP status code to return information

Don't use the HTTP status code to return information to Okta regarding problems your service has detected in the data; use an [error](#error) object sent in the JSON payload of the response. HTTP error codes should not be used unless your service could not parse the request from Okta.

### JSON response payload objects

You can include any of the following types of objects in the JSON payload:

#### commands

Lets you return commands to Okta to affect the process flow being executed and to modify values within Okta objects. The available commands differ by Inline Hook type and are defined in the specific documentation for each Inline Hook type.

The `commands` object is an array, allowing you to return more than one command in your response. Each element within the array needs to consist of a pair of `type` and `value` elements. Each `type` element needs to be the name of a supported command you wish to invoke. The corresponding `value` element is the operand you wish to specify for the command.

The names of commands follow Java-style reverse DNS name format, beginning with `com.okta`, followed by an Okta object that the command operates on, and then an action.

#### error

Lets you return error messages. How the error data is used varies by Inline Hook type.

The `error` object should have the following structure:

| Property     | Description                             | Data Type            |
|--------------|-----------------------------------------|----------------------|
| errorSummary | Human-readable summary of the error(s). | String               |
| errorCauses  | An array of ErrorCause objects.         | Array of ErrorCauses |

The `errorSummary` should be a general statement of any problem the external service encountered in handling the request from Okta. The `errorCauses` are intended to provide more detailed information and are particularly helpful if there were multiple problems.

An `ErrorCause` object must include the following fields:

| Property     | Description                                                                                                                                                                                        | Data Type |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| errorSummary | Human-readable summary of the error.                                                                                                                                                               | String    |
| reason       | A brief, enum-like string indicating the nature of the error, e.g., `UNIQUE_CONSTRAINT` for a property uniqueness violation.                                                                       | String    |
| locationType | Where in the request the error was found (`body`, `header`, `url`, or `query`).                                                                                                                    | String    |
| location     | The valid JSON path to the location of the error. For example, if there was an error in the user's `login` field, the `location` might be `data.userProfile.login`.                                | String    |
| domain       | Indicates the source of the error. If the error was in the user's profile, for example, you might use `end-user`. If the error occurred in the external service, you might use `external-service`. | String    |

While there are no technical restrictions on the values for any of the fields in an `ErrorCause` object, using them as described in the table above allows you to provide rich error information that can be very useful in determining why an Inline Hook's processing failed.

#### debugContext

Lets you specify additional information to make available in the Okta System Log in connection with the call to your hook. You can use this object as you wish, sending any information that would be useful for debugging purposes. In the System Log, content sent in this object is populated into the `inline_hook.response.processed` event.

## Timeout and retry

When Okta calls an external service, it enforces a default timeout of 3 seconds. Okta will attempt at most one retry. A request isn't retried if the external service endpoint responds with a 2xx HTTP success code or a 4xx HTTP error code. If the external service endpoint responds with a redirect, it isn't followed.

### Inline Hooks and concurrent rate limits

The Okta process flow that triggered the Inline Hook remains in progress until a response from your external service is received. For process flows initiated by calls to Okta APIs, slow processing times by your external service can cause open API transactions to accumulate, potentially exceeding [Concurrent Rate Limits](/docs/reference/rate-limits/#concurrent-rate-limits).

### Inline Hook timeout behavior

In the case of an Inline Hook timeout or failure, the Okta process flow either continues or stops based on the Inline Hook type:

| Inline Hook        | Inline Hook Failure Behavior                             |
|--------------------------------| ---------------------------------------------------------|
| Token Inline Hook | Okta process flow continues with original token returned. |
| SAML Assertion Inline Hook | Okta process flow continues with original SAML assertion returned. |
| Password Import Inline Hook | Okta process flow stops and user can't sign in. The password is not imported. Future attempts to sign in triggers the Inline Hook again. |
| User Import Inline Hook | Okta import process continues and user is created. |
| Registration Inline Hook | Okta process flow stops and registration is denied. The user receives the following default UI message: "There was an error creating your account. Please try registering again". |

>**Note:** Review the System Log for errors of type `inline_hook.executed`. This error type appears when Okta doesn't receive a response from your external service or receives a response with status codes other than `2xx`. See [Troubleshooting](#troubleshooting).

## Inline Hook setup

After creating your external service, you need to tell Okta it exists, and enable it for a particular process flow. The steps are:

1. Create an external service.

1. Register your service's endpoint with Okta. You can do this in Admin Console by going to **Workflow > Inline Hooks** and clicking **Add Inline Hook**. Alternatively, you can do this using a REST API call by making a `POST` request to `/api/v1/inlineHooks`; see [Inline Hooks Management API](/docs/reference/api/inline-hooks/) for information.

1. Associate the endpoint with a particular Okta process flow. How to do this varies by Inline Hook type.

The total number of Inline Hooks that you can create in an Okta org is limited to 50, which is a combined total for any combination of Inline Hook types.

For more information on implementing Inline Hooks, see the documentation for specific Inline Hook types linked to in [Currently-Supported Types](#currently-supported-types).

## Troubleshooting

The [Okta System Log](/docs/reference/api/system-log/) captures events related to Inline Hook setup and execution, which you can use to troubleshoot your implementation. To see descriptions of the relevant event types, query the Event Types catalog with the query parameter `inline_hook`:

<https://developer.okta.com/docs/reference/api/event-types/?q=inline_hook>

> **Note:** You can see errors from the error object in the external service response, errors when Okta can't apply an inline hook response, and errors related to communication with the external service, such as network related failures and responses with HTTP status codes other than `200`.
