---
title: Hooks best practices
excerpt: >-
  Understand the best practices to implement and secure Okta Event Hooks or Inline Hooks.
---

# Hooks best practices

Event Hooks and Inline Hooks are outbound calls from Okta to an external service. These outbound calls integrate custom functionality into your Okta processes. See [Event Hooks](/docs/concepts/event-hooks) and [Inline Hooks](/docs/concepts/inline-hooks) for additional concept information.

The following sections review best practices to implement and secure Okta Event Hooks or Inline Hooks.

## Secure your Hook endpoint

To prevent a malicious actor from making requests to the endpoint where your Okta Hooks are sent, use the following best practices:

* Configure Okta to send an authentication header in the Hook and validate it in every request by one of two ways:

  * Using [HTTP Basic Authentication](/books/api-security/authn/api-authentication-options/#http-basic-authentication). When activating and enabling your Hooks on the Okta org, set the **Authorization field** as `Authorization` and the **Authentication secret** in the Base64 `user:password` format.

    >**Note:** You must include the authentication scheme as part of the **Authentication secret**. For Basic Authentication, your secret must appear similar to: `Basic Base64(user:password)`. See the following partial Hook header as an example:

    ```http
    Accept: application/json
    content-type: application/json
    Authorization: Basic YWRtaW46c3VwZXJzZWNyZXQ=
    ```

  * Using a separate Secret Key, which can be configured on the Hook as a custom header field.

* Create an allowlist of IP addresses to check incoming Okta calls. See [What IP addresses/ranges should we allow for inbound traffic?](https://support.okta.com/help/s/article/What-IP-addresses-ranges-should-we-whitelist-for-inbound-traffic-i-e-REST-API-calls-from-Okta-to-on-prem-JIRA-server?language=en_US) for a listing of Okta IP addresses.

>**Note:** This is a large list of IP addresses and the list is subject to change. Unless required by your organization, securing your Hook by authentication header is recommended.

## Protect your Hook content from external viewers

Okta requires HTTPS to encrypt communications to your Hook endpoint to prevent unauthorized parties from reading the contents of an Okta Hook. When using HTTPS, ensure you keep your SSL certificate updated and the Domain Name System (DNS) secured, so that someone can’t reroute your calls to another location.

>**Note:** Adding an HTTP URL when enabling a Hook in the Admin Console displays an Invalid URL provided error.

## Avoid delays in Hook responses

When Okta uses an Inline Hook to communicate with your endpoint, the user experience is paused until your code responds.

Okta Event Hooks also require a response. To prevent unnecessary delays or timeouts, Okta recommends the following for Event Hooks:

* Treat Event Hooks as you would any other HTTP request. For example, ensure you respond to the HTTP request in under 400 milliseconds with either a 200 (Success) or 204 (Success no content) return code.
* To avoid delays or timeouts, process the Event Hook request data after sending the response.

A timeout of three seconds is enforced on all outbound requests for Event and Inline Hooks, with one retry in the event of a timeout or an error response from the external service. If a successful response has not been received after that, a 400 error is returned with more information about what failed.

See Inline Hook [Timeout and Retry](/docs/concepts/inline-hooks/#timeout-and-retry) and Event Hook [Timeout and Retry](https://developer.okta.com/docs/concepts/event-hooks/#timeout-and-retry) for further information on timeout and retry behaviors.

## Limits, duplicates, and order of Hook calls

The number of Hook calls and the limits per org are available in the following table. Keep in mind these numbers and limits when designing your Hook solution.

Your external service processing Hook requests must take into consideration that the order of Event or Inline Hook calls is not guaranteed. Also, to avoid processing duplicate requests, use the `eventId` property to identify unique requests.

| Hook Type | Limit Type | Limit | Description |
| --------- | -----------| ----- | ----------- |
| Event Hook | Number of daily Event Hooks | 100K | A maximum of 100,000 Event Hooks can be fired, per org, per day. Event Hooks are not recorded or replayed after this point. If a request times out after three seconds, Event Hooks are retried once. Retries do not count toward the org limit.
|            | Maximum number of Event Hooks per org | 10 | A maximum of 10 active Event Hooks can be configured per org. Each Event Hook can be configured to deliver multiple event types. |
| Inline Hook | Timeout | 3 seconds | Inline Hooks have a completion timeout of three seconds with a single retry. However, a request is not retried if your endpoint returns a 4xx HTTP error code. Any 2xx code is considered successful, and the request is not retried. If the external service endpoint responds with a redirect, it is not followed. |
|             | Maximum number of Inline Hooks per org | 50 | The maximum number of Inline Hooks that can be configured per org is 50, which is a combined total for any combination of Inline Hook types. |

## Troubleshoot your Hook implementations

Developers and administrators can preview sample Okta calls and responses from your external service for all Event Hooks ([Event Hook preview](https://help.okta.com/okta_help.htm?id=ext-event-hooks-preview)) and for SAML and Registration Inline Hooks ([Preview an Inline Hook](hhttps://help.okta.com/okta_help.htm?id=ext-preview-inline-hooks)).

Review the Admin Console System Log to troubleshoot your implementations, in addition to your external service's logging features. See the following sections to assist in troubleshooting your implementations:

* [Troubleshooting Inline Hooks](/docs/concepts/inline-hooks/#troubleshooting)
* [Troubleshooting Event Hooks](/docs/concepts/event-hooks/#debugging)

Inline Hooks also provide an `error` object that can be returned as part of the Hook response. See [Inline Hooks error object](/docs/concepts/inline-hooks/#error).

See also the following guides for sample Okta Hook implementations:

* [Event Hook](/docs/guides/event-hook-implementation/nodejs/overview/)
* [Password Import Inline Hook](/docs/guides/password-import-inline-hook/nodejs/overview/)
* [Registration Inline Hook](/docs/guides/registration-inline-hook/nodejs/overview/)
* [Token Inline Hook](/docs/guides/token-inline-hook/nodejs/overview/)
