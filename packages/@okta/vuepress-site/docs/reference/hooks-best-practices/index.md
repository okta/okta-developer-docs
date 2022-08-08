---
title: Hooks best practices
excerpt: >-
  Understand the best practices to implement and secure Okta event hooks or inline hooks.
---

# Hooks best practices

Event hooks and inline hooks are outbound calls from Okta to an external service. These outbound calls integrate custom functionality into your Okta processes. See [event hooks](/docs/concepts/event-hooks) and [inline hooks](/docs/concepts/inline-hooks) for additional concept information.

The following sections review best practices to implement and secure Okta event hooks or inline hooks.

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

## Avoid delays in hook responses

When Okta uses an inline hook to communicate with your endpoint, the user experience is paused until your code responds.

Okta event hooks also require a response. To prevent unnecessary delays or timeouts, Okta recommends the following for event hooks:

* Respond immediately to the HTTP request with either a 200 (Success) or 204 (Success no content) return code.
* Process the event hook request data after sending the response code.

A timeout of three seconds is enforced on all outbound requests for event and inline hooks, with one retry in the event of a timeout or an error response from the external service. If a successful response has not been received after that, a 400 error is returned with more information about what failed.

See inline hook [Timeout and Retry](/docs/concepts/inline-hooks/#timeout-and-retry) and event hook [Timeout and Retry](/docs/concepts/event-hooks/#timeout-and-retry).

## Limits, duplicates, and order of Hook calls

The number of Hook calls and the limits per org are available in the following table. Keep in mind these numbers and limits when designing your Hook solution.

Your external service processing Hook requests must take into consideration that the order of event or inline hook calls is not guaranteed. Also, to avoid processing duplicate requests, use the `eventId` property to identify unique requests.

| Hook Type | Limit Type | Limit | Description |
| --------- | -----------| ----- | ----------- |
| Event hook | Number of daily event hooks | 200,000 | A maximum of 200,000 event hooks can be triggered, per org, per day. Event hooks are not recorded or replayed after this point. If a request times out after three seconds, event hooks are retried once. Retries do not count toward the org limit.
|            | Maximum number of event hooks per org | 10 | A maximum of 10 active event hooks can be configured per org. You can configure each event hook to deliver multiple event types. |
| Inline hook | Timeout | 3 seconds | inline hooks have a completion timeout of three seconds with a single retry. However, a request is not retried if your endpoint returns a 4xx HTTP error code. Any 2xx code is considered successful, and the request is not retried. If the external service endpoint responds with a redirect, it is not followed. |
|             | Maximum number of inline hooks per org | 50 | The maximum number of inline hooks that can be configured per org is 50, which is a combined total for any combination of inline hook types. |
|             | Concurrent rate limit | Variable | The maximum number of inline hooks that can be sent concurrently based on org type. See [Concurrent rate limits](/docs/reference/rl-additional-limits/#concurrent-rate-limits).|

## Troubleshoot your Hook implementations

Developers and administrators can preview sample Okta calls and responses from your external service for all event hooks ([Event hook preview](https://help.okta.com/okta_help.htm?id=ext-event-hooks-preview)) and for SAML and registration inline hooks ([Preview an inline hook](https://help.okta.com/okta_help.htm?id=ext-preview-inline-hooks)).

Review the Admin Console System Log to troubleshoot your implementations, in addition to your external service's logging features. See the following sections to assist in troubleshooting your implementations:

* [Troubleshooting inline hooks](/docs/concepts/inline-hooks/#troubleshooting)
* [Troubleshooting event hooks](/docs/concepts/event-hooks/#debugging)

Inline hooks also provide an `error` object that can be returned as part of the Hook response. See [Inline hooks error object](/docs/concepts/inline-hooks/#error).

See also the following guides for sample Okta Hook implementations:

* [Event hook](/docs/guides/event-hook-implementation/)
* [Password import inline hook](/docs/guides/password-import-inline-hook/)
* [Registration inline hook](/docs/guides/registration-inline-hook/)
* [Token inline hook](/docs/guides/token-inline-hook/)
* [Telephony inline hook](/docs/guides/telephony-inline-hook)
