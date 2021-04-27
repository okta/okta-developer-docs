---
title: Hook best practices
excerpt: >-
  Understand the best practices at Okta to implement and secure an Okta Event Hook or Inline Hook.
---

# Hook best practices

Event Hooks and Inline Hooks are outbound calls from Okta to an external service. These outbound calls integrate custom functionality into your Okta processes. For further background information on Okta Hooks, see [Event Hooks](/docs/concepts/event-hooks) and [Inline Hooks](/docs/concepts/inline-hooks).

The following sections review best practices to implement and secure Okta Event Hooks or Inline Hooks.

## Secure your Hook endpoint

To prevent a malicious actor from making requests to the endpoint where your Okta Hooks are sent, use the following best practices:

* Configure Okta to send an Authentication header in the Hook and validate it in every request by:

  * Using [HTTP Basic Authentication](/books/api-security/authn/api-authentication-options/#http-basic-authentication). When activating and enabling your Hooks on the Okta org, set the **Authorization field** as `authorization` and the **Authentication secret** in the Base64 `user:password` format.

    >**Note:** You must include the authentication scheme as part of the **Authentication secret**. For Basic Authentication, your secret must appear similar to: `Basic Base64(user:password)`. See the following partial Hook header as an example:

    ```cURL
    'content-type',
    'application/json',
    'authorization',
    'Basic YWRtaW46c3VwZXJzZWNyZXQ='
    ```

  * Using a separate Secret Key, which can be configured on the Hook as a custom header field.

* Create an allowlist of IP addresses to check on incoming Okta calls. See the following Okta Knowledge Base article for a listing of Okta IP addresses: [What IP addresses/ranges should we allow for inbound traffic?](https://support.okta.com/help/s/article/What-IP-addresses-ranges-should-we-whitelist-for-inbound-traffic-i-e-REST-API-calls-from-Okta-to-on-prem-JIRA-server?language=en_US).

>**Note:** This is a large list of IP Addresses and the list is subject to change. Unless required by your organization, securing your Hook by Authentication header is recommended.

## Protect your Hook content from external viewers

To prevent unauthorized parties from reading the contents of an Okta Hook, we recommend the following:

* Okta uses HTTPS to encrypt communications to your Hook endpoint. When using HTTPS, ensure you keep your SSL certificate updated and the Domain Name System (DNS) secured, so that someone can’t re-point your endpoint to another location.

## Avoid delays in Hook responses

When Okta uses an Inline Hook to communicate with your endpoint, the user experience is paused until your code responds. Okta Event Hooks, although acting asynchronously, also require a response. To prevent unnecessary delays or timeouts, we recommend the following:

* Treat Okta Hooks as you would any other HTTP request, namely: Ensure you respond to the HTTP request in under 400 milliseconds with a 200 (Success) or 204 (Success no content) code.
* Process the Hook request data after the response is sent to avoid delays or timeouts.

A timeout of three seconds is enforced on all outbound requests for Event and Inline Hooks, with one retry in the event of a timeout or an error response from the external service. If a successful response has not been received after that, a 400 error is returned with more information about what failed.

See Inline Hook [Timeout and Retry](/docs/concepts/inline-hooks/#timeout-and-retry) for further information on Inline Hook timeout and retry behavior; see Event Hook [Timeout and Retry](https://developer.okta.com/docs/concepts/event-hooks/) for the same.

## Limits, duplicates, and order of Hook calls

The number of Hook calls and the limits per org are available in the following table. Keep in mind these numbers and limits when designing your Hook solution.

The order of Event or Inline Hook calls is not guaranteed. Your external service processing of the Hook requests must consider this for your solution. Also, to avoid processing duplicate requests, use the `eventId` property to identify unique requests.

| Hook Type | Limit Type | Limit | Description |
| --------- | -----------| ----- | ----------- |
| Event Hook | Number of daily Event Hooks | 100K | A maximum of 100 thousand Event Hooks can be fired, per org, per day. Event Hooks are not recorded or replayed after this point. If a request times out after three seconds, Event Hooks are retried one time afterward. Retries do not count toward the org limit.
|            | Maximum number of Event Hooks per org | 10 | A maximum of 10 active Event Hooks can be configured per org. Each Event Hook can be configured to deliver multiple event types. |
| Inline Hook | Timeout | 3 seconds | Okta Inline Hooks have a completion timeout of three seconds with a single retry.However, a request is not retried if your endpoint returns a 4xx HTTP error code. Any 2xx code is considered successful, and the request is not retried. If the external service endpoint responds with a redirect, it is not followed. |
|             | Maximum number of Inline Hooks per org | 50 | The maximum number of Inline Hooks that can be configured per org is 50, which is a combined total for any combination of Inline Hook types. |

## Troubleshoot your Hook implementations

Developers and administrators can preview sample Okta calls and responses from your external service for all Event Hooks ([Event Hook preview](https://help.okta.com/en/prod/Content/Topics/automation-hooks/event-hooks-preview.htm)) and for SAML and Registration Inline Hooks ([Inline Hook preview](https://help.okta.com/en/prod/Content/Topics/automation-hooks/preview-inline-hooks.htm)). The preview pages provide sample request and response code prior to enabling the Hooks to assist in your set up and external service development.

Review the Admin Console System Log to troubleshoot your implementations, in addition to your external service's logging features. See the following sections to assist in troubleshooting your implementations:

* [Troubleshooting Inline Hooks](/docs/concepts/inline-hooks/#troubleshooting)
* [Troubleshooting Event Hooks](/docs/concepts/event-hooks/#debugging)

Inline Hooks also provide an `error` object that can be returned as part of the Hook response. For further details, see [Inline Hooks error object](/docs/concepts/inline-hooks/#error).

See also the following guides for sample Okta Hook implementations:

* [Event Hook](/docs/guides/event-hook-implementation/nodejs/overview/)
* [Password Import Inline Hook](/docs/guides/password-import-inline-hook/nodejs/overview/)
* [Registration Inline Hook](/docs/guides/registration-inline-hook/nodejs/overview/)
* [Token Inline Hook](/docs/guides/token-inline-hook/nodejs/overview/)
